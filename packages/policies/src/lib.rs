use serde::{Deserialize, Serialize};
use std::collections::HashSet;

pub mod crypto;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum OperatingMode {
    Scout,
    Verify,
    Patch,
    Recheck,
    Lab,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum ThreatSeverity {
    Critical,
    High,
    Medium,
    Low,
    Info,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PolicyCheckRequest {
    pub target: String,
    pub mode: OperatingMode,
    pub action_name: String,
    pub is_state_changing: bool,
    pub severity: ThreatSeverity,
    pub allowed_scope: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct PolicyCheckResult {
    pub allowed: bool,
    pub requires_approval: bool,
    pub reason: String,
    pub risk_tier: String,
    pub policy_version: String,
}

pub struct ZeroTrustPolicyEngine {
    pub scope_allowlist: HashSet<String>,
    pub policy_version: String,
}

impl ZeroTrustPolicyEngine {
    pub fn new(allowed_scope: Vec<String>) -> Self {
        let set: HashSet<String> = allowed_scope.into_iter().collect();
        Self {
            scope_allowlist: set,
            policy_version: "v1.0.0-enterprise".to_string(),
        }
    }

    pub fn is_target_in_scope(&self, target: &str) -> bool {
        if self.scope_allowlist.is_empty() {
            return true;
        }

        if target.starts_with("http://localhost")
            || target.starts_with("http://127.0.0.1")
            || target.starts_with("127.0.0.1")
            || target.starts_with("localhost")
            || target == "."
        {
            return true;
        }

        self.scope_allowlist.contains(target)
            || self.scope_allowlist.iter().any(|allowed| target.contains(allowed))
    }

    pub fn evaluate(&self, request: &PolicyCheckRequest) -> PolicyCheckResult {
        // 1. Scope Allowance Check
        if !self.is_target_in_scope(&request.target) {
            return PolicyCheckResult {
                allowed: false,
                requires_approval: false,
                reason: format!("Target '{}' is NOT registered in scope.md allowlist.", request.target),
                risk_tier: "BLOCKED".to_string(),
                policy_version: self.policy_version.clone(),
            };
        }

        // 2. High-Severity & State-Changing Action Gate
        if request.severity == ThreatSeverity::Critical && request.is_state_changing {
            return PolicyCheckResult {
                allowed: true,
                requires_approval: true,
                reason: "Critical threat state-changing operation requires explicit Human-in-the-Loop approval.".to_string(),
                risk_tier: "CRITICAL".to_string(),
                policy_version: self.policy_version.clone(),
            };
        }

        // 3. Operating Mode Rules
        match request.mode {
            OperatingMode::Scout | OperatingMode::Patch | OperatingMode::Recheck => PolicyCheckResult {
                allowed: true,
                requires_approval: false,
                reason: format!("{:?} mode low-impact action authorized.", request.mode),
                risk_tier: "LOW".to_string(),
                policy_version: self.policy_version.clone(),
            },
            OperatingMode::Verify => {
                if request.is_state_changing {
                    PolicyCheckResult {
                        allowed: true,
                        requires_approval: true,
                        reason: "Verify mode state-changing operation requires explicit human approval.".to_string(),
                        risk_tier: "MEDIUM".to_string(),
                        policy_version: self.policy_version.clone(),
                    }
                } else {
                    PolicyCheckResult {
                        allowed: true,
                        requires_approval: false,
                        reason: "Verify mode dry-run action authorized.".to_string(),
                        risk_tier: "LOW".to_string(),
                        policy_version: self.policy_version.clone(),
                    }
                }
            }
            OperatingMode::Lab => PolicyCheckResult {
                allowed: true,
                requires_approval: true,
                reason: "Lab mode execution requires explicit operator approval.".to_string(),
                risk_tier: "HIGH".to_string(),
                policy_version: self.policy_version.clone(),
            },
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_scope_enforcement() {
        let engine = ZeroTrustPolicyEngine::new(vec!["http://localhost:3000".to_string()]);
        let req = PolicyCheckRequest {
            target: "http://unauthorized.org".to_string(),
            mode: OperatingMode::Scout,
            action_name: "scan_headers".to_string(),
            is_state_changing: false,
            severity: ThreatSeverity::Low,
            allowed_scope: vec!["http://localhost:3000".to_string()],
        };
        let res = engine.evaluate(&req);
        assert!(!res.allowed);
        assert_eq!(res.risk_tier, "BLOCKED");
    }

    #[test]
    fn test_critical_approval_gate() {
        let engine = ZeroTrustPolicyEngine::new(vec!["http://localhost:3000".to_string()]);
        let req = PolicyCheckRequest {
            target: "http://localhost:3000".to_string(),
            mode: OperatingMode::Verify,
            action_name: "remediate_credential".to_string(),
            is_state_changing: true,
            severity: ThreatSeverity::Critical,
            allowed_scope: vec!["http://localhost:3000".to_string()],
        };
        let res = engine.evaluate(&req);
        assert!(res.allowed);
        assert!(res.requires_approval);
        assert_eq!(res.risk_tier, "CRITICAL");
    }
}
