Nice — here’s a compact, complete checklist you can drop into the PR or use as a spec to rewrite `merge.ts`. Direct, no fluff.

---

## Types & primitives

- `StrategyStatus` → **numeric enum** (e.g. `OK=0, CONTINUE=1, FAIL=2, SKIP=3`) with helper to stringify for logs.
- `StrategyResult` → discriminated union keyed by `status` (+ optional `value` and `reason`).
- `DROP` sentinel → `const DROP = Symbol("MERGE_DROP")` to represent explicit removal (distinct from `undefined`).
- `MergeResult` per-field semantics: `resolved(value) | dropped(DROP) | conflict(undefined)`.

---

## Strategy contract & types

- Strategy signature generic: `StrategyFn<TContext>(args: { ours, theirs, base?, path, filePath?, context?: TContext }) => Promise<StrategyResult> | StrategyResult`.
- Export `BuiltInStrategyFn<TContext>` for built-ins (strong typing).
- **Constraints:** a strategy must return exactly one action: resolve (`OK`), continue (`CONTINUE`), skip (`SKIP`), or hard fail (`FAIL`). No mixing resolve + conflict.

---

## Built-in strategies (final set)

- `merge` — deep/object/array merge; returns `OK` with merged value or `CONTINUE` on unmergeable.
- `ours` — `OK` with `ours`.
- `theirs` — `OK` with `theirs`.
- `base` — `OK` with `base`.
- `skip` — `SKIP` + `reason`: short-circuit, add conflict, return `undefined`.
- `drop` — `OK` with `DROP` (explicit removal).
- `non-empty` — prefer `ours > theirs > base`, else `CONTINUE`.
- `update` — if key exists in `ours` → `OK` with `theirs`; else `OK` with `DROP` (or drop semantics).

> Removed confusing `drop-new`. `update` covers "update existing keys only".

---

## Strategy outcomes handling

- `OK` → use `value`: if `value === DROP` treat as dropped; if `value === undefined` treat as resolved `undefined`.
- `CONTINUE` → try next strategy (no conflict recorded).
- `SKIP` → **immediately** record a conflict `{ path, reason }` and return `undefined` (short-circuit).
- `FAIL` → hard failure: record conflict and abort/propagate error (clear semantics in implementation).

---

## Merge algorithm (high level)

- Fast equality check: if `ours === theirs` → return `ours`.
- Resolve strategies list with `resolveStrategies(path, ctx.config)` and **cache per-path** in `ctx._strategyCache` (Map) — config is static.
- Iterate strategies in order:
  - If built-in → call `BuiltInStrategyFn`.
  - Else → call custom `StrategyFn<TContext>`.
  - React to `StrategyResult.status` as above.

- If all strategies return `CONTINUE` (no `OK`, no `SKIP`), then add conflict `{ path, reason: "all strategies failed (tried: ...)" }` and **return `undefined`** (unresolved).

---

## Custom strategies

- Allowed to return `OK`, `CONTINUE`, `SKIP`, `FAIL`.
- **Can short-circuit** via `SKIP` (same semantics as built-in).
- Must be **deterministic** and **only operate at the given path** (no cross-path injection).
- Must not both resolve and mark conflict.

---

## Conflicts & logging

- Conflict entry default shape: `{ path: string; reason: string }` (keep minimal).
- **Do not** store `ours/theirs/base` snapshots by default (memory-heavy).
- If `ctx.config.debug` (dev mode) → enrich conflict with snapshots for inspection.
- Expose a pluggable `logStream` or `logger` in `NormalizedConfig` for structured logs (strategy tries, reasons). Use numeric enum helper for readable logs.

---

## Arrays & objects

- `merge` must treat arrays explicitly (index-wise or concat depending on config).
- On array length mismatch the `merge` strategy should return `CONTINUE` (try next) or `FAIL` depending on configured strictness.
- Use `isPlainObject` to differentiate arrays vs plain objects.

---

## Performance & safety

- Cache `resolveStrategies` per path.
- Keep conflict markers lightweight in prod.
- No side-effects in strategies or core (`functional` style) — throw only on `FAIL` if desired.
- Expose a helper to stringify numeric `StrategyStatus` for logs.

---

## Edge rules (short list)

- `SKIP` always returns `undefined` and records conflict immediately.
- `DROP` always uses `DROP` sentinel; removed at write-time.
- Conflicts recorded only on `SKIP`, `FAIL`, or after **all** strategies returned `CONTINUE`.
- Custom strategies must not mutate the global tree — only return a `value` for the current path.

---

That's the full set — concise and actionable. Want this turned into a typed `types.ts` + `merge.ts` skeleton next (no tests)?
