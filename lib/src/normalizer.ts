/**
 * Config normalizer for JSON merge rules.
 * Expands shorthand, validates strategies, parses importance,
 * and classifies rules into exact / top-level / glob categories.
 */

import { Matcher, basicMatcher, loadMatcher } from "./matcher";
import { InbuiltMergeStrategies, AllStrategies, Config, RuleTree, StrategyPlugin, StrategyFn } from "./types";

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

export interface NormalizedConfig<T extends string = AllStrategies, TContext = unknown>
  extends Omit<Config<T, TContext>, "byStrategy" | "rules" | "defaultStrategy" | "customStrategies"> {
  rules: NormalizedRules;
  matcher: Matcher;
  include: string[];
  exclude: string[];
  customStrategies: Record<string, StrategyFn<TContext>>;
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
export const normalizeConfig = async <T extends string = AllStrategies>(
  config: Config<T>,
): Promise<NormalizedConfig> => {
  const { rules, byStrategy, defaultStrategy, matcher, plugins, pluginConfig, customStrategies, ...userConfig } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  // Load plugin strategies
  const loadedStrategies = await loadPluginStrategies(plugins, pluginConfig);
  const allCustomStrategies = { ...customStrategies, ...loadedStrategies };

  const normalizedRules: NormalizedRules = {
    exact: Object.create(null),
    exactFields: Object.create(null),
    patterns: Object.create(null),
    default: normalizeDefault(defaultStrategy),
  };

  const resolvedMatcher =
    typeof matcher === "string" ? await loadMatcher(matcher) : (matcher ?? basicMatcher);

  let order = 0;

  if (byStrategy) {
    for (const [rawStrategy, fields] of Object.entries(byStrategy)) {
      if (!fields) continue;
      const { name, important: strategyImportant } = parseStrategyName(rawStrategy);
      for (const raw of fields as string[]) {
        const { key, important: keyImportant } = parseImportance(raw);
        addRule(normalizedRules, key, {
          strategies: [{ name, important: strategyImportant || keyImportant }],
          order: order++,
          source: key,
        });
      }
    }
  }

  if (rules) {
    expandRuleTree(rules, [], (pathKey, strategyNames) => {
      const { key, important: keyImportant } = parseImportance(pathKey);
      const strategies = strategyNames.map(s => {
        const { name, important } = parseStrategyName(s);
        return { name, important: important || keyImportant };
      });
      addRule(normalizedRules, key, {
        strategies,
        order: order++,
        source: key,
      });
    });
  }

  return {
    ...userConfig,
    rules: normalizedRules,
    matcher: resolvedMatcher,
    customStrategies: allCustomStrategies,
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

  const hasWildcards = /[*?[\]]/.test(key);
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

/**
 * Load strategies from plugins.
 */
const loadPluginStrategies = async (
  plugins?: string[],
  pluginConfig?: Record<string, any>,
): Promise<Record<string, StrategyFn>> => {
  if (!plugins?.length) return {};

  const strategies: Record<string, StrategyFn> = {};

  for (const pluginName of plugins) {
    try {
      // Dynamic import for plugin
      const pluginModule = await import(pluginName);
      const plugin: StrategyPlugin = pluginModule.default || pluginModule;

      if (!plugin.strategies) {
        throw new Error(`Plugin "${pluginName}" does not export strategies`);
      }

      // Initialize plugin if it has init method
      if (plugin.init && pluginConfig?.[pluginName]) {
        await plugin.init(pluginConfig[pluginName]);
      }

      // Add plugin strategies
      Object.assign(strategies, plugin.strategies);
    } catch (error) {
      throw new Error(`Failed to load plugin "${pluginName}": ${error}`);
    }
  }

  return strategies;
};
