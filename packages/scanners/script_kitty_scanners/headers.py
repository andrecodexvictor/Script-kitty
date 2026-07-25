import requests
from typing import Dict, Any, List

class HeaderSecurityScanner:
    """Evaluates security headers and SSL configuration of HTTP endpoints."""
    
    RECOMMENDED_HEADERS = {
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Content-Security-Policy": "default-src 'self'",
        "X-Permitted-Cross-Domain-Policies": "none",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    }

    def evaluate_headers(self, target_url: str) -> Dict[str, Any]:
        findings = []
        try:
            response = requests.head(target_url, timeout=5, allow_redirects=True)
            headers = response.headers

            for header_name, expected in self.RECOMMENDED_HEADERS.items():
                if header_name not in headers:
                    findings.append({
                        "finding_id": f"SK-HDR-{len(findings)+1:03d}",
                        "category": "Insecure HTTP Headers",
                        "severity": "MEDIUM",
                        "target": target_url,
                        "missing_header": header_name,
                        "recommended_value": expected,
                        "evidence": f"Header '{header_name}' is absent from server response.",
                        "remediation": f"Configure web server to include '{header_name}: {expected}'.",
                        "recheck_plan": f"curl -I {target_url}"
                    })
        except Exception as e:
            return {"status": "ERROR", "error": str(e), "findings": []}

        return {
            "status": "COMPLETED",
            "target": target_url,
            "missing_headers_count": len(findings),
            "findings": findings
        }
