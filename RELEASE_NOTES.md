# Release Notes & Changelog - Script Kitty v1.0.0 🐱🛡️

All notable changes, security modules, and architectural enhancements to Script Kitty are documented in this file.

---

## 🚀 [v1.0.0] - 2026-07-25 - Enterprise Defensive Agent & Harness Release

### 🌟 Highlights
- **One-Word Global CLI (`sk` / `script-kitty`)**: Interactive TUI terminal interface with arrow-key navigation (`⬆️/⬇️`), single-render block art banner, and Spacebar feature suite toggle.
- **Direct Agent Chat (`sk chat`)**: Conversational natural language chat with Detective Patch Cat requiring authenticated AI provider or ChatGPT Codex login.
- **Multi-Provider AI Key & Codex Manager**: Unified credential manager for OpenAI, Google Gemini, NVIDIA NIM, OpenRouter, Anthropic Claude, xAI Grok, and ChatGPT Codex Subscription Tokens.
- **Harness Engineering Runtime**: Token-budgeted continuous audit loops inspired by Martin Fowler's Harness Engineering principles.
- **Web2 & Web3 Security Harnesses**: Multi-language SAST covering Solidity (`.sol`), PHP, Ruby, Python, JavaScript/TypeScript, Go, and Rust.
- **AI LLM Guardrail & Anti-Hallucination Engine**: 5 defensive test suites verifying prompt extraction, DAN jailbreaks, confused deputy tool calls, RAG context poisoning, and factual grounding.
- **Database & Authentication Security Auditor**: Detection of exposed DB connection strings, default admin credentials, SQL injection SAST, and unhashed passwords.
- **Cryptographic & IaC Auditors**: Static checks for weak hashing (MD5/SHA1), DES/RC4 ciphers, insecure PRNGs, Docker root users, and Terraform ingress risks.
- **Dependency Supply-Chain Auditor**: Package manifest scanning for known vulnerable dependency versions and insecure HTTP registries.

---

## 📦 Package Architecture & Monorepo Components

| Package / App | Path | Description |
|---|---|---|
| `@script-kitty/cli` | `apps/cli` | Commander CLI shell, interactive TUI, and i18n engine |
| `@script-kitty/ui` | `apps/ui` | Cyberpunk defensive web dashboard & i18n selector |
| `@script-kitty/mcp-server` | `apps/mcp-server` | Model Context Protocol stdio server for Claude/Cursor |
| `script-kitty-agent` | `packages/agent_runtime` | Web2/Web3 harnesses, modular harness engine, PREVC runtime |
| `script-kitty-scanners` | `packages/scanners` | SAST, secret leak, HTTP header, DB/Auth, IaC & crypto auditors |
| `script-kitty-validators` | `packages/validators` | AI Guardrail & Anti-Hallucination verification suite |
| `script-kitty-policies` | `packages/policies` | Rust Zero-Trust policy engine & cryptographic crypto auditor |
| `script-kitty-audit` | `packages/audit` | Rust SHA-256 Merkle tree hash-chained audit logger |

---

## 🔒 Security & Scope Controls
- **Mandatory Scope Allowlist (`scope.md`)**: Enforces target allowlisting before running any audit pass.
- **Zero-Trust Tool Isolation**: All model completions and external inputs treated as untrusted data.
- **Tamper-Evident SHA-256 Merkle Chain**: Cryptographic audit records log every check and decision.
