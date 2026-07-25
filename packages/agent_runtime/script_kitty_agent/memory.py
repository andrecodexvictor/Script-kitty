import os
import json
import hashlib
from datetime import datetime
from typing import List, Dict, Any

class AgentContinuousMemory:
    """Continuous learning and experience memory store for Script Kitty."""

    def __init__(self, workspace_root: str):
        self.memory_dir = os.path.join(workspace_root, ".context", "runtime")
        os.makedirs(self.memory_dir, exist_ok=True)
        self.memory_file = os.path.join(self.memory_dir, "memory.json")
        self.experiences: List[Dict[str, Any]] = self._load_memory()

    def _load_memory(self) -> List[Dict[str, Any]]:
        if os.path.exists(self.memory_file):
            try:
                with open(self.memory_file, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return []
        return []

    def _save_memory(self):
        with open(self.memory_file, "w", encoding="utf-8") as f:
            json.dump(self.experiences, f, indent=2)

    def record_experience(self, finding: Dict[str, Any]) -> Dict[str, Any]:
        category = finding.get("category", "Unknown")
        evidence = finding.get("evidence", "")
        
        pattern_hash = hashlib.sha256(f"{category}:{evidence[:50]}".encode()).hexdigest()

        # Search for past occurrences of this finding pattern
        existing_matches = [exp for exp in self.experiences if exp.get("pattern_hash") == pattern_hash]
        occurrence_count = len(existing_matches) + 1

        new_exp = {
            "id": f"EXP-{len(self.experiences)+1:04d}",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "category": category,
            "pattern_hash": pattern_hash,
            "evidence_snippet": evidence[:100],
            "occurrence_count": occurrence_count,
            "remediation_applied": finding.get("remediation", "")
        }

        self.experiences.append(new_exp)
        self._save_memory()

        # If pattern detected multiple times, suggest PR/Issue contribution
        should_suggest_contribution = occurrence_count >= 2

        contribution_suggestion = None
        if should_suggest_contribution:
            contribution_suggestion = {
                "title": f"🚀 Script Kitty Self-Learning Suggestion: Create Community Rule for {category}",
                "reason": f"Script Kitty has encountered and resolved this pattern ({category}) {occurrence_count} times.",
                "suggested_action": "Submit a Pull Request to script-kitty/packages/scanners or create an Issue to add a permanent automated detector rule.",
                "pr_template_url": "https://github.com/andrecodexvictor/Script-kitty/compare",
                "issue_template_url": "https://github.com/andrecodexvictor/Script-kitty/issues/new"
            }

        return {
            "recorded": True,
            "occurrence_count": occurrence_count,
            "contribution_suggestion": contribution_suggestion
        }

if __name__ == "__main__":
    mem = AgentContinuousMemory(os.getcwd())
    res = mem.record_experience({
        "category": "Exposed Config / Insecure Auth",
        "evidence": "Strict-Transport-Security missing on http://localhost:3000",
        "remediation": "Enforce HSTS headers"
    })
    print(json.dumps(res, indent=2))
