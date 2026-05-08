#!/usr/bin/env bash
# Jarvis VPS setup — run once on a fresh Ubuntu 22.04/24.04 server
# Usage: bash setup.sh
set -euo pipefail

APP_DIR="/var/jarvis/app"
DATA_DIR="/var/jarvis/data"
VAULT_DIR="/var/jarvis/vault"
REPO_URL="https://github.com/vladutzeloo/own-jarvis.git"
BRANCH="main"
DOMAIN="${JARVIS_DOMAIN:-jarvis.vmes.ro}"

echo "=== Jarvis VPS Setup ==="

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
echo "Pulling qwen2.5-coder:7b (this may take a few minutes)..."
ollama pull qwen2.5-coder:7b

# ── 3. Node.js 20 ───────────────────────────────────────────────────────────
if ! node --version 2>/dev/null | grep -q "v2"; then
  echo "Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

# ── 4. PM2 ──────────────────────────────────────────────────────────────────
npm install -g pm2 --silent

# ── 5. App directory ─────────────────────────────────────────────────────────
mkdir -p "$APP_DIR" "$DATA_DIR" "$VAULT_DIR"

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
  echo ">>> IMPORTANT: Edit $APP_DIR/jarvis-app/.env and set JARVIS_SECRET before continuing"
  echo ">>> Run: nano $APP_DIR/jarvis-app/.env"
  echo ">>> Then re-run: pm2 start ecosystem.config.cjs && pm2 save"
fi

# ── 7. PM2 ecosystem ─────────────────────────────────────────────────────────
cat > "$APP_DIR/jarvis-app/ecosystem.config.cjs" << 'EOF'
module.exports = {
  apps: [{
    name: 'jarvis',
    script: './server/index.js',
    interpreter: 'node',
    interpreter_args: '--experimental-vm-modules',
    cwd: '/var/jarvis/app/jarvis-app',
    env_file: '.env',
    watch: false,
    instances: 1,
    autorestart: true,
    max_restarts: 10,
  }]
};
EOF

pm2 start "$APP_DIR/jarvis-app/ecosystem.config.cjs" || pm2 reload jarvis
pm2 save
pm2 startup systemd -u root --hp /root | bash || true

# ── 8. Nginx ──────────────────────────────────────────────────────────────────
cp "$APP_DIR/jarvis-app/nginx.conf" "/etc/nginx/sites-available/jarvis"
sed -i "s/jarvis.vmes.ro/$DOMAIN/g" /etc/nginx/sites-available/jarvis
ln -sf /etc/nginx/sites-available/jarvis /etc/nginx/sites-enabled/jarvis
nginx -t && systemctl reload nginx

# ── 9. HTTPS via Let's Encrypt ────────────────────────────────────────────────
echo ""
echo "=== Getting SSL certificate for $DOMAIN ==="
echo "Make sure DNS A record for $DOMAIN points to this server's IP first!"
read -r -p "Press Enter when DNS is ready, or Ctrl+C to skip HTTPS for now..."
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@vmes.ro" || \
  echo "Certbot failed — run manually: certbot --nginx -d $DOMAIN"

echo ""
echo "=== Setup complete ==="
echo "Jarvis is running at: https://$DOMAIN"
echo "Check status: pm2 status"
echo "View logs:    pm2 logs jarvis"
