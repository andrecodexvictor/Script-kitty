import os
import re
from typing import Dict, Any, List

class CryptographicVulnerabilityAuditor:
    """Cryptographic Vulnerability Auditor for Script Kitty.
    Scans codebases for weak hashing (MD5, SHA-1), outdated ciphers (DES, RC4),
    insufficient RSA key lengths (<2048 bits), and insecure random number generation.
    """

    def __init__(self):
        self.crypto_rules = [
            {
                "id": "SK-CRYPTO-01",
                "name": "Weak Hash Algorithm (MD5 / SHA-1)",
                "regex": r"(crypto\.createHash\(['\"](md5|sha1)['\"]|hashlib\.md5\(|hashlib\.sha1\(|DigestUtils\.md5|DigestUtils\.sha1)",
                "severity": "HIGH",
                "remediation": "Upgrade hashing algorithm to SHA-256 or SHA-512. Use bcrypt/argon2 for passwords."
            },
            {
                "id": "SK-CRYPTO-02",
                "name": "Outdated Cipher Usage (DES / RC4 / ECB Mode)",
                "regex": r"(crypto\.createCipher\(['\"](des|rc4|bf)['\"]|Cipher\.getInstance\(['\"].*(ECB|DES|RC4))",
                "severity": "CRITICAL",
                "remediation": "Use AES-256-GCM or ChaCha20-Poly1305 with authenticated encryption."
            },
            {
                "id": "SK-CRYPTO-03",
                "name": "Weak RSA Key Length (< 2048 bits)",
                "regex": r"(RSA\.generate\(1024|KeyPairGenerator\.getInstance\(['\"]RSA['\"]\).+initialize\(1024)",
                "severity": "HIGH",
                "remediation": "Generate RSA keys with minimum length of 2048 bits (3072 or 4096 bits recommended)."
            },
            {
                "id": "SK-CRYPTO-04",
                "name": "Insecure Pseudo-Random Number Generation (PRNG)",
                "regex": r"(Math\.random\(|random\.random\(|rand\(\)|java\.util\.Random)",
                "severity": "MEDIUM",
                "remediation": "Use cryptographically secure PRNGs (crypto.getRandomValues, secrets module, SecureRandom)."
            }
        ]

    def audit_workspace(self, workspace_path: str = ".") -> List[Dict[str, Any]]:
        findings = []
        abs_path = os.path.abspath(workspace_path)

        for root, _, files in os.walk(abs_path):
            if any(skip in root for skip in ["node_modules", ".git", "dist", "build", "__pycache__"]):
                continue

            for file in files:
                if file.endswith((".py", ".js", ".ts", ".java", ".go", ".cs", ".php", ".rb")):
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, abs_path)

                    try:
                        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                            lines = f.readlines()

                        for idx, line in enumerate(lines, 1):
                            clean_line = line.strip()
                            if not clean_line or clean_line.startswith(("#", "//", "/*", "*")):
                                continue

                            for rule in self.crypto_rules:
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
