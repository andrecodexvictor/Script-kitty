import os
import json
import time
from typing import Dict, Any, List, Optional

class KnowledgeGraphNode:
    def __init__(self, node_id: str, label: str, node_type: str, properties: Optional[Dict[str, Any]] = None):
        self.node_id = node_id
        self.label = label
        self.node_type = node_type  # e.g., "File", "Module", "Vulnerability", "SecurityPolicy"
        self.properties = properties or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.node_id,
            "label": self.label,
            "type": self.node_type,
            "properties": self.properties
        }

class KnowledgeGraphEdge:
    def __init__(self, source_id: str, target_id: str, relation: str, weight: float = 1.0):
        self.source_id = source_id
        self.target_id = target_id
        self.relation = relation  # e.g., "CONTAINS", "DEPENDS_ON", "HAS_VULNERABILITY", "APPLIES_FIX"
        self.weight = weight

    def to_dict(self) -> Dict[str, Any]:
        return {
            "source": self.source_id,
            "target": self.target_id,
            "relation": self.relation,
            "weight": self.weight
        }

class PersistentKnowledgeGraphMemory:
    """Persistent Knowledge Graph & LangGraph State Memory for Script Kitty Agent.
    Generates and persists an architectural graph representation of the target codebase,
    enabling stateful multi-step reasoning, node relations, and memory graph traversal.
    """

    def __init__(self, workspace_path: str = "."):
        self.workspace_path = os.path.abspath(workspace_path)
        self.kg_dir = os.path.join(self.workspace_path, ".context", "graph")
        self.kg_file = os.path.join(self.kg_dir, "knowledge_graph.json")
        self.nodes: Dict[str, KnowledgeGraphNode] = {}
        self.edges: List[KnowledgeGraphEdge] = []
        self._initialize_graph()

    def _initialize_graph(self):
        os.makedirs(self.kg_dir, exist_ok=True)
        if os.path.exists(self.kg_file):
            self.load_graph()
        else:
            self.build_initial_workspace_graph()

    def add_node(self, node_id: str, label: str, node_type: str, properties: Optional[Dict[str, Any]] = None):
        self.nodes[node_id] = KnowledgeGraphNode(node_id, label, node_type, properties)

    def add_edge(self, source_id: str, target_id: str, relation: str, weight: float = 1.0):
        self.edges.append(KnowledgeGraphEdge(source_id, target_id, relation, weight))

    def build_initial_workspace_graph(self):
        """Scans workspace on installation/first run and builds a persistent knowledge graph."""
        root_node_id = f"workspace::{os.path.basename(self.workspace_path)}"
        self.add_node(root_node_id, os.path.basename(self.workspace_path), "WorkspaceRoot", {"path": self.workspace_path})

        for root, dirs, files in os.walk(self.workspace_path):
            if any(skip in root for skip in ["node_modules", ".git", "dist", "build"]):
                continue

            rel_root = os.path.relpath(root, self.workspace_path)
            folder_node_id = f"folder::{rel_root}"
            if rel_root != ".":
                self.add_node(folder_node_id, rel_root, "Directory", {"path": rel_root})
                self.add_edge(root_node_id, folder_node_id, "CONTAINS_DIR")

            for f in files:
                if f.endswith((".py", ".js", ".ts", ".rs", ".sol", ".json", ".md")):
                    file_path = os.path.join(rel_root, f)
                    file_node_id = f"file::{file_path}"
                    self.add_node(file_node_id, f, "SourceFile", {"rel_path": file_path, "ext": os.path.splitext(f)[1]})
                    parent_id = folder_node_id if rel_root != "." else root_node_id
                    self.add_edge(parent_id, file_node_id, "CONTAINS_FILE")

        self.save_graph()

    def save_graph(self):
        graph_data = {
            "version": "1.0.0",
            "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "workspace": self.workspace_path,
            "nodes": [n.to_dict() for n in self.nodes.values()],
            "edges": [e.to_dict() for e in self.edges]
        }
        with open(self.kg_file, "w", encoding="utf-8") as f:
            json.dump(graph_data, f, indent=2)

    def load_graph(self):
        try:
            with open(self.kg_file, "r", encoding="utf-8") as f:
                data = json.load(f)

            self.nodes = {
                n["id"]: KnowledgeGraphNode(n["id"], n["label"], n["type"], n.get("properties", {}))
                for n in data.get("nodes", [])
            }
            self.edges = [
                KnowledgeGraphEdge(e["source"], e["target"], e["relation"], e.get("weight", 1.0))
                for e in data.get("edges", [])
            ]
        except Exception:
            self.build_initial_workspace_graph()

    def get_langgraph_state(self) -> Dict[str, Any]:
        """Exports graph state formatted for LangGraph state machine node transitions."""
        return {
            "graph_nodes_count": len(self.nodes),
            "graph_edges_count": len(self.edges),
            "root_nodes": [n.node_id for n in self.nodes.values() if n.node_type == "WorkspaceRoot"],
            "vulnerability_nodes": [n.node_id for n in self.nodes.values() if n.node_type == "Vulnerability"]
        }

if __name__ == "__main__":
    kg_mem = PersistentKnowledgeGraphMemory()
    print(f"[*] Persistent Knowledge Graph created at: {kg_mem.kg_file}")
    print(json.dumps(kg_mem.get_langgraph_state(), indent=2))
