/**
 * Config normalizer for JSON merge rules.
 * Expands shorthand, validates strategies, parses importance,
 * and classifies rules into exact / top-level / glob categories.
 */

import { Matcher, basicMatcher, loadMatcher } from "./matcher";
import { InbuiltMergeStrategies, Config, RuleTree, StrategyFn } from "./types";

export interface StrategyItem {
  name: string;
  important: boolean;
}

export interface StrategyList {
  strategies: StrategyItem[]; // instead of string[]
  order: number;
  source: string;
}

export interface NormalizedRules {
  exact: Record<string, StrategyList[]>;
  exactFields: Record<string, StrategyList[]>;
  patterns: Record<string, StrategyList[]>;
  default: StrategyItem[];
}

export interface NormalizedConfig {
  rules: NormalizedRules;
  matcher: Matcher;
  fileFilter: (filepath: string) => boolean;
  customStrategies: Record<string, StrategyFn>;
  includeNonConflicted: boolean;
  debug: boolean;
  strictArrays: boolean;
  writeConflictSidecar: boolean;
}

/** Defaults */
export const DEFAULT_CONFIG = {
  defaultStrategy: ["merge", "ours"],
  include: ["**/*.json", "**/*.yaml", "**/*.yml", "**/*.xml", "**/*.toml"],
  // Add **/ prefix to ensure proper handling in monorepo
  exclude: ["**/node_modules/**", "**/dist/**"],
  debug: false,
  writeConflictSidecar: false,
};

/**
 * Normalize user config into fully expanded and classified form.
 */
export const normalizeConfig = async <T extends string = InbuiltMergeStrategies>(
  config: Config<T>,
): Promise<NormalizedConfig> => {
  const userConfig = { ...DEFAULT_CONFIG, ...config };

  const rules: NormalizedRules = {
    exact: Object.create(null),
    exactFields: Object.create(null),
    patterns: Object.create(null),
    default: normalizeDefault(userConfig.defaultStrategy),
  };

  const matcher =
    typeof userConfig.matcher === "string"
      ? await loadMatcher(userConfig.matcher)
      : (userConfig.matcher ?? basicMatcher);

  let order = 0;

  if (userConfig.byStrategy) {
    for (const [rawStrategy, fields] of Object.entries(userConfig.byStrategy)) {
      if (!fields) continue;
      const { name, important: strategyImportant } = parseStrategyName(rawStrategy);
      for (const raw of fields as string[]) {
        const { key, important: keyImportant } = parseImportance(raw);
        addRule(rules, key, {
          strategies: [{ name, important: strategyImportant || keyImportant }],
          order: order++,
          source: key,
        });
      }
    }
  }

  if (userConfig.rules) {
    expandRuleTree(userConfig.rules, [], (pathKey, strategyNames) => {
      const { key, important: keyImportant } = parseImportance(pathKey);
      const strategies = strategyNames.map(s => {
        const { name, important } = parseStrategyName(s);
        return { name, important: important || keyImportant };
      });
      addRule(rules, key, {
        strategies,
        order: order++,
        source: key,
      });
    });
  }

  const fileFilter = (filepath: string) => {
    if (!matcher.isMatch(filepath, userConfig.include)) return false;
    if (matcher.isMatch(filepath, [...userConfig.exclude, "**/node_modules/**"])) return false;
    return true;
  };

  return {
    rules,
    matcher,
    fileFilter,
    customStrategies: userConfig.customStrategies ?? {},
    includeNonConflicted: userConfig.includeNonConflicted ?? false,
    debug: userConfig.debug ?? false,
    strictArrays: userConfig.strictArrays ?? false,
    writeConflictSidecar: userConfig.writeConflictSidecar ?? false,
  };
};

/* ---------------- helpers ---------------- */

const normalizeDefault = <T extends string>(def: T | T[]): StrategyItem[] => {
  const arr = Array.isArray(def) ? def : [def];

  return arr.map(name => {
    const important = name.endsWith("!");
    ensureStrategyNameValid(name.slice(0, -1));
    return {
      name: important ? name.slice(0, -1) : name,
      important,
    };
  });
};

const parseStrategyName = (raw: string): StrategyItem => {
  const important = raw.endsWith("!");
  const name = important ? raw.slice(0, -1) : raw;
  ensureStrategyNameValid(name); // validate AFTER removing !
  return { name, important };
};

const ensureStrategyNameValid = (name: string) => {
  if (name.endsWith("!")) {
    throw new Error(
      `Strategy name "${name}" must not end with "!". Use "!" on field/glob to mark rule importance.`,
    );
  }
};

const parseImportance = (raw: string): { key: string; important: boolean } => {
  const important = raw.endsWith("!");
  const key = important ? raw.slice(0, -1) : raw;
  if (!key) throw new Error(`Invalid rule key "${raw}".`);
  return { key, important };
};

/**
 * Add a rule to the appropriate classification bucket.
 * - "c"   → exactFields (top-level key only)
 * - "[c]" → patterns ("**.c.**")
 * - "a.b.c" → exact
 * - globs (with * or **) → patterns
 */
const addRule = (target: NormalizedRules, key: string, entry: StrategyList) => {
  if (/^\[.*\]$/.test(key)) {
    const field = key.slice(1, -1);
    if (field.replace(/\\\./g, "").includes(".") || field.trim() === "") {
      throw new Error(`Invalid bracket form "${key}". Use a single bare key like "[id]".`);
    }
    const pattern = `**.${field}.**`;
    push(target.patterns, pattern, entry);
    return;
  }

  const hasWildcards = /[*?\[\]]/.test(key);
  if (hasWildcards) {
    push(target.patterns, key, entry);
    return;
  }

  if (key.includes(".")) {
    push(target.exact, key, entry);
  } else {
    push(target.exactFields, key, entry);
  }
};

const expandRuleTree = <T extends string>(
  tree: RuleTree<T>,
  prefix: string[],
  cb: (flatKey: string, strategies: string[]) => void,
) => {
  for (const [k, v] of Object.entries(tree)) {
    const path = [...prefix, k];
    if (Array.isArray(v)) {
      cb(path.join("."), v);
    } else {
      expandRuleTree(v, path, cb);
    }
  }
};

const push = (bucket: Record<string, StrategyList[]>, key: string, entry: StrategyList) => {
  const arr = (bucket[key] ??= []);
  arr.push(entry);
};
