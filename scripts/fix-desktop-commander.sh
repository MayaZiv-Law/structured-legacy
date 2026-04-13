#!/usr/bin/env bash
#
# fix-desktop-commander.sh
# Diagnoses and fixes Desktop Commander MCP server disconnection issues.
# Works on macOS and Linux. Run from any directory.
#
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()   { echo -e "${BLUE}[INFO]${NC}  $*"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
err()   { echo -e "${RED}[ERR]${NC}   $*"; }

# ---------- detect OS ----------
OS="unknown"
case "$(uname -s)" in
  Darwin*) OS="mac";;
  Linux*)  OS="linux";;
  MINGW*|MSYS*|CYGWIN*) OS="windows";;
esac

CLAUDE_CONFIG=""
if [[ "$OS" == "mac" ]]; then
  CLAUDE_CONFIG="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
elif [[ "$OS" == "linux" ]]; then
  CLAUDE_CONFIG="${XDG_CONFIG_HOME:-$HOME/.config}/Claude/claude_desktop_config.json"
elif [[ "$OS" == "windows" ]]; then
  CLAUDE_CONFIG="$APPDATA/Claude/claude_desktop_config.json"
fi

echo ""
echo "========================================"
echo "  Desktop Commander MCP - Fix Tool"
echo "========================================"
echo ""

# ---------- Step 1: Check Node.js ----------
log "Step 1/6: Checking Node.js..."
if ! command -v node &>/dev/null; then
  err "Node.js is not installed! Install Node.js 18+ first."
  exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if (( NODE_VERSION < 18 )); then
  err "Node.js version is too old (v$(node -v)). Desktop Commander requires Node.js 18+."
  exit 1
fi
ok "Node.js $(node -v) detected"

NODE_PATH=$(which node)
log "  Absolute path: $NODE_PATH"

# ---------- Step 2: Kill lingering processes ----------
log "Step 2/6: Killing lingering Desktop Commander processes..."
KILLED=0
if pgrep -f "desktop-commander" &>/dev/null; then
  pkill -f "desktop-commander" 2>/dev/null || true
  KILLED=1
fi
if pgrep -f "DesktopCommanderMCP" &>/dev/null; then
  pkill -f "DesktopCommanderMCP" 2>/dev/null || true
  KILLED=1
fi
if [[ $KILLED -eq 1 ]]; then
  ok "Killed lingering processes"
else
  ok "No lingering processes found"
fi

# ---------- Step 3: Clean npm/npx cache ----------
log "Step 3/6: Cleaning npm/npx cache (this fixes module resolution errors)..."

# Remove npx cache (fixes "Cannot find module './api/api.js'" - Issue #296)
NPX_CACHE_DIRS=(
  "$HOME/.npm/_npx"
  "$HOME/.cache/npm/_npx"
)
for dir in "${NPX_CACHE_DIRS[@]}"; do
  if [[ -d "$dir" ]]; then
    rm -rf "$dir"
    ok "Removed npx cache: $dir"
  fi
done

# Clean npm cache
npm cache clean --force 2>/dev/null
ok "npm cache cleaned"

# ---------- Step 4: Install Desktop Commander properly ----------
log "Step 4/6: Installing Desktop Commander (direct install, not Smithery)..."

# Use npx to run setup - this is the officially recommended method
npx @wonderwhy-er/desktop-commander@latest setup 2>&1 || {
  warn "npx setup failed. Trying alternative install..."
  # Alternative: global install
  npm install -g @wonderwhy-er/desktop-commander@latest 2>&1 || {
    err "Installation failed. Check your network connection and try again."
    exit 1
  }
  ok "Installed globally as fallback"
}
ok "Desktop Commander installed"

# ---------- Step 5: Find the actual installed path ----------
log "Step 5/6: Locating Desktop Commander entry point..."

DC_PATH=""

# Check common locations
CANDIDATES=(
  "$(npm root -g 2>/dev/null)/@wonderwhy-er/desktop-commander/dist/index.js"
  "$HOME/.npm/_npx/**/node_modules/@wonderwhy-er/desktop-commander/dist/index.js"
  "$HOME/node_modules/@wonderwhy-er/desktop-commander/dist/index.js"
)

for candidate in "${CANDIDATES[@]}"; do
  # Use ls to expand globs
  for f in $candidate; do
    if [[ -f "$f" ]]; then
      DC_PATH="$f"
      break 2
    fi
  done
done

# Fallback: use npx which resolution
if [[ -z "$DC_PATH" ]]; then
  DC_PATH=$(npx --yes which @wonderwhy-er/desktop-commander 2>/dev/null || echo "")
fi

if [[ -z "$DC_PATH" ]]; then
  warn "Could not find exact path. Config will use npx (less reliable)."
  USE_NPX=true
else
  ok "Found at: $DC_PATH"
  USE_NPX=false
fi

# ---------- Step 6: Generate / fix Claude Desktop config ----------
log "Step 6/6: Generating Claude Desktop config..."

if [[ -z "$CLAUDE_CONFIG" ]]; then
  err "Could not determine Claude Desktop config path for OS: $OS"
  err "Manually create the config - see output below."
fi

# Build the mcpServers block for desktop-commander
if [[ "$USE_NPX" == "true" ]]; then
  DC_SERVER_JSON=$(cat <<JSONEOF
{
      "command": "$NODE_PATH",
      "args": [
        "$(which npx)",
        "-y",
        "@wonderwhy-er/desktop-commander@latest"
      ],
      "env": {
        "NODE_NO_WARNINGS": "1"
      }
    }
JSONEOF
)
else
  DC_SERVER_JSON=$(cat <<JSONEOF
{
      "command": "$NODE_PATH",
      "args": ["$DC_PATH"],
      "env": {
        "NODE_NO_WARNINGS": "1"
      }
    }
JSONEOF
)
fi

echo ""
echo "========================================"
echo "  Results"
echo "========================================"
echo ""

# Check if config file exists and has content
if [[ -n "$CLAUDE_CONFIG" && -f "$CLAUDE_CONFIG" ]]; then
  warn "Existing config found at:"
  warn "  $CLAUDE_CONFIG"
  echo ""
  echo -e "${YELLOW}Your desktop-commander block should look like this:${NC}"
  echo ""
  echo "  \"desktop-commander\": $DC_SERVER_JSON"
  echo ""
  echo -e "${YELLOW}Key points:${NC}"
  echo "  - Use ABSOLUTE path to node: $NODE_PATH"
  echo "  - Use ABSOLUTE path to server (not npx if possible)"
  echo "  - Add NODE_NO_WARNINGS=1 to suppress noisy warnings"
  echo ""

  # Offer to backup and patch
  read -rp "Do you want me to auto-patch the config? (y/n) " REPLY
  if [[ "$REPLY" == "y" || "$REPLY" == "Y" ]]; then
    cp "$CLAUDE_CONFIG" "${CLAUDE_CONFIG}.backup.$(date +%s)"
    ok "Backup created"

    # Use node to safely merge JSON
    node -e "
      const fs = require('fs');
      const config = JSON.parse(fs.readFileSync('$CLAUDE_CONFIG', 'utf8'));
      if (!config.mcpServers) config.mcpServers = {};
      config.mcpServers['desktop-commander'] = $DC_SERVER_JSON;
      fs.writeFileSync('$CLAUDE_CONFIG', JSON.stringify(config, null, 2));
      console.log('Config updated successfully');
    " 2>&1
    ok "Config patched!"
  fi
else
  if [[ -n "$CLAUDE_CONFIG" ]]; then
    log "Creating new config at: $CLAUDE_CONFIG"
    mkdir -p "$(dirname "$CLAUDE_CONFIG")"
    cat > "$CLAUDE_CONFIG" <<CONFEOF
{
  "mcpServers": {
    "desktop-commander": $DC_SERVER_JSON
  }
}
CONFEOF
    ok "Config created!"
  fi
fi

echo ""
echo "========================================"
echo "  Next Steps"
echo "========================================"
echo ""
echo "  1. Quit Claude Desktop completely (Cmd+Q / Alt+F4)"
echo "  2. Wait 5 seconds"
echo "  3. Reopen Claude Desktop"
echo "  4. Desktop Commander should now stay connected"
echo ""
echo "  If it STILL disconnects, run this to see the actual error:"
echo ""
echo "    $NODE_PATH ${DC_PATH:-\$(npx -y which @wonderwhy-er/desktop-commander)}"
echo ""
echo "  And send the error output to:"
echo "  https://github.com/wonderwhy-er/DesktopCommanderMCP/issues"
echo ""
ok "Done!"
