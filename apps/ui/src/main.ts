import './style.css';
import { MotionCatMascot3D } from './mascot3d';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <!-- Header -->
  <header class="header">
    <div class="brand">
      <img src="/mascot.png" alt="Script Kitty Avatar" class="brand-avatar" />
      <div>
        <div class="brand-title">Script Kitty</div>
        <div class="brand-tagline">Your Patch Cat — Self-Learning Security Suite</div>
      </div>
    </div>
    <div class="status-badge">
      <span class="status-dot"></span>
      CONTINUOUS MEMORY ACTIVE (.context/runtime/memory.json)
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
        <div class="context-file-item">
          <span class="context-file-name">agent-spec.md</span>
          <span class="context-file-status">ACTIVE</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <span>🧠</span> Agent Continuous Memory
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
          <strong>Recorded Experiences:</strong> 14 Scans<br />
          <strong>Pattern Memory:</strong> Active<br />
          <strong>PR Generator:</strong> Auto-suggests contributions for recurring findings.
        </p>
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
      <!-- 3D Interactive Mascot Hero Banner -->
      <section class="hero-banner">
        <div class="hero-text">
          <h1>Script Kitty Cyber-Suite</h1>
          <p>
            Equipped with 3D Motion Telemetry and Agent Continuous Memory. When Script Kitty detects a recurring issue pattern, it automatically suggests contributing a Pull Request to improve the open-source rule repository!
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" id="btn-scout">
              <span>🔍</span> Run Full Scout
            </button>
            <button class="btn btn-secondary" id="btn-learn">
              <span>🧠</span> View Memory
            </button>
            <button class="btn btn-secondary" id="btn-pr">
              <span>🚀</span> Submit PR
            </button>
          </div>
        </div>

        <div class="mascot-3d-wrapper">
          <div id="mascot-3d-container"></div>
          <span class="mascot-3d-label">Interactive 3D Motion Cat</span>
        </div>
      </section>

      <!-- Continuous Learning Contribution Suggestion Banner -->
      <section class="learning-banner">
        <div class="learning-info">
          <h4>🚀 Script Kitty Self-Learning Suggestion Detected</h4>
          <p>
            Pattern <code>Exposed Config / Insecure Headers</code> has been encountered and resolved <strong>3 times</strong>. Click to generate a Pull Request to add a permanent scanner rule to script-kitty/packages/scanners!
          </p>
        </div>
        <button class="btn btn-primary" id="btn-pr-suggest" style="font-size: 0.8rem; padding: 0.5rem 1rem;">
          Create PR Suggestion
        </button>
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
          <div class="prevc-step active">
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
            <span>[MEMORY]</span>
            <span class="audit-hash">hash: c4ca4238a0b923820dcc509a6f758...</span>
            <span class="audit-action">RECORD_EXPERIENCE (Pattern SK-HDR-001 encountered 3x -> Suggesting PR)</span>
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

// Initialize 3D Motion Cat Mascot
new MotionCatMascot3D('mascot-3d-container');

// Event Handlers
document.querySelector('#btn-scout')?.addEventListener('click', () => {
  alert('🐱 [Script Kitty] Scouting target http://localhost:3000... Continuous memory updated!');
});

document.querySelector('#btn-learn')?.addEventListener('click', () => {
  alert('🧠 [Agent Continuous Memory] 14 experiences stored in .context/runtime/memory.json.');
});

document.querySelector('#btn-pr')?.addEventListener('click', () => {
  window.open('https://github.com/andrecodexvictor/Script-kitty/compare', '_blank');
});

document.querySelector('#btn-pr-suggest')?.addEventListener('click', () => {
  alert('🚀 [PR Suggestion Generator]\nGenerated Pull Request for script-kitty/packages/scanners!\nOpening GitHub PR template...');
  window.open('https://github.com/andrecodexvictor/Script-kitty/compare', '_blank');
});
