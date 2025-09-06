import { describe, it, expect, vi } from "vitest";
import { parseConflictContent, normalizeParsers, runParser, parseFormat } from "./file-parser";

describe("parseConflictContent", () => {
  const makeConflict = (ours: string, theirs: string) =>
    `
{
  "name": "test",
<<<<<<< ours
${ours}
=======
${theirs}
>>>>>>> theirs
}
`.trim();

  it("parses simple JSON conflict", async () => {
    const raw = makeConflict(`  "value": 1`, `  "value": 2`);
    const result = await parseConflictContent(raw, { parsers: "json", filename: "" });

    expect(result.format).toBe("json");
    expect(result.ours).toEqual({ name: "test", value: 1 });
    expect(result.theirs).toEqual({ name: "test", value: 2 });
  });

  it("respects filename extension hint (yaml)", async () => {
    const raw = `
key: value
<<<<<<< ours
ours: 1
=======
theirs: 2
>>>>>>> theirs
`;
    const result = await parseConflictContent(raw, { filename: "config.yaml" });
    expect(result.format).toBe("yaml");
    expect(result.ours).toHaveProperty("ours", 1);
    expect(result.theirs).toHaveProperty("theirs", 2);
  });

  it("respects explicit parsers array (json5 fallback)", async () => {
    const raw = makeConflict(`  value: 1,`, `  value: 2,`);
    const result = await parseConflictContent(raw, { parsers: ["json5"], filename: "" });
    expect(result.format).toBe("json5");
    expect(result.ours).toMatchObject({ value: 1 });
    expect(result.theirs).toMatchObject({ value: 2 });
  });

  it("supports custom parser", async () => {
    const raw = makeConflict("ours-side", "theirs-side");
    const custom = {
      name: "custom",
      parser: (s: string) => ({ parsed: s.trim() }),
    };

    const result = await parseConflictContent(raw, { parsers: custom, filename: "" });
    expect(result.format).toBe("custom");
    expect(result.ours).toMatchObject({ parsed: expect.stringContaining("ours-side") });
    expect(result.theirs).toMatchObject({ parsed: expect.stringContaining("theirs-side") });
  });

  it("throws if parsing fails for all parsers", async () => {
    const raw = "invalid";
    await expect(parseConflictContent(raw, { parsers: ["json"], filename: "" })).rejects.toThrow(
      /Failed to parse/,
    );
  });

  it("throws if conflict markers produce empty side", async () => {
    const raw = `
<<<<<<< ours
only ours
>>>>>>> theirs
`;
    await expect(parseConflictContent(raw, { parsers: "json", filename: "" })).rejects.toThrow(
      /empty content/,
    );
  });
});

describe("normalizeParsers", () => {
  it("returns auto parsers when parsers is 'auto'", () => {
    const result = normalizeParsers({ parsers: "auto", filename: "test.json" });
    expect(result).toEqual(["json", "json5", "yaml", "toml", "xml"]);
  });

  it("returns single parser when parsers is string", () => {
    const result = normalizeParsers({ parsers: "yaml", filename: "test.json" });
    expect(result).toEqual(["yaml"]);
  });

  it("falls back to extension-based parser", () => {
    const result = normalizeParsers({ filename: "config.toml" });
    expect(result).toEqual(["toml"]);
  });
});

describe("runParser", () => {
  it("logs debug message on parser failure", async () => {
    const consoleSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    await expect(runParser("invalid", ["json"])).rejects.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Parser json failed:"),
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });
});

describe("parseFormat", () => {
  it("throws error for missing json5 dependency", async () => {
    vi.doMock("json5", () => {
      throw new Error("Module not found");
    });
    await expect(parseFormat("json5", "{}")).rejects.toThrow(/json5 parser not installed/);
  });

  it("throws error for missing yaml dependency", async () => {
    vi.doMock("yaml", () => {
      throw new Error("Module not found");
    });
    await expect(parseFormat("yaml", "key: value")).rejects.toThrow(/yaml parser not installed/);
  });

  it("throws error for missing toml dependency", async () => {
    vi.doMock("smol-toml", () => {
      throw new Error("Module not found");
    });
    await expect(parseFormat("toml", "key = 'value'")).rejects.toThrow(/toml parser not installed/);
  });

  it("parses xml successfully", async () => {
    const result = await parseFormat("xml", "<root><key>value</key></root>");
    expect(result).toHaveProperty("root");
  });

  it("throws error for missing xml dependency", async () => {
    vi.doMock("fast-xml-parser", () => {
      throw new Error("Module not found");
    });
    await expect(parseFormat("xml", "<root></root>")).rejects.toThrow(
      /fast-xml-parser not installed/,
    );
  });
});
