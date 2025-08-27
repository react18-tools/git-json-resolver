import { describe, it, expect } from "vitest";
import { parseConflictContent } from "./file-parser";

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
    const result = await parseConflictContent(raw, { parsers: "json" });

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
    const result = await parseConflictContent(raw, { parsers: ["json5"] });
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

    const result = await parseConflictContent(raw, { parsers: custom });
    expect(result.format).toBe("custom");
    expect(result.ours).toMatchObject({ parsed: expect.stringContaining("ours-side") });
    expect(result.theirs).toMatchObject({ parsed: expect.stringContaining("theirs-side") });
  });

  it("throws if parsing fails for all parsers", async () => {
    const raw = "invalid";
    await expect(parseConflictContent(raw, { parsers: ["json"] })).rejects.toThrow(
      /Failed to parse/,
    );
  });

  it("throws if conflict markers produce empty side", async () => {
    const raw = `
<<<<<<< ours
only ours
>>>>>>> theirs
`;
    await expect(parseConflictContent(raw, { parsers: "json" })).rejects.toThrow(/empty content/);
  });
});
