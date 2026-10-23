# Kajoo delegation and result retrieval

Source-checked on 2026-09-18 against this recipe's Kajoo workspace source: `apps/kajoo-mcp-server/src/tools/agent-execution/run-agent.ts`, `tools/jobs/get-tool-results.ts` and `tools/agent-execution/resume-agent-run.ts`. This is a code inspection, not a connected-runtime test. Tool connector prefix `kajoo/` is mapped to the receiving workspace's real connector; verify the installed catalog/schema before execution.

## Dispatch and inspect

`run-agent` takes `agentId`, `message`, optional `background`, optional `runId` and optional `agentMode` (`default` or `plan`). Its immediate result contains `runId`. `background` has a 5,000-character limit in the inspected implementation; use artifacts for larger context. Resolve real IDs and supply the scoped task, input revision, required outputs and dependencies in `message`.

`get-tool-results` accepts `runIds` as a nonempty array of actual job IDs, or `lastNRuns` (1–100, default 5) when recovering a lost ID. Prefer explicit IDs. Inspect returned job status, output/error and relevant task artifacts. The implementation filters by current workspace/project/chat, so an empty result may indicate mismatched context rather than completed work. Do not invent a `get-agent-run` tool from a descriptive string in an older response.

```json
{
  "runIds": ["REPLACE_WITH_ACTUAL_RETURNED_RUN_ID"]
}
```

This is an input-shape example, not a real ID. Poll with bounded backoff or use the runtime's completion notification, maintaining user-visible progress. Running/pending jobs stay in-progress. If tools cannot retrieve the result in the correct context, record the blocker; do not dispatch the task again to manufacture a fresh receipt.

In `run-agent`, a supplied `runId` means continue the prior conversation by creating a new run after the previous one ends; it is not a status lookup. The inspected implementation refuses it while the prior run is pending, in_progress or paused. Job status spelling is distinct from task status spelling.

## Paused human review

`resume-agent-run` takes the actual paused `runId`, `hitlResponse` (`approved` or `rejected`) and optional `message`. Preserve and relay the user's decision on that paused action; never create approval on the user's behalf. Then retrieve the real completion through `get-tool-results`. An accepted resume request alone is not task completion.

Record valid authorization from the conversation so routine actions do not trigger redundant questions. A runtime-required human decision remains an explicit decision; diagnose why it paused and relay the actual response instead of bypassing that mechanism. There is no need to recreate the specialist agent or start a second run.
