/**
 * Script Kitty Enterprise - Solid Unicode Block Art Cat Portrait Banner
 * Combines high-density Unicode Block Art (█, ▀, ▄, ▌, ▐) with full cat anatomy:
 * Pointed ears, Fedora with SK logo, Cyber glasses & eyes, Cat nose, Whiskers, Smoking Pipe, Coat & Tie.
 */

export const C_GREEN  = "\x1b[38;2;0;255;157m";    // Matrix Cyber Green (#00FF9D)
export const C_PINK   = "\x1b[38;2;255;0;255m";    // Hot Magenta (#FF00FF)
export const C_PURPLE = "\x1b[38;2;181;95;230m";   // Cyber Purple (#B55FE6)
export const C_CYAN   = "\x1b[38;2;0;229;255m";    // Neon Cyan (#00E5FF)
export const C_YELLOW = "\x1b[38;2;255;215;0m";    // Gold Yellow (#FFD700)
export const C_RED    = "\x1b[38;2;255;70;70m";    // Ember Red (#FF4646)
export const C_WHITE  = "\x1b[38;2;255;255;255m";  // Pure White (#FFFFFF)
export const BOLD     = "\x1b[1m";
export const RESET    = "\x1b[0m";

export const ANSI_GREEN = C_GREEN;
export const ANSI_PURPLE = C_PURPLE;
export const ANSI_CYAN = C_CYAN;
export const ANSI_YELLOW = C_YELLOW;
export const ANSI_RED = C_RED;
export const ANSI_RESET = RESET;
export const ANSI_BOLD = BOLD;

export const STATIC_BANNER = `
${C_GREEN}${BOLD} █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█${RESET}
${C_GREEN}${BOLD} █ ${C_PINK}${BOLD} S C R I P T   K I T T Y   E N T E R P R I S E   E N G I N E ${C_GREEN}${BOLD} █${RESET}
${C_GREEN}${BOLD} █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█${RESET}

${C_PURPLE}             ▄▄████████████▄▄             ${C_PINK}${BOLD}[SK ENGINE v1.0]${RESET}
${C_PURPLE}           ▄██████████████████▄           ${C_CYAN}SYSTEM: //SCRIPT_KITTY_SEC_AUDIT.SH${RESET}
${C_PURPLE}          ██████████████████████          ${C_GREEN}STATUS: ACTIVE ENTERPRISE AUDIT${RESET}
${C_PINK}${BOLD}      ▄▄▄▄█████████[ S K ]████████▄▄▄▄    ${RESET}
${C_GREEN} ◢█▄  ${C_PURPLE}▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀${C_GREEN}  ▄█◣ ${C_YELLOW}[INFO] Zero-Trust Policy Core: OK${RESET}
${C_GREEN} █ ▀█▄  ▄█▀▀████████████████▀▀█▄  ▄█▀ █ ${C_GREEN}[INFO] SHA-256 Merkle Chain: VERIFIED${RESET}
${C_GREEN} ▀▀▀▀▀▀▀▀                    ▀▀▀▀▀▀▀▀ 
${C_GREEN}           █   ▄▄▄▄▄      ▄▄▄▄▄   █       ${C_CYAN}>> SECURITY MODULES ACTIVE <<${RESET}
${C_GREEN}           █  █${C_WHITE}█████${C_GREEN}█    █${C_WHITE}█████${C_GREEN}█  █       ${C_GREEN}[+] SAST Code Vulnerability Scanner${RESET}
${C_GREEN}           █  █${C_CYAN}▀███▀${C_GREEN}█    █${C_CYAN}▀███▀${C_GREEN}█  █ ${C_PINK}░▒°${RESET}   ${C_GREEN}[+] Secret & Credential Leak Engine${RESET}
${C_GREEN}   ▄▄▄▄▄▄▄▄▀▄  ▀▀▀▀▀  ▄  ▀▀▀▀▀  ▄▀▄▄▄▄▄▄▄ ${C_PINK}▒°${RESET}[+] AI Guardrail Prompt Validator${RESET}
${C_GREEN}           ▀▄▄▄    ▄███▄    ▄▄▄▀ ${C_PURPLE}╰─📜${C_RED}🔥${RESET} ${C_GREEN}[+] Patch Cat Automated Fix Exporter${RESET}
${C_GREEN}          ▄█▀▀██████████████▀▀█▄          ${C_YELLOW}-----------------------------------${RESET}
${C_GREEN}         ▄█   █ ▀▀▀▀██▀▀▀▀ █   █▄         ${C_PINK}${BOLD}"Your Patch Cat — Bug Hunter"${RESET}
${C_GREEN}        ▄█    █   ▄████▄   █    █▄        ${C_YELLOW}-----------------------------------${RESET}
${C_GREEN}       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀      ${RESET}
`;

export function printBanner(): void {
  process.stdout.write(STATIC_BANNER + "\n");
}

export async function animateBanner(): Promise<void> {
  printBanner();
}
