/**
 * Represents a parsed conflict from a file with `ours` and `theirs` versions.
 *
 * @template T - The type of the parsed content.
 */
export interface ParsedConflict<T = unknown> {
  /** Parsed content from the "ours" side of the conflict. */
  ours: T;
  /** Parsed content from the "theirs" side of the conflict. */
  theirs: T;
  /** Format used to parse the content (`json`, `yaml`, `toml`, `xml`, or `custom`). */
  format: string;
}

/** A parser function that takes a raw string and returns parsed content. */
export type Parser = (input: string) => unknown;

/** Built-in parser identifiers or a custom parser function. */
export type SupportedParsers = "json" | "json5" | "yaml" | "toml" | "xml" | Parser;

/**
 * Options for parsing conflicted content.
 */
export interface ParseConflictOptions {
  /**
   * Parsers to attempt, in order:
   * - A single parser (`"json"`, `"yaml"`, custom function, etc.).
   * - An array of parsers (e.g. `["yaml", "json5"]`).
   *
   * Defaults to `"json"`.
   */
  parsers?: "auto" | SupportedParsers | SupportedParsers[];

  /**
   * Optional filename hint to prioritize parser choice.
   * Example:
   * - `config.yaml` → try `yaml` first.
   * - `data.toml` → try `toml` first.
   *
   * If extension is unknown, falls back to `parsers` or `"json"`.
   */
  filename?: string;
}

/**
 * Parses a conflicted file's content into separate `ours` and `theirs` objects.
 *
 * - Preserves non-conflicted lines in both versions.
 * - Supports JSON, JSON5, YAML, TOML, and XML.
 * - Lazy-loads optional peer dependencies (`json5`, `yaml`, `toml`, `fast-xml-parser`).
 * - Parser order is determined by:
 *   1. `filename` extension hint (if provided).
 *   2. Explicit `parsers` option.
 *   3. Default `"json"`.
 *
 * @template T - Expected type of parsed content.
 * @param content - Raw file content containing conflict markers.
 * @param options - Parsing options (parsers + filename hint).
 * @returns Parsed conflict with both sides and detected format.
 * @throws If parsing fails or conflict markers are invalid.
 */
export const parseConflictContent = async <T = unknown>(
  content: string,
  options: ParseConflictOptions = {},
): Promise<ParsedConflict<T>> => {
  const lines = content.split("\n");
  const oursLines: string[] = [];
  const theirsLines: string[] = [];

  enum State {
    Normal,
    InOurs,
    InTheirs,
  }
  let state = State.Normal;

  for (const line of lines) {
    if (line.startsWith("<<<<<<<")) {
      state = State.InOurs;
      continue;
    } else if (line.startsWith("=======")) {
      if (state === State.InOurs) state = State.InTheirs;
      continue;
    } else if (line.startsWith(">>>>>>>")) {
      if (state === State.InTheirs) state = State.Normal;
      continue;
    }

    switch (state) {
      case State.Normal:
        oursLines.push(line);
        theirsLines.push(line);
        break;
      case State.InOurs:
        oursLines.push(line);
        break;
      case State.InTheirs:
        theirsLines.push(line);
        break;
    }
  }

  const oursRaw = oursLines.join("\n");
  const theirsRaw = theirsLines.join("\n");

  if (!oursRaw || !theirsRaw) {
    throw new Error("Conflict parsing resulted in empty content.");
  }

  // normalize parser list
  const parsers = normalizeParsers(options);

  const [oursParsed, format] = await runParser(oursRaw, parsers);
  const [theirsParsed] = await runParser(theirsRaw, [format]);

  return {
    ours: oursParsed as T,
    theirs: theirsParsed as T,
    format: typeof format === "function" ? "custom" : format,
  };
};

/** Normalize parsers based on filename + options. */
const normalizeParsers = (options: ParseConflictOptions): SupportedParsers[] => {
  if (options.parsers) {
    return Array.isArray(options.parsers)
      ? options.parsers
      : options.parsers === "auto"
        ? ["json", "json5", "yaml", "toml", "xml"]
        : [options.parsers];
  }

  if (options.filename) {
    const ext = options.filename.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "json":
        return ["json"];
      case "json5":
        return ["json5"];
      case "yaml":
      case "yml":
        return ["yaml"];
      case "toml":
        return ["toml"];
      case "xml":
        return ["xml"];
    }
  }

  return ["json"]; // default
};

/** Internal helper to try parsers in order. */
const runParser = async (
  raw: string,
  parsers: SupportedParsers[],
): Promise<[unknown, SupportedParsers]> => {
  for (const parser of parsers) {
    try {
      if (typeof parser === "function") return [parser(raw), parser];
      return [await parseFormat(parser, raw), parser];
    } catch (err) {
      console.debug(`Parser ${typeof parser === "function" ? "custom" : parser} failed:`, err);
    }
  }
  throw new Error(
    `Failed to parse content. Tried parsers: ${parsers.map(p => (typeof p === "string" ? p : "custom")).join(", ")}`,
  );
};

/** Internal parser dispatcher for supported formats. */
const parseFormat = async (
  parser: "json" | "json5" | "yaml" | "toml" | "xml",
  raw: string,
): Promise<unknown> => {
  switch (parser) {
    case "json":
      return JSON.parse(raw);
    case "json5": {
      try {
        const { parse } = await import("json5");
        return parse(raw);
      } catch {
        throw new Error("json5 parser not installed. Please install as peer dependency.");
      }
    }
    case "yaml": {
      try {
        const { parse } = await import("yaml");
        return parse(raw);
      } catch {
        throw new Error("yaml parser not installed. Please install as peer dependency.");
      }
    }
    case "toml": {
      try {
        const { parse } = await import("toml");
        return parse(raw);
      } catch {
        throw new Error("toml parser not installed. Please install as peer dependency.");
      }
    }
    case "xml": {
      try {
        const { XMLParser } = await import("fast-xml-parser");
        return new XMLParser().parse(raw);
      } catch {
        throw new Error("fast-xml-parser not installed. Please install as peer dependency.");
      }
    }
  }
};
