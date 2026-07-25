#!/usr/bin/env node

import { Command } from "commander";
import { printBanner, ANSI_GREEN, ANSI_PURPLE, ANSI_CYAN, ANSI_YELLOW, ANSI_RESET, ANSI_BOLD } from "./banner";
import { getTranslation } from "./i18n";
import { loadCredentials, saveCredentials } from "./credentials";
import { runInteractiveMenu } from "./interactive";
import { scanWorkspaceReal, evaluateHttpHeadersReal } from "./real_scanner";

const program = new Command();

program
  .name("script-kitty")
  .description("🐱🛡️ Script Kitty — Your Patch Cat: Enterprise Security Engine & Remediation Platform")
  .version("1.0.0")
  .option("-l, --lang <language>", "Language configuration (en, pt, es)", "en")
  .action(async (options: { lang?: string }) => {
    // If no subcommand is specified, open the Interactive Navigable TUI Shell!
    await runInteractiveMenu(options.lang || "en");
  });

program
  .command("audit")
  .description("Execute comprehensive live security audit across SAST Code, Secrets, HTTP Headers, and AI Guardrails")
  .argument("[path]", "Target workspace path to audit", ".")
  .option("-l, --lang <language>", "Language configuration (en, pt, es)", "en")
  .action((pathArg: string, options: { lang?: string }) => {
    const lang = options.lang || program.opts().lang || "en";
    const t = getTranslation(lang);
    const creds = loadCredentials();

    printBanner();

    console.log(`${ANSI_BOLD}${ANSI_CYAN}[🔑 AI Engine Status]: Active Provider -> ${creds.activeProvider.toUpperCase()}${ANSI_RESET}`);
    console.log(`${ANSI_BOLD}${ANSI_GREEN}${t.auditStart} '${pathArg}'...${ANSI_RESET}\n`);

    const report = scanWorkspaceReal(pathArg);

    console.log(`📂 Total Files Analyzed: ${report.total_files_scanned}`);
    console.log(`🚨 Total Real Findings Detected: ${report.total_findings}\n`);

    if (report.total_findings > 0) {
      report.findings.forEach((finding, idx) => {
        console.log(`${ANSI_BOLD}${ANSI_YELLOW}[Finding ${idx + 1}/${report.total_findings}] ${finding.finding_id} (${finding.severity})${ANSI_RESET}`);
        console.log(`   📍 File: ${finding.file_path}:${finding.line_number}`);
        console.log(`   🔎 Snippet: ${finding.snippet}`);
        console.log(`   💡 Remediation: ${finding.remediation}\n`);
      });
    } else {
      console.log(`${ANSI_BOLD}${ANSI_GREEN}${t.allClean}${ANSI_RESET}\n`);
    }

    console.log(`${ANSI_BOLD}${ANSI_GREEN}${t.auditComplete}${ANSI_RESET}\n`);
  });

program
  .command("scan-secrets")
  .description("Scan codebase for hardcoded credentials, API keys, and private tokens")
  .argument("<path>", "Directory or file path to scan")
  .action((pathArg: string) => {
    printBanner();
    console.log(`\n🔑 [Real Secret Scanner] Scanning directory: ${pathArg}...`);
    const report = scanWorkspaceReal(pathArg);
    const secretFindings = report.findings.filter(f => f.category.includes("Secret"));
    console.log(JSON.stringify({
      status: "COMPLETED",
      scanned_path: pathArg,
      total_files_scanned: report.total_files_scanned,
      secret_leaks_found: secretFindings.length,
      findings: secretFindings
    }, null, 2));
  });

program
  .command("scan-headers")
  .description("Evaluate security headers (HSTS, CSP, X-Frame-Options) of an HTTP endpoint")
  .argument("<target>", "HTTP/HTTPS target URL")
  .action(async (target: string) => {
    printBanner();
    console.log(`\n🌐 [Real Header Scanner] Evaluating HTTP security headers for ${target}...`);
    const findings = await evaluateHttpHeadersReal(target);
    console.log(JSON.stringify({
      status: "COMPLETED",
      target,
      total_missing_headers: findings.length,
      findings
    }, null, 2));
  });

program
  .command("auth")
  .description("Configure AI Provider API Keys (OpenAI, Google, NVIDIA, OpenRouter, Claude, Grok, Codex Token)")
  .option("--set-openai <key>", "Set OpenAI API Key")
  .option("--set-google <key>", "Set Google Gemini API Key")
  .option("--set-nvidia <key>", "Set NVIDIA NIM API Key")
  .option("--set-openrouter <key>", "Set OpenRouter API Key")
  .option("--set-claude <key>", "Set Anthropic Claude API Key")
  .option("--set-grok <key>", "Set xAI Grok API Key")
  .option("--set-codex-token <token>", "Set ChatGPT / Codex Subscription Access Token")
  .option("--provider <name>", "Select active AI Provider (openai, google, nvidia, openrouter, claude, grok, codex)")
  .action((options: {
    setOpenai?: string;
    setGoogle?: string;
    setNvidia?: string;
    setOpenrouter?: string;
    setClaude?: string;
    setGrok?: string;
    setCodexToken?: string;
    provider?: any;
  }) => {
    printBanner();

    const updates: any = {};
    if (options.setOpenai) updates.openaiApiKey = options.setOpenai;
    if (options.setGoogle) updates.googleApiKey = options.setGoogle;
    if (options.setNvidia) updates.nvidiaApiKey = options.setNvidia;
    if (options.setOpenrouter) updates.openrouterApiKey = options.setOpenrouter;
    if (options.setClaude) updates.anthropicApiKey = options.setClaude;
    if (options.setGrok) updates.grokApiKey = options.setGrok;
    if (options.setCodexToken) updates.codexSubscriptionToken = options.setCodexToken;
    if (options.provider) updates.activeProvider = options.provider;

    const saved = saveCredentials(updates);

    console.log(`${ANSI_BOLD}${ANSI_GREEN}✅ AI Credentials & Provider configuration saved!${ANSI_RESET}\n`);
    console.log(JSON.stringify({
      active_provider: saved.activeProvider,
      configured_keys: {
        openai: !!saved.openaiApiKey,
        google_gemini: !!saved.googleApiKey,
        nvidia_nim: !!saved.nvidiaApiKey,
        openrouter: !!saved.openrouterApiKey,
        claude: !!saved.anthropicApiKey,
        grok: !!saved.grokApiKey,
        codex_subscription: !!saved.codexSubscriptionToken
      }
    }, null, 2));
  });

program.parse();
