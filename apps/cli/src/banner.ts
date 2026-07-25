/**
 * Script Kitty Enterprise - Cyber Detective ANSI Art Banner
 * Features a detailed 24-bit TrueColor ANSI Detective Cat with Fedora Hat, Glasses, Pipe, & Trench Coat.
 */

// TrueColor (RGB) ANSI Escape Codes
export const C_GREEN  = "\x1b[38;2;0;255;157m";    // Matrix Cyber Green
export const C_PINK   = "\x1b[38;2;255;0;255m";    // Neon Magenta/Pink
export const C_PURPLE = "\x1b[38;2;181;95;230m";   // Cyber Purple
export const C_CYAN   = "\x1b[38;2;0;229;255m";    // Neon Cyan
export const C_YELLOW = "\x1b[38;2;255;215;0m";    // Gold Yellow
export const C_RED    = "\x1b[38;2;255;70;70m";    // Alert Red
export const C_DIM    = "\x1b[38;2;100;116;139m";  // Muted Gray
export const BOLD     = "\x1b[1m";
export const RESET    = "\x1b[0m";

// Aliases for compatibility
export const ANSI_GREEN = C_GREEN;
export const ANSI_PURPLE = C_PURPLE;
export const ANSI_RESET = RESET;
export const ANSI_BOLD = BOLD;

export const CYBER_DETECTIVE_CAT = `
${C_GREEN}${BOLD}  SCRIPT KITTY ENTERPRISE ${RESET}
${C_PINK}${BOLD}     SECURITY AUDIT ENGINE ${RESET}

${C_GREEN}         _/\/\/\/\/\_          ${C_PINK}${BOLD}[SK]${RESET}
${C_GREEN}       /  #@%: .#@%  \\         ${C_CYAN}SYSTEM: //SCRIPT_KITTY_SEC_AUDIT.SH${RESET}
${C_GREEN}     /=================\\       ${C_PURPLE}>>> STATUS: ACTIVE ENTERPRISE AUDIT${RESET}
${C_GREEN}     | ${C_PINK}${BOLD}#%: +--  SK  --+${C_GREEN} |
${C_GREEN}    /===================\\      ${C_YELLOW}[INFO] Zero-Trust Policy Engine: OK${RESET}
${C_GREEN}   (   ${C_PINK}${BOLD}#@%           #@${C_GREEN}   )     ${C_GREEN}[INFO] SHA-256 Hash Chain: VERIFIED${RESET}
${C_GREEN}  /_______________________\\
${C_GREEN}     /   ${C_CYAN}_____________   ${C_GREEN}\\     ${C_CYAN}>> SECURITY MODULAR AUDIT <<${RESET}
${C_GREEN}    /   ${C_CYAN}/  ${C_GREEN}O${C_CYAN}  \\_/  ${C_GREEN}O${C_CYAN}  \\  ${C_GREEN}\\    ${C_GREEN}[+] SAST Code Vulnerability Scanner${RESET}
${C_GREEN}   |   ${C_CYAN}(  ${C_GREEN}(#)${C_CYAN}  _  ${C_GREEN}(#)${C_CYAN}  )  ${C_GREEN}|   ${C_GREEN}[+] Credential & Secret Leak Engine${RESET}
${C_GREEN}  ==--- ${C_CYAN}\\_____/ \\_____/  ${C_GREEN}---==  ${C_GREEN}[+] AI Guardrail & Prompt-Injection Validator${RESET}
${C_GREEN}   \\      \\___-O-___/     /    ${C_GREEN}[+] Patch Cat Automated Remediation Exporter${RESET}
${C_GREEN}  / \\ \\   / /  |  \\ \\   / / \\
${C_GREEN} /   --\\ ( ( \\ | / ) ) /--   \\ ${C_YELLOW}------------------------------------------------${RESET}
${C_GREEN}|   /  |  \\_\\__|__/  /  |  \\  |${C_PINK}${BOLD}  "Your Patch Cat — Hunting Bugs, Patching Flaws"${RESET}
${C_GREEN}|  |   |    |--|--|     |   | |${C_YELLOW}------------------------------------------------${RESET}
${C_GREEN}|  |  / \\   |  |  |    / \\  | |
${C_GREEN}\\__\\_/__/   \\__/\\__/   \\__\\_/__/
${RESET}
`;

export function printBanner() {
  console.log(CYBER_DETECTIVE_CAT);
}
