import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { basicMatcher, loadMatcher } from "./matcher";

describe("basicMatcher", () => {
  it("matches exact strings", () => {
    expect(basicMatcher.isMatch("foo.bar", ["foo.bar"])).toBe(true);
    expect(basicMatcher.isMatch("foo.bar", ["foo.baz"])).toBe(false);
  });

  it("matches with single * segment", () => {
    expect(basicMatcher.isMatch("foo.bar", ["foo.*"])).toBe(true);
    expect(basicMatcher.isMatch("foo.baz.qux", ["foo.*.qux"])).toBe(true);
    expect(basicMatcher.isMatch("foo.bar", ["*.baz"])).toBe(false);
  });

  it("matches with ** for nested paths", () => {
    expect(basicMatcher.isMatch("a.b.c", ["a.**"])).toBe(true);
    expect(basicMatcher.isMatch("a.b.c.d", ["a.**.d"])).toBe(true);
    expect(basicMatcher.isMatch("a.b.c.d", ["**.d"])).toBe(true);
    expect(basicMatcher.isMatch("a.b.c.d", ["*.d"])).toBe(false);
    expect(basicMatcher.isMatch("a.b.c", ["**"])).toBe(true);
  });

  it("supports prefix-* and *-suffix in segments", () => {
    expect(basicMatcher.isMatch("foo.helloWorld", ["foo.hello*"])).toBe(true);
    expect(basicMatcher.isMatch("foo.helloWorld", ["foo.*World"])).toBe(true);
    expect(basicMatcher.isMatch("foo.helloWorld", ["foo.hel*ld"])).toBe(true);
    expect(basicMatcher.isMatch("foo.helloWorld", ["foo.hel*xyz"])).toBe(false);
  });

  it("returns true if any pattern matches", () => {
    expect(basicMatcher.isMatch("foo.bar", ["no.match", "foo.*"])).toBe(true);
  });

  it("handles empty patterns", () => {
    expect(basicMatcher.isMatch("foo.bar", [])).toBe(false);
  });

  it("respects escapes", () => {
    expect(basicMatcher.isMatch("foo.helloWorld", ["foo.hello*"])).toBe(true);
    expect(basicMatcher.isMatch("foo.helloWorld", ["foo.hello\\*"])).toBe(false);
    expect(basicMatcher.isMatch("foo.hello*", ["foo.hello\\*"])).toBe(true);

    expect(basicMatcher.isMatch("a.b.c", ["a.**"])).toBe(true);
    expect(basicMatcher.isMatch("a.b.c", ["a.\\*\\*"])).toBe(false);
    expect(basicMatcher.isMatch("a.**", ["a.\\*\\*"])).toBe(true);
  });
});

describe("loadMatcher", () => {
  const realRequire = require;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    // restore require if patched
    global.require = realRequire;
  });

  it("loads micromatch when available", () => {
    const mm = loadMatcher("micromatch");
    expect(mm.isMatch("foo", ["foo"])).toBe(true);
    expect(mm.isMatch("bar", ["foo"])).toBe(false);
  });

  it("loads picomatch when available", () => {
    const pm = loadMatcher("picomatch");
    expect(pm.isMatch("okmyfield", ["ok*"])).toBe(true);
    expect(pm.isMatch("fail", ["pattern"])).toBe(false);
  });

  it("throws on unknown matcher", () => {
    expect(() => loadMatcher("invalid" as any)).toThrow(/Unknown matcher/);
  });
});
