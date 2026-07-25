import re
import os
from typing import List, Dict, Any

class SecretScanner:
    """Scans codebases and configurations for hardcoded secrets, API keys, and private tokens."""
    
    PATTERNS = {
        "AWS Access Key": r"AKIA[0-9A-Z]{16}",
        "Generic Secret Token": r"(?i)(secret|password|passwd|api_key|token)\s*[:=]\s*['\"]([^'\"]+)['\"]",
        "Private Key Header": r"-----BEGIN (RSA|EC|DSA|OPENSSH) PRIVATE KEY-----",
        "GitHub Personal Access Token": r"ghp_[a-zA-Z0-9]{36}",
        "Slack Bot Token": r"xoxb-[0-9]{11}-[0-9]{12}-[a-zA-Z0-9]{24}"
    }

    def scan_directory(self, root_dir: str) -> List[Dict[str, Any]]:
        findings = []
        for root, _, files in os.walk(root_dir):
            if any(p in root for p in [".git", "node_modules", "dist", "target", "venv", ".venv"]):
                continue
            for file in files:
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                        for line_idx, line in enumerate(f, 1):
                            for secret_type, pattern in self.PATTERNS.items():
                                match = re.search(pattern, line)
                                if match:
                                    findings.append({
                                        "finding_id": f"SK-SECRET-{len(findings)+1:03d}",
                                        "category": "Hardcoded Secret / Credential Leak",
                                        "severity": "HIGH",
                                        "file": os.path.relpath(filepath, root_dir),
                                        "line": line_idx,
                                        "type": secret_type,
                                        "evidence": f"Potential {secret_type} detected on line {line_idx}",
                                        "remediation": "Move secrets to environment variables or secret vaults (AWS Secrets Manager, HashiCorp Vault).",
                                        "recheck_plan": f"script-kitty scan-secrets {os.path.relpath(filepath, root_dir)}"
                                    })
                except Exception:
                    continue
        return findings
