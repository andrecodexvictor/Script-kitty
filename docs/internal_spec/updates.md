# Script Kitty Updates

## Update Model
Script Kitty evolves in constrained phases so new capabilities do not weaken safety boundaries.

## Release Trains
### v0.1
- Scope manager.
- Basic discovery.
- Audit logging.
- Recheck runner.

### v0.2
- Remediation generator.
- Issue/PR suggestion output.
- Better evidence packaging.

### v0.3
- Agent runtime.
- .dotstack support.
- .dotarchitecture support.
- .dotcontext support.

### v0.4
- MCP integration.
- Plugin SDK.
- Policy-driven approval gates.

### v1.0
- Stable multi-module workflows.
- Guardrail testing pack.
- Reporting dashboard.
- Community plugin ecosystem.

## Update Rules
- New modules must ship disabled by default if they raise risk.
- Any action-changing capability requires an approval gate.
- Every update must include regression checks for safety and scope.
- Every release must document behavior changes, risks, and rollback steps.
