import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import * as https from "https";

export interface RealFinding {
  finding_id: string;
  category: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  file_path?: string;
  line_number?: number;
  snippet?: string;
  description: string;
  remediation: string;
}

export interface RealAuditReport {
  status: "COMPLETED";
  scanned_path: string;
  total_files_scanned: number;
  total_findings: number;
  findings: RealFinding[];
}

const SECRET_PATTERNS = [
  { name: "AWS Access Key ID", regex: /AKIA[0-9A-Z]{16}/g, severity: "CRITICAL" as const },
  { name: "AWS Secret Access Key", regex: /(aws_secret_access_key|aws_access_key)\s*=\s*['"][A-Za-z0-9\/+=]{40}['"]/g, severity: "CRITICAL" as const },
  { name: "GitHub Personal Access Token", regex: /ghp_[A-Za-z0-9_]{36}/g, severity: "CRITICAL" as const },
  { name: "Slack Bot Token", regex: /xoxb-[0-9]{11}-[0-9]{11}-[A-Za-z0-9]{24}/g, severity: "HIGH" as const },
  { name: "Generic Private Key", regex: /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/g, severity: "CRITICAL" as const },
  { name: "Hardcoded JWT Token", regex: /eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/g, severity: "MEDIUM" as const }
];

const SAST_PATTERNS = [
  { name: "Command Injection Risk", regex: /(os\.system\(|exec\(|eval\(|child_process\.exec\()/g, severity: "CRITICAL" as const, remediation: "Avoid passing unsanitized user inputs to shell execution functions." },
  { name: "Insecure Hash (MD5 / SHA1)", regex: /(crypto\.createHash\(['"](md5|sha1)['"]\)|hashlib\.md5\(|hashlib\.sha1\()/g, severity: "HIGH" as const, remediation: "Upgrade hash function to SHA-256 or bcrypt/argon2 for password hashing." },
  { name: "SQL Injection Risk", regex: /(SELECT\s+.+\s+FROM\s+.+WHERE\s+.+=\s*['"]\s*\+\s*|query\(['"]SELECT.+SELECT\s+.*\$)/gi, severity: "HIGH" as const, remediation: "Use parameterized queries or prepared statements." },
  { name: "Path Traversal Risk", regex: /(res\.sendFile\(.*req\.query|fs\.readFileSync\(.*req\.body)/g, severity: "HIGH" as const, remediation: "Sanitize user-provided file paths using path.resolve or path.basename." },
  { name: "Wildcard CORS Permissive Header", regex: /Access-Control-Allow-Origin['"]\s*:\s*['"]\*['"]/g, severity: "MEDIUM" as const, remediation: "Restrict Access-Control-Allow-Origin to specific trusted domains." }
];

function shouldSkipFile(filePath: string): boolean {
  const normalized = filePath.replace(/\\/g, "/");
  return (
    normalized.includes("/node_modules/") ||
    normalized.includes("/.git/") ||
    normalized.includes("/dist/") ||
    normalized.includes("/build/") ||
    normalized.includes("/.context/runtime/") ||
    normalized.endsWith(".png") ||
    normalized.endsWith(".jpg") ||
    normalized.endsWith(".zip") ||
    normalized.endsWith(".exe")
  );
}

export function scanWorkspaceReal(targetPath: string): RealAuditReport {
  const absPath = path.resolve(targetPath);
  const findings: RealFinding[] = [];
  let fileCount = 0;

  function traverseDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (shouldSkipFile(fullPath)) continue;

      if (entry.isDirectory()) {
        traverseDir(fullPath);
      } else if (entry.isFile()) {
        fileCount++;
        analyzeFile(fullPath);
      }
    }
  }

  function analyzeFile(filePath: string) {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const lines = content.split("\n");

      // 1. Secret Leak Scan
      SECRET_PATTERNS.forEach((pattern) => {
        lines.forEach((line, idx) => {
          if (pattern.regex.test(line)) {
            findings.push({
              finding_id: `SK-SEC-${findings.length + 1}`,
              category: "Hardcoded Credential / Secret Leak",
              severity: pattern.severity,
              file_path: path.relative(absPath, filePath),
              line_number: idx + 1,
              snippet: line.trim(),
              description: `Exposed ${pattern.name} detected in source file.`,
              remediation: "Move sensitive credentials to environment variables (.env) or a secure key vault."
            });
          }
        });
      });

      // 2. SAST Code Vulnerability Scan
      SAST_PATTERNS.forEach((pattern) => {
        lines.forEach((line, idx) => {
          if (pattern.regex.test(line)) {
            findings.push({
              finding_id: `SK-SAST-${findings.length + 1}`,
              category: "Static Code Vulnerability (SAST)",
              severity: pattern.severity,
              file_path: path.relative(absPath, filePath),
              line_number: idx + 1,
              snippet: line.trim(),
              description: `Potential ${pattern.name} vulnerability pattern detected.`,
              remediation: pattern.remediation
            });
          }
        });
      });
    } catch (err) {
      // Ignore unreadable binary files
    }
  }

  traverseDir(absPath);

  return {
    status: "COMPLETED",
    scanned_path: absPath,
    total_files_scanned: fileCount,
    total_findings: findings.length,
    findings
  };
}

export function evaluateHttpHeadersReal(targetUrl: string): Promise<RealFinding[]> {
  return new Promise((resolve) => {
    const findings: RealFinding[] = [];
    try {
      const client = targetUrl.startsWith("https") ? https : http;
      const req = client.get(targetUrl, { timeout: 3000 }, (res) => {
        const headers = res.headers;

        if (!headers["strict-transport-security"]) {
          findings.push({
            finding_id: "SK-HDR-01",
            category: "Insecure HTTP Headers",
            severity: "HIGH",
            description: "Missing Strict-Transport-Security (HSTS) header.",
            remediation: "Enforce HTTPS with HSTS header: 'Strict-Transport-Security: max-age=31536000; includeSubDomains'."
          });
        }

        if (!headers["content-security-policy"]) {
          findings.push({
            finding_id: "SK-HDR-02",
            category: "Insecure HTTP Headers",
            severity: "MEDIUM",
            description: "Missing Content-Security-Policy (CSP) header.",
            remediation: "Add a CSP header to prevent cross-site scripting (XSS) attacks."
          });
        }

        if (!headers["x-frame-options"]) {
          findings.push({
            finding_id: "SK-HDR-03",
            category: "Insecure HTTP Headers",
            severity: "LOW",
            description: "Missing X-Frame-Options header.",
            remediation: "Set 'X-Frame-Options: DENY' or 'SAMEORIGIN' to mitigate clickjacking."
          });
        }

        resolve(findings);
      });

      req.on("error", () => {
        resolve([]);
      });

      req.end();
    } catch (e) {
      resolve([]);
    }
  });
}
