use chrono::Utc;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuditEntry {
    pub index: u64,
    pub timestamp: String,
    pub agent_id: String,
    pub action: String,
    pub target: String,
    pub payload_summary: String,
    pub policy_result: String,
    pub previous_hash: String,
    pub hash: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EvidencePackage {
    pub package_id: String,
    pub generated_at: String,
    pub total_entries: u64,
    pub merkle_root: String,
    pub chain_valid: bool,
    pub entries: Vec<AuditEntry>,
}

pub struct HashChainedAuditLogger {
    pub entries: Vec<AuditEntry>,
}

impl HashChainedAuditLogger {
    pub fn new() -> Self {
        Self { entries: Vec::new() }
    }

    pub fn append(
        &mut self,
        agent_id: impl Into<String>,
        action: impl Into<String>,
        target: impl Into<String>,
        payload_summary: impl Into<String>,
        policy_result: impl Into<String>,
    ) -> AuditEntry {
        let index = self.entries.len() as u64;
        let timestamp = Utc::now().to_rfc3339();
        let agent_id_str = agent_id.into();
        let action_str = action.into();
        let target_str = target.into();
        let payload_str = payload_summary.into();
        let policy_str = policy_result.into();

        let previous_hash = if let Some(last) = self.entries.last() {
            last.hash.clone()
        } else {
            "GENESIS_0000000000000000000000000000000000000000000000000000000000000000".to_string()
        };

        let raw_data = format!(
            "{}:{}:{}:{}:{}:{}:{}",
            index, timestamp, agent_id_str, action_str, target_str, payload_str, previous_hash
        );

        let mut hasher = Sha256::new();
        hasher.update(raw_data.as_bytes());
        let hash = format!("{:x}", hasher.finalize());

        let entry = AuditEntry {
            index,
            timestamp,
            agent_id: agent_id_str,
            action: action_str,
            target: target_str,
            payload_summary: payload_str,
            policy_result: policy_str,
            previous_hash,
            hash,
        };

        self.entries.push(entry.clone());
        entry
    }

    pub fn compute_merkle_root(&self) -> String {
        if self.entries.is_empty() {
            return "0000000000000000000000000000000000000000000000000000000000000000".to_string();
        }

        let mut hashes: Vec<String> = self.entries.iter().map(|e| e.hash.clone()).collect();

        while hashes.len() > 1 {
            if hashes.len() % 2 != 0 {
                hashes.push(hashes.last().unwrap().clone());
            }
            let mut next_level = Vec::new();
            for chunk in hashes.chunks(2) {
                let mut hasher = Sha256::new();
                hasher.update(format!("{}{}", chunk[0], chunk[1]).as_bytes());
                next_level.push(format!("{:x}", hasher.finalize()));
            }
            hashes = next_level;
        }

        hashes[0].clone()
    }

    pub fn verify_chain_integrity(&self) -> bool {
        if self.entries.is_empty() {
            return true;
        }

        let mut expected_prev_hash = "GENESIS_0000000000000000000000000000000000000000000000000000000000000000".to_string();

        for entry in &self.entries {
            if entry.previous_hash != expected_prev_hash {
                return false;
            }

            let raw_data = format!(
                "{}:{}:{}:{}:{}:{}:{}",
                entry.index,
                entry.timestamp,
                entry.agent_id,
                entry.action,
                entry.target,
                entry.payload_summary,
                entry.previous_hash
            );

            let mut hasher = Sha256::new();
            hasher.update(raw_data.as_bytes());
            let computed_hash = format!("{:x}", hasher.finalize());

            if computed_hash != entry.hash {
                return false;
            }

            expected_prev_hash = entry.hash.clone();
        }

        true
    }

    pub fn export_evidence_package(&self) -> EvidencePackage {
        let valid = self.verify_chain_integrity();
        let merkle_root = self.compute_merkle_root();

        EvidencePackage {
            package_id: format!("SK-EVID-{}", Utc::now().timestamp()),
            generated_at: Utc::now().to_rfc3339(),
            total_entries: self.entries.len() as u64,
            merkle_root,
            chain_valid: valid,
            entries: self.entries.clone(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_merkle_root_export() {
        let mut logger = HashChainedAuditLogger::new();
        logger.append("agent-1", "scout_target", "http://localhost:3000", "Scan headers", "ALLOWED");
        logger.append("agent-1", "verify_finding", "http://localhost:3000", "Test Auth Bypass", "APPROVED");

        let pkg = logger.export_evidence_package();
        assert!(pkg.chain_valid);
        assert_eq!(pkg.total_entries, 2);
        assert!(!pkg.merkle_root.is_empty());
    }
}
