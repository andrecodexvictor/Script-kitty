#!/usr/bin/env bash
# ==============================================================================
# Script Kitty — Security Bot Deployment Script (Linux / Docker)
# ==============================================================================
set -euo pipefail

echo "🐱 [Script Kitty] Deploying Security Bot Container..."

# 1. Verify Scope & Context Configuration
if [ ! -f "scope.md" ]; then
    echo "❌ Error: scope.md is required before launching Script Kitty Bot."
    exit 1
fi

# 2. Build Docker Container with Sandbox Isolation
echo "📦 Building Docker Security Bot Image..."
docker build -t script-kitty-bot:latest -f Dockerfile .

# 3. Launch Container in Low-Privilege Mode
echo "🚀 Launching Script Kitty Bot..."
docker run -d \
  --name script-kitty-security-bot \
  --read-only \
  --cap-drop=ALL \
  --memory=512m \
  --cpu-shares=512 \
  -v "$(pwd)/.context:/app/.context:rw" \
  -v "$(pwd)/scope.md:/app/scope.md:ro" \
  script-kitty-bot:latest

echo "✅ Script Kitty Security Bot deployed successfully!"
echo "📡 Monitoring repository for automated security validation & audit logging."
