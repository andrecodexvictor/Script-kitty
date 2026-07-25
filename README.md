<p align="center">
  <img src="assets/mascot.png" alt="Script Kitty - Your Patch Cat" width="650" />
</p>

<h1 align="center">Script Kitty 🐱🛡️</h1>

<p align="center">
  <strong>Your Patch Cat — Self-Hosted Authorized Security Validation & Remediation Platform</strong>
</p>

<p align="center">
  <a href="https://github.com/andrecodexvictor/Script-kitty/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License MIT"></a>
  <a href="https://github.com/andrecodexvictor/Script-kitty"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="https://github.com/andrecodexvictor/dotstack"><img src="https://img.shields.io/badge/Context-.dotstack-blue" alt="dotstack"></a>
  <a href="https://github.com/andrecodexvictor/dotarchiteture"><img src="https://img.shields.io/badge/Architecture-.dotarchitecture-purple" alt="dotarchitecture"></a>
  <a href="https://github.com/vinilana/dotcontext"><img src="https://img.shields.io/badge/Harness-.dotcontext-orange" alt="dotcontext"></a>
  <a href="https://modelcontextprotocol.io"><img src="https://img.shields.io/badge/MCP-Supported-emerald" alt="MCP Supported"></a>
</p>

---

## 📖 Overview

**Script Kitty** is an open-source, self-hosted platform for authorized security validation, remediation guidance, and regression testing across modern web applications and AI-enabled software systems.

Combining a playful mascot identity with a rigorous operational model, Script Kitty focuses on vulnerability management, secure agent tooling, zero-trust policies, and cryptographically verified audit workflows.

Unlike offensive intrusion frameworks, Script Kitty operates exclusively as a **Defensive Security Agent**. It helps engineering teams move rapidly from discovery to safe verification, patch generation, and proof-of-fix retesting.

---

## ✨ Key Features

- **🔑 Secret & Credential Leak Scanner**: Detects exposed AWS keys, SSH private keys, GitHub PATs, and Slack bot tokens.
- **🌐 HTTP Security Header Evaluator**: Checks HSTS (`Strict-Transport-Security`), CSP, X-Frame-Options, and CORS configurations.
- **🤖 AI LLM Guardrail & Prompt-Injection Validator**: Safely tests AI applications against direct prompt extraction, jailbreaks (DAN mode), and confused deputy tool invocations.
- **🐾 Patch Cat Remediation Playbooks**: Produces step-by-step fix guides, hardening configurations, and copy-pasteable GitHub/GitLab Issues and Pull Requests.
- **⛓️ Tamper-Evident Hash-Chained Audit Engine**: SHA-256 cryptographic logging records every action, target check, and policy decision.
- **🛡️ Zero-Trust Policy Core & Approval Gates**: Enforces target allowlists (`scope.md`) and requires human approval for state-changing actions.
- **📦 Model Context Protocol (MCP) Server**: Integrates seamlessly with Cursor, Claude Code, Windsurf, Copilot, and Gemini AI agents.
- **🔌 Community Plugin SDK**: Extensible Python and TypeScript SDK for loading custom community scanners and validators.

---

## 🏗️ Multi-Language Hybrid Stack

Script Kitty's architecture is declared and governed by `.dotstack`, `.dotarchitecture`, and `.dotcontext`:

```text
                               ┌──────────────────────────────────────────┐
                               │           Script Kitty Dashboard         │
                               │          TypeScript / Vite / CSS         │
                               └────────────────────┬─────────────────────┘
                                                    │
                               ┌────────────────────▼─────────────────────┐
                               │     Orchestrator, CLI & MCP Server       │
                               │               TypeScript                 │
                               └──────────┬────────────────────┬──────────┘
                                          │                    │
                ┌─────────────────────────▼──┐             ┌───▼──────────────────────────┐
                │    Agent PREVC Runtime     │             │    Zero-Trust Policy Core    │
                │ Python (Scanners/Validators)│             │     Rust (Hash Audit Log)    │
                └────────────────────────────┘             └──────────────────────────────┘
```

| Component | Technology | Responsibilities |
|---|---|---|
| **Frontend & UI** | TypeScript, Vite, Vanilla CSS | Sleek cyberpunk defensive dashboard, audit log inspector |
| **CLI & MCP Server** | TypeScript, Commander, MCP SDK | Operator command shell (`script-kitty`) and stdio MCP server |
| **Agent Runtime & Tools** | Python 3.11+, Pydantic | PREVC workflow harness, secret scanner, guardrail validator, plugin SDK |
| **High-Trust Core** | Rust 2021 | Zero-Trust Policy Engine, cryptographic hash-chained audit logger |

---

## 🐾 Operating Modes

| Mode | Purpose | Risk Level | Approval Required |
|---|---|---|---|
| **Scout** | Passive exposure discovery, asset fingerprinting, header checks | Low Risk | No |
| **Verify** | Controlled confirmation of likely findings | Medium Risk | **Yes (Human-in-the-Loop)** |
| **Patch** | Produce actionable remediation playbooks & PR diffs | Low Risk | No |
| **Recheck** | Run regression checks to confirm fix closure | Low Risk | No |
| **Lab** | Aggressive educational testing inside isolated containers/VMs | High Risk | **Yes (Lab Mode Only)** |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.0
- **Python** >= 3.11
- **Rust (Cargo)** >= 1.75 *(Optional for local Rust crate compilation)*

### Installation

```bash
# Clone the repository
git clone https://github.com/andrecodexvictor/Script-kitty.git
cd Script-kitty

# Install monorepo dependencies
npm install

# Build all TypeScript applications
npm run build

# Launch the Developer Dashboard
npm run dev
```

---

## 💻 CLI Usage

```bash
# 1. Run passive discovery scan on authorized target
npx script-kitty scout http://localhost:3000

# 2. Scan codebase for hardcoded credentials & secret leaks
npx script-kitty scan-secrets ./src

# 3. Evaluate HTTP security headers
npx script-kitty scan-headers http://localhost:3000

# 4. Test AI application guardrails against prompt injection
npx script-kitty verify-guardrails http://localhost:3000/api/llm

# 5. Generate Patch Cat remediation playbook
npx script-kitty patch SK-2026-001

# 6. Execute follow-up regression recheck
npx script-kitty recheck http://localhost:3000 SK-2026-001
```

---

## 🔌 Model Context Protocol (MCP) Integration

Script Kitty provides a native stdio MCP Server. Register it in your AI coding assistant:

### Cursor / Windsurf / Claude Code / Copilot Setup

```json
{
  "mcpServers": {
    "script-kitty": {
      "command": "node",
      "args": ["apps/mcp-server/dist/index.js"]
    }
  }
}
```

#### Available MCP Tools
- `scout_target`: Passive discovery scan for open ports & exposed headers.
- `scan_secrets`: Codebase scan for hardcoded credentials & API keys.
- `evaluate_http_headers`: HTTP security header & SSL evaluation.
- `validate_ai_guardrails`: AI LLM prompt-injection & jailbreak testing.
- `verify_finding`: Controlled verification flow with approval gates.
- `generate_patch`: Produces patch playbooks & hardening code.
- `run_recheck`: Regression check runner to confirm fix closure.

---

## 📁 Repository Structure

```text
Script-kitty/
├── .dotstack            # Technology stack specification & runtime bounds
├── .dotarchitecture     # Trust boundaries, permissions matrix & data flows
├── .dotcontext          # Defensive agent identity & PREVC workflow rules
├── scope.md             # Target allowlist & forbidden environments
├── agent-spec.md        # Master agent & subagent specification
├── LICENSE              # MIT License
├── README.md             # Project documentation & mascot artwork
├── apps/
│   ├── ui/              # Vite + Vanilla CSS modern defensive dashboard
│   ├── cli/             # Commander CLI shell (script-kitty)
│   └── mcp-server/      # Model Context Protocol stdio server
├── packages/
│   ├── agent_runtime/   # Python PREVC execution harness
│   ├── scanners/        # Secret, Header & Exposure scanners
│   ├── validators/      # AI Guardrail & prompt injection tester
│   ├── remediation/     # Patch Cat playbook & GitHub Issue/PR generator
│   ├── plugin_sdk/      # Community Plugin SDK loader
│   ├── policies/        # Rust Zero-Trust Policy Engine
│   └── audit/           # Rust SHA-256 Hash-Chained Audit Logger
└── docs/                # Architecture docs, PRD, and specifications
```

---

## 🔒 Security & OWASP Compliance

Script Kitty strictly adheres to OWASP guidelines for AI Agents and Model Context Protocol:
- **Mandatory Scope Allowlist (`scope.md`)**: Actions stop immediately if a target IP/domain is not declared in scope.
- **Input & Tool Distrust**: Tool outputs and external model completions are treated as untrusted data.
- **Human-in-the-Loop Approval Gates**: State-changing operations pause for operator confirmation.
- **Tamper-Evident Audit Logging**: Cryptographic SHA-256 hash chains guarantee auditable records.

---

## 🤝 Contributing & License

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and respect `scope.md` safety boundaries.

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/andrecodexvictor">André Victor A. O. Santos</a> & the Open Source Security Community.
</p>
