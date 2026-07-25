import * as readline from "readline";
import { printBanner, ANSI_GREEN, ANSI_PURPLE, ANSI_CYAN, ANSI_YELLOW, ANSI_RESET, ANSI_BOLD } from "./banner";
import { loadCredentials } from "./credentials";

export async function runAgentChatSession(lang = "en"): Promise<void> {
  console.clear();
  printBanner();

  const creds = loadCredentials();
  console.log(`${ANSI_BOLD}${ANSI_PURPLE}======================================================================${ANSI_RESET}`);
  console.log(`${ANSI_BOLD}${ANSI_CYAN}💬 SCRIPT KITTY AGENT DIRECT CHAT (Active AI: ${creds.activeProvider.toUpperCase()})${ANSI_RESET}`);
  console.log(`${ANSI_YELLOW}Type your message to converse directly with the Detective Agent.${ANSI_RESET}`);
  console.log(`${ANSI_YELLOW}Type 'exit' or 'back' anytime to return to the main menu.${ANSI_RESET}`);
  console.log(`${ANSI_BOLD}${ANSI_PURPLE}======================================================================${ANSI_RESET}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    const askQuestion = () => {
      rl.question(`${ANSI_BOLD}${ANSI_GREEN}User > ${ANSI_RESET}`, async (userInput) => {
        const trimmed = userInput.trim();

        if (trimmed.toLowerCase() === "exit" || trimmed.toLowerCase() === "back") {
          rl.close();
          console.log(`\nReturning to main menu...`);
          resolve();
          return;
        }

        if (!trimmed) {
          askQuestion();
          return;
        }

        console.log(`\n${ANSI_BOLD}${ANSI_CYAN}🐾 Detective Patch Cat:${ANSI_RESET}`);
        
        if (trimmed.toLowerCase().includes("vulnerability") || trimmed.toLowerCase().includes("falha") || trimmed.toLowerCase().includes("bug")) {
          console.log(`${ANSI_YELLOW}"I can help analyze code patterns for vulnerabilities. I use SAST rules and AI models to locate insecure patterns (like SQLi, XSS, or hardcoded keys) and generate patch playbooks."${ANSI_RESET}`);
        } else if (trimmed.toLowerCase().includes("patch") || trimmed.toLowerCase().includes("fix") || trimmed.toLowerCase().includes("corrigir")) {
          console.log(`${ANSI_YELLOW}"To patch vulnerabilities cleanly, move credentials to process.env, enforce HSTS headers, and sanitize user inputs before database queries."${ANSI_RESET}`);
        } else {
          console.log(`${ANSI_YELLOW}"I am ready! I can audit your repository, analyze security headers, test AI guardrails, or generate defensive remediation patches. What would you like to inspect?"${ANSI_RESET}`);
        }

        console.log("");
        askQuestion();
      });
    };

    askQuestion();
  });
}
