import os
import re
from typing import List, Dict, Any

class CodeVulnerabilityScanner:
    """Static Application Security Testing (SAST) engine for code vulnerability discovery."""

    # Security rules for code pattern detection across languages
    RULES = [
        {
            "id": "SK-SAST-001",
            "category": "Command Injection",
            "severity": "HIGH",
            "pattern": r"(os\.system\(|subprocess\.Popen\(.*shell\s*=\s*True|eval\(|exec\(|child_process\.exec\()",
            "description": "Potentially unsafe command execution or dynamic code evaluation.",
            "remediation": "Avoid passing raw untrusted strings to shell execution functions. Use parameterized argument arrays."
        },
        {
            "id": "SK-SAST-002",
            "category": "SQL Injection",
            "severity": "HIGH",
            "pattern": r"(SELECT\s+.*\s+FROM\s+.*(?:(?:\+|%|\.format\(|\$\{).*)|db\.query\(.*['\"].*\+)",
            "description": "SQL query built via raw string concatenation.",
            "remediation": "Use parameterized queries, prepared statements, or ORM abstraction layers."
        },
        {
            "id": "SK-SAST-003",
            "category": "Insecure Cryptography / Hash",
            "severity": "MEDIUM",
            "pattern": r"(hashlib\.md5\(|hashlib\.sha1\(|crypto\.createHash\(['\"]md5['\"]|crypto\.createHash\(['\"]sha1['\"])",
            "description": "Use of broken/weak cryptographic hash algorithms (MD5 or SHA-1).",
            "remediation": "Upgrade to secure hashing algorithms such as SHA-256, SHA-512, or Argon2 / bcrypt for credentials."
        },
        {
            "id": "SK-SAST-004",
            "category": "Path Traversal Risk",
            "severity": "MEDIUM",
            "pattern": r"(open\(.*req\.(?:query|params|body)|fs\.readFile\(.*req\.)",
            "description": "File system access using unsanitized request input.",
            "remediation": "Validate path against allowlists and resolve relative paths securely using path.resolve / os.path.abspath."
        },
        {
            "id": "SK-SAST-005",
            "category": "Overly Permissive CORS",
            "severity": "LOW",
            "pattern": r"Access-Control-Allow-Origin['\"]\s*:\s*['\"]\*",
            "description": "Access-Control-Allow-Origin set to wildcard '*'.",
            "remediation": "Restrict CORS origin allowlist to explicit trusted domains."
        }
    ]

    def scan_workspace(self, root_dir: str) -> List[Dict[str, Any]]:
        findings = []
        ignored_dirs = {".git", "node_modules", "dist", "target", "venv", ".venv", "__pycache__"}
        scanned_extensions = {".py", ".js", ".ts", ".jsx", ".tsx", ".go", ".php", ".rs", ".java", ".c", ".cpp"}

        for root, dirs, files in os.walk(root_dir):
            dirs[:] = [d for d in dirs if d not in ignored_dirs]
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in scanned_extensions:
                    filepath = os.path.join(root, file)
                    rel_path = os.path.relpath(filepath, root_dir)
                    try:
                        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                            for line_num, line in enumerate(f, 1):
                                for rule in self.RULES:
                                    if re.search(rule["pattern"], line):
                                        findings.append({
                                            "finding_id": f"{rule['id']}-{len(findings)+1:03d}",
                                            "category": rule["category"],
                                            "severity": rule["severity"],
                                            "file": rel_path,
                                            "line": line_num,
                                            "snippet": line.strip()[:100],
                                            "description": rule["description"],
                                            "remediation": rule["remediation"],
                                            "recheck_plan": f"script-kitty scan-code {rel_path}"
                                        })
                    except Exception:
                        continue
        return findings
