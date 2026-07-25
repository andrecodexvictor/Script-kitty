# Script Kitty Scope

## Purpose
Script Kitty is an open-source, self-hosted platform for authorized security validation, remediation guidance, and regression testing across software systems and AI-enabled applications.

## In Scope
- Scoped security validation in environments explicitly authorized by the operator.
- Discovery of insecure configurations, exposed services, weak authentication flows, and common misconfigurations.
- Controlled verification of likely findings to reduce false positives.
- Remediation guidance, hardening suggestions, and follow-up rechecks.
- Guardrail and prompt-injection testing for AI applications in lab or authorized environments.
- MCP-aware agent workflows with strong permission boundaries.

## Out of Scope
- General-purpose offensive intrusion.
- Unbounded exploitation or uncontrolled stress testing.
- DDoS activity or real-world disruption.
- Actions outside explicit scope or without approval.
- Trusting tool outputs, external content, or model responses without validation.

## Allowed Environments
- Local labs.
- Sandboxed VMs.
- Containers with restricted permissions.
- Staging and production only when explicitly approved and scoped.

## Principles
- Authorized by default.
- Least privilege.
- Safe-by-default execution.
- Auditability.
- Reproducible verification.
