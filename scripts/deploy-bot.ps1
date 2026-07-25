# ==============================================================================
# Script Kitty — Security Bot Deployment Script (Windows PowerShell)
# ==============================================================================
$ErrorActionPreference = "Stop"

Write-Host "🐱 [Script Kitty] Deploying Security Bot Container..." -ForegroundColor Green

if (-not (Test-Path "scope.md")) {
    Write-Host "❌ Error: scope.md is required before launching Script Kitty Bot." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Building Docker Security Bot Image..." -ForegroundColor Cyan
docker build -t script-kitty-bot:latest -f Dockerfile .

Write-Host "🚀 Launching Script Kitty Bot Container..." -ForegroundColor Green
docker run -d `
  --name script-kitty-security-bot `
  --read-only `
  --cap-drop=ALL `
  --memory=512m `
  --cpu-shares=512 `
  -v "${PWD}/.context:/app/.context:rw" `
  -v "${PWD}/scope.md:/app/scope.md:ro" `
  script-kitty-bot:latest

Write-Host "✅ Script Kitty Security Bot deployed successfully!" -ForegroundColor Green
Write-Host "📡 Monitoring repository for automated security validation & audit logging." -ForegroundColor Yellow
