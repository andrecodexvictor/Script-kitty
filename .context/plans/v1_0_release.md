---
title: Script Kitty v1.0 Production Release Plan
harness: dotcontext
workflow: PREVC
required_sensors:
  - tests-passing
  - typecheck-clean
  - scope-enforced
required_artifacts:
  - apps/ui/dist/index.html
  - scope.md
  - .dotstack
  - .dotarchitecture
  - .dotcontext
---

# Script Kitty v1.0 Production Release Plan

## Stage 1: Plan & Scope (P)
- [x] Create `.dotstack`, `.dotarchitecture`, and `.dotcontext`
- [x] Standardize `scope.md` and `agent-spec.md`

## Stage 2: Research & Design (R)
- [x] Analyze OWASP guidelines for AI agents and Model Context Protocol
- [x] Mapped multi-language stack (TypeScript, Python, Rust)

## Stage 3: Execute Implementation (E)
- [x] Build Rust Zero-Trust Policy Engine (`packages/policies`)
- [x] Build Rust Hash-Chained Audit Logger (`packages/audit`)
- [x] Build Python Agent PREVC Runtime (`packages/agent_runtime`)
- [x] Build Python Secret, Header & Guardrail Scanners (`packages/scanners`, `packages/validators`)
- [x] Build Python Community Plugin SDK (`packages/plugin_sdk`)
- [x] Build GitHub Issue & PR Suggestion Exporter (`packages/remediation`)
- [x] Build TypeScript CLI Shell (`apps/cli`)
- [x] Build TypeScript MCP Server (`apps/mcp-server`)
- [x] Build Vite Defensive Web Dashboard (`apps/ui`)

## Stage 4: Verify Evidence (V)
- [x] Run Vite production bundle build (`npm run build`)
- [x] Run Python agent PREVC workflow validation
- [x] Audit hash chain integrity check

## Stage 5: Complete & Release (C)
- [x] Package v1.0 release artifacts and documentation
