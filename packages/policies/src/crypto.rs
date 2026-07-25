use base64::{engine::general_purpose, Engine as _};
use sha2::{Digest, Sha512};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CryptoAuditResult {
    pub algorithm: String,
    pub is_weak: bool,
    pub recommendation: String,
}

pub struct CryptoAuditEngine;

impl CryptoAuditEngine {
    pub fn audit_hash_algorithm(algo: &str) -> CryptoAuditResult {
        let algo_lower = algo.to_lowercase();
        match algo_lower.as_str() {
            "md5" | "sha1" => CryptoAuditResult {
                algorithm: algo.to_string(),
                is_weak: true,
                recommendation: "Collision risk detected! Upgrade to SHA-256 or SHA-512.".to_string(),
            },
            "sha256" | "sha512" => CryptoAuditResult {
                algorithm: algo.to_string(),
                is_weak: false,
                recommendation: "Algorithm is cryptographically secure.".to_string(),
            },
            _ => CryptoAuditResult {
                algorithm: algo.to_string(),
                is_weak: false,
                recommendation: "Standard evaluation applied.".to_string(),
            },
        }
    }

    pub fn compute_sha512(input: &[u8]) -> String {
        let mut hasher = Sha512::new();
        hasher.update(input);
        format!("{:x}", hasher.finalize())
    }

    pub fn safe_base64_encode(input: &[u8]) -> String {
        general_purpose::STANDARD.encode(input)
    }

    pub fn safe_base64_decode(input: &str) -> Result<Vec<u8>, String> {
        general_purpose::STANDARD
            .decode(input)
            .map_err(|e| format!("Base64 decoding error: {}", e))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sha512_computation() {
        let hash = CryptoAuditEngine::compute_sha512(b"script-kitty");
        assert!(!hash.is_empty());
    }

    #[test]
    fn test_weak_algo_detection() {
        let audit = CryptoAuditEngine::audit_hash_algorithm("md5");
        assert!(audit.is_weak);
    }
}
