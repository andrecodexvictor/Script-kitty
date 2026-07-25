import * as fs from "fs";
import * as path from "path";

export interface AICredentials {
  openaiApiKey?: string;
  googleApiKey?: string;
  nvidiaApiKey?: string;
  openrouterApiKey?: string;
  anthropicApiKey?: string;
  grokApiKey?: string;
  codexSubscriptionToken?: string;
  activeProvider: "openai" | "google" | "nvidia" | "openrouter" | "claude" | "grok" | "codex";
}

const CREDENTIALS_FILE = path.resolve(".context", "config", "credentials.json");

export function loadCredentials(): AICredentials {
  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const data = fs.readFileSync(CREDENTIALS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    // Return fallback defaults
  }
  return {
    activeProvider: "openai"
  };
}

export function saveCredentials(creds: Partial<AICredentials>): AICredentials {
  const current = loadCredentials();
  const updated: AICredentials = { ...current, ...creds };

  const dir = path.dirname(CREDENTIALS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}
