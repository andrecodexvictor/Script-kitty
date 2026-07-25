import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <!-- Header -->
  <header class="header">
    <div class="brand">
      <img src="/mascot.png" alt="Script Kitty Avatar" class="brand-avatar" />
      <div>
        <div class="brand-title">Script Kitty</div>
        <div class="brand-tagline">Your Patch Cat — Full Defensive Security Suite</div>
      </div>
    </div>
    <div class="status-badge">
      <span class="status-dot"></span>
      FULL TOOLSET LOADED (.dotcontext)
    </div>
  </header>

  <!-- Main Container -->
  <div class="container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="card">
        <div class="card-title">
          <span>📁</span> Context Governance Files
        </div>
        <div class="context-file-item">
          <span class="context-file-name">.dotstack</span>
          <span class="context-file-status">LOADED</span>
        </div>
        <div class="context-file-item">
          <span class="context-file-name">.dotarchitecture</span>
          <span class="context-file-status">ENFORCED</span>
        </div>
        <div class="context-file-item">
          <span class="context-file-name">.dotcontext</span>
          <span class="context-file-status">DEFENSIVE</span>
        </div>
        <div class="context-file-item">
          <span class="context-file-name">scope.md</span>
          <span class="context-file-status">AUTHORIZED</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <span>🛠️</span> Active Security Toolset
        </div>
        <ul style="font-size: 0.85rem; color: var(--text-muted); padding-left: 1.2rem; line-height: 1.8; font-family: var(--font-mono);">
          <li>🔑 Secret & Credential Scanner</li>
          <li>🌐 HTTP Security Header Scanner</li>
          <li>🤖 AI LLM Guardrail Validator</li>
          <li>🛡️ Zero-Trust Policy Engine</li>
          <li>⛓️ SHA-256 Audit Logger</li>
          <li>🐾 Patch Cat Playbook Generator</li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Mascot Hero Banner -->
      <section class="hero-banner">
        <img src="/mascot.png" alt="Script Kitty Mascot" class="mascot-img" />
        <div class="hero-text">
          <h1>Script Kitty Security Suite</h1>
          <p>
            Equipped with a comprehensive set of defensive tools: Secret Leak Scanning, HTTP Header Hardening, AI Guardrail & Prompt-Injection Testing, and Automated Retest Runners.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" id="btn-scout">
              <span>🔍</span> Run Full Scout
            </button>
            <button class="btn btn-secondary" id="btn-secrets">
              <span>🔑</span> Scan Secrets
            </button>
            <button class="btn btn-secondary" id="btn-ai">
              <span>🤖</span> Test AI Guardrails
            </button>
          </div>
        </div>
      </section>

      <!-- PREVC Workflow Pipeline -->
      <section class="card">
        <div class="card-title">
          <span>⚡</span> PREVC Agent Execution Pipeline
        </div>
        <div class="prevc-pipeline">
          <div class="prevc-step active">
            <div class="prevc-letter">P</div>
            <div class="prevc-label">Plan & Scope</div>
          </div>
          <div class="prevc-step active">
            <div class="prevc-letter">R</div>
            <div class="prevc-label">Research</div>
          </div>
          <div class="prevc-step active">
            <div class="prevc-letter">E</div>
            <div class="prevc-label">Execute Dry-Run</div>
          </div>
          <div class="prevc-step">
            <div class="prevc-letter">V</div>
            <div class="prevc-label">Verify Impact</div>
          </div>
          <div class="prevc-step">
            <div class="prevc-letter">C</div>
            <div class="prevc-label">Complete & Audit</div>
          </div>
        </div>
      </section>

      <!-- Findings & Approval Queue Table -->
      <section class="card">
        <div class="card-title">
          <span>📋</span> Active Vulnerability & Remediation Findings
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Evidence / File</th>
              <th>Patch Cat Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>SK-SECRET-001</code></td>
              <td>Hardcoded Secret Leak</td>
              <td><span class="badge-risk badge-high">HIGH</span></td>
              <td>Potential AWS Access Key in <code>config/aws.js:14</code></td>
              <td>
                <button class="btn btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;">
                  Generate Playbook
                </button>
              </td>
            </tr>
            <tr>
              <td><code>SK-HDR-001</code></td>
              <td>Missing Security Headers</td>
              <td><span class="badge-risk badge-medium">MEDIUM</span></td>
              <td>HSTS and CSP absent on <code>http://localhost:3000</code></td>
              <td>
                <button class="btn btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;">
                  Apply Helmet Fix
                </button>
              </td>
            </tr>
            <tr>
              <td><code>SK-AI-001</code></td>
              <td>AI Guardrail Verification</td>
              <td><span class="badge-risk badge-low">LOW</span></td>
              <td>LLM target passed prompt injection and jailbreak tests</td>
              <td>
                <button class="btn btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;">
                  Run Recheck
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Cryptographic Audit Log Viewer -->
      <section class="card">
        <div class="card-title">
          <span>⛓️</span> Cryptographic Hash-Chained Audit Log
        </div>
        <div class="audit-terminal">
          <div class="audit-entry">
            <span>[GENESIS]</span>
            <span class="audit-hash">hash: 9f86d081884c7d659a2feaa0c55ad...</span>
            <span class="audit-action">INITIALIZED (.dotstack, .dotarchitecture, .dotcontext)</span>
          </div>
          <div class="audit-entry">
            <span>[ENTRY #1]</span>
            <span class="audit-hash">hash: e3b0c44298fc1c149afbf4c8996fb...</span>
            <span class="audit-action">SCAN_SECRETS (config/aws.js) -> Secret Detected & Logged</span>
          </div>
          <div class="audit-entry">
            <span>[ENTRY #2]</span>
            <span class="audit-hash">hash: 5e884898da28047151d0e56f8dc62...</span>
            <span class="audit-action">VALIDATE_AI_GUARDRAILS (http://localhost:3000/api/llm) -> Passed</span>
          </div>
        </div>
      </section>
    </main>
  </div>
`;

// Add Interactive Event Handlers
document.querySelector('#btn-scout')?.addEventListener('click', () => {
  alert('🐱 [Script Kitty] Full passive exposure discovery scan completed cleanly!');
});

document.querySelector('#btn-secrets')?.addEventListener('click', () => {
  alert('🔑 [Secret Scanner] Codebase scanned! 1 potential secret detected in config/aws.js.');
});

document.querySelector('#btn-ai')?.addEventListener('click', () => {
  alert('🤖 [AI Guardrail Validator] LLM target tested! 3 prompt injection and jailbreak tests PASSED.');
});
