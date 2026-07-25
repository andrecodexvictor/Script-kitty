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

## 💻 CLI Terminal Preview

<p align="center">
  <img src="assets/cli_preview.jpg" alt="Script Kitty ANSI Art Detective Cat CLI Terminal" width="800" />
</p>

---

## 📖 Overview

**Script Kitty** is an open-source, self-hosted platform for authorized security validation, remediation guidance, and regression testing across modern web applications and AI-enabled software systems.

Combining a playful mascot identity with a rigorous operational model, Script Kitty focuses on vulnerability management, secure agent tooling, zero-trust policies, and cryptographically verified audit workflows.

---

## ✨ Key Features

- **🔑 Secret & Credential Leak Scanner**: Detects exposed AWS keys, SSH private keys, GitHub PATs, and Slack bot tokens.
- **🌐 HTTP Security Header Evaluator**: Checks HSTS (`Strict-Transport-Security`), CSP, X-Frame-Options, and CORS configurations.
- **🤖 AI LLM Guardrail & Prompt-Injection Validator**: Safely tests AI applications against direct prompt extraction, jailbreaks (DAN mode), and confused deputy tool invocations.
- **🐾 Patch Cat Remediation Playbooks**: Produces step-by-step fix guides, hardening configurations, and copy-pasteable GitHub/GitLab Issues and Pull Requests.
- **⛓️ Tamper-Evident Hash-Chained Audit Engine**: SHA-256 cryptographic logging with Merkle Root export records every action and policy decision.
- **🛡️ Zero-Trust Policy Core & Approval Gates**: Enforces target allowlists (`scope.md`) and requires human approval for state-changing actions.
- **📦 Model Context Protocol (MCP) Server**: Integrates seamlessly with Claude Code, Grok Build, OpenCode, Antigravity, Codex, Cursor, Windsurf, and Copilot.

---

## 🔌 One-Command MCP Installations (AI Agent CLIs & IDEs)

Script Kitty's stdio MCP server can be installed into all major AI coding agents with a single command:

### Automatic Installation via MCP CLI

```bash
# Register Script Kitty MCP Server in all detected agents on your system
npx -y script-kitty mcp install all
```

### Direct AI Agent CLI Setup

#### 1. Claude Code CLI
```bash
npx script-kitty mcp install claude
```

#### 2. Grok Build CLI
```bash
npx script-kitty mcp install grok
```

#### 3. OpenCode CLI
```bash
npx script-kitty mcp install opencode
```

#### 4. Google Antigravity Agent
```bash
npx script-kitty mcp install antigravity
```

#### 5. Codex CLI
```bash
npx script-kitty mcp install codex
```

#### 6. Cursor IDE & Windsurf Editor
```bash
npx script-kitty mcp install cursor
npx script-kitty mcp install windsurf
```

---

## 🤖 Automated Security Bot Deployment

Deploy Script Kitty as a self-hosted background security monitoring bot in Docker:

### Linux / macOS Deployment
```bash
chmod +x scripts/deploy-bot.sh
./scripts/deploy-bot.sh
```

### Windows PowerShell Deployment
```powershell
.\scripts\deploy-bot.ps1
```

### Docker Compose
```bash
docker-compose up -d
```

---

## 💻 CLI Commands

```bash
# 1. Execute full enterprise security audit (SAST, Secrets, Headers, AI Guardrails)
npx script-kitty audit

# 2. Run passive discovery scan on authorized target
npx script-kitty scout http://localhost:3000

# 3. Scan codebase for hardcoded credentials & secret leaks
npx script-kitty scan-secrets ./src

# 4. Evaluate HTTP security headers
npx script-kitty scan-headers http://localhost:3000

# 5. Test AI application guardrails against prompt injection
npx script-kitty verify-guardrails http://localhost:3000/api/llm

# 6. Generate Patch Cat remediation playbook
npx script-kitty patch SK-2026-001

# 7. Execute follow-up regression recheck
npx script-kitty recheck http://localhost:3000 SK-2026-001
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
