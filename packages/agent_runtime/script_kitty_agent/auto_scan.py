import os
import sys
import json
from typing import Dict, Any, List

# Add workspace packages directory to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
pkg_root = os.path.abspath(os.path.join(current_dir, "..", ".."))

sys.path.insert(0, os.path.join(pkg_root, "scanners"))
sys.path.insert(0, os.path.join(pkg_root, "validators"))
sys.path.insert(0, os.path.join(pkg_root, "remediation"))
sys.path.insert(0, os.path.join(pkg_root, "agent_runtime"))

from script_kitty_scanners.secrets import SecretScanner
from script_kitty_scanners.headers import HeaderSecurityScanner
from script_kitty_scanners.code_vulnerabilities import CodeVulnerabilityScanner
from script_kitty_validators.guardrails import AIGuardrailValidator
from script_kitty_agent.memory import AgentContinuousMemory

class ScriptKittyAutoAuditor:
    """Enterprise Automated Security Engine for Script Kitty.
    Runs comprehensive security analysis across Code SAST, Secret Leaks, HTTP Headers, and AI Guardrails.
    """

    def __init__(self, target_path: str = ".", target_url: str = "http://localhost:3000"):
        self.target_path = os.path.abspath(target_path)
        self.target_url = target_url
        self.secret_scanner = SecretScanner()
        self.header_scanner = HeaderSecurityScanner()
        self.code_scanner = CodeVulnerabilityScanner()
        self.guardrail_validator = AIGuardrailValidator()
        self.memory = AgentContinuousMemory(self.target_path)

    def run_full_audit(self) -> Dict[str, Any]:
        print("\n[Script Kitty Enterprise Engine] Starting Automated Security Audit...")
        print(f"Workspace Target: {self.target_path}")
        print(f"HTTP/AI Target: {self.target_url}\n")

        # 1. Code SAST Scan
        print("[1/4] Running Code Vulnerability Scan (SAST)...")
        code_findings = self.code_scanner.scan_workspace(self.target_path)
        print(f"   -> Found {len(code_findings)} potential code vulnerabilities.")

        # 2. Secret Leak Scan
        print("[2/4] Running Secret & Credential Leak Scan...")
        secret_findings = self.secret_scanner.scan_directory(self.target_path)
        print(f"   -> Found {len(secret_findings)} exposed credential/secret leaks.")

        # 3. HTTP Header Security Scan
        print("[3/4] Running HTTP Security Header Evaluation...")
        header_result = self.header_scanner.evaluate_headers(self.target_url)
        header_findings = header_result.get("findings", [])
        print(f"   -> Found {len(header_findings)} missing security headers.")

        # 4. AI Guardrail Scan
        print("[4/4] Testing AI Guardrails & Prompt-Injection Resilience...")
        ai_result = self.guardrail_validator.test_llm_target(self.target_url)
        ai_findings = ai_result.get("test_results", [])
        print(f"   -> Completed {len(ai_findings)} AI guardrail verification suites.")

        # Combine all findings
        all_findings = code_findings + secret_findings + header_findings

        # Record in Agent Continuous Memory & Check for PR/Issue contribution suggestions
        memory_suggestions = []
        for finding in all_findings:
            mem_res = self.memory.record_experience(finding)
            if mem_res.get("contribution_suggestion"):
                memory_suggestions.append(mem_res["contribution_suggestion"])

        summary = {
            "status": "COMPLETED",
            "audit_target": os.path.basename(self.target_path),
            "total_findings": len(all_findings),
            "breakdown": {
                "code_vulnerabilities": len(code_findings),
                "secret_leaks": len(secret_findings),
                "insecure_headers": len(header_findings),
                "ai_guardrail_suites": len(ai_findings)
            },
            "findings": all_findings,
            "contribution_suggestions": memory_suggestions
        }

        print("\n==================================================")
        print(f"AUDIT COMPLETE! Total Findings: {len(all_findings)}")
        if memory_suggestions:
            print(f"{len(memory_suggestions)} Continuous Learning PR/Issue suggestions generated!")
        print("==================================================\n")

        return summary

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    engine = ScriptKittyAutoAuditor(target_path=target)
    report = engine.run_full_audit()
    print(json.dumps(report, indent=2))
