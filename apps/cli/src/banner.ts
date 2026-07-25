/**
 * Script Kitty Enterprise - High-Density Unicode Block Art Detective Banner
 * Uses Unicode Block Characters (█, ▀, ▄, ▌, ▐, ░) and 24-bit TrueColor ANSI escape codes
 * to render a solid, pixel-perfect Cyber Detective Cat in standard terminals.
 */

// TrueColor (RGB) ANSI Escape Codes
export const C_GREEN  = "\x1b[38;2;0;255;157m";    // Matrix Cyber Green (#00FF9D)
export const C_PINK   = "\x1b[38;2;255;0;255m";    // Hot Magenta (#FF00FF)
export const C_PURPLE = "\x1b[38;2;181;95;230m";   // Cyber Purple (#B55FE6)
export const C_CYAN   = "\x1b[38;2;0;229;255m";    // Neon Cyan (#00E5FF)
export const C_YELLOW = "\x1b[38;2;255;215;0m";    // Gold Yellow (#FFD700)
export const C_WHITE  = "\x1b[38;2;255;255;255m";  // Pure White (#FFFFFF)
export const C_DARK   = "\x1b[38;2;30;41;59m";     // Dark Slate (#1E293B)
export const BOLD     = "\x1b[1m";
export const RESET    = "\x1b[0m";

// Aliases for compatibility
export const ANSI_GREEN = C_GREEN;
export const ANSI_PURPLE = C_PURPLE;
export const ANSI_CYAN = C_CYAN;
export const ANSI_YELLOW = C_YELLOW;
export const ANSI_RESET = RESET;
export const ANSI_BOLD = BOLD;

export const BLOCK_ART_DETECTIVE_CAT = `
${C_GREEN}${BOLD} █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█${RESET}
${C_GREEN}${BOLD} █ ${C_PINK}${BOLD} S C R I P T   K I T T Y   E N T E R P R I S E   E N G I N E ${C_GREEN}${BOLD} █${RESET}
${C_GREEN}${BOLD} █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█${RESET}

${C_PURPLE}            ▄▄████████████▄▄           ${C_PINK}${BOLD}[SK ENGINE v1.0]${RESET}
${C_PURPLE}          ▄██████████████████▄         ${C_CYAN}SYSTEM: //SCRIPT_KITTY_SEC_AUDIT.SH${RESET}
${C_PURPLE}         ██████████████████████        ${C_GREEN}STATUS: ACTIVE ENTERPRISE AUDIT${RESET}
${C_PINK}${BOLD}     ▄▄▄▄█████████[ S K ]████████▄▄▄▄  ${RESET}
${C_PURPLE}     ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  ${C_YELLOW}[INFO] Zero-Trust Policy Core: OK${RESET}
${C_GREEN}          █   ▄▄▄▄▄     ▄▄▄▄▄   █      ${C_GREEN}[INFO] SHA-256 Merkle Chain: VERIFIED${RESET}
${C_GREEN}          █  █${C_WHITE}█████${C_GREEN}█   █${C_WHITE}█████${C_GREEN}█  █     
${C_GREEN}          █  █${C_CYAN}▀███▀${C_GREEN}█   █${C_CYAN}▀███▀${C_GREEN}█  █      ${C_CYAN}>> SECURITY MODULES ACTIVE <<${RESET}
${C_GREEN}          ▀▄  ▀▀▀▀▀  ▄  ▀▀▀▀▀  ▄▀      ${C_GREEN}[+] SAST Code Vulnerability Scanner${RESET}
${C_GREEN}           ▀▄▄▄    ▄███▄    ▄▄▄▀       ${C_GREEN}[+] Secret & Credential Leak Engine${RESET}
${C_GREEN}          ▄█▀▀██████████████▀▀█▄       ${C_GREEN}[+] AI Guardrail Prompt Validator${RESET}
${C_GREEN}         ▄█   █ ▀▀▀▀██▀▀▀▀ █   █▄      ${C_GREEN}[+] Patch Cat Automated Fix Exporter${RESET}
${C_GREEN}        ▄█    █    ▄██▄    █    █▄     ${C_YELLOW}-----------------------------------${RESET}
${C_GREEN}       ▄█     █   ▄████▄   █     █▄    ${C_PINK}${BOLD}"Your Patch Cat — Bug Hunter"${RESET}
${C_GREEN}      ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  ${C_YELLOW}-----------------------------------${RESET}
${RESET}
`;

export function printBanner() {
  console.log(BLOCK_ART_DETECTIVE_CAT);
}
