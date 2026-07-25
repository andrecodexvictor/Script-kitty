import os
import json
import time
from typing import Dict, Any, List

class ZenPRIntegrationBridge:
    """ZenPR & Script Kitty Native Integration Bridge.
    Connects Script Kitty vulnerability findings and Patch Cat remediation playbooks
    directly into ZenPR (https://github.com/andrecodexvictor/ZenPR) for automated
    defensive Pull Request generation and code review.
    """

    def __init__(self, zenpr_repo_url: str = "https://github.com/andrecodexvictor/ZenPR"):
        self.zenpr_repo_url = zenpr_repo_url

    def format_finding_for_zenpr(self, finding: Dict[str, Any]) -> Dict[str, Any]:
        """Converts a Script Kitty security finding into a ZenPR automated PR payload."""
        severity = finding.get("severity", "MEDIUM")
        cat = finding.get("category", "Code Defect")
        file_path = finding.get("file_path", finding.get("file", "unknown"))
        line = finding.get("line_number", finding.get("line", 0))

        pr_title = f"security(sk-patch): Fix {cat} in {os.path.basename(file_path)}"
        pr_body = (
            f"## 🐱🛡️ Script Kitty x ZenPR Automated Security Fix\n\n"
            f"**Finding ID**: `{finding.get('finding_id', 'SK-GEN')}`\n"
            f"**Severity**: `{severity}`\n"
            f"**Target File**: `{file_path}:{line}`\n\n"
            f"### 🔎 Detected Snippet\n"
            f"```\n{finding.get('snippet', '')}\n```\n\n"
            f"### 💡 Remediation Strategy\n"
            f"{finding.get('remediation', 'Apply input sanitization and secure parameter binding.')}\n\n"
            f"---\n"
            f"*Generated automatically by Script Kitty Agent Bridge & ZenPR Pipeline.*"
        )

        return {
            "zenpr_action": "CREATE_PULL_REQUEST",
            "branch_name": f"sk-patch-{finding.get('finding_id', 'bug').lower()}",
            "title": pr_title,
            "body": pr_body,
            "target_file": file_path,
            "status": "READY_FOR_ZENPR_DISPATCH"
        }

    def dispatch_batch_to_zenpr(self, findings: List[Dict[str, Any]]) -> Dict[str, Any]:
        payloads = [self.format_finding_for_zenpr(f) for f in findings]
        return {
            "bridge": "ScriptKitty-ZenPR-Native",
            "zenpr_repo": self.zenpr_repo_url,
            "total_prs_prepared": len(payloads),
            "payloads": payloads
        }
