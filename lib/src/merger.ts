import { NormalizedConfig } from "./normalizer";
import { resolveStrategies } from "./strategy-resolver";
import { StrategyFn, StrategyResult, StrategyStatus } from "./types";
import { DROP } from "./utils";

/** Conflict entry (minimal by default). */
export interface Conflict {
  path: string;
  reason: string;
  // enriched only if debug enabled
  ours?: unknown;
  theirs?: unknown;
  base?: unknown;
}

/** Result of merging a file. */
export interface MergeResult {
  filePath: string;
  merged: unknown;
  conflicts: Conflict[];
}

/** Helper: stringify status for logs. */
export const statusToString = (s: StrategyStatus): string => {
  switch (s) {
    case StrategyStatus.OK:
      return "OK";
    case StrategyStatus.CONTINUE:
      return "CONTINUE";
    case StrategyStatus.FAIL:
      return "FAIL";
    case StrategyStatus.SKIP:
      return "SKIP";
    default:
      return `UNKNOWN(${s})`;
  }
};

/** Merge context (runtime state + config). */
export interface MergeContext<TContext = unknown> {
  config: NormalizedConfig;
  strategies: Record<string, StrategyFn<TContext>>;
  context?: TContext;
  _strategyCache?: Map<string, string[]>;
}

/** Internal args passed to strategies. */
interface MergeArgs<TContext> {
  ours: unknown;
  theirs: unknown;
  base?: unknown;
  path: string;
  filePath?: string;
  ctx: MergeContext<TContext>;
  conflicts: Conflict[];
}

/** Utility: plain-object check. */
const isPlainObject = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null && !Array.isArray(val);

/** Built-in strategies. */
export const BuiltInStrategies = {
  ours: <TContext>({ ours }: MergeArgs<TContext>): StrategyResult => ({
    status: StrategyStatus.OK,
    value: ours,
  }),

  theirs: <TContext>({ theirs }: MergeArgs<TContext>): StrategyResult => ({
    status: StrategyStatus.OK,
    value: theirs,
  }),

  base: <TContext>({ base }: MergeArgs<TContext>): StrategyResult => ({
    status: StrategyStatus.OK,
    value: base,
  }),

  drop: <TContext>(_skipped: MergeArgs<TContext>): StrategyResult => ({
    status: StrategyStatus.OK,
    value: DROP,
  }),

  skip: <TContext>({ path }: MergeArgs<TContext>): StrategyResult => ({
    status: StrategyStatus.SKIP,
    reason: `Skip strategy applied at ${path}`,
  }),

  "non-empty": <TContext>({ ours, theirs, base }: MergeArgs<TContext>): StrategyResult => {
    if (ours != null && ours !== "") return { status: StrategyStatus.OK, value: ours };
    if (theirs != null && theirs !== "") return { status: StrategyStatus.OK, value: theirs };
    if (base != null && base !== "") return { status: StrategyStatus.OK, value: base };
    return { status: StrategyStatus.CONTINUE };
  },

  update: <TContext>({ ours, theirs }: MergeArgs<TContext>): StrategyResult => {
    if (ours !== undefined) return { status: StrategyStatus.OK, value: theirs };
    return { status: StrategyStatus.OK, value: DROP };
  },

  merge: async <TContext>(args: MergeArgs<TContext>): Promise<StrategyResult> => {
    const { ours, theirs, base, path, filePath, ctx, conflicts } = args;

    // Plain objects
    if (isPlainObject(ours) && isPlainObject(theirs)) {
      const allKeys = new Set([...Object.keys(ours), ...Object.keys(theirs)]);
      const result: Record<string, unknown> = {};
      for (const key of allKeys) {
        result[key] = await mergeObject({
          ours: (ours as Record<string, unknown>)[key],
          theirs: (theirs as Record<string, unknown>)[key],
          base: isPlainObject(base) ? (base as Record<string, unknown>)[key] : undefined,
          path: path ? `${path}.${key}` : key,
          filePath,
          ctx,
          conflicts,
        });
      }
      return { status: StrategyStatus.OK, value: result };
    }

    return { status: StrategyStatus.CONTINUE, reason: "Unmergeable type" };
  },

  concat: <TContext>({ ours, theirs, path }: MergeArgs<TContext>): StrategyResult => {
    if (Array.isArray(ours) && Array.isArray(theirs)) {
      return { status: StrategyStatus.OK, value: [...ours, ...theirs] };
    }
    return { status: StrategyStatus.CONTINUE, reason: `Cannot concat at ${path}` };
  },

  unique: <TContext>({ ours, theirs, path }: MergeArgs<TContext>): StrategyResult => {
    if (Array.isArray(ours) && Array.isArray(theirs)) {
      return { status: StrategyStatus.OK, value: [...new Set([...ours, ...theirs])] };
    }
    return { status: StrategyStatus.CONTINUE, reason: `Cannot concat at ${path}` };
  },
} as const;

/**
 * Recursively merges two inputs using configured strategies.
 *
 * Resolution order:
 * 1. If values are strictly equal → return either.
 * 2. Resolve strategy list from config (cached per path).
 * 3. Apply built-in/custom strategies in order.
 *    - If a strategy succeeds → return its value immediately.
 *    - If a strategy fails → continue to next.
 * 4. If all strategies fail → log conflict & fallback to ours.
 *
 * @template TContext Type of optional user context for custom strategies.
 */
export const mergeObject = async <TContext>({
  ours,
  theirs,
  base,
  path,
  filePath,
  ctx,
  conflicts,
}: MergeArgs<TContext>): Promise<unknown> => {
  if (ours === theirs) return ours;

  // Resolve strategies (cached per-path).
  if (!ctx._strategyCache) ctx._strategyCache = new Map();
  let strategies = ctx._strategyCache.get(path);
  if (!strategies) {
    strategies = resolveStrategies(path, ctx.config);
    ctx._strategyCache.set(path, strategies);
  }

  for (const strategy of strategies) {
    const fn = (BuiltInStrategies as any)[strategy] ?? ctx.strategies[strategy];

    if (!fn) continue;

    const result: StrategyResult = await fn({
      ours,
      theirs,
      base,
      path,
      filePath,
      ctx,
      conflicts,
    });

    switch (result.status) {
      case StrategyStatus.OK:
        return result.value;
      case StrategyStatus.CONTINUE:
        continue;
      case StrategyStatus.SKIP:
        conflicts.push({ path, reason: result.reason });
        return undefined;
      case StrategyStatus.FAIL:
        conflicts.push({ path, reason: result.reason });
        throw new Error(`Merge failed at ${path}: ${result.reason}`);
    }
  }

  // All strategies CONTINUE → unresolved conflict
  conflicts.push({
    path,
    reason: `All strategies failed (tried: ${strategies.join(", ") || "none"})`,
    ...(ctx.config.debug ? { ours, theirs, base } : {}),
  });
  return undefined;
};
