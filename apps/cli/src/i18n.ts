/**
 * Script Kitty Internationalization (i18n) Module
 * Default Language: English (en)
 * Supported: English (en), Portuguese (pt), Spanish (es)
 */

export type SupportedLang = "en" | "pt" | "es";

export interface I18nDictionary {
  bannerTitle: string;
  bannerStatus: string;
  auditStart: string;
  stepSast: string;
  stepSecrets: string;
  stepHeaders: string;
  stepAi: string;
  detectiveGreeting: string;
  allClean: string;
  patchRecommendationHeader: string;
  patchHintEnv: string;
  patchHintHeaders: string;
  auditComplete: string;
  scoutOpportunity: string;
}

export const TRANSLATIONS: Record<SupportedLang, I18nDictionary> = {
  en: {
    bannerTitle: "Your Patch Cat — Enterprise Security Engine",
    bannerStatus: "STATUS: ACTIVE ENTERPRISE AUDIT",
    auditStart: "[*] Initiating Enterprise Security Audit on",
    stepSast: "🔍 [1/4] Analyzing source code (SAST): Scanning for injection & security vulnerabilities...",
    stepSecrets: "🔑 [2/4] Verifying secrets: Checking for exposed API keys or credentials...",
    stepHeaders: "🌐 [3/4] Evaluating HTTP headers: Checking HTTPS & HSTS security headers...",
    stepAi: "🤖 [4/4] Testing AI Guardrails: Simulating prompt injection vectors...",
    detectiveGreeting: "\"Hello! Detective Script Kitty analyzed your codebase. Here is a friendly patch summary:\"",
    allClean: "✅ All clean in your primary code path!",
    patchRecommendationHeader: "💡 Patch Cat Recommended Fix:",
    patchHintEnv: "   - Ensure credentials use environment variables (e.g. process.env.API_KEY).",
    patchHintHeaders: "   - Add 'helmet' middleware to enforce HTTP security headers.",
    auditComplete: "[✓] AUDIT COMPLETE! Repository state recorded in agent memory.",
    scoutOpportunity: "\"We found an optimization opportunity! Here is how to fix it:\""
  },
  pt: {
    bannerTitle: "Seu Gatinho do Patch — Engine de Segurança Corporativa",
    bannerStatus: "STATUS: AUDITORIA CORPORATIVA ATIVA",
    auditStart: "[*] Iniciando Auditoria de Segurança Corporativa em",
    stepSast: "🔍 [1/4] Analisando código-fonte (SAST): Buscando falhas de injeção e segurança...",
    stepSecrets: "🔑 [2/4] Verificando segredos: Buscando senhas ou chaves de API expostas...",
    stepHeaders: "🌐 [3/4] Avaliando cabeçalhos HTTP: Verificando proteção HTTPS e HSTS...",
    stepAi: "🤖 [4/4] Testando Guardrails de IA: Simulando injeções de prompt em modelos...",
    detectiveGreeting: "\"Olá! O Detetive Script Kitty analisou seu projeto. Aqui está um resumo amigável do que fazer:\"",
    allClean: "✅ Tudo limpo no seu código principal!",
    patchRecommendationHeader: "💡 Dica de Correção Recomendada (Patch Cat Fix):",
    patchHintEnv: "   - Certifique-se de usar variáveis de ambiente para senhas (ex: process.env.API_KEY).",
    patchHintHeaders: "   - Adicione o middleware 'helmet' para proteger cabeçalhos HTTP.",
    auditComplete: "[✓] AUDITORIA CONCLUÍDA! O estado do seu repositório foi salvo na memória do agente.",
    scoutOpportunity: "\"Achamos uma oportunidade de melhoria no alvo! Veja como corrigir:\""
  },
  es: {
    bannerTitle: "Tu Gato Defensor — Motor de Seguridad Empresarial",
    bannerStatus: "ESTADO: AUDITORÍA EMPRESARIAL ACTIVA",
    auditStart: "[*] Iniciando Auditoría de Seguridad Empresarial en",
    stepSast: "🔍 [1/4] Analizando código fuente (SAST): Buscando vulnerabilidades de inyección...",
    stepSecrets: "🔑 [2/4] Verificando secretos: Buscando claves de API o credenciales expuestas...",
    stepHeaders: "🌐 [3/4] Evaluando encabezados HTTP: Verificando protección HTTPS y HSTS...",
    stepAi: "🤖 [4/4] Probando barreras de IA: Simulando inyecciones de prompt...",
    detectiveGreeting: "\"¡Hola! El Detective Script Kitty analizó tu código. Aquí hay un resumen amigable:\"",
    allClean: "✅ ¡Todo limpio en tu código principal!",
    patchRecommendationHeader: "💡 Parche Recomendado por Patch Cat:",
    patchHintEnv: "   - Asegúrate de usar variables de entorno para credenciales (ej. process.env.API_KEY).",
    patchHintHeaders: "   - Agrega el middleware 'helmet' para aplicar encabezados de seguridad HTTP.",
    auditComplete: "[✓] ¡AUDITORÍA COMPLETADA! Estado guardado en la memoria del agente.",
    scoutOpportunity: "\"¡Encontramos una oportunidad de mejora! Aquí está cómo corregirlo:\""
  }
};

export function getTranslation(lang: string = "en"): I18nDictionary {
  const normalized = (lang || "en").toLowerCase() as SupportedLang;
  return TRANSLATIONS[normalized] || TRANSLATIONS.en;
}
