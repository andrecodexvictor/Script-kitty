import * as readline from "readline";
import { printBanner, ANSI_GREEN, ANSI_PURPLE, ANSI_CYAN, ANSI_YELLOW, ANSI_RESET, ANSI_BOLD } from "./banner";
import { getTranslation } from "./i18n";
import { loadCredentials, saveCredentials, AICredentials } from "./credentials";
import { scanWorkspaceReal, evaluateHttpHeadersReal } from "./real_scanner";

export interface FeatureOption {
  id: string;
  name: string;
  enabled: boolean;
}

export async function promptTextInput(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`${ANSI_BOLD}${ANSI_CYAN}${query}${ANSI_RESET} `, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export async function runInteractiveAIWizard(): Promise<void> {
  console.clear();
  printBanner();
  console.log(`${ANSI_BOLD}${ANSI_PURPLE}=== 🤖 SCRIPT KITTY AI AGENT SETUP WIZARD ===${ANSI_RESET}\n`);
  console.log(`Configure AI Providers & ChatGPT Codex Subscription directly inside the CLI.\n`);

  console.log(`Select Active AI Provider Engine:`);
  console.log(` 1. OpenAI (GPT-4o / Codex)`);
  console.log(` 2. Google Gemini (2.5 Flash / Pro)`);
  console.log(` 3. NVIDIA NIM Security AI`);
  console.log(` 4. OpenRouter (Multi-Model Routing)`);
  console.log(` 5. Anthropic Claude Code`);
  console.log(` 6. xAI Grok Build`);
  console.log(` 7. ChatGPT Codex Subscription Token (Login with Plus/Codex account)`);

  const choice = await promptTextInput("\nEnter provider number (1-7): ");
  let provider: AICredentials["activeProvider"] = "openai";

  switch (choice) {
    case "1": provider = "openai"; break;
    case "2": provider = "google"; break;
    case "3": provider = "nvidia"; break;
    case "4": provider = "openrouter"; break;
    case "5": provider = "claude"; break;
    case "6": provider = "grok"; break;
    case "7": provider = "codex"; break;
    default: provider = "openai"; break;
  }

  const updates: Partial<AICredentials> = { activeProvider: provider };

  if (provider === "openai") {
    const key = await promptTextInput("Enter OpenAI API Key (sk-...): ");
    if (key) updates.openaiApiKey = key;
  } else if (provider === "google") {
    const key = await promptTextInput("Enter Google Gemini API Key (AIzaSy...): ");
    if (key) updates.googleApiKey = key;
  } else if (provider === "nvidia") {
    const key = await promptTextInput("Enter NVIDIA NIM API Key (nvapi-...): ");
    if (key) updates.nvidiaApiKey = key;
  } else if (provider === "openrouter") {
    const key = await promptTextInput("Enter OpenRouter API Key (sk-or-v1-...): ");
    if (key) updates.openrouterApiKey = key;
  } else if (provider === "claude") {
    const key = await promptTextInput("Enter Anthropic Claude API Key (sk-ant-...): ");
    if (key) updates.anthropicApiKey = key;
  } else if (provider === "grok") {
    const key = await promptTextInput("Enter xAI Grok API Key (xai-...): ");
    if (key) updates.grokApiKey = key;
  } else if (provider === "codex") {
    const token = await promptTextInput("Paste your ChatGPT Codex Subscription Token: ");
    if (token) updates.codexSubscriptionToken = token;
  }

  const saved = saveCredentials(updates);

  console.log(`\n${ANSI_BOLD}${ANSI_GREEN}✅ Script Kitty AI Agent successfully configured!${ANSI_RESET}`);
  console.log(`Active Engine: ${ANSI_CYAN}${saved.activeProvider.toUpperCase()}${ANSI_RESET}\n`);
}

export async function runFeatureSelection(targetPath = "."): Promise<void> {
  const features: FeatureOption[] = [
    { id: "sast", name: "Code SAST Vulnerability Scanner (Injection, SQLi, MD5)", enabled: true },
    { id: "secrets", name: "Secret & Credential Leak Engine (AWS, SSH, API Tokens)", enabled: true },
    { id: "headers", name: "HTTP Security Header Evaluator (HSTS, CSP, CORS)", enabled: true },
    { id: "guardrails", name: "AI Guardrail & Prompt-Injection Validator", enabled: true }
  ];

  let cursorIndex = 0;

  if (!process.stdin.isTTY) {
    const report = scanWorkspaceReal(targetPath);
    console.log(`Scanned ${report.total_files_scanned} files. Found ${report.total_findings} findings.`);
    return;
  }

  function renderFeatureMenu() {
    console.clear();
    printBanner();
    console.log(`${ANSI_BOLD}${ANSI_PURPLE}=== 🎛️ SELECT CUSTOM SECURITY AUDIT SUITES ===${ANSI_RESET}`);
    console.log(`${ANSI_YELLOW}Use UP/DOWN arrows to navigate. SPACE to toggle. ENTER to execute.${ANSI_RESET}\n`);

    features.forEach((feat, idx) => {
      const checkbox = feat.enabled ? `${ANSI_GREEN}[X]${ANSI_RESET}` : `${ANSI_YELLOW}[ ]${ANSI_RESET}`;
      if (idx === cursorIndex) {
        console.log(`${ANSI_BOLD}${ANSI_CYAN} > ${checkbox} ${feat.name} <${ANSI_RESET}`);
      } else {
        console.log(`   ${checkbox} ${feat.name}`);
      }
    });

    console.log(`\n${ANSI_BOLD}${ANSI_PURPLE}------------------------------------------------${ANSI_RESET}`);
  }

  renderFeatureMenu();

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.setRawMode) {
    process.stdin.setRawMode(true);
  }

  return new Promise((resolve) => {
    const handleKey = async (_str: string, key: readline.Key) => {
      if (key.ctrl && key.name === "c") {
        process.exit(0);
      }

      if (key.name === "up") {
        cursorIndex = (cursorIndex - 1 + features.length) % features.length;
        renderFeatureMenu();
      } else if (key.name === "down") {
        cursorIndex = (cursorIndex + 1) % features.length;
        renderFeatureMenu();
      } else if (key.name === "space") {
        features[cursorIndex].enabled = !features[cursorIndex].enabled;
        renderFeatureMenu();
      } else if (key.name === "return") {
        process.stdin.removeListener("keypress", handleKey);
        if (process.stdin.setRawMode) {
          process.stdin.setRawMode(false);
        }

        console.log(`\n${ANSI_BOLD}${ANSI_GREEN}[*] Executing REAL Live Audit on '${targetPath}'...${ANSI_RESET}\n`);
        const report = scanWorkspaceReal(targetPath);

        console.log(`📂 Total Files Analyzed: ${report.total_files_scanned}`);
        console.log(`🚨 Total Findings Detected: ${report.total_findings}\n`);

        if (report.total_findings > 0) {
          report.findings.forEach((finding, idx) => {
            console.log(`${ANSI_BOLD}${ANSI_YELLOW}[Finding ${idx + 1}/${report.total_findings}] ${finding.finding_id} (${finding.severity})${ANSI_RESET}`);
            console.log(`   📍 File: ${finding.file_path}:${finding.line_number}`);
            console.log(`   🔎 Snippet: ${finding.snippet}`);
            console.log(`   💡 Remediation: ${finding.remediation}\n`);
          });
        } else {
          console.log(`${ANSI_GREEN}✅ No real security vulnerabilities or secret leaks detected in workspace.${ANSI_RESET}\n`);
        }

        resolve();
      }
    };

    process.stdin.on("keypress", handleKey);
  });
}

export async function runInteractiveMenu(lang: string = "en"): Promise<void> {
  printBanner();

  const creds = loadCredentials();
  console.log(`${ANSI_BOLD}${ANSI_CYAN} [Active AI Provider]: ${creds.activeProvider.toUpperCase()}${ANSI_RESET}`);
  console.log(`${ANSI_BOLD}${ANSI_YELLOW} Use UP/DOWN arrow keys to navigate. Press ENTER to select.${ANSI_RESET}\n`);

  const menuItems = [
    {
      id: "audit",
      label: "🔍 [1] Run Full Live Real Security Audit (Filesystem SAST, Secrets, Headers)",
      action: async () => {
        const t = getTranslation(lang);
        console.log(`\n${ANSI_BOLD}${ANSI_GREEN}${t.auditStart} '.'...${ANSI_RESET}\n`);
        
        const report = scanWorkspaceReal(".");

        console.log(`📂 Scanned Files: ${report.total_files_scanned}`);
        console.log(`🔍 Live Findings Detected: ${report.total_findings}\n`);

        if (report.total_findings > 0) {
          report.findings.forEach((finding, idx) => {
            console.log(`${ANSI_BOLD}${ANSI_YELLOW}[${idx + 1}] ${finding.finding_id} (${finding.severity}): ${finding.description}${ANSI_RESET}`);
            console.log(`    File: ${finding.file_path}:${finding.line_number}`);
            console.log(`    Fix: ${finding.remediation}`);
          });
        } else {
          console.log(`${ANSI_BOLD}${ANSI_GREEN}${t.allClean}${ANSI_RESET}`);
        }

        console.log(`\n${ANSI_BOLD}${ANSI_GREEN}${t.auditComplete}${ANSI_RESET}\n`);
      }
    },
    {
      id: "custom-features",
      label: "🎛️ [2] Custom Live Scanner Suite Selection (Checkbox TUI)",
      action: async () => {
        await runFeatureSelection(".");
      }
    },
    {
      id: "ai-wizard",
      label: "🤖 [3] Interactive AI Agent Setup Wizard (OpenAI, Gemini, Claude, Grok, Codex)",
      action: async () => {
        await runInteractiveAIWizard();
      }
    },
    {
      id: "scan-secrets",
      label: "🔑 [4] Scan Workspace for Real Secret Leaks & Private Keys",
      action: async () => {
        console.log(`\n🔑 [Real Secret Scanner] Scanning workspace for credential leaks...`);
        const report = scanWorkspaceReal(".");
        const secretFindings = report.findings.filter(f => f.category.includes("Secret"));
        console.log(`Detected ${secretFindings.length} real secret leaks.`);
      }
    },
    {
      id: "scan-headers",
      label: "🌐 [5] Evaluate Real Live HTTP Security Headers",
      action: async () => {
        console.log(`\n🌐 [Real Header Scanner] Evaluating http://localhost:3000...`);
        const findings = await evaluateHttpHeadersReal("http://localhost:3000");
        console.log(`Evaluated endpoint headers: ${findings.length} missing security headers.`);
      }
    },
    {
      id: "exit",
      label: "🚪 [6] Exit Script Kitty Interactive Shell",
      action: async () => {
        console.log(`\n👋 Exiting Script Kitty. Keep your repository secure!`);
        process.exit(0);
      }
    }
  ];

  let selectedIndex = 0;

  function renderMenu() {
    readline.cursorTo(process.stdout, 0, 18);
    readline.clearScreenDown(process.stdout);

    console.log(`${ANSI_BOLD}${ANSI_PURPLE}--- INTERACTIVE MENU NAVIGATION ---${ANSI_RESET}`);
    menuItems.forEach((item, index) => {
      if (index === selectedIndex) {
        console.log(`${ANSI_BOLD}${ANSI_GREEN} > ${item.label} <${ANSI_RESET}`);
      } else {
        console.log(`   ${item.label}`);
      }
    });
    console.log(`${ANSI_BOLD}${ANSI_PURPLE}-----------------------------------${ANSI_RESET}`);
  }

  renderMenu();

  if (!process.stdin.isTTY) {
    console.log(`Executing default audit...`);
    await menuItems[0].action();
    return;
  }

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.setRawMode) {
    process.stdin.setRawMode(true);
  }

  return new Promise((resolve) => {
    const handleKey = async (_str: string, key: readline.Key) => {
      if (key.ctrl && key.name === "c") {
        process.exit(0);
      }

      if (key.name === "up") {
        selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
        renderMenu();
      } else if (key.name === "down") {
        selectedIndex = (selectedIndex + 1) % menuItems.length;
        renderMenu();
      } else if (key.name === "return") {
        process.stdin.removeListener("keypress", handleKey);
        if (process.stdin.setRawMode) {
          process.stdin.setRawMode(false);
        }
        console.log(`\nExecuting: ${menuItems[selectedIndex].label}...`);
        await menuItems[selectedIndex].action();
        resolve();
      }
    };

    process.stdin.on("keypress", handleKey);
  });
}
