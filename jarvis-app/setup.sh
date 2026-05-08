#!/usr/bin/env bash
# Jarvis VPS setup — run once on a fresh Ubuntu 22.04/24.04 server.
# Usage: bash setup.sh
# Set JARVIS_DOMAIN before running to override the default domain.
set -euo pipefail

APP_DIR="/var/jarvis/app"
DATA_DIR="/var/jarvis/data"
VAULT_DIR="/var/jarvis/vault"
VAULT2_DIR="/var/jarvis/vault2"
REPO_URL="https://github.com/vladutzeloo/own-jarvis.git"
BRANCH="main"
DOMAIN="${JARVIS_DOMAIN:-jarvis.vmes.ro}"

echo "=== Jarvis VPS Setup ==="
echo "Domain: $DOMAIN"

# ── 1. System deps ──────────────────────────────────────────────────────────
apt-get update -qq
apt-get install -y -qq curl git nginx certbot python3-certbot-nginx sqlite3

# ── 2. Ollama ───────────────────────────────────────────────────────────────
if ! command -v ollama &>/dev/null; then
  echo "Installing Ollama..."
  curl -fsSL https://ollama.com/install.sh | sh
  systemctl enable ollama
  systemctl start ollama
  sleep 3
fi
echo "Pulling qwen2.5-coder:7b (may take a few minutes)..."
ollama pull qwen2.5-coder:7b

# ── 3. Node.js 20 ───────────────────────────────────────────────────────────
if ! node --version 2>/dev/null | grep -qE "^v2[0-9]"; then
  echo "Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

# ── 4. PM2 ──────────────────────────────────────────────────────────────────
npm install -g pm2 --silent

# ── 5. App directory ─────────────────────────────────────────────────────────
mkdir -p "$APP_DIR" "$DATA_DIR" "$VAULT_DIR" "$VAULT2_DIR"

if [ -d "$APP_DIR/.git" ]; then
  echo "Updating app..."
  git -C "$APP_DIR" pull --rebase origin "$BRANCH"
else
  echo "Cloning repo..."
  git clone -b "$BRANCH" "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR/jarvis-app"
npm install --omit=dev

# ── 6. .env file ─────────────────────────────────────────────────────────────
if [ ! -f .env ]; then
  cp .env.example .env
  echo ""
  echo "┌─────────────────────────────────────────────────────────────┐"
  echo "│  ACTION REQUIRED: Edit the .env file before continuing.     │"
  echo "│                                                              │"
  echo "│  nano $APP_DIR/jarvis-app/.env                              │"
  echo "│                                                              │"
  echo "│  Required:                                                   │"
  echo "│    JARVIS_SECRET  — set a strong passphrase                 │"
  echo "│                                                              │"
  echo "│  Optional (second vault for jarvis.exe integration):        │"
  echo "│    VAULT2_REPO    — GitHub URL of your second vault         │"
  echo "│    VAULT2_PATH    — local clone path (default: /var/jarvis/vault2) │"
  echo "└─────────────────────────────────────────────────────────────┘"
  read -r -p "Press Enter after editing .env to continue..."
fi

# ── 7. PM2 ecosystem (ESM-compatible) ────────────────────────────────────────
cat > "$APP_DIR/jarvis-app/ecosystem.config.cjs" << 'EOF'
module.exports = {
  apps: [{
    name: 'jarvis',
    script: 'server/index.js',
    cwd: '/var/jarvis/app/jarvis-app',
    env_file: '.env',
    watch: false,
    instances: 1,
    autorestart: true,
    max_restarts: 10,
    restart_delay: 3000,
  }]
};
EOF

# PM2 needs --experimental-vm-modules only for older Node; Node 20+ handles ESM natively
pm2 start "$APP_DIR/jarvis-app/ecosystem.config.cjs" || pm2 reload jarvis
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash || true

# ── 8. Nginx ──────────────────────────────────────────────────────────────────
cp "$APP_DIR/jarvis-app/nginx.conf" "/etc/nginx/sites-available/jarvis"
sed -i "s/jarvis\.vmes\.ro/$DOMAIN/g" /etc/nginx/sites-available/jarvis
ln -sf /etc/nginx/sites-available/jarvis /etc/nginx/sites-enabled/jarvis
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ── 9. HTTPS via Let's Encrypt ────────────────────────────────────────────────
echo ""
echo "=== SSL certificate for $DOMAIN ==="
echo "Make sure the DNS A record for $DOMAIN points to this server IP before proceeding."
read -r -p "Press Enter when DNS is ready, or Ctrl+C to skip HTTPS..."
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@vmes.ro" || \
  echo "Certbot failed — run manually: certbot --nginx -d $DOMAIN"

echo ""
echo "=== Setup complete ==="
echo "Jarvis is running at: https://$DOMAIN"
echo ""
echo "Next steps:"
echo "  1. Open https://$DOMAIN in Chrome on your Android phone"
echo "  2. Chrome menu → Add to Home Screen"
echo "  3. Configure jarvis.exe: API URL = https://$DOMAIN, same JARVIS_SECRET"
echo ""
echo "Useful commands:"
echo "  pm2 status         — check running processes"
echo "  pm2 logs jarvis    — live logs"
echo "  pm2 reload jarvis  — reload after .env change"
