from typing import Dict, Any, List

class PatchCatRemediationEngine:
    """Generates structured patch playbooks, code fixes, and hardening configurations."""

    @staticmethod
    def generate_playbook(finding: Dict[str, Any]) -> Dict[str, Any]:
        category = finding.get("category", "General Hardening")
        finding_id = finding.get("finding_id", "SK-PATCH-001")

        playbooks = {
            "Hardcoded Secret / Credential Leak": {
                "title": "Credential Rotation & Environment Variable Migration",
                "steps": [
                    "1. Immediately revoke and rotate the exposed API key or credential.",
                    "2. Remove hardcoded strings from git history using BFG Repo-Cleaner or git-filter-repo.",
                    "3. Load credentials dynamically via `process.env.SECRET` (Node) or `os.environ.get()` (Python).",
                    "4. Add `.env` to `.gitignore`."
                ],
                "code_sample_node": "const apiKey = process.env.API_KEY || throw new Error('API_KEY missing');",
                "code_sample_python": "import os\napi_key = os.environ.get('API_KEY')"
            },
            "Insecure HTTP Headers": {
                "title": "HTTP Security Header Hardening",
                "steps": [
                    "1. Install `helmet` for Express/Node.js or configure Nginx response headers.",
                    "2. Enforce HSTS (Strict-Transport-Security) with max-age=31536000.",
                    "3. Set X-Frame-Options to DENY to prevent Clickjacking."
                ],
                "code_sample_node": "import helmet from 'helmet';\napp.use(helmet());"
            },
            "Safety Guardrail Bypass": {
                "title": "LLM System Prompt & Tool Isolation Hardening",
                "steps": [
                    "1. Wrap user prompts in explicit untrusted data tags `<untrusted_user_input>`.",
                    "2. Implement output screening before passing LLM completions to tool execution engines.",
                    "3. Require explicit operator approval for high-risk or state-changing tools."
                ]
            }
        }

        selected = playbooks.get(category, {
            "title": f"General Remediation Playbook for {category}",
            "steps": [
                "1. Apply least privilege access control.",
                "2. Validate all inputs against schema boundaries.",
                "3. Re-run script-kitty recheck to verify closure."
            ]
        })

        return {
            "finding_id": finding_id,
            "category": category,
            "playbook": selected,
            "recheck_command": f"script-kitty recheck {finding.get('target', 'http://localhost:3000')} {finding_id}"
        }
