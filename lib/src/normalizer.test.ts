import { describe, expect, it, vi } from "vitest";
import { basicMatcher } from "./matcher";
import { normalizeConfig } from "./normalizer";
import type { Config } from "./types";

describe("normalizeConfig", () => {
  it("uses default strategy = merge when not provided", async () => {
    const result = await normalizeConfig({});
    expect(result.rules.default).toEqual([
      { name: "merge", important: false },
      { name: "ours", important: false },
    ]);
  });

  it("accepts single default strategy", async () => {
    const result = await normalizeConfig({ defaultStrategy: "theirs" });
    expect(result.rules.default).toEqual([
      { name: "theirs", important: false },
    ]);
  });

  it("accepts multiple default strategies", async () => {
    const result = await normalizeConfig({
      defaultStrategy: ["merge", "theirs"],
    });
    expect(result.rules.default).toEqual([
      { name: "merge", important: false },
      { name: "theirs", important: false },
    ]);
  });

  it("classifies rules from byStrategy into exactFields", async () => {
    const config: Config<any> = {
      byStrategy: {
        theirs: ["foo", "bar!"],
      },
    };
    const result = await normalizeConfig(config);
    expect(result.rules.exactFields.foo[0].strategies).toEqual([
      { name: "theirs", important: false },
    ]);
    expect(result.rules.exactFields.bar[0].strategies[0].important).toBe(true);
  });

  it("classifies dotted keys as exact", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["a.b.c"],
      },
    };
    const result = await normalizeConfig(config);
    expect(result.rules.exact["a.b.c"]).toHaveLength(1);
  });

  it("classifies wildcard keys as patterns", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["foo.*.bar"],
      },
    };
    const result = await normalizeConfig(config);
    expect(result.rules.patterns["foo.*.bar"]).toHaveLength(1);
  });

  it("classifies bracket keys into patterns", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["[id]"],
      },
    };
    const result = await normalizeConfig(config);
    expect(result.rules.patterns["**.id.**"]).toHaveLength(1);
  });

  it("throws on invalid bracket key", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["[a.b]"],
      },
    };
    await expect(() => normalizeConfig(config)).rejects.toThrow(
      /Invalid bracket form/,
    );
  });

  it("throws on empty rule key", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["!"],
      },
    };
    await expect(() => normalizeConfig(config)).rejects.toThrow(
      /Invalid rule key/,
    );
  });

  it("expands rules tree into exact entries", async () => {
    const config: Config<any> = {
      rules: {
        user: {
          name: ["theirs"],
          profile: {
            age: ["merge"],
          },
        },
      },
    };
    const result = await normalizeConfig(config);
    expect(result.rules.exact["user.name"][0].strategies).toEqual([
      { name: "theirs", important: false },
    ]);
    expect(result.rules.exact["user.profile.age"][0].strategies).toEqual([
      { name: "merge", important: false },
    ]);
  });

  it("uses basicMatcher by default", async () => {
    const result = await normalizeConfig({});
    expect(result.matcher).toBe(basicMatcher);
  });

  it("accepts custom matcher instance", async () => {
    const fakeMatcher = {
      isMatch: () => true,
    };
    const result = await normalizeConfig({ matcher: fakeMatcher });
    expect(result.matcher).toBe(fakeMatcher);
  });

  it("throws if strategy name ends with '!'", async () => {
    const config: Config<any> = {
      byStrategy: {
        "merge!!": ["foo"],
      },
    };
    await expect(normalizeConfig(config)).rejects.toThrow(
      /must not end with "!"/,
    );
  });

  it("throws on empty rule key '!'", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["!"],
      },
    };
    await expect(normalizeConfig(config)).rejects.toThrow(/Invalid rule key/);
  });

  it("marks important from byStrategy rule with '!'", async () => {
    const config: Config<any> = {
      byStrategy: {
        theirs: ["foo!"],
      },
    };
    const result = await normalizeConfig(config);
    expect(result.rules.exactFields.foo[0].strategies[0].important).toBe(true);
  });

  it("marks important from rules tree key with '!'", async () => {
    const config: Config<any> = {
      rules: {
        user: {
          "id!": ["theirs"],
        },
      },
    };
    const result = await normalizeConfig(config);
    expect(result.rules.exact["user.id"][0].strategies[0].important).toBe(true);
  });

  it("throws on invalid bracket form with dot", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["[a.b]"],
      },
    };
    await expect(normalizeConfig(config)).rejects.toThrow(
      /Invalid bracket form/,
    );
  });

  it("throws on empty bracket form", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["[]"],
      },
    };
    await expect(normalizeConfig(config)).rejects.toThrow(
      /Invalid bracket form/,
    );
  });

  it("throws on invalid escaped dot in bracket form", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["[a.b]"],
      },
    };
    await expect(normalizeConfig(config)).rejects.toThrow(
      /Invalid bracket form/,
    );
  });

  it("expands deeply nested rule tree", async () => {
    const config: Config<any> = {
      rules: {
        root: {
          child: {
            leaf: ["merge"],
          },
        },
      },
    };
    const result = await normalizeConfig(config);
    expect(result.rules.exact["root.child.leaf"][0].strategies).toEqual([
      { name: "merge", important: false },
    ]);
  });

  it("push appends to same key", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["dup"],
        theirs: ["dup"],
      },
    };
    const result = await normalizeConfig(config);
    expect(result.rules.exactFields.dup.map((r) => r.strategies[0])).toEqual([
      { name: "merge", important: false },
      { name: "theirs", important: false },
    ]);
  });

  it("merges customStrategies with plugin strategies", async () => {
    const mockStrategy = vi.fn();
    const config: Config<any> = {
      customStrategies: {
        "custom-strategy": mockStrategy,
      },
    };
    const result = await normalizeConfig(config);
    expect(result.customStrategies["custom-strategy"]).toBe(mockStrategy);
  });

  it("returns empty strategies when no plugins provided", async () => {
    const result = await normalizeConfig({});
    expect(result.customStrategies).toEqual({});
  });

  it("loads plugin strategies when plugins provided", async () => {
    // Mock dynamic import
    const mockPlugin = {
      strategies: {
        "plugin-strategy": vi.fn(),
      },
    };

    vi.doMock("test-plugin", () => ({ default: mockPlugin }));

    const config: Config<any> = {
      plugins: ["test-plugin"],
    };

    const result = await normalizeConfig(config);
    expect(result.customStrategies["plugin-strategy"]).toBe(
      mockPlugin.strategies["plugin-strategy"],
    );

    vi.doUnmock("test-plugin");
  });

  it("calls plugin init with config", async () => {
    const mockInit = vi.fn();
    const mockPlugin = {
      strategies: { "test-strategy": vi.fn() },
      init: mockInit,
    };

    vi.doMock("test-plugin", () => ({ default: mockPlugin }));

    const config: Config<any> = {
      plugins: ["test-plugin"],
      pluginConfig: {
        "test-plugin": { option: "value" },
      },
    };

    await normalizeConfig(config);
    expect(mockInit).toHaveBeenCalledWith({ option: "value" });

    vi.doUnmock("test-plugin");
  });

  it("throws error when plugin has no strategies", async () => {
    const mockPlugin = {};

    vi.doMock("bad-plugin", () => ({ default: mockPlugin }));

    const config: Config<any> = {
      plugins: ["bad-plugin"],
    };

    await expect(normalizeConfig(config)).rejects.toThrow(
      'Plugin "bad-plugin" does not export strategies',
    );

    vi.doUnmock("bad-plugin");
  });

  it("throws error when plugin import fails", async () => {
    const config: Config<any> = {
      plugins: ["non-existent-plugin"],
    };

    await expect(normalizeConfig(config)).rejects.toThrow(
      'Failed to load plugin "non-existent-plugin"',
    );
  });
});
