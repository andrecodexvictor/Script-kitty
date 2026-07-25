import os
import re
from typing import Dict, Any, List

class ServerLogAuditor:
    """Enterprise Server Log & Audit Analyzer.
    Parses Nginx, Apache, Syslog, and Auth logs for suspicious access patterns,
    brute-force attempts, and unauthorized endpoint scans.
    """

    def __init__(self):
        self.suspicious_patterns = [
            { "name": "SQL Injection Log Attempt", "regex": r"(UNION\s+SELECT|SELECT.*FROM|%27|%22)", "severity": "HIGH" },
            { "name": "Path Traversal Log Attempt", "regex": r"(\.\./\.\./|%2e%2e%2f|/etc/passwd)", "severity": "HIGH" },
            { "name": "SSH Brute-Force Auth Failure", "regex": r"Failed password for (invalid user )?\w+ from", "severity": "MEDIUM" },
            { "name": "Web Admin Panel Scanning", "regex": r"GET /(phpmyadmin|admin|wp-admin|config\.php)", "severity": "LOW" }
        ]

    def audit_log_file(self, log_path: str) -> List[Dict[str, Any]]:
        findings = []
        if not os.path.exists(log_path):
            return findings

        try:
            with open(log_path, "r", encoding="utf-8", errors="ignore") as f:
                lines = f.readlines()

            for idx, line in enumerate(lines, 1):
                for pat in self.suspicious_patterns:
                    if re.search(pat["regex"], line, re.IGNORECASE):
                        findings.append({
                            "log_finding_id": f"SK-LOG-{len(findings) + 1}",
                            "pattern_name": pat["name"],
                            "severity": pat["severity"],
                            "file": log_path,
                            "line_number": idx,
                            "raw_log_entry": line.strip()[:150]
                        })
        except Exception:
            pass

        return findings
