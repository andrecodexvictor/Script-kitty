# Script Kitty PRD

## Overview

Script Kitty is a proposed open-source, self-hosted platform for authorized security validation, remediation guidance, and regression testing across software systems of different sizes. The concept combines a playful cat mascot and brand voice with a serious operational model focused on vulnerability management, secure agent tooling, and auditable remediation workflows.[cite:28][cite:3][cite:17]

The product is best positioned as a defensive platform rather than an offensive bot. OWASP vulnerability management guidance emphasizes repeatable cycles of discovery, verification, prioritization, remediation, and follow-up, which aligns well with a system that helps teams find real exposures and fix them with evidence.[cite:28][cite:26]

## Product Positioning

### Brand

**Name:** Script Kitty  
**Tagline:** Your Patch Cat

The brand can stay playful without sounding reckless if the public positioning emphasizes authorized testing, self-hosting, and remediation. A mascot-driven identity may help the project stand out in the open-source ecosystem, but the surrounding copy should avoid language that glorifies indiscriminate intrusion or destructive behavior.[cite:17][cite:3]

### Positioning Statement

Script Kitty is an open-source, self-hosted security validation and remediation platform for authorized environments. It helps teams discover exposures, safely verify impact, generate mitigation guidance, and re-test fixes through auditable workflows.[cite:28][cite:26][cite:3]

### Core Value Proposition

- Detect likely vulnerabilities and insecure configurations in scoped environments.[cite:28]
- Confirm whether findings are real through controlled validation rather than raw alert generation alone.[cite:28][cite:26]
- Produce remediation playbooks, hardening guidance, and retest steps that engineering teams can act on quickly.[cite:28]
- Support agent-based and MCP-based workflows with security controls such as least privilege, approval gates, and output distrust.[cite:3][cite:17][cite:27]

## Problem

Many teams can run scanners, but smaller teams often struggle to connect findings to practical mitigation, prioritization, and regression testing. OWASP guidance frames vulnerability management as an operational discipline, not a one-time scan, which means tools that stop at detection leave substantial work unfinished.[cite:28][cite:26]

This gap is even larger in AI-enabled software and agentic systems, where prompt injection, tool misuse, context poisoning, and unsafe action execution create new classes of risk. OWASP guidance for MCP and AI agents highlights these issues and recommends strict handling of tool permissions, validation of untrusted outputs, and human oversight for sensitive operations.[cite:3][cite:16][cite:17]

## Goals and Non-Goals

### Goals

- Provide a self-hosted platform that performs scoped security validation in authorized environments.[cite:28][cite:3]
- Help developers move from finding to fixing with generated mitigation and re-check workflows.[cite:28]
- Support both conventional software targets and AI/agent systems, including guardrail testing and MCP-connected tools.[cite:3][cite:17]
- Create a strong open-source identity with a mascot, documentation, and modular architecture that encourages contributions.[cite:3]

### Non-Goals

- Operate as a general-purpose offensive intrusion framework.
- Enable uncontrolled stress-testing or real-world DDoS activity; resilience checks should remain bounded and explicitly authorized.[cite:28]
- Perform high-risk actions without scope, rate limits, or approval workflows.[cite:3][cite:17][cite:27]
- Trust external tool descriptions or outputs as safe by default in an MCP environment.[cite:3]

## Users

| User | Need | Why Script Kitty fits |
|---|---|---|
| Solo developers | Quick visibility into insecure configs and broken validation flows | Self-hosted deployment and guided remediation lower operational overhead.[cite:28] |
| Startup engineering teams | A repeatable way to verify findings and assign fixes | Vulnerability management guidance favors repeatable remediation cycles.[cite:26][cite:28] |
| Security-minded platform teams | Controlled validation with audit trails | MCP and agent security guidance stresses approval, logging, and least privilege.[cite:3][cite:17][cite:27] |
| AI product teams | Testing guardrails, prompt injection resistance, and tool abuse paths | OWASP agent and prompt-injection guidance directly covers these risk classes.[cite:16][cite:17] |

## Product Scope

### Target capability areas

- Authentication and validation flows, such as email verification, signup abuse, password reset weaknesses, and access-control mistakes in authorized targets.
- Exposure discovery, such as open databases, weak service configurations, default credentials, and risky network surface area.[cite:28]
- Bounded resilience checks, such as detecting missing rate limits or anti-abuse controls without becoming a real DDoS tool.[cite:28]
- AI/agent safety validation, including prompt injection, jailbreak resistance, guardrail bypass attempts, and unsafe tool invocation paths.[cite:16][cite:17][cite:3]

### Operating modes

| Mode | Purpose | Default safety level |
|---|---|---|
| Scout | Inventory, fingerprinting, passive and low-impact discovery | Lowest risk |
| Verify | Controlled confirmation of likely findings | Medium risk with scope enforcement |
| Patch | Generate remediation steps, config changes, and follow-up tasks | Low risk |
| Recheck | Validate that the fix worked and did not regress | Low risk |
| Lab | More aggressive educational testing inside isolated VMs or labs only | High risk, disabled by default |

The product should default to Scout, Patch, and Recheck modes, with Verify tightly governed and Lab restricted to isolated training environments. This approach matches OWASP recommendations around least privilege, controlled action execution, and separation of high-risk capabilities.[cite:3][cite:17][cite:27]

## System Design

### High-level architecture

1. **Target intake:** Scope file, allowlist, credentials, environment metadata, and policy profile.
2. **Discovery engine:** Asset fingerprinting, route mapping, config checks, and service exposure detection.
3. **Validation engine:** Controlled test flows to confirm real impact and reduce false positives, consistent with OWASP vulnerability management guidance.[cite:28][cite:26]
4. **Remediation engine:** Patch advice, hardening recommendations, prioritized tasks, and optional issue/PR generation.
5. **Regression engine:** Re-runs checks after fixes to verify closure and detect regressions.[cite:26][cite:28]
6. **Governance layer:** Approval gates, rate limits, logs, secrets handling, tenant/project separation, and policy enforcement.[cite:3][cite:17][cite:27]

### Deployment model

- Self-hosted first, with Docker or VM deployment as the default path.
- Optional isolated runner for lab-only actions.
- MCP server interface for tool exposure to trusted agents.
- Standalone agent mode for guided operation inside sandboxed environments.[cite:3][cite:27]

## MCP and Agent Strategy

MCP is useful here because it creates a standard way to expose security tools to agents, and there are already public examples of security-oriented MCP servers integrating tools like Nmap, FFUF, SQLMap, and Masscan.[cite:2] That said, MCP also introduces risks around tool poisoning, prompt injection, confused deputy behavior, and unsafe action execution, so the product should treat MCP as a controlled integration boundary rather than a trust boundary.[cite:3]

Key MCP principles for Script Kitty should include:

- Per-tool permission scoping and allowlists.[cite:3][cite:27]
- Human approval for sensitive or state-changing actions.[cite:3][cite:17]
- Strict validation and sanitization of tool inputs and outputs, because tool output must be treated as untrusted content.[cite:3][cite:17]
- Isolation between high-risk servers and lower-risk orchestration components.[cite:3]
- Signed or pinned tool definitions where possible to reduce tampering risk.[cite:3]

## Security Requirements

### Mandatory controls

- Scope file required before any execution begins.
- Explicit allowlist of targets, ports, and protocols.
- Dry-run mode enabled by default for higher-risk modules.
- Global and per-module rate limiting.
- Structured audit logging for every action, result, and remediation artifact.[cite:3][cite:17][cite:23]
- Secret minimization and least-privilege credentials.[cite:3][cite:27]
- Sandboxed execution for lab or high-risk verification steps.[cite:3][cite:17]
- Human approval workflow for destructive, state-changing, or ambiguous actions.[cite:3][cite:17][cite:24]

### AI-specific controls

- Input screening for prompt injection and malicious test payloads.[cite:16][cite:17]
- Output screening before agent actions are executed.[cite:16][cite:17]
- Action screening so the model cannot directly trigger unsafe operations without policy checks.[cite:16][cite:17]
- Context and memory sanitization to reduce poisoning risk.[cite:17]
- Clear trust boundaries between user prompts, target content, tool metadata, and execution plans.[cite:3][cite:16]

## Feature Set

### MVP

| Feature | Description | Why it matters |
|---|---|---|
| Scope manager | Defines allowed targets and policy profile | Prevents misuse and supports auditability.[cite:3] |
| Exposure scanner | Finds open services, weak configs, and obvious dangerous defaults | Useful early signal for small teams.[cite:28] |
| Validation flow tester | Exercises auth and validation workflows in a controlled way | Confirms real impact instead of flooding with noise.[cite:26][cite:28] |
| Guardrail tester | Runs bounded prompt-injection and policy-bypass checks for AI apps | Matches current agent-security needs.[cite:16][cite:17] |
| Remediation generator | Produces fix guidance, hardening steps, and retest instructions | Closes the loop from finding to fixing.[cite:28] |
| Recheck runner | Re-tests after changes | Supports regression verification.[cite:26] |
| Audit trail | Full event log and evidence package | Needed for trust and team workflows.[cite:3][cite:23] |

### Later phases

- Ticketing and GitHub issue integration.
- PR suggestions for config changes where safe.
- Team dashboards and trend reporting.
- Plugin SDK for new scanners and validators.
- Policy packs for common stacks such as Node.js APIs, Laravel apps, Postgres deployments, and AI gateways.

## UX and Mascot Direction

The mascot should reinforce the idea of a clever cat that hunts bugs and drags back patches, not a chaotic attacker. The visual language can be playful, but product copy should consistently emphasize authorized testing, safe validation, remediation, and proof of fix.[cite:28][cite:17]

Suggested brand voice:

- Curious, sharp, and practical.
- Friendly to developers, but never reckless.
- Confident about safety boundaries and auditability.

Possible UX language examples:

- “Script Kitty found a risky exposure.”
- “Patch Cat suggests this fix path.”
- “Recheck confirms the issue is closed.”
- “This action requires approval because it changes target state.”[cite:3][cite:17]

## Repository Structure

```text
script-kitty/
├── apps/
│   ├── server/
│   ├── mcp-server/
│   └── ui/
├── packages/
│   ├── core/
│   ├── policies/
│   ├── scanners/
│   ├── validators/
│   ├── remediation/
│   └── audit/
├── docs/
│   ├── manifesto.md
│   ├── responsible-use.md
│   ├── architecture.md
│   └── plugin-sdk.md
├── lab/
│   ├── docker/
│   └── vm-profiles/
└── examples/
    ├── local-dev-app/
    └── ai-guardrail-target/
```

A modular monorepo supports open-source growth and makes it easier to separate lower-risk scanning, higher-risk verification, and policy enforcement concerns. Clear documentation is especially important because OWASP guidance around AI agents and MCP highlights the need for explicit trust boundaries and safe integration practices.[cite:3][cite:17]

## Success Metrics

### Product metrics

- Time from finding to remediation recommendation.
- Percentage of findings successfully rechecked after fix.
- False-positive rate in validation workflows.
- Number of modules that can run in low-risk mode only.
- Number of supported self-hosted deployment targets.

### Trust metrics

- Percentage of sensitive actions routed through approval workflows.[cite:3][cite:24]
- Coverage of audit logs across actions and artifacts.[cite:23]
- Number of modules with explicit scope enforcement.
- Percentage of agent actions filtered through policy checks.[cite:17]

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Project perceived as offensive tooling | Adoption and contributor risk | Emphasize authorized testing, remediation, and responsible-use docs.[cite:28][cite:17] |
| MCP tool poisoning or unsafe output handling | Unsafe agent behavior | Treat tool outputs as untrusted, isolate servers, enforce policy checks.[cite:3] |
| Feature creep into uncontrolled attack tooling | Legal and ethical risk | Keep non-goals explicit and gate high-risk modules behind lab mode.[cite:3][cite:17] |
| High false-positive rate | User frustration and low trust | Separate discovery from verification and require confirmation evidence.[cite:26][cite:28] |
| AI guardrail testing becomes unsafe | Reputational and operational risk | Use bounded datasets, policy filters, and approval workflows.[cite:16][cite:17] |

## Launch Plan

### Phase 1

- Publish manifesto and responsible-use policy.
- Ship scope manager, exposure scanner, remediation generator, and recheck runner.
- Add simple cat mascot and CLI branding.

### Phase 2

- Add auth/validation flow tester and MCP integration layer.
- Add approval workflow and richer audit logs.
- Publish isolated lab profiles for educational testing.[cite:3][cite:17]

### Phase 3

- Add AI guardrail testing pack.
- Add plugin SDK and community contribution standards.
- Add issue/PR automation where safe.

## Initial Messaging

### One-line pitch

Script Kitty is an open-source, self-hosted patch cat that helps authorized teams find exposures, verify what is real, and fix vulnerabilities with auditable remediation workflows.[cite:28][cite:3]

### Short description

Script Kitty combines scoped security validation, MCP-aware agent controls, and remediation guidance in a self-hosted platform designed for modern software teams. The project is especially well suited to teams that want practical vulnerability management and safe testing workflows for both traditional applications and AI-enabled systems.[cite:28][cite:3][cite:17]
