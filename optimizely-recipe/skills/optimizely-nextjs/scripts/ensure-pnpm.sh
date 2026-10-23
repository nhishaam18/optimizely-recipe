#!/usr/bin/env bash
# Linux sandbox bootstrap. stdout is exclusively the verified executable path.
set -euo pipefail
version=12.5.1
tool_root="${KAJOO_PNPM_TOOL_ROOT:-/workspace/.kajoo-tools}"
if [[ "$tool_root" != /* || "$tool_root" == / ]]; then
  echo 'KAJOO_PNPM_TOOL_ROOT must be an absolute tools-directory path, not /' >&2; exit 2
fi
if ! command -v node >/dev/null 2>&1; then echo 'Node is unavailable; report the runtime prerequisite, do not replace the application.' >&2; exit 1; fi
if ! node -e 'const [a,b]=process.versions.node.split(".").map(Number);process.exit(a>20||(a===20&&b>=9)?0:1)'; then
  echo 'Bundled Next.js requires Node >=20.9; use the supported sandbox runtime before retrying.' >&2; exit 1
fi
# Probe outside the application so another packageManager declaration cannot redirect pnpm.
candidate="$(command -v pnpm || true)"
if [[ -n "$candidate" && "$candidate" == /* ]] && [[ "$(cd /tmp && "$candidate" --version 2>/dev/null || true)" == "$version" ]]; then
  printf '%s\n' "$candidate"; exit 0
fi
prefix="$tool_root/pnpm-$version"
executable="$prefix/node_modules/.bin/pnpm"
marker="$prefix/.kajoo-pnpm-owner"
if [[ -L "$prefix" ]]; then echo "Refusing symlink tool prefix: $prefix" >&2; exit 1; fi
if [[ -d "$prefix" ]]; then
  if [[ ! -f "$marker" ]] || [[ "$(cat "$marker")" != "kajoo-pnpm-$version" ]]; then
    echo "Unrecognized existing tools directory preserved: $prefix" >&2; exit 1
  fi
else
  mkdir -p "$tool_root"
  mkdir "$prefix"
  printf 'kajoo-pnpm-%s\n' "$version" > "$marker"
  printf '{"name":"kajoo-pnpm-bootstrap","private":true,"version":"1.0.0"}\n' > "$prefix/package.json"
fi
if [[ -x "$executable" ]] && [[ "$(cd "$prefix" && "$executable" --version 2>/dev/null || true)" == "$version" ]]; then
  printf '%s\n' "$executable"; exit 0
fi
if ! command -v npm >/dev/null 2>&1; then echo 'npm is unavailable; cannot bootstrap pnpm. Existing application preserved.' >&2; exit 1; fi
if ! command -v timeout >/dev/null 2>&1; then echo 'timeout is unavailable; cannot enforce the bootstrap time bound.' >&2; exit 1; fi
log="$prefix/install.log"
echo "Installing pnpm@$version in $prefix (at most 120 seconds)" >&2
if ! (cd "$prefix" && timeout 120 npm install --prefix "$prefix" --save-exact --no-audit --no-fund --fetch-retries=0 --fetch-timeout=60000 "pnpm@$version") > "$log" 2>&1; then
  echo "Pinned pnpm installation failed or timed out. Diagnostic log: $log. Preserve this directory and retry only after the reported blocker changes; do not loop." >&2
  exit 1
fi
if [[ ! -x "$executable" ]] || [[ "$(cd "$prefix" && "$executable" --version 2>/dev/null || true)" != "$version" ]]; then
  echo "pnpm version verification failed; inspect $log. No application files changed." >&2; exit 1
fi
printf '%s\n' "$executable"
