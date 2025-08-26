/**
 * Config normalizer for JSON merge rules.
 * Expands shorthand, validates strategies, parses importance,
 * and classifies rules into exact / top-level / glob categories.
 */

import { Matcher, basicMatcher, loadMatcher } from "./matcher";
import { BasicMergeStrategies, Config, RuleTree, StrategyFn } from "./types";

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
}

/** Defaults */
const DEFAULT_INCLUDE = ["**/*"];
const DEFAULT_EXCLUDE = ["node_modules/**", "dist/**", "build/**"];

/**
 * Normalize user config into fully expanded and classified form.
 */
export const normalizeConfig = async <T extends string = BasicMergeStrategies>(
  config: Config<T>,
): Promise<NormalizedConfig> => {
  const rules: NormalizedRules = {
    exact: Object.create(null),
    exactFields: Object.create(null),
    patterns: Object.create(null),
    default: normalizeDefault(config.defaultStrategy),
  };

  const matcher =
    typeof config.matcher === "string"
      ? await loadMatcher(config.matcher)
      : (config.matcher ?? basicMatcher);

  let order = 0;

  if (config.byStrategy) {
    for (const [rawStrategy, fields] of Object.entries(config.byStrategy)) {
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

  if (config.rules) {
    expandRuleTree(config.rules, [], (pathKey, strategyNames) => {
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

  const include = config.include?.length ? config.include : DEFAULT_INCLUDE;
  const exclude = config.exclude?.length ? config.exclude : DEFAULT_EXCLUDE;

  const fileFilter = (filepath: string) => {
    if (!matcher.isMatch(filepath, include)) return false;
    if (exclude.length && matcher.isMatch(filepath, exclude)) return false;
    return true;
  };

  return {
    rules,
    matcher,
    fileFilter,
    customStrategies: config.customStrategies ?? {},
    includeNonConflicted: config.includeNonConflicted ?? false,
  };
};

/* ---------------- helpers ---------------- */

const normalizeDefault = <T extends string>(def?: T | T[]): StrategyItem[] => {
  const arr = def ? (Array.isArray(def) ? def : [def]) : ["merge"];

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
