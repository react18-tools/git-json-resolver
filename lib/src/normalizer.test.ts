import { describe, it, expect, vi } from "vitest";
import { normalizeConfig } from "./normalizer";
import { basicMatcher } from "./matcher";
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
    expect(result.rules.default).toEqual([{ name: "theirs", important: false }]);
  });

  it("accepts multiple default strategies", async () => {
    const result = await normalizeConfig({ defaultStrategy: ["merge", "theirs"] });
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
    await expect(() => normalizeConfig(config)).rejects.toThrow(/Invalid bracket form/);
  });

  it("throws on empty rule key", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["!"],
      },
    };
    await expect(() => normalizeConfig(config)).rejects.toThrow(/Invalid rule key/);
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

  it("fileFilter includes allowed files and excludes others", async () => {
    const result = await normalizeConfig({
      include: ["src/**"],
      exclude: ["src/ignore/**"],
      matcher: "micromatch",
    });
    expect(result.fileFilter("src/index.ts")).toBe(true);
    expect(result.fileFilter("src/ignore/file.ts")).toBe(false);
    expect(result.fileFilter("other/file.ts")).toBe(false);
  });

  it("fileFilter includes allowed files and excludes others", async () => {
    const result = await normalizeConfig({
      include: ["src/**"],
      exclude: ["src/ignore/**"],
    });
    expect(result.fileFilter("src/index.ts")).toBe(true);
    expect(result.fileFilter("src/ignore/file.ts")).toBe(false);
    expect(result.fileFilter("other/file.ts")).toBe(false);
  });

  it("fileFilter includes allowed files and excludes others", async () => {
    const result = await normalizeConfig({
      include: ["src/**/*.json"],
      exclude: ["src/ignore/**"],
    });
    expect(result.fileFilter("src/index.ts")).toBe(false);
    expect(result.fileFilter("src/index.json")).toBe(true);
    expect(result.fileFilter("src/abc/index.json")).toBe(true);
    expect(result.fileFilter("src/ignore/file.ts")).toBe(false);
    expect(result.fileFilter("other/file.json")).toBe(false);
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
    await expect(normalizeConfig(config)).rejects.toThrow(/must not end with "!"/);
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
    await expect(normalizeConfig(config)).rejects.toThrow(/Invalid bracket form/);
  });

  it("throws on empty bracket form", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["[]"],
      },
    };
    await expect(normalizeConfig(config)).rejects.toThrow(/Invalid bracket form/);
  });

  it("throws on invalid escaped dot in bracket form", async () => {
    const config: Config<any> = {
      byStrategy: {
        merge: ["[a.b]"],
      },
    };
    await expect(normalizeConfig(config)).rejects.toThrow(/Invalid bracket form/);
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
    expect(result.rules.exactFields.dup.map(r => r.strategies[0])).toEqual([
      { name: "merge", important: false },
      { name: "theirs", important: false },
    ]);
  });
});
