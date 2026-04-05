#!/usr/bin/env bash
# Smoke test: verifies that all critical routes return 200 on a running preview server.
# Usage: bun run build && bun run preview & bun run smoke
# Or: pass a base URL, defaults to http://localhost:3000

BASE_URL="${1:-http://localhost:3000}"
EXPECTED_CODES="${EXPECTED_CODES:-200}"
FAIL=0

ROUTES=(
  "/"
  "/auth"
  "/beta"
  "/dashboard"
)

echo "=== Smoke Check: $BASE_URL ==="

for route in "${ROUTES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "${BASE_URL}${route}" 2>/dev/null)

  if [ "$STATUS" = "200" ] || [ "$STATUS" = "301" ] || [ "$STATUS" = "304" ]; then
    echo "  PASS  $route  (HTTP $STATUS)"
  else
    echo "  FAIL  $route  (HTTP $STATUS)"
    FAIL=1
  fi
done

echo ""
if [ $FAIL -eq 0 ]; then
  echo "Smoke check passed."
  exit 0
else
  echo "Smoke check FAILED."
  exit 1
fi
