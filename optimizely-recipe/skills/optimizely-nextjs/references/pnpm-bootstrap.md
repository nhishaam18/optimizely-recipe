# Pinned pnpm bootstrap and recovery

Applies only to bundled setup Task 1.2. An explicitly supplied existing repository keeps its own package manager and lockfile. Later component implementation reuses the saved executable and setup receipt; it does not bootstrap again unless that executable is unavailable.

The sandbox must supply Node >=20.9 (the current platform runtime is Node 24), npm, Bash and timeout. No assumption that Corepack is bundled. Do not replace the runtime or use sudo automatically. Missing prerequisites receive a scoped runtime blocker.

Run the helper from its loaded skill directory; do not read or copy the template JSON. Substitute only actual skill and repository paths from the task:

```bash
set -euo pipefail
PNPM_BIN="$(bash <skill-directory>/scripts/ensure-pnpm.sh)"
cd <exact-prepared-repository>
"$PNPM_BIN" --version
"$PNPM_BIN" install --frozen-lockfile
"$PNPM_BIN" exec next typegen
"$PNPM_BIN" exec tsc --noEmit
"$PNPM_BIN" run lint
```

The helper emits only the verified absolute executable path on stdout. It reuses an exact 12.5.1 on PATH, otherwise installs pnpm@12.5.1 using npm into `/workspace/.kajoo-tools/pnpm-12.5.1`. KAJOO_PNPM_TOOL_ROOT can name another explicit writable absolute tools directory outside the application. Tool installation permits pnpm's own lifecycle scripts/platform package; npm registry access is required. Application package.json and pnpm-lock.yaml are untouched. A tools-directory package-lock.json is expected and is not an application lockfile conversion.

Each fresh shell must set PNPM_BIN to the recorded absolute path, or invoke that path directly. Do not rely on a previous export. For subprocesses that need `pnpm` by name, prepend the executable's directory to PATH for that command only. Do not change global Node/npm/pnpm or the user's shell profile. Do not install multiple competing pnpm versions during a retry.

Existing exact pnpm is checked once; a verified owned installation is reused without registry access. An unrecognized pre-existing prefix is refused without modification. Failed owned installations are retained for diagnostics and can be retried after the blocker changes. Bootstrap has one 120-second install bound and no automatic network retry loop. Failure reports the log path; inspect its relevant error with credentials redacted rather than dumping logs into prompts. Do not interpret missing pnpm as missing CMS credentials or an SDK mismatch.

Write a setup receipt in evidence: active recipe version, template-bundle provenance, exact repository, Node/pnpm versions, executable/prefix, bootstrap reused/installed/blocked, lockfile hash, dependency installation and local-check results. Record each successful stage as it finishes. If a stage fails, preserve source and rerun only the failed stage after correction. Capture/annotation can proceed independently while installation is blocked; setup stays blocked and its checks are never marked passed.

This recipe recovers existing sandboxes without rebuilding their image. Preinstalling the same validated pin in future sandbox images is an optional platform optimization, not part of this package generation or a prerequisite for the fallback. No workspace modification, application dependency install or CMS operation happens just by publishing/applying the recipe; the assigned setup task executes the helper.
