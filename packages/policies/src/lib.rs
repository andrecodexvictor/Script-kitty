use serde::{Deserialize, Serialize};
use std::collections::HashSet;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum OperatingMode {
    Scout,
    Verify,
    Patch,
    Recheck,
    Lab,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PolicyCheckRequest {
    pub target: String,
    pub mode: OperatingMode,
    pub action_name: String,
    pub is_state_changing: bool,
    pub allowed_scope: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct PolicyCheckResult {
    pub allowed: bool,
    pub requires_approval: bool,
    pub reason: String,
    pub risk_tier: String,
}

pub struct ZeroTrustPolicyEngine {
    pub scope_allowlist: HashSet<String>,
}

impl ZeroTrustPolicyEngine {
    pub fn new(allowed_scope: Vec<String>) -> Self {
        let set: HashSet<String> = allowed_scope.into_iter().collect();
        Self { scope_allowlist: set }
    }

    pub fn evaluate(&self, request: &PolicyCheckRequest) -> PolicyCheckResult {
        // 1. Check Scope Eligibility
        let target_allowed = self.scope_allowlist.is_empty()
            || self.scope_allowlist.contains(&request.target)
            || request.target.starts_with("http://localhost")
            || request.target.starts_with("http://127.0.0.1")
            || request.target.starts_with("127.0.0.1")
            || request.target.starts_with("localhost");

        if !target_allowed {
            return PolicyCheckResult {
                allowed: false,
                requires_approval: false,
                reason: format!("Target '{}' is NOT included in the scope allowlist.", request.target),
                risk_tier: "BLOCKED".to_string(),
            };
        }

        // 2. Evaluate Mode Constraints & Approval Gates
        match request.mode {
            OperatingMode::Scout => PolicyCheckResult {
                allowed: true,
                requires_approval: false,
                reason: "Scout mode passive discovery allowed.".to_string(),
                risk_tier: "LOW".to_string(),
            },
            OperatingMode::Patch | OperatingMode::Recheck => PolicyCheckResult {
                allowed: true,
                requires_approval: false,
                reason: "Patch/Recheck remediation guidance allowed.".to_string(),
                risk_tier: "LOW".to_string(),
            },
            OperatingMode::Verify => {
                if request.is_state_changing {
                    PolicyCheckResult {
                        allowed: true,
                        requires_approval: true,
                        reason: "Verify mode action is state-changing and requires explicit human approval.".to_string(),
                        risk_tier: "MEDIUM".to_string(),
                    }
                } else {
                    PolicyCheckResult {
                        allowed: true,
                        requires_approval: false,
                        reason: "Verify mode dry-run action allowed.".to_string(),
                        risk_tier: "LOW".to_string(),
                    }
                }
            }
            OperatingMode::Lab => PolicyCheckResult {
                allowed: true,
                requires_approval: true,
                reason: "Lab mode high-risk execution requires explicit human approval.".to_string(),
                risk_tier: "HIGH".to_string(),
            },
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_scope_blocking() {
        let engine = ZeroTrustPolicyEngine::new(vec!["http://localhost:3000".to_string()]);
        let req = PolicyCheckRequest {
            target: "http://unauthorized-site.com".to_string(),
            mode: OperatingMode::Scout,
            action_name: "scan_headers".to_string(),
            is_state_changing: false,
            allowed_scope: vec!["http://localhost:3000".to_string()],
        };
        let res = engine.evaluate(&req);
        assert!(!res.allowed);
        assert_eq!(res.risk_tier, "BLOCKED");
    }

    #[test]
    fn test_verify_approval_gate() {
        let engine = ZeroTrustPolicyEngine::new(vec!["http://localhost:3000".to_string()]);
        let req = PolicyCheckRequest {
            target: "http://localhost:3000".to_string(),
            mode: OperatingMode::Verify,
            action_name: "test_auth_bypass".to_string(),
            is_state_changing: true,
            allowed_scope: vec!["http://localhost:3000".to_string()],
        };
        let res = engine.evaluate(&req);
        assert!(res.allowed);
        assert!(res.requires_approval);
        assert_eq!(res.risk_tier, "MEDIUM");
    }
}
