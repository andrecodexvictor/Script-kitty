# Script Kitty Scope Specification

## Purpose
Script Kitty is an open-source, self-hosted platform for authorized security validation, remediation guidance, and regression testing across software systems and AI-enabled applications.

## In Scope
- Authorized security validation in environments explicitly allowed by the operator.
- Passive discovery of insecure configurations, exposed endpoints, default credentials, and missing rate limits.
- Controlled verification of findings to eliminate false positives.
- Remediation playbooks, configuration hardening guidance, and retest runners.
- AI application guardrail and prompt-injection testing inside sandboxed lab environments.
- MCP-aware tool execution governed by zero-trust policies and approval gates.

## Out of Scope
- Unauthorized intrusion or stress testing on third-party targets without explicit permission.
- Destructive actions, file deletion, or unbounded exploitation.
- Real-world Denial of Service (DDoS) disruption.
- Trusting external inputs or tool descriptions without verification.

## Allowed Environments
- Local developer environments (`localhost`, `127.0.0.1`).
- Sandboxed containers and isolated Docker lab profiles.
- Authorized staging / QA environments with registered scope files.

## Safety Principles
1. **Scope First**: Verification stops immediately if a target IP/domain is not in the scope file.
2. **Least Privilege**: Minimal credentials and bounded rate limits.
3. **Auditability**: Every action is cryptographically logged in a hash chain.
