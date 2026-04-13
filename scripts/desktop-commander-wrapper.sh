#!/usr/bin/env bash
#
# desktop-commander-wrapper.sh
# A resilient wrapper for Desktop Commander MCP server.
# Auto-restarts on crash with exponential backoff.
#
# Usage in claude_desktop_config.json:
#   "desktop-commander": {
#     "command": "/bin/bash",
#     "args": ["/FULL/PATH/TO/desktop-commander-wrapper.sh"]
#   }
#
set -uo pipefail

# ---------- Configuration ----------
MAX_RESTARTS=10           # Max restarts before giving up
INITIAL_BACKOFF=1         # First restart delay (seconds)
MAX_BACKOFF=30            # Maximum restart delay (seconds)
RESET_AFTER=120           # Reset restart counter if stable for this many seconds
LOG_FILE="${HOME}/.desktop-commander-wrapper.log"

# ---------- Find Desktop Commander ----------
# Try absolute path first, fall back to npx
DC_PATHS=(
  "$(npm root -g 2>/dev/null)/@wonderwhy-er/desktop-commander/dist/index.js"
)

DC_ENTRY=""
for p in "${DC_PATHS[@]}"; do
  if [[ -f "$p" ]]; then
    DC_ENTRY="$p"
    break
  fi
done

NODE_BIN=$(which node 2>/dev/null || echo "/usr/local/bin/node")

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

# ---------- Main loop ----------
restart_count=0
backoff=$INITIAL_BACKOFF

log "=== Desktop Commander Wrapper started ==="

while true; do
  if (( restart_count >= MAX_RESTARTS )); then
    log "ERROR: Max restarts ($MAX_RESTARTS) reached. Giving up."
    echo "Desktop Commander crashed $MAX_RESTARTS times. Check $LOG_FILE for details." >&2
    exit 1
  fi

  start_time=$(date +%s)

  if [[ -n "$DC_ENTRY" ]]; then
    log "Starting: $NODE_BIN $DC_ENTRY (attempt $((restart_count + 1)))"
    "$NODE_BIN" "$DC_ENTRY" 2>> "$LOG_FILE"
    exit_code=$?
  else
    log "Starting via npx (attempt $((restart_count + 1)))"
    npx -y @wonderwhy-er/desktop-commander@latest 2>> "$LOG_FILE"
    exit_code=$?
  fi

  end_time=$(date +%s)
  runtime=$((end_time - start_time))

  log "Process exited with code $exit_code after ${runtime}s"

  # If exit code is 0, the server was shut down intentionally
  if [[ $exit_code -eq 0 ]]; then
    log "Clean exit (code 0). Not restarting."
    exit 0
  fi

  # If it ran for a while, reset the counter (it was stable)
  if (( runtime > RESET_AFTER )); then
    restart_count=0
    backoff=$INITIAL_BACKOFF
    log "Was stable for ${runtime}s - reset restart counter"
  else
    restart_count=$((restart_count + 1))
  fi

  log "Restarting in ${backoff}s... (restart $restart_count/$MAX_RESTARTS)"
  sleep "$backoff"

  # Exponential backoff with cap
  backoff=$((backoff * 2))
  if (( backoff > MAX_BACKOFF )); then
    backoff=$MAX_BACKOFF
  fi
done
