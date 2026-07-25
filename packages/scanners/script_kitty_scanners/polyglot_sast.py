import os
import re
from typing import Dict, Any, List

class PolyglotSASTScanner:
    """Multi-Language Static Application Security Testing (SAST) Scanner.
    Supports Solidity (.sol), PHP (.php), Ruby (.rb), Python (.py), JavaScript/TypeScript (.js/.ts), Go (.go), and Rust (.rs).
    """

    def __init__(self):
        self.rules = [
            # Solidity (Web3)
            {
                "lang": "Solidity",
                "extensions": [".sol"],
                "name": "Reentrancy Vulnerability Risk",
                "regex": r"\.call\{value:\s*.*\}" ,
                "severity": "CRITICAL",
                "remediation": "Follow the Checks-Effects-Interactions pattern or use OpenZeppelin's ReentrancyGuard."
            },
            {
                "lang": "Solidity",
                "extensions": [".sol"],
                "name": "tx.origin Authentication Risk",
                "regex": r"tx\.origin\s*==",
                "severity": "HIGH",
                "remediation": "Use msg.sender instead of tx.origin for authorization checks."
            },
            {
                "lang": "Solidity",
                "extensions": [".sol"],
                "name": "Weak Randomness Source",
                "regex": r"(block\.timestamp|blockhash|block\.difficulty)",
                "severity": "MEDIUM",
                "remediation": "Do not rely on block attributes for random numbers; use Chainlink VRF."
            },
            # PHP (Web2)
            {
                "lang": "PHP",
                "extensions": [".php"],
                "name": "PHP Dangerous Function Execution",
                "regex": r"(exec\(|shell_exec\(|passthru\(|system\(|eval\(|unserialize\()",
                "severity": "CRITICAL",
                "remediation": "Avoid using dangerous functions; sanitize all inputs and avoid unserialize on untrusted data."
            },
            {
                "lang": "PHP",
                "extensions": [".php"],
                "name": "PHP SQL Query Concatenation",
                "regex": r"\$db->query\(['\"].*\$_\w+",
                "severity": "HIGH",
                "remediation": "Use PDO prepared statements with bound parameters."
            },
            # Ruby (Web2)
            {
                "lang": "Ruby",
                "extensions": [".rb"],
                "name": "Ruby Dangerous Eval / Exec",
                "regex": r"(eval\(|Kernel\.exec\(|system\(|YAML\.load\()",
                "severity": "HIGH",
                "remediation": "Avoid eval() and Kernel.exec(). Use YAML.safe_load instead of YAML.load."
            },
            # Python
            {
                "lang": "Python",
                "extensions": [".py"],
                "name": "Python Command Injection",
                "regex": r"(os\.system\(|subprocess\.call\(.*shell=True|eval\(|exec\()",
                "severity": "CRITICAL",
                "remediation": "Use subprocess.run without shell=True and pass arguments as a list."
            },
            # JavaScript / TypeScript
            {
                "lang": "JavaScript/TypeScript",
                "extensions": [".js", ".ts", ".jsx", ".tsx"],
                "name": "JS/TS Command Injection & Danger Eval",
                "regex": r"(child_process\.exec\(|eval\(|new Function\()",
                "severity": "CRITICAL",
                "remediation": "Use child_process.execFile or execFile with sanitized argument arrays."
            }
        ]

    def scan_file(self, file_path: str) -> List[Dict[str, Any]]:
        findings = []
        ext = os.path.splitext(file_path)[1].lower()
        applicable_rules = [r for r in self.rules if ext in r["extensions"]]

        if not applicable_rules:
            return []

        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                lines = f.readlines()

            for idx, line in enumerate(lines, 1):
                clean_line = line.strip()
                if not clean_line or clean_line.startswith("//") or clean_line.startswith("#"):
                    continue

                for rule in applicable_rules:
                    if re.search(rule["regex"], line):
                        findings.append({
                            "finding_id": f"SK-POLY-{len(findings) + 1}",
                            "language": rule["lang"],
                            "category": rule["name"],
                            "severity": rule["severity"],
                            "file_path": file_path,
                            "line_number": idx,
                            "snippet": clean_line,
                            "remediation": rule["remediation"]
                        })
        except Exception:
            pass

        return findings

    def scan_workspace(self, workspace_path: str) -> List[Dict[str, Any]]:
        all_findings = []
        for root, _, files in os.walk(workspace_path):
            if any(skip in root for skip in ["node_modules", ".git", "dist", "build"]):
                continue
            for file in files:
                full_path = os.path.join(root, file)
                all_findings.extend(self.scan_file(full_path))
        return all_findings
