# .dotarchitecture

## Architecture
- UI and API layer in TypeScript.
- Agent and scanning layer in Python.
- Policy and audit core in Rust.

## Trust Boundaries
- User input is untrusted.
- External tool output is untrusted.
- MCP tool descriptions are untrusted.
- High-risk actions require approval.

## Data Flow
1. Scope definition.
2. Discovery.
3. Verification.
4. Remediation.
5. Recheck.
6. Audit export.

## Security Controls
- Allowlists.
- Rate limits.
- Approval workflows.
- Sandbox execution.
- Structured logs.
- Secret minimization.
