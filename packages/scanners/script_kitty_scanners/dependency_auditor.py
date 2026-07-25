import os
import json
import re
from typing import Dict, Any, List

class DependencyVulnerabilityAuditor:
    """Dependency Supply-Chain & CVE Vulnerability Auditor.
    Parses package.json, requirements.txt, Cargo.toml, and Gemfile for known vulnerable packages
    and insecure version lock configurations.
    """

    def __init__(self):
        self.known_vulnerable_patterns = [
            {
                "id": "SK-DEP-01",
                "ecosystem": "npm",
                "name": "Known Vulnerable Package Version Detected",
                "regex": r"['\"](lodash|axios|express|moment)['\"]\s*:\s*['\"][\^~]?[0-3]\.",
                "severity": "MEDIUM",
                "remediation": "Update package to the latest patch release using npm audit fix."
            },
            {
                "id": "SK-DEP-02",
                "ecosystem": "python",
                "name": "Unpinned Python Dependency (Wildcard Version)",
                "regex": r"^[a-zA-Z0-9_-]+==\*|^[a-zA-Z0-9_-]+\s*>=",
                "severity": "LOW",
                "remediation": "Pin explicit dependency versions in requirements.txt or pipfile.lock."
            },
            {
                "id": "SK-DEP-03",
                "ecosystem": "general",
                "name": "HTTP Package Repository Registry",
                "regex": r"http://(registry\.npmjs\.org|pypi\.org)",
                "severity": "HIGH",
                "remediation": "Enforce HTTPS connection strings for package manager repositories."
            }
        ]

    def audit_dependencies(self, workspace_path: str = ".") -> List[Dict[str, Any]]:
        findings = []
        abs_path = os.path.abspath(workspace_path)

        for root, _, files in os.walk(abs_path):
            if any(skip in root for skip in ["node_modules", ".git", "dist", "build"]):
                continue

            for file in files:
                if file in ["package.json", "requirements.txt", "Cargo.toml", "Gemfile", "Pipfile"]:
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, abs_path)

                    try:
                        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                            lines = f.readlines()

                        for idx, line in enumerate(lines, 1):
                            clean_line = line.strip()
                            if not clean_line or clean_line.startswith(("#", "//")):
                                continue

                            for rule in self.known_vulnerable_patterns:
                                if re.search(rule["regex"], line, re.IGNORECASE):
                                    findings.append({
                                        "finding_id": rule["id"],
                                        "category": rule["name"],
                                        "ecosystem": rule["ecosystem"],
                                        "severity": rule["severity"],
                                        "file_path": rel_path,
                                        "line_number": idx,
                                        "snippet": clean_line[:120],
                                        "remediation": rule["remediation"]
                                    })
                    except Exception:
                        pass

        return findings
