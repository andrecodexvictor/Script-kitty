<p align="center">
  <img src="assets/cli_preview.jpg" alt="Script Kitty - Your Patch Cat Terminal" width="750" />
</p>

<h1 align="center">Script Kitty 🐱🛡️</h1>

<p align="center">
  <strong>Your Patch Cat — Self-Hosted Enterprise Security Validation & AI Remediation Platform</strong>
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

**Script Kitty** is an enterprise-grade, self-hosted platform for authorized security validation, static code vulnerability analysis (SAST), secret leak detection, HTTP security header evaluation, and AI LLM guardrail testing.

---

## ✨ Features & Capabilities

- **🚀 One-Word Global CLI (`sk` / `script-kitty`)**: Run `sk` without arguments to launch the interactive arrow-key TUI menu.
- **🎮 Interactive TUI Menu & Checkbox Suite Selector**: Use setas (`⬆️/⬇️`) e barra de espaço para selecionar exatamente quais suítes de auditoria executar.
- **💬 Direct Agent Conversation (`sk` Chat)**: Conversação direta em linguagem natural com o Agente Detetive (exige login/chave de IA ativa).
- **🔑 Multi-Provider AI Key Manager & Codex Login**: Suporte nativo a OpenAI (GPT-4o), Google Gemini, NVIDIA NIM, OpenRouter, Anthropic Claude, xAI Grok e Token de Assinatura ChatGPT Codex.
- **🤖 AI LLM Guardrail & Anti-Hallucination Engine**: 5 suítes de teste cobrindo injeção de prompt, jailbreaks (DAN mode), chamado inseguro de ferramentas, envenenamento RAG e verificação de alucinação.
- **🔍 Live Real Filesystem SAST Scanner**: Varredura estática ao vivo sem dados mockados. Detecta injeção de comando, SQLi, hashes fracos (MD5/SHA1), path traversal e segredos vazados.
- **🌐 Internationalization (i18n)**: Suporte total a Inglês (`en` padrão), Português (`pt`) e Espanhol (`es`).
- **⛓️ SHA-256 Merkle Chain Audit Logger**: Logging criptográfico de auditoria em Rust com exportação de raiz Merkle.

---

## ⚡ Quick Start

```bash
# 1. Install Dependencies
npm install

# 2. Build TypeScript Packages
npm run build

# 3. Link Global CLI Command (Run once)
cd apps/cli && npm link

# 4. Launch Interactive Navigable CLI
sk
```

---

## 💬 AI Provider & ChatGPT Codex Configuration

```bash
# Configure OpenAI Key
sk auth --set-openai sk-... --provider openai

# Authenticate with ChatGPT Codex Subscription Token
sk auth --set-codex-token your_token --provider codex
```

---

## 🤝 Contributing & License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.
