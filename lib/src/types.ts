import { Matcher } from "./matcher";

/**
 * Built-in merge strategies.
 * ⚠️ Reserved names — plugin authors should avoid reusing these.
 *
 * | Strategy    | Description                                                                 |
 * |-------------|-----------------------------------------------------------------------------|
 * | `merge`     | Deep merge objects/arrays where possible; conflicts bubble up otherwise.   |
 * | `ours`      | Always take the value from "ours".                                          |
 * | `theirs`    | Always take the value from "theirs".                                        |
 * | `base`      | Revert to the common ancestor ("base").                                     |
 * | `skip`      | Leave unresolved; conflict entry is created with `undefined`.               |
 * | `drop`      | Remove the field entirely (always).                                         |
 * | `non-empty` | Prefer non-empty value: `ours` > `theirs` > `base`; fallback to undefined.  |
 * | `update`    | Update with "theirs" if field exists in "ours"; drop if missing in "ours".  |
 */
export type InbuiltMergeStrategies =
  | "merge"
  | "ours"
  | "theirs"
  | "base"
  | "skip"
  | "drop"
  | "non-empty"
  | "update";

/** Strategy status codes. */
export enum StrategyStatus {
  OK = 0,
  CONTINUE = 1,
  FAIL = 2,
  SKIP = 3,
}

/** Strategy result contract. */
export type StrategyResult =
  | { status: StrategyStatus.OK; value: unknown }
  | { status: StrategyStatus.CONTINUE; reason?: string }
  | { status: StrategyStatus.SKIP; reason: string }
  | { status: StrategyStatus.FAIL; reason: string };

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
export type RuleTree<T extends string = InbuiltMergeStrategies> = {
  [fieldGlob: string]: T[] | RuleTree<T>;
};

/**
 * High-level config object for conflict resolution.
 */
export interface Config<T extends string = InbuiltMergeStrategies, TContext = unknown> {
  /** Fallback strategy when no rule matches */
  defaultStrategy?: T | T[];

  /** Rule tree mapping globs → strategies */
  rules?: RuleTree<T>;

  /** Strategy → list of fields to apply it to */
  byStrategy?: Partial<Record<T, string[]>>;

  /** Custom strategies (excluding built-in names) */
  customStrategies?: Record<
    Exclude<ForbidBangEnd<T>, InbuiltMergeStrategies>,
    StrategyFn<TContext>
  >;

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

  /**
   * Debug mode - slower but more logs + traceability
   */
  debug?: boolean;

  /**
   *
   */
  strictArrays?: boolean;

  /**
   *
   */
  writeConflictSidecar?: boolean; // default false
}

export type { Matcher };
