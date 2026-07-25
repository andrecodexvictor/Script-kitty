import os
import json
import time
from typing import Dict, Any, List

class SelfLearningAgentMemory:
    """Self-Learning Repository Knowledge Base & Adaptive Memory for Script Kitty Agent.
    Persists codebase structural insights, frequent vulnerability patterns,
    and user corrections across sessions into .context/runtime/memory.json.
    """

    def __init__(self, workspace_path: str = "."):
        self.workspace_path = os.path.abspath(workspace_path)
        self.memory_dir = os.path.join(self.workspace_path, ".context", "runtime")
        self.memory_file = os.path.join(self.memory_dir, "memory.json")
        self._ensure_memory_file()

    def _ensure_memory_file(self):
        os.makedirs(self.memory_dir, exist_ok=True)
        if not os.path.exists(self.memory_file):
            initial_data = {
                "workspace": self.workspace_path,
                "first_analyzed": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "sessions_count": 0,
                "learned_patterns": [],
                "learned_custom_rules": [],
                "user_preferences": {}
            }
            with open(self.memory_file, "w", encoding="utf-8") as f:
                json.dump(initial_data, f, indent=2)

    def load_memory(self) -> Dict[str, Any]:
        try:
            with open(self.memory_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {"learned_patterns": []}

    def record_learning(self, pattern_category: str, file_path: str, context_notes: str) -> Dict[str, Any]:
        """Records a learned pattern from user interaction or codebase navigation."""
        memory = self.load_memory()
        memory["sessions_count"] = memory.get("sessions_count", 0) + 1
        memory["last_updated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

        new_entry = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "category": pattern_category,
            "file_path": file_path,
            "notes": context_notes
        }
        memory["learned_patterns"].append(new_entry)

        with open(self.memory_file, "w", encoding="utf-8") as f:
            json.dump(memory, f, indent=2)

        return memory
