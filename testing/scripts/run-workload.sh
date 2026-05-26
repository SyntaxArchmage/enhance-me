#!/usr/bin/env bash
# run-workload.sh — Run a single enhance-me workload and save the transcript
#
# Usage:
#   ./testing/scripts/run-workload.sh <workload_file> [results_dir] [run_index]
#
# Examples:
#   ./testing/scripts/run-workload.sh testing/workloads/02-vague-task.md
#   ./testing/scripts/run-workload.sh testing/workloads/05-gpt-task.md testing/results/run-2026-05-26 3
#
# Output:
#   <results_dir>/<workload-id>-<NNN>.txt   — plain-text transcript of the session
#
# Requires: cursor-agent (Cursor CLI) available in PATH

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

WORKLOAD_FILE="${1:-}"
if [ -z "$WORKLOAD_FILE" ]; then
  echo "Usage: $0 <workload_file> [results_dir] [run_index]" >&2
  exit 1
fi

if [ ! -f "$WORKLOAD_FILE" ]; then
  echo "Error: workload file not found: $WORKLOAD_FILE" >&2
  exit 1
fi

TODAY="$(date +%Y-%m-%d)"
RESULTS_DIR="${2:-$REPO_ROOT/testing/results/run-$TODAY}"
RUN_INDEX="${3:-001}"
RUN_INDEX="$(printf '%03d' "$RUN_INDEX")"

WORKLOAD_BASENAME="$(basename "$WORKLOAD_FILE" .md)"
TRANSCRIPT_FILE="$RESULTS_DIR/${WORKLOAD_BASENAME}-${RUN_INDEX}.txt"

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'
BOLD='\033[1m'

extract_prompt() {
  local file="$1"
  awk '
    /^## Prompt/ { in_section=1; next }
    in_section && /^```/ {
      if (!in_block) { in_block=1; next }
      else { exit }
    }
    in_block { print }
  ' "$file"
}

PROMPT="$(extract_prompt "$WORKLOAD_FILE")"

if [ -z "$PROMPT" ]; then
  echo -e "${RED}Error:${NC} Could not extract prompt from $WORKLOAD_FILE" >&2
  echo "  Make sure the workload has a '## Prompt' section with a fenced code block." >&2
  exit 1
fi

mkdir -p "$RESULTS_DIR"

echo ""
echo -e "${BLUE}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}${BOLD} Workload: ${WORKLOAD_BASENAME}${NC}"
echo -e "${BLUE}${BOLD} Run:      #${RUN_INDEX}${NC}"
echo -e "${BLUE}${BOLD} Output:   ${TRANSCRIPT_FILE}${NC}"
echo -e "${BLUE}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if ! command -v cursor-agent &>/dev/null; then
  echo -e "${RED}Error:${NC} cursor-agent not found in PATH." >&2
  echo "  Start Cursor CLI session: tmux new-session -A -s cursor -- cursor-agent" >&2
  exit 1
fi

PROMPT_FILE="$(mktemp)"
trap 'rm -f "$PROMPT_FILE"' EXIT
printf '%s\n' "$PROMPT" > "$PROMPT_FILE"

echo -e "${GREEN}Prompt:${NC}"
echo "$PROMPT" | head -5
[ "$(echo "$PROMPT" | wc -l)" -gt 5 ] && echo "  ..."
echo ""

{
  echo "=== enhance-me test session ==="
  echo "Workload: $WORKLOAD_BASENAME"
  echo "Run: $RUN_INDEX"
  echo "Date: $(date -Iseconds)"
  echo "Prompt:"
  echo "$PROMPT"
  echo ""
  echo "=== Session transcript ==="
  echo ""
} > "$TRANSCRIPT_FILE"

echo -e "${GREEN}[runner]${NC} Starting cursor-agent session..."

if cursor-agent --no-interactive < "$PROMPT_FILE" >> "$TRANSCRIPT_FILE" 2>&1; then
  echo -e "${GREEN}[runner]${NC} Session completed successfully"
else
  RC=$?
  echo -e "${YELLOW}[runner]${NC} cursor-agent exited with code $RC (may be normal)"
fi

echo ""
echo -e "${GREEN}[runner]${NC} Transcript saved: ${TRANSCRIPT_FILE}"
LINES="$(wc -l < "$TRANSCRIPT_FILE")"
echo -e "${GREEN}[runner]${NC} Lines: $LINES"
echo ""

echo -e "${BLUE}Quick pattern check:${NC}"
python3 - <<PYEOF
import sys
sys.path.insert(0, '$SCRIPT_DIR')
from patterns import WORKLOAD_FEATURES, check_feature

with open('$TRANSCRIPT_FILE') as f:
    transcript = f.read()

workload_id = '$WORKLOAD_BASENAME'
features = WORKLOAD_FEATURES.get(workload_id, [])
if not features:
    print("  (no features defined for this workload)")
else:
    passed = 0
    for fid in features:
        r = check_feature(transcript, fid)
        sym = '✓' if r['found'] else '✗'
        print(f"  {sym} {fid}: {r.get('feature', fid)}")
        if r['found']:
            passed += 1
    print(f"\n  Result: {passed}/{len(features)} features detected")
PYEOF
