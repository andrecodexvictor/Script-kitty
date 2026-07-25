import os
import sys
import json
from typing import Dict, Any, List

current_dir = os.path.dirname(os.path.abspath(__file__))
pkg_root = os.path.abspath(os.path.join(current_dir, "..", ".."))

sys.path.insert(0, os.path.join(pkg_root, "scanners"))
sys.path.insert(0, os.path.join(pkg_root, "validators"))

from script_kitty_scanners.polyglot_sast import PolyglotSASTScanner
from script_kitty_scanners.secrets import SecretScanner

class Web3SecurityHarness:
    """Enterprise Web3 Agent Harness for Script Kitty.
    Orchestrates Solidity (.sol) smart contract auditing, reentrancy detection,
    tx.origin access control risks, and weak randomness verification.
    """

    def __init__(self, target_path: str = "."):
        self.target_path = os.path.abspath(target_path)
        self.polyglot_sast = PolyglotSASTScanner()
        self.secret_scanner = SecretScanner()

    def run_web3_harness(self) -> Dict[str, Any]:
        print("\n[Web3 Harness] Executing Web3 Smart Contract Audit Pipeline...")

        # 1. Solidity Smart Contract SAST
        all_sast = self.polyglot_sast.scan_workspace(self.target_path)
        solidity_findings = [f for f in all_sast if f.get("language") == "Solidity"]
        print(f"   -> Solidity SAST: Discovered {len(solidity_findings)} smart contract vulnerabilities.")

        # 2. Secret Leaks in Deployment Configs
        secret_findings = self.secret_scanner.scan_directory(self.target_path)
        web3_secrets = [f for f in secret_findings if "MNEMONIC" in f.get("description", "").upper() or "PRIVATE_KEY" in f.get("description", "").upper()]
        print(f"   -> Web3 Secret Scanner: Discovered {len(web3_secrets)} exposed private key / mnemonic leaks.")

        total = solidity_findings + web3_secrets
        return {
            "harness": "WEB3",
            "status": "COMPLETED",
            "workspace": self.target_path,
            "total_findings": len(total),
            "findings": total
        }

if __name__ == "__main__":
    harness = Web3SecurityHarness()
    report = harness.run_web3_harness()
    print(json.dumps(report, indent=2))
