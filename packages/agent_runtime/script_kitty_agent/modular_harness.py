import os
import sys
import time
import json
from typing import Dict, Any, List

current_dir = os.path.dirname(os.path.abspath(__file__))
pkg_root = os.path.abspath(os.path.join(current_dir, "..", ".."))

sys.path.insert(0, os.path.join(pkg_root, "scanners"))
sys.path.insert(0, os.path.join(pkg_root, "validators"))

from script_kitty_scanners.polyglot_sast import PolyglotSASTScanner
from script_kitty_scanners.secrets import SecretScanner
from script_kitty_scanners.headers import HeaderSecurityScanner
from script_kitty_scanners.crypto_auditor import CryptographicVulnerabilityAuditor
from script_kitty_validators.guardrails import AIGuardrailValidator

class ModularHarnessEngine:
    """Modular Defensive Security Harness Engine for Script Kitty.
    Coordinates Polyglot SAST, Web2/Web3 auditing, Cryptographic analysis,
    Log auditing, and AI Guardrail testing under a unified token-bounded context loop.
    """

    def __init__(self, workspace_path: str = ".", max_token_budget: int = 250000):
        self.workspace_path = os.path.abspath(workspace_path)
        self.max_token_budget = max_token_budget
        self.consumed_tokens = 0
        self.polyglot_sast = PolyglotSASTScanner()
        self.secret_scanner = SecretScanner()
        self.header_scanner = HeaderSecurityScanner()
        self.crypto_auditor = CryptographicVulnerabilityAuditor()
        self.guardrail_validator = AIGuardrailValidator()

    def run_full_defensive_pass(self, target_url: str = "http://localhost:3000") -> Dict[str, Any]:
        """Executes a unified defensive security validation pass across all modules."""
        start_time = time.time()

        sast_findings = self.polyglot_sast.scan_workspace(self.workspace_path)
        secret_findings = self.secret_scanner.scan_directory(self.workspace_path)
        crypto_findings = self.crypto_auditor.audit_workspace(self.workspace_path)
        header_result = self.header_scanner.evaluate_headers(target_url)
        guardrail_result = self.guardrail_validator.test_llm_target(target_url)

        all_findings = sast_findings + secret_findings + crypto_findings + header_result.get("findings", [])
        duration = round(time.time() - start_time, 3)

        self.consumed_tokens += len(json.dumps(all_findings)) // 4

        return {
            "harness_mode": "MODULAR_DEFENSIVE",
            "status": "COMPLETED",
            "workspace": self.workspace_path,
            "pass_duration_seconds": duration,
            "consumed_token_budget": self.consumed_tokens,
            "max_token_budget": self.max_token_budget,
            "summary": {
                "polyglot_sast": len(sast_findings),
                "secret_leaks": len(secret_findings),
                "crypto_vulnerabilities": len(crypto_findings),
                "insecure_headers": len(header_result.get("findings", [])),
                "ai_guardrail_suites": len(guardrail_result.get("test_results", []))
            },
            "findings": all_findings
        }

if __name__ == "__main__":
    harness = ModularHarnessEngine()
    report = harness.run_full_defensive_pass()
    print(json.dumps(report, indent=2))
