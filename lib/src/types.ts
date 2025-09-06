import { createLogger } from "./logger";
import { Matcher } from "./matcher";
import {
  StrategyStatus_OK,
  StrategyStatus_CONTINUE,
  StrategyStatus_FAIL,
  StrategyStatus_SKIP,
} from "./utils";

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

export type StrategyStatus =
  | typeof StrategyStatus_OK
  | typeof StrategyStatus_CONTINUE
  | typeof StrategyStatus_FAIL
  | typeof StrategyStatus_SKIP;

/**
 * Union type representing the outcome of a strategy function.
 */
export type StrategyResult =
  | { status: typeof StrategyStatus_OK; value: unknown }
  | { status: typeof StrategyStatus_CONTINUE; reason?: string }
  | { status: typeof StrategyStatus_SKIP; reason: string }
  | { status: typeof StrategyStatus_FAIL; reason: string };

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

  /** logger */
  logger: ReturnType<typeof createLogger>;
}) => StrategyResult | Promise<StrategyResult>;

/**
 * Utility type: excludes strategy names ending with "!".
 * The "!" suffix is reserved for internal overrides.
 */
type ForbidBangEnd<T extends string> = T extends `${string}!` ? never : T;

/**
 * Interface for plugin-contributed strategies.
 * Plugins should augment this interface to add their strategy names.
 *
 * Example plugin declaration:
 * ```ts
 * declare module "git-json-resolver" {
 *   interface PluginStrategies {
 *     "semantic-version": string;
 *     "timestamp-latest": string;
 *   }
 * }
 * ```
 */
export interface PluginStrategies {}

/**
 * All available strategy names (built-in + plugins).
 */
export type AllStrategies = InbuiltMergeStrategies | keyof PluginStrategies;

/**
 * Interface for plugin-specific configuration.
 * Plugins augment this interface with their own config types.
 *
 * Example plugin declaration:
 * ```ts
 * declare module "git-json-resolver" {
 *   interface PluginConfigs {
 *     "git-json-resolver-semver": {
 *       strict?: boolean;
 *       fallback?: "ours" | "theirs" | "continue" | "error";
 *       preferValid?: boolean;
 *       preferRange?: boolean;
 *       workspacePattern?: string;
 *     };
 *   }
 * }
 * ```
 */
export interface PluginConfigs {
  [pluginName: string]: Record<string, unknown>;
}

/**
 * Rule tree: maps field glob patterns → strategy names or nested rule trees.
 *
 * - Keys: field glob patterns (matcher configurable)
 * - Values: one or more strategies, or further nested rules
 */
export type RuleTree<T extends string = AllStrategies> = {
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
 * Plugin interface that strategy plugins must implement.
 */
export interface StrategyPlugin<TContext = unknown> {
  /** Strategy functions provided by this plugin. */
  strategies: Record<string, StrategyFn<TContext>>;

  /** Optional plugin initialization with config. */
  init?(config: PluginConfigs[keyof PluginConfigs]): void | Promise<void>;
}

/**
 * High-level configuration object for conflict resolution.
 *
 * @template T - Strategy string type (defaults to built-in strategies).
 * @template TContext - Context object type passed to strategies.
 */
export interface Config<T extends string = AllStrategies, TContext = unknown> {
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

  /**
   * Whether to automatically stage resolved files.
   * Default: `true`.
   */
  autoStage?: boolean;

  /** NPM package names of strategy plugins to load. */
  plugins?: string[];

  /** Plugin-specific configuration passed to plugin.init(). */
  pluginConfig?: Partial<PluginConfigs>;
}

export type { Matcher };
