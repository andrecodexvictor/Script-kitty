/**
 * Script Kitty ANSI Art Detective Cat Banner
 * Uses ANSI escape codes for vibrant terminal colors and styles.
 */

export const ANSI_GREEN = "\x1b[38;2;0;255;157m";
export const ANSI_PURPLE = "\x1b[38;2;181;95;230m";
export const ANSI_CYAN = "\x1b[38;2;59;130;246m";
export const ANSI_YELLOW = "\x1b[38;2;245;158;11m";
export const ANSI_BOLD = "\x1b[1m";
export const ANSI_RESET = "\x1b[0m";

export const DETECTIVE_CAT_ANSI = `
${ANSI_PURPLE}${ANSI_BOLD}             /\\___/\\${ANSI_RESET}   ${ANSI_GREEN}${ANSI_BOLD}Script Kitty v1.0.0${ANSI_RESET}
${ANSI_PURPLE}${ANSI_BOLD}            /  ---  \\${ANSI_RESET}  ${ANSI_CYAN}Your Patch Cat — Enterprise Security Engine${ANSI_RESET}
${ANSI_PURPLE}${ANSI_BOLD}           (  ${ANSI_GREEN}o${ANSI_PURPLE}_${ANSI_GREEN}o${ANSI_PURPLE}  )${ANSI_RESET}  ${ANSI_YELLOW}------------------------------------------${ANSI_RESET}
${ANSI_GREEN}${ANSI_BOLD}           /======= \\${ANSI_RESET}   ${ANSI_GREEN}[+] Zero-Trust Policy Engine (Rust Core)${ANSI_RESET}
${ANSI_GREEN}${ANSI_BOLD}          /  /   \\  \\${ANSI_RESET}  ${ANSI_GREEN}[+] SHA-256 Hash-Chained Audit Logging${ANSI_RESET}
${ANSI_GREEN}${ANSI_BOLD}         (  ( [?] )  )${ANSI_RESET} ${ANSI_GREEN}[+] SAST Code, Secrets & AI Guardrail Audit${ANSI_RESET}
${ANSI_PURPLE}${ANSI_BOLD}          \\__\\___/__/${ANSI_RESET}   ${ANSI_YELLOW}------------------------------------------${ANSI_RESET}
${ANSI_CYAN}${ANSI_BOLD}             /\\__\\/\\${ANSI_RESET}
`;

export function printBanner() {
  console.log(DETECTIVE_CAT_ANSI);
}
