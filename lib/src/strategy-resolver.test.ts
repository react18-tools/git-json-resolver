import { describe, expect, it } from "vitest";
import type {
  NormalizedConfig,
  StrategyItem,
  StrategyList,
} from "./normalizer";
import { resolveStrategies } from "./strategy-resolver";

const makeStrategy = (name: string, important = false): StrategyItem => ({
  name,
  important,
});

const makeList = (
  strategies: StrategyItem[],
  order = 0,
  source = "test",
): StrategyList => ({
  strategies,
  order,
  source,
});

describe("resolveStrategies", () => {
  const matcher = {
    isMatch: (path: string, patterns: string[]) =>
      patterns.some((p) => path.includes(p.replace("*", ""))),
  };

  it("resolves from exact path", () => {
    // @ts-expect-error -- ok -- passing only relevant config
    const config: NormalizedConfig = {
      matcher,
      rules: {
        exact: {
          "foo.bar": [makeList([makeStrategy("exactPath")])],
        },
        exactFields: {},
        patterns: {},
        default: [],
      },
    };

    const result = resolveStrategies("foo.bar", config);
    expect(result).toEqual(["exactPath"]);
  });

  it("resolves from exact field", () => {
    // @ts-expect-error -- ok -- passing only relevant config
    const config: NormalizedConfig = {
      matcher,
      rules: {
        exact: {},
        exactFields: {
          bar: [makeList([makeStrategy("exactField")])],
        },
        patterns: {},
        default: [],
      },
    };

    const result = resolveStrategies("foo.bar", config);
    expect(result).toEqual(["exactField"]);
  });

  it("resolves from pattern", () => {
    // @ts-expect-error -- ok -- passing only relevant config
    const config: NormalizedConfig = {
      matcher,
      rules: {
        exact: {},
        exactFields: {},
        patterns: {
          "*.bar": [makeList([makeStrategy("pattern")])],
        },
        default: [],
      },
    };

    const result = resolveStrategies("foo.bar", config);
    expect(result).toEqual(["pattern"]);
  });

  it("resolves from default", () => {
    // @ts-expect-error -- ok -- passing only relevant config
    const config: NormalizedConfig = {
      matcher,
      rules: {
        exact: {},
        exactFields: {},
        patterns: {},
        default: [makeStrategy("default")],
      },
    };

    const result = resolveStrategies("foo.bar", config);
    expect(result).toEqual(["default"]);
  });

  it("prioritizes important strategies", () => {
    // @ts-expect-error -- ok -- passing only relevant config
    const config: NormalizedConfig = {
      matcher,
      rules: {
        exact: {
          "foo.bar": [
            makeList([makeStrategy("normal"), makeStrategy("important", true)]),
          ],
        },
        exactFields: {},
        patterns: {},
        default: [],
      },
    };

    const result = resolveStrategies("foo.bar", config);
    expect(result).toEqual(["important", "normal"]);
  });

  it("merges strategies from multiple sources", () => {
    // @ts-expect-error -- ok -- passing only relevant config
    const config: NormalizedConfig = {
      matcher,
      rules: {
        exact: {
          "foo.bar": [makeList([makeStrategy("exact")])],
        },
        exactFields: {
          bar: [makeList([makeStrategy("field")])],
        },
        patterns: {
          "*.bar": [makeList([makeStrategy("pattern")])],
        },
        default: [makeStrategy("default")],
      },
    };

    const result = resolveStrategies("foo.bar", config);
    expect(result).toEqual(["exact", "field", "pattern", "default"]);
  });
});
