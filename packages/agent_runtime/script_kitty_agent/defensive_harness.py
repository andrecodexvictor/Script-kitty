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
from script_kitty_validators.guardrails import AIGuardrailValidator

class DefensiveHarnessEngine:
    """Harness Engineering Implementation for Script Kitty Defensive Agent.
    Manages context budgets, tool execution feedback loops, continuous local auditing,
    and deterministic evaluation metrics under strict safety controls.
    """

    def __init__(self, workspace_path: str = ".", max_token_budget: int = 100000):
        self.workspace_path = os.path.abspath(workspace_path)
        self.max_token_budget = max_token_budget
        self.consumed_tokens = 0
        self.polyglot_sast = PolyglotSASTScanner()
        self.secret_scanner = SecretScanner()
        self.header_scanner = HeaderSecurityScanner()
        self.guardrail_validator = AIGuardrailValidator()

    def verify_scope_compliance(self) -> bool:
        scope_path = os.path.join(self.workspace_path, "scope.md")
        return os.path.exists(scope_path)

    def execute_harness_pass(self, target_url: str = "http://localhost:3000") -> Dict[str, Any]:
        """Executes a single deterministic audit pass across all defensive security tools."""
        if not self.verify_scope_compliance():
            return {
                "harness_status": "BLOCKED",
                "reason": "Target workspace lacks authorized scope.md configuration."
            }

        start_time = time.time()

        # 1. Execute Tool Pipeline
        sast_findings = self.polyglot_sast.scan_workspace(self.workspace_path)
        secret_findings = self.secret_scanner.scan_directory(self.workspace_path)
        header_result = self.header_scanner.evaluate_headers(target_url)
        guardrail_result = self.guardrail_validator.test_llm_target(target_url)

        all_findings = sast_findings + secret_findings + header_result.get("findings", [])
        duration = round(time.time() - start_time, 3)

        # Estimate token consumption for context budget tracking
        self.consumed_tokens += len(json.dumps(all_findings)) // 4

        return {
            "harness_status": "COMPLETED",
            "workspace": self.workspace_path,
            "pass_duration_seconds": duration,
            "consumed_token_budget": self.consumed_tokens,
            "max_token_budget": self.max_token_budget,
            "metrics": {
                "polyglot_sast_findings": len(sast_findings),
                "secret_leak_findings": len(secret_findings),
                "header_findings": len(header_result.get("findings", [])),
                "guardrail_suites_passed": len(guardrail_result.get("test_results", []))
            },
            "findings": all_findings
        }

    def run_continuous_audit_loop(self, max_passes: int = 3, pass_interval_seconds: int = 2) -> List[Dict[str, Any]]:
        """Runs a controlled feedback loop over local workspace files until token budget or pass limit is reached."""
        print(f"[Defensive Harness Engine] Initializing continuous audit loop on '{self.workspace_path}'...")
        history = []

        for pass_num in range(1, max_passes + 1):
            if self.consumed_tokens >= self.max_token_budget:
                print(f"[!] Token budget limit reached ({self.consumed_tokens}/{self.max_token_budget}). Halting harness loop.")
                break

            print(f" -> [Pass {pass_num}/{max_passes}] Executing defensive tool pipeline...")
            result = self.execute_harness_pass()
            history.append(result)

            if pass_num < max_passes:
                time.sleep(pass_interval_seconds)

        print(f"[Defensive Harness Engine] Continuous audit loop completed cleanly across {len(history)} passes.\n")
        return history

if __name__ == "__main__":
    harness = DefensiveHarnessEngine()
    results = harness.run_continuous_audit_loop(max_passes=2, pass_interval_seconds=1)
    print(json.dumps(results, indent=2))
