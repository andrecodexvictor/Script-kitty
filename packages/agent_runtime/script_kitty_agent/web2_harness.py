import os
import sys
import json
from typing import Dict, Any, List

current_dir = os.path.dirname(os.path.abspath(__file__))
pkg_root = os.path.abspath(os.path.join(current_dir, "..", ".."))

sys.path.insert(0, os.path.join(pkg_root, "scanners"))
sys.path.insert(0, os.path.join(pkg_root, "validators"))
sys.path.insert(0, os.path.join(pkg_root, "remediation"))

from script_kitty_scanners.secrets import SecretScanner
from script_kitty_scanners.headers import HeaderSecurityScanner
from script_kitty_scanners.polyglot_sast import PolyglotSASTScanner
from script_kitty_scanners.log_auditor import ServerLogAuditor
from script_kitty_validators.guardrails import AIGuardrailValidator

class Web2SecurityHarness:
    """Enterprise Web2 Agent Harness for Script Kitty.
    Orchestrates polyglot SAST (PHP, Ruby, Python, JS/TS), secret leak detection,
    HTTP security header evaluation, and server log auditing.
    """

    def __init__(self, target_path: str = "."):
        self.target_path = os.path.abspath(target_path)
        self.polyglot_sast = PolyglotSASTScanner()
        self.secret_scanner = SecretScanner()
        self.header_scanner = HeaderSecurityScanner()
        self.log_auditor = ServerLogAuditor()
        self.guardrail_validator = AIGuardrailValidator()

    def run_web2_harness(self, target_url: str = "http://localhost:3000") -> Dict[str, Any]:
        print("\n[Web2 Harness] Executing Web2 Security Audit Pipeline...")

        # 1. Polyglot SAST
        sast_findings = self.polyglot_sast.scan_workspace(self.target_path)
        print(f"   -> Polyglot SAST: Discovered {len(sast_findings)} findings across PHP, Ruby, Python, JS/TS.")

        # 2. Secret Leaks
        secret_findings = self.secret_scanner.scan_directory(self.target_path)
        print(f"   -> Secret Scanner: Discovered {len(secret_findings)} exposed secrets.")

        # 3. HTTP Headers
        header_result = self.header_scanner.evaluate_headers(target_url)
        header_findings = header_result.get("findings", [])
        print(f"   -> Header Security: Discovered {len(header_findings)} missing HTTP headers.")

        # 4. Server Logs
        log_findings = []
        for log_file in ["access.log", "error.log", "auth.log"]:
            log_path = os.path.join(self.target_path, log_file)
            if os.path.exists(log_path):
                log_findings.extend(self.log_auditor.audit_log_file(log_path))
        print(f"   -> Server Log Auditor: Discovered {len(log_findings)} suspicious log entries.")

        total = sast_findings + secret_findings + header_findings
        return {
            "harness": "WEB2",
            "status": "COMPLETED",
            "workspace": self.target_path,
            "total_findings": len(total),
            "findings": total
        }

if __name__ == "__main__":
    harness = Web2SecurityHarness()
    report = harness.run_web2_harness()
    print(json.dumps(report, indent=2))
