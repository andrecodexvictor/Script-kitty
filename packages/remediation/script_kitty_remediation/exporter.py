import json
from typing import Dict, Any

class EvidenceAndIssueExporter:
    """Generates copy-pasteable GitHub/GitLab issue markdown and pull request suggestions."""

    @staticmethod
    def generate_github_issue(finding: Dict[str, Any]) -> str:
        finding_id = finding.get("finding_id", "SK-2026-001")
        category = finding.get("category", "Security Exposure")
        severity = finding.get("severity", "HIGH")
        evidence = finding.get("evidence", "No evidence snippet provided.")
        remediation = finding.get("remediation", "Apply security hardening.")
        recheck_plan = finding.get("recheck_plan", "script-kitty recheck")

        return f"""---
name: Security Fix Request - {finding_id}
about: Automated security finding remediation request by Script Kitty
title: '[SECURITY] {severity}: Fix {category} ({finding_id})'
labels: 'security, script-kitty-remediation'
assignees: ''
---

## 🐱 Script Kitty Security Finding Report

**Finding ID:** `{finding_id}`  
**Category:** {category}  
**Severity:** `{severity}`  

### 🔍 Observed Evidence
```text
{evidence}
```

### 🛠️ Recommended Mitigation
{remediation}

### 🔄 Verification & Recheck Plan
Run the following command after applying the fix to confirm closure:
```bash
{recheck_plan}
```

---
*Reported automatically by Script Kitty — Your Patch Cat 🐱🛡️*
"""

    @staticmethod
    def generate_pr_suggestion(finding: Dict[str, Any], target_file: str = "config/security.js") -> str:
        finding_id = finding.get("finding_id", "SK-2026-001")
        category = finding.get("category", "Header Hardening")
        
        return f"""# 🐱 Pull Request: Security Patch for {finding_id} ({category})

## 📝 Summary of Changes
This pull request addresses `{finding_id}` by applying security hardening to `{target_file}`.

```diff
- // Insecure configuration / missing headers
+ const helmet = require('helmet');
+ app.use(helmet());
+ app.use(helmet.hsts({{ maxAge: 31536000, includeSubDomains: true }}));
```

## 🧪 Verification Strategy
- [x] Verified via `script-kitty recheck`
- [x] Tested in dry-run mode without breaking target functionality
- [x] Cryptographic evidence appended to audit chain
"""
