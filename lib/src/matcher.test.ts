import { describe, it, expect } from "vitest";
import { basicMatcher, loadMatcher } from "./matcher";

for (const matcherName of ["basicMatcher", "micromatch", "picomatch"] as const) {
  describe(matcherName, async () => {
    const matcher = matcherName === "basicMatcher" ? basicMatcher : await loadMatcher(matcherName);
    it("matches exact strings", () => {
      expect(matcher.isMatch("foo.bar", ["foo.bar"])).toBe(true);
      expect(matcher.isMatch("foo.bar", ["foo.baz"])).toBe(false);
    });

    it("matches with single * segment", () => {
      expect(matcher.isMatch("foo.bar", ["foo.*"])).toBe(true);
      expect(matcher.isMatch("foo.baz.qux", ["foo.*.qux"])).toBe(true);
      expect(matcher.isMatch("foo.bar", ["*.baz"])).toBe(false);
    });

    it("matches with ** for nested paths", () => {
      expect(matcher.isMatch("a.b.c", ["a.**"])).toBe(true);
      expect(matcher.isMatch("a.b.c.d", ["a.**.d"])).toBe(true);
      expect(matcher.isMatch("a.b.c.d", ["**.d"])).toBe(true);
      expect(matcher.isMatch("a.b.c.d", ["*.d"])).toBe(false);
      expect(matcher.isMatch("a.b.c", ["**"])).toBe(true);
    });

    it("supports prefix-* and *-suffix in segments", () => {
      expect(matcher.isMatch("foo.helloWorld", ["foo.hello*"])).toBe(true);
      expect(matcher.isMatch("foo.helloWorld", ["foo.*World"])).toBe(true);
      expect(matcher.isMatch("foo.helloWorld", ["foo.hel*ld"])).toBe(true);
      expect(matcher.isMatch("foo.helloWorld", ["foo.hel*xyz"])).toBe(false);
    });

    it("returns true if any pattern matches", () => {
      expect(matcher.isMatch("foo.bar", ["no.match", "foo.*"])).toBe(true);
    });

    it("handles empty patterns", () => {
      expect(matcher.isMatch("foo.bar", [])).toBe(false);
    });

    it("respects escapes", () => {
      expect(matcher.isMatch("foo.helloWorld", ["foo.hello*"])).toBe(true);
      expect(matcher.isMatch("foo.helloWorld", ["foo.hello\\*"])).toBe(false);
      expect(matcher.isMatch("foo.hello*", ["foo.hello\\*"])).toBe(true);

      expect(matcher.isMatch("a.b.c", ["a.**"])).toBe(true);
      expect(matcher.isMatch("a.b.c", ["a.\\*\\*"])).toBe(false);
      expect(matcher.isMatch("a.**", ["a.\\*\\*"])).toBe(true);
      expect(matcher.isMatch("a.c.b", ["a.***"])).toBe(false);
    });

    it("negates exact match", () => {
      expect(matcher.isMatch("src/index.ts", ["!src/index.ts"])).toBe(false);
      expect(matcher.isMatch("src/other.ts", ["!src/index.ts"])).toBe(true);
    });

    it("negates directory glob", () => {
      expect(matcher.isMatch("src/utils/app.ts", ["!src/**"])).toBe(false);
      expect(matcher.isMatch("lib/app.ts", ["!src/**"])).toBe(true);
    });

    it("negates simple * wildcard (recursive)", () => {
      expect(matcher.isMatch("test/app.test.ts", ["!**/*.test.ts"])).toBe(false);
      expect(matcher.isMatch("test/app.ts", ["!**/*.test.ts"])).toBe(true);
    });

    it("root level negation", () => {
      expect(matcher.isMatch("src", ["!src"])).toBe(false);
      expect(matcher.isMatch("other", ["!src"])).toBe(true);
    });
  });
}

describe("loadMatcher", () => {
  it("loads micromatch when available", async () => {
    const mm = await loadMatcher("micromatch");
    expect(mm.isMatch("foo", ["foo"])).toBe(true);
    expect(mm.isMatch("bar", ["foo"])).toBe(false);
  });

  it("loads picomatch when available", async () => {
    const pm = await loadMatcher("picomatch");
    expect(pm.isMatch("okmyfield", ["ok*"])).toBe(true);
    expect(pm.isMatch("fail", ["pattern"])).toBe(false);
  });

  it("throws on unknown matcher", async () => {
    await expect(() => loadMatcher("invalid" as any)).rejects.toThrow(/Unknown matcher/);
  });
});
