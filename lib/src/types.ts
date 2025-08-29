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
 * | `concat`    | Concatenate arrays from both sides (applies only if both are arrays).       |
 * | `unique`    | Merge arrays and remove duplicates (applies only if both are arrays).       |
 */
export type InbuiltMergeStrategies =
  | "merge"
  | "ours"
  | "theirs"
  | "base"
  | "skip"
  | "drop"
  | "non-empty"
  | "update"
  | "concat"
  | "unique";

/**
 * Status codes returned by strategy functions.
 */
export enum StrategyStatus {
  /** Strategy successfully produced a value. */
  OK = 0,

  /** Strategy deferred — let other strategies continue. */
  CONTINUE = 1,

  /** Strategy failed — unrecoverable error, stop processing. */
  FAIL = 2,

  /** Strategy explicitly skipped this field. */
  SKIP = 3,
}

/**
 * Union type representing the outcome of a strategy function.
 */
export type StrategyResult =
  | { status: StrategyStatus.OK; value: unknown }
  | { status: StrategyStatus.CONTINUE; reason?: string }
  | { status: StrategyStatus.SKIP; reason: string }
  | { status: StrategyStatus.FAIL; reason: string };

/**
 * Strategy function signature.
 *
 * @template TContext - Optional context type passed during resolution.
 */
export type StrategyFn<TContext = unknown> = (args: {
  /** Value from "ours". */
  ours: unknown;

  /** Value from "theirs". */
  theirs: unknown;

  /** Value from common ancestor (if available). */
  base?: unknown;

  /** JSON path of the current field. */
  path: string;

  /** Full file path of the file being merged. */
  filePath?: string;

  /** Custom context object, if provided by caller. */
  context?: TContext;
}) => StrategyResult | Promise<StrategyResult>;

/**
 * Utility type: excludes strategy names ending with "!".
 * The "!" suffix is reserved for internal overrides.
 */
type ForbidBangEnd<T extends string> = T extends `${string}!` ? never : T;

/**
 * Rule tree: maps field glob patterns → strategy names or nested rule trees.
 *
 * - Keys: field glob patterns (matcher configurable)
 * - Values: one or more strategies, or further nested rules
 */
export type RuleTree<T extends string = InbuiltMergeStrategies> = {
  [fieldGlob: string]: T[] | RuleTree<T>;
};

/** Logging levels available to the logger. */
export type LogLevel = "info" | "warn" | "error" | "debug";

/** Logging modes: in-memory or streaming to files. */
export type LogMode = "memory" | "stream";

/**
 * Logger configuration.
 */
export interface LoggerConfig {
  /** Logging mode (default: `"memory"`). */
  mode?: LogMode;

  /** Directory for log files (default: `"logs"`). */
  logDir?: string;

  /** Whether to log into a single file instead of per-input-file logs. */
  singleFile?: boolean;

  /** Level filters for stdout and file logging. */
  levels?: {
    /** Levels to print on stdout (default: `["warn", "error"]`). */
    stdout?: LogLevel[];

    /** Levels to write into files (default: `["info", "warn", "error"]`). */
    file?: LogLevel[];
  };
}

/** A parser function that takes a raw string and returns parsed content. */
export type Parser = { name: string; parser: (input: string) => unknown };

/** Built-in parser identifiers or a custom parser function. */
export type SupportedParsers = "json" | "json5" | "yaml" | "toml" | "xml" | Parser;

/**
 * High-level configuration object for conflict resolution.
 *
 * @template T - Strategy string type (defaults to built-in strategies).
 * @template TContext - Context object type passed to strategies.
 */
export interface Config<T extends string = InbuiltMergeStrategies, TContext = unknown> {
  /** Fallback strategy when no rule matches. */
  defaultStrategy?: T | T[];

  /** Rule tree mapping globs → strategies. */
  rules?: RuleTree<T>;

  /** Reverse mapping: strategy → list of field globs. */
  byStrategy?: Partial<Record<T, string[]>>;

  /** Custom strategies (names must not clash with built-ins). */
  customStrategies?: Record<
    Exclude<ForbidBangEnd<T>, InbuiltMergeStrategies>,
    StrategyFn<TContext>
  >;

  /** File inclusion globs. */
  include?: string[];

  /** File exclusion globs. */
  exclude?: string[];

  /** Glob matcher: `"micromatch"`, `"picomatch"`, or a custom implementation. Defaults to internal minimal matcher */
  matcher?: "micromatch" | "picomatch" | Matcher;

  /**
   * Whether to include files that do not contain conflicts.
   * Useful if strategies (e.g., "drop") should apply even to clean files.
   * Default: `false`.
   */
  includeNonConflicted?: boolean;

  /** Enable debug mode for verbose logs and traceability (slower). */
  debug?: boolean;

  /** Whether to write sidecar files with unresolved conflicts. */
  writeConflictSidecar?: boolean;

  /** Logger configuration. */
  loggerConfig?: LoggerConfig;

  /** Directory for backing up original files before modification. */
  backupDir?: string;

  /**
   * Parsers to attempt, in order:
   * - A single parser (`"json"`, `"yaml"`, custom function, etc.).
   * - An array of parsers (e.g. `["yaml", "json5"]`).
   *
   * Defaults to `"json"`.
   */
  parsers?: "auto" | SupportedParsers | SupportedParsers[];
}

export type { Matcher };
