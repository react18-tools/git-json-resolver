export const serialize = async (
  format: string,
  value: unknown,
): Promise<string> => {
  switch (format) {
    case "json":
    case "json5":
      return JSON.stringify(value, null, 2);
    case "yaml": {
      const { stringify } = await import("yaml");
      return stringify(value);
    }
    case "toml": {
      const { stringify } = await import("smol-toml");
      return stringify(value);
    }
    case "xml": {
      const { XMLBuilder } = await import("fast-xml-parser");
      return new XMLBuilder({}).build(value);
    }
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
