import './style.css';
import { MotionCatMascot3D } from './mascot3d';

let currentLang = 'en';
let showKeyModal = false;

let aiConfig = {
  activeProvider: 'openai',
  openaiApiKey: '',
  googleApiKey: '',
  nvidiaApiKey: '',
  openrouterApiKey: '',
  anthropicApiKey: '',
  grokApiKey: '',
  codexSubscriptionToken: ''
};

const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    tagline: "Your Patch Cat — Self-Learning Security Suite",
    status: "CONTINUOUS MEMORY ACTIVE (.context/runtime/memory.json)",
    heroTitle: "Script Kitty Security Suite",
    heroDesc: "Equipped with 3D Motion Telemetry and Agent Continuous Memory. When Script Kitty detects a recurring issue pattern, it automatically suggests contributing a Pull Request to improve the open-source rule repository!",
    btnScout: "🔍 Run Full Scout",
    btnMemory: "🧠 View Memory",
    btnPr: "🚀 Submit PR",
    btnKeys: "🔑 AI Keys & Codex Login",
    learningTitle: "🚀 Script Kitty Self-Learning Suggestion Detected",
    learningDesc: "Pattern 'Exposed Config / Insecure Headers' encountered 3 times. Click to generate a Pull Request to add a permanent scanner rule!",
    btnPrSuggest: "Create PR Suggestion"
  },
  pt: {
    tagline: "Seu Gatinho do Patch — Suíte de Segurança com Auto-Aprendizado",
    status: "MEMÓRIA CONTÍNUA ATIVA (.context/runtime/memory.json)",
    heroTitle: "Suíte de Segurança Script Kitty",
    heroDesc: "Equipado com Telemetria 3D Motion e Memória Contínua. Quando o Script Kitty detecta um padrão de problema recorrente, ele sugere automaticamente um Pull Request para melhorar o repositório open-source!",
    btnScout: "🔍 Rodar Varredura Completa",
    btnMemory: "🧠 Ver Memória",
    btnPr: "🚀 Enviar PR",
    btnKeys: "🔑 Chaves de IA & Login Codex",
    learningTitle: "🚀 Sugestão de Auto-Aprendizado do Script Kitty Detectada",
    learningDesc: "Padrão 'Exposed Config / Insecure Headers' encontrado 3 vezes. Clique para gerar um Pull Request e adicionar uma regra permanente!",
    btnPrSuggest: "Criar Sugestão de PR"
  },
  es: {
    tagline: "Tu Gato Defensor — Suite de Seguridad con Autoaprendizaje",
    status: "MEMORIA CONTINUA ACTIVA (.context/runtime/memory.json)",
    heroTitle: "Suite de Seguridad Script Kitty",
    heroDesc: "Equipado con Telemetría 3D Motion y Memoria Continua. ¡Cuando Script Kitty detecta un patrón recurrente, sugiere automáticamente enviar un Pull Request para mejorar el repositorio!",
    btnScout: "🔍 Ejecutar Escaneo",
    btnMemory: "🧠 Ver Memoria",
    btnPr: "🚀 Enviar PR",
    btnKeys: "🔑 Claves IA y Login Codex",
    learningTitle: "🚀 Sugerencia de Autoaprendizaje Detectada",
    learningDesc: "Patrón 'Exposed Config / Insecure Headers' encontrado 3 veces. ¡Haz clic para generar un Pull Request!",
    btnPrSuggest: "Crear Sugerencia de PR"
  }
};

function renderApp() {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <!-- Header -->
    <header class="header">
      <div class="brand">
        <img src="/mascot.png" alt="Script Kitty Avatar" class="brand-avatar" />
        <div>
          <div class="brand-title">Script Kitty</div>
          <div class="brand-tagline" id="txt-tagline">${t.tagline}</div>
        </div>
      </div>

      <div class="header-right">
        <button class="btn btn-secondary" id="btn-open-keys" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
          ${t.btnKeys}
        </button>

        <!-- Language Selector -->
        <div class="lang-selector">
          <span>🌐 Language:</span>
          <select id="select-lang">
            <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇺🇸 English (default)</option>
            <option value="pt" ${currentLang === 'pt' ? 'selected' : ''}>🇵🇹 Português</option>
            <option value="es" ${currentLang === 'es' ? 'selected' : ''}>🇪🇸 Español</option>
          </select>
        </div>

        <div class="status-badge">
          <span class="status-dot"></span>
          <span id="txt-status">${t.status}</span>
        </div>
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
            <span>🤖</span> Active AI Provider
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
            <strong>Provider:</strong> ${aiConfig.activeProvider.toUpperCase()}<br />
            <strong>Codex Subscription:</strong> ${aiConfig.codexSubscriptionToken ? 'CONNECTED ✅' : 'NOT LINKED'}<br />
            <strong>Multi-Model Keys:</strong> Supported
          </p>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- 3D Interactive Mascot Hero Banner -->
        <section class="hero-banner">
          <div class="hero-text">
            <h1 id="txt-hero-title">${t.heroTitle}</h1>
            <p id="txt-hero-desc">${t.heroDesc}</p>
            <div class="hero-actions">
              <button class="btn btn-primary" id="btn-scout">${t.btnScout}</button>
              <button class="btn btn-secondary" id="btn-learn">${t.btnMemory}</button>
              <button class="btn btn-secondary" id="btn-pr">${t.btnPr}</button>
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
            <h4 id="txt-learning-title">${t.learningTitle}</h4>
            <p id="txt-learning-desc">${t.learningDesc}</p>
          </div>
          <button class="btn btn-primary" id="btn-pr-suggest" style="font-size: 0.8rem; padding: 0.5rem 1rem;">
            ${t.btnPrSuggest}
          </button>
        </section>
      </main>
    </div>

    <!-- AI Keys & Codex Login Modal -->
    ${showKeyModal ? `
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal-box">
          <div class="modal-header">
            <h3>🔑 AI Provider Keys & ChatGPT Codex Login</h3>
            <button class="btn-close" id="btn-close-keys">✖</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Select Active AI Provider Engine:</label>
              <select id="key-provider" class="form-control">
                <option value="openai" ${aiConfig.activeProvider === 'openai' ? 'selected' : ''}>OpenAI (GPT-4o / Codex)</option>
                <option value="google" ${aiConfig.activeProvider === 'google' ? 'selected' : ''}>Google Gemini (2.5 Flash/Pro)</option>
                <option value="nvidia" ${aiConfig.activeProvider === 'nvidia' ? 'selected' : ''}>NVIDIA NIM Security AI</option>
                <option value="openrouter" ${aiConfig.activeProvider === 'openrouter' ? 'selected' : ''}>OpenRouter (Multi-Model)</option>
                <option value="claude" ${aiConfig.activeProvider === 'claude' ? 'selected' : ''}>Anthropic Claude Code</option>
                <option value="grok" ${aiConfig.activeProvider === 'grok' ? 'selected' : ''}>xAI Grok Build</option>
                <option value="codex" ${aiConfig.activeProvider === 'codex' ? 'selected' : ''}>ChatGPT Codex Subscription Token</option>
              </select>
            </div>

            <div class="form-group">
              <label>OpenAI API Key (sk-...):</label>
              <input type="password" id="input-openai" class="form-control" placeholder="sk-..." value="${aiConfig.openaiApiKey}" />
            </div>

            <div class="form-group">
              <label>Google Gemini API Key:</label>
              <input type="password" id="input-google" class="form-control" placeholder="AIzaSy..." value="${aiConfig.googleApiKey}" />
            </div>

            <div class="form-group">
              <label>NVIDIA NIM API Key:</label>
              <input type="password" id="input-nvidia" class="form-control" placeholder="nvapi-..." value="${aiConfig.nvidiaApiKey}" />
            </div>

            <div class="form-group">
              <label>OpenRouter API Key:</label>
              <input type="password" id="input-openrouter" class="form-control" placeholder="sk-or-v1-..." value="${aiConfig.openrouterApiKey}" />
            </div>

            <div class="form-group">
              <label>Anthropic Claude API Key:</label>
              <input type="password" id="input-claude" class="form-control" placeholder="sk-ant-..." value="${aiConfig.anthropicApiKey}" />
            </div>

            <div class="form-group">
              <label>xAI Grok API Key:</label>
              <input type="password" id="input-grok" class="form-control" placeholder="xai-..." value="${aiConfig.grokApiKey}" />
            </div>

            <div class="form-group" style="background: rgba(0, 255, 157, 0.05); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-accent);">
              <label style="color: var(--accent-green);">ChatGPT Codex Subscription Token / Login:</label>
              <input type="password" id="input-codex" class="form-control" placeholder="Paste your ChatGPT Codex Subscription Token..." value="${aiConfig.codexSubscriptionToken}" />
              <small style="color: var(--text-muted); display: block; margin-top: 0.3rem;">Allows using your ChatGPT Plus / Codex subscription tokens inside Script Kitty.</small>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" id="btn-save-keys">Save AI Configuration</button>
          </div>
        </div>
      </div>
    ` : ''}
  `;

  // Initialize 3D Motion Cat Mascot
  new MotionCatMascot3D('mascot-3d-container');

  // Bind Listeners
  document.querySelector('#select-lang')?.addEventListener('change', (e) => {
    currentLang = (e.target as HTMLSelectElement).value;
    renderApp();
  });

  document.querySelector('#btn-open-keys')?.addEventListener('click', () => {
    showKeyModal = true;
    renderApp();
  });

  document.querySelector('#btn-close-keys')?.addEventListener('click', () => {
    showKeyModal = false;
    renderApp();
  });

  document.querySelector('#btn-save-keys')?.addEventListener('click', () => {
    aiConfig.activeProvider = (document.querySelector('#key-provider') as HTMLSelectElement).value;
    aiConfig.openaiApiKey = (document.querySelector('#input-openai') as HTMLInputElement).value;
    aiConfig.googleApiKey = (document.querySelector('#input-google') as HTMLInputElement).value;
    aiConfig.nvidiaApiKey = (document.querySelector('#input-nvidia') as HTMLInputElement).value;
    aiConfig.openrouterApiKey = (document.querySelector('#input-openrouter') as HTMLInputElement).value;
    aiConfig.anthropicApiKey = (document.querySelector('#input-claude') as HTMLInputElement).value;
    aiConfig.grokApiKey = (document.querySelector('#input-grok') as HTMLInputElement).value;
    aiConfig.codexSubscriptionToken = (document.querySelector('#input-codex') as HTMLInputElement).value;

    showKeyModal = false;
    renderApp();
    alert('✅ AI Credentials & ChatGPT Codex Subscription Token configured successfully!');
  });
}

renderApp();
