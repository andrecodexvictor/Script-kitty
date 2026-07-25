import os
import json
import re
from typing import Dict, Any, List

class SystemArchitectureAuditor:
    """Complex System Architecture & Configuration Auditor.
    Audits Dockerfiles, Kubernetes manifests, CI/CD pipelines (GitHub Actions),
    and Terraform/IaC templates for high-impact misconfigurations.
    """

    def __init__(self):
        self.iac_rules = [
            {
                "id": "SK-ARCH-01",
                "target": "Dockerfile",
                "name": "Container Running as Root User",
                "regex": r"^USER\s+root",
                "severity": "HIGH",
                "remediation": "Specify a non-root USER in Dockerfile to restrict container execution privileges."
            },
            {
                "id": "SK-ARCH-02",
                "target": "Dockerfile",
                "name": "Base Image Missing Pinned Hash/Tag",
                "regex": r"^FROM\s+[a-zA-Z0-9_-]+:latest",
                "severity": "MEDIUM",
                "remediation": "Pin base image versions using specific tags or SHA-256 digest hashes."
            },
            {
                "id": "SK-ARCH-03",
                "target": "Kubernetes / Manifest",
                "name": "Privileged Container Escalation Allowed",
                "regex": r"privileged:\s*true",
                "severity": "CRITICAL",
                "remediation": "Set privileged: false and enforce allowPrivilegeEscalation: false in SecurityContext."
            },
            {
                "id": "SK-ARCH-04",
                "target": "GitHub Actions Workflow",
                "name": "Insecure Pull Request Trigger (pull_request_target)",
                "regex": r"on:\s*pull_request_target",
                "severity": "HIGH",
                "remediation": "Avoid checking out untrusted PR code in pull_request_target workflows to prevent PWN request injections."
            },
            {
                "id": "SK-ARCH-05",
                "target": "Terraform / IaC",
                "name": "Overly Permissive Ingress (0.0.0.0/0 on Port 22/3389)",
                "regex": r"cidr_blocks\s*=\s*\[\s*['\"]0\.0\.0\.0/0['\"]\s*\]",
                "severity": "HIGH",
                "remediation": "Restrict administrative port access (SSH/RDP) to specific corporate IP ranges."
            }
        ]

    def audit_architecture_configs(self, workspace_path: str = ".") -> List[Dict[str, Any]]:
        findings = []
        abs_path = os.path.abspath(workspace_path)

        for root, _, files in os.walk(abs_path):
            if any(skip in root for skip in ["node_modules", ".git", "dist", "build"]):
                continue

            for file in files:
                if file.startswith("Dockerfile") or file.endswith((".yaml", ".yml", ".tf", ".json")):
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, abs_path)

                    try:
                        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                            lines = f.readlines()

                        for idx, line in enumerate(lines, 1):
                            clean_line = line.strip()
                            if not clean_line or clean_line.startswith(("#", "//")):
                                continue

                            for rule in self.iac_rules:
                                if re.search(rule["regex"], line, re.IGNORECASE):
                                    findings.append({
                                        "finding_id": rule["id"],
                                        "category": rule["name"],
                                        "target_type": rule["target"],
                                        "severity": rule["severity"],
                                        "file_path": rel_path,
                                        "line_number": idx,
                                        "snippet": clean_line[:120],
                                        "remediation": rule["remediation"]
                                    })
                    except Exception:
                        pass

        return findings
