import { Matcher } from "./matcher";

/**
 * Built-in merge strategies.
 * ⚠️ Reserved names — plugin authors should avoid reusing these.
 */
export type BasicMergeStrategies = "merge" | "ours" | "theirs" | "skip" | "drop";

/**
 * Result contract for a strategy function.
 * - `ok: true` → merge produced a value
 * - `ok: false` → merge failed (with optional reason)
 */
export type StrategyResult = { ok: true; value: unknown } | { ok: false; reason?: string };

/**
 * Strategy function signature.
 * Custom strategies receive both sides, optional base, file path, and context.
 */
export type StrategyFn<TContext = unknown> = (args: {
  ours: unknown;
  theirs: unknown;
  base?: unknown;
  path: string;
  filePath?: string;
  context?: TContext;
}) => StrategyResult | Promise<StrategyResult>;

/**
 * Utility type: forbids strategy names ending with "!".
 * (Reserved suffix for internal overrides.)
 */
type ForbidBangEnd<T extends string> = T extends `${string}!` ? never : T;

/**
 * Rules tree: maps field globs → strategy names or nested rules.
 * - Keys: glob patterns (matcher configurable)
 * - Values: one or more strategies, or nested RuleTree
 */
export type RuleTree<T extends string = BasicMergeStrategies> = {
  [fieldGlob: string]: T[] | RuleTree<T>;
};

/**
 * High-level config object for conflict resolution.
 */
export interface Config<T extends string = BasicMergeStrategies, TContext = unknown> {
  /** Fallback strategy when no rule matches */
  defaultStrategy?: T | T[];

  /** Rule tree mapping globs → strategies */
  rules?: RuleTree<T>;

  /** Strategy → list of fields to apply it to */
  byStrategy?: Partial<Record<T, string[]>>;

  /** Custom strategies (excluding built-in names) */
  customStrategies?: Record<Exclude<ForbidBangEnd<T>, BasicMergeStrategies>, StrategyFn<TContext>>;

  /** File inclusion globs */
  include?: string[];

  /** File exclusion globs */
  exclude?: string[];

  /** Glob matcher: `"micromatch"`, `"picomatch"`, or custom implementation */
  matcher?: "micromatch" | "picomatch" | Matcher;

  /**
   * Whether to include files that do not contain conflicts.
   * Useful for applying strategies, e.g., drop even when conflicts aren’t present.
   * Defaults to `false`.
   */
  includeNonConflicted?: boolean;
}

export type { Matcher };
