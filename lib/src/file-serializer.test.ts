import { describe, it, expect, vi } from "vitest";
import { serialize } from "./file-serializer";

describe("serialize", () => {
  const sample = { foo: "bar", num: 42 };

  it("serializes JSON", async () => {
    const result = await serialize("json", sample);
    expect(result).toContain('"foo": "bar"');
    expect(result).toContain('"num": 42');
    expect(() => JSON.parse(result)).not.toThrow();
  });

  it("serializes JSON5 (same as JSON)", async () => {
    const result = await serialize("json5", sample);
    expect(result).toContain('"foo": "bar"');
    expect(result).toContain('"num": 42');
  });

  it("serializes YAML", async () => {
    // mock yaml
    vi.doMock("yaml", () => ({
      stringify: (obj: any) => `mock-yaml: ${JSON.stringify(obj)}`,
    }));

    const { serialize: mockedSerialize } = await import("./file-serializer");
    const result = await mockedSerialize("yaml", sample);
    expect(result).toContain("mock-yaml");
  });

  it("serializes TOML", async () => {
    vi.doMock("smol-toml", () => ({
      stringify: (obj: any) => `mock-toml = ${JSON.stringify(obj)}`,
    }));

    const { serialize: mockedSerialize } = await import("./file-serializer");
    const result = await mockedSerialize("toml", sample);
    expect(result).toContain("mock-toml");
  });

  it("serializes XML", async () => {
    vi.doMock("fast-xml-parser", () => ({
      XMLBuilder: class {
        build(obj: any) {
          return `<mock>${JSON.stringify(obj)}</mock>`;
        }
      },
    }));

    const { serialize: mockedSerialize } = await import("./file-serializer");
    const result = await mockedSerialize("xml", sample);
    expect(result).toContain("<mock>");
  });

  it("throws for unknown format", async () => {
    await expect(serialize("unknown", sample)).rejects.toThrow(/Unknown format/);
  });
});
