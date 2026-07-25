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
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_audit_hash_chain() {
        let mut logger = HashChainedAuditLogger::new();
        logger.append("agent-1", "scout_target", "http://localhost:3000", "Scan headers", "ALLOWED");
        logger.append("agent-1", "verify_finding", "http://localhost:3000", "Test Auth Bypass", "APPROVED");

        assert_eq!(logger.entries.len(), 2);
        assert!(logger.verify_chain_integrity());
    }

    #[test]
    fn test_tamper_detection() {
        let mut logger = HashChainedAuditLogger::new();
        logger.append("agent-1", "scout_target", "http://localhost:3000", "Scan headers", "ALLOWED");
        logger.append("agent-1", "verify_finding", "http://localhost:3000", "Test Auth Bypass", "APPROVED");

        // Tamper with first entry's action
        logger.entries[0].action = "MALICIOUS_ACTION".to_string();

        assert!(!logger.verify_chain_integrity());
    }
}
