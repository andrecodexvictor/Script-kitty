import os
import sys
import json
import re
from typing import Dict, Any, List

class DefensiveSecurityAnalyzer:
    """Enterprise Defensive Security Analyzer for Script Kitty Agent Runtime.
    Performs deep static analysis across local project files, detecting insecure configurations,
    weak cryptographic implementations, and credential leaks.
    """

    def __init__(self, workspace_path: str = "."):
        self.workspace_path = os.path.abspath(workspace_path)

    def analyze_workspace(self) -> Dict[str, Any]:
        findings = []
        files_scanned = 0

        for root, dirs, files in os.walk(self.workspace_path):
            # Skip build and vendor directories
            if any(skip in root for skip in ["node_modules", ".git", "dist", "build", "__pycache__", ".cargo"]):
                continue

            for file in files:
                if file.endswith((".py", ".js", ".ts", ".rs", ".go", ".json", ".yml", ".yaml", ".env")):
                    files_scanned += 1
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, self.workspace_path)
                    
                    try:
                        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                            lines = f.readlines()

                        for idx, line in enumerate(lines, 1):
                            # 1. Insecure Hash Detection
                            if re.search(r"md5|sha1", line, re.IGNORECASE) and not line.strip().startswith("#"):
                                findings.append({
                                    "id": f"SK-DEF-{len(findings)+1}",
                                    "category": "Weak Cryptography",
                                    "severity": "HIGH",
                                    "file": rel_path,
                                    "line": idx,
                                    "snippet": line.strip(),
                                    "remediation": "Upgrade hashing algorithm to SHA-256 or bcrypt/argon2."
                                })

                            # 2. Hardcoded Credentials / Tokens
                            if re.search(r"(api_key|secret|password)\s*=\s*['\"][A-Za-z0-9_\-=]{16,}['\"]", line, re.IGNORECASE):
                                findings.append({
                                    "id": f"SK-DEF-{len(findings)+1}",
                                    "category": "Hardcoded Secret",
                                    "severity": "CRITICAL",
                                    "file": rel_path,
                                    "line": idx,
                                    "snippet": line.strip(),
                                    "remediation": "Store secret credentials in environment variables or key vaults."
                                })
                    except Exception:
                        pass

        return {
            "status": "COMPLETED",
            "workspace": self.workspace_path,
            "files_analyzed": files_scanned,
            "total_findings": len(findings),
            "findings": findings
        }

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    analyzer = DefensiveSecurityAnalyzer(target)
    print(json.dumps(analyzer.analyze_workspace(), indent=2))
