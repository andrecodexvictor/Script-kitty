import os
import json
import re
from typing import Dict, Any, List

class DatabaseAuthSecurityAuditor:
    """Database & Authentication Security Auditor for Script Kitty.
    Audits codebase for exposed DB connection strings (PostgreSQL, MySQL, MongoDB, Redis),
    hardcoded database passwords, unhashed password storage, default admin credentials,
    and missing password complexity checks.
    """

    def __init__(self):
        self.db_auth_rules = [
            {
                "id": "SK-DB-01",
                "name": "Hardcoded Database Connection String with Credentials",
                "regex": r"(postgres|postgresql|mysql|mongodb|mongodb\+srv|redis)://[a-zA-Z0-9_-]+:[^@\s]+@[a-zA-Z0-9_.-]+",
                "severity": "CRITICAL",
                "remediation": "Move database connection strings with credentials into environment variables (process.env / os.environ)."
            },
            {
                "id": "SK-DB-02",
                "name": "Default Administrator / Root Credentials",
                "regex": r"['\"]?(admin|root)['\"]?\s*:\s*['\"]?(admin|root|password|123456|pass123)['\"]?",
                "severity": "HIGH",
                "remediation": "Change default passwords immediately and enforce strong random secret generation."
            },
            {
                "id": "SK-DB-03",
                "name": "Unhashed Plaintext Password Storage",
                "regex": r"password\s*=\s*req\.(body|params)\.password(?!.*(hash|bcrypt|argon2))",
                "severity": "CRITICAL",
                "remediation": "Never store or pass raw passwords without bcrypt/argon2 hashing."
            },
            {
                "id": "SK-DB-04",
                "name": "Insecure JWT Secret Key (Short/Weak Secret)",
                "regex": r"jwt\.sign\(.*['\"](secret|12345|jwt_secret|supersecret)['\"]",
                "severity": "HIGH",
                "remediation": "Use strong high-entropy JWT secret keys (minimum 256 bits) from environment variables."
            }
        ]

    def audit_database_and_auth(self, workspace_path: str = ".") -> List[Dict[str, Any]]:
        findings = []
        abs_path = os.path.abspath(workspace_path)

        for root, _, files in os.walk(abs_path):
            if any(skip in root for skip in ["node_modules", ".git", "dist", "build", "__pycache__"]):
                continue

            for file in files:
                if file.endswith((".py", ".js", ".ts", ".java", ".go", ".php", ".rb", ".json", ".yml", ".yaml", ".env")):
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, abs_path)

                    try:
                        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                            lines = f.readlines()

                        for idx, line in enumerate(lines, 1):
                            clean_line = line.strip()
                            if not clean_line or clean_line.startswith(("#", "//")):
                                continue

                            for rule in self.db_auth_rules:
                                if re.search(rule["regex"], line, re.IGNORECASE):
                                    findings.append({
                                        "finding_id": rule["id"],
                                        "category": rule["name"],
                                        "severity": rule["severity"],
                                        "file_path": rel_path,
                                        "line_number": idx,
                                        "snippet": clean_line[:120],
                                        "remediation": rule["remediation"]
                                    })
                    except Exception:
                        pass

        return findings
