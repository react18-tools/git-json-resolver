import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { Config, SupportedParsers } from "./types";

const execFileAsync = promisify(execFile);

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
  /** Parsed content from the "base" side of the conflict (optional). */
  base?: T;
  /** Format used to parse the content (`json`, `yaml`, `toml`, `xml`, or `custom`). */
  format: string;
}

/**
 * Options for parsing conflicted content.
 */
export interface ParseConflictOptions extends Pick<Config, "parsers"> {
  /**
   * filename hint to prioritize parser choice as well as get base and ours from git.
   * Example:
   * - `config.yaml` → try `yaml` first.
   * - `data.toml` → try `toml` first.
   *
   * If extension is unknown, falls back to `parsers` or `"json"`.
   */
  filename: string;
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
  options: ParseConflictOptions,
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

  let oursRaw = oursLines.join("\n");
  const theirsRaw = theirsLines.join("\n");
  const baseRaw = await execFileAsync(
    "git",
    ["show", `:1:${options.filename}`],
    {
      maxBuffer: 1024 * 1024 * 50,
    },
  )
    .then(({ stdout }) => stdout)
    .catch(() => null);

  // No conflict
  if (oursRaw === theirsRaw) {
    oursRaw =
      (await execFileAsync("git", ["show", `HEAD:${options.filename}`], {
        maxBuffer: 1024 * 1024 * 50,
      })
        .then(({ stdout }) => stdout)
        .catch(() => null)) ?? oursRaw;
  }

  if (!oursRaw || !theirsRaw) {
    throw new Error("Conflict parsing resulted in empty content.");
  }

  // normalize parser list
  const parsers = normalizeParsers(options);

  const [oursParsed, format] = await runParser(oursRaw, parsers);
  const [[theirsParsed], baseParsed] = await Promise.all(
    (baseRaw ? [theirsRaw, baseRaw] : [theirsRaw]).map((raw) =>
      runParser(raw, [format]),
    ),
  );

  return {
    ours: oursParsed as T,
    theirs: theirsParsed as T,
    base: baseParsed?.[0] as T | undefined,
    format: typeof format === "string" ? format : format.name,
  };
};

const FILE_EXTENSION_TO_PARSER_MAP: Record<string, SupportedParsers> = {
  json: "json",
  json5: "json5",
  yaml: "yaml",
  yml: "yaml",
  toml: "toml",
  xml: "xml",
};

/** Normalize parsers based on filename + options. */
export const normalizeParsers = (
  options: ParseConflictOptions,
): SupportedParsers[] => {
  if (Array.isArray(options.parsers)) return options.parsers;

  if (options.parsers) {
    return options.parsers === "auto"
      ? ["json", "json5", "yaml", "toml", "xml"]
      : [options.parsers];
  }

  if (options.filename) {
    const parserBasedOnExt =
      FILE_EXTENSION_TO_PARSER_MAP[
        options.filename.split(".").pop()?.toLowerCase() ?? ""
      ];
    if (parserBasedOnExt) {
      return [parserBasedOnExt];
    }
  }

  return ["json"]; // default
};

/** Internal helper to try parsers in order. */
export const runParser = async (
  raw: string,
  parsers: SupportedParsers[],
): Promise<[unknown, SupportedParsers]> => {
  for (const parser of parsers) {
    try {
      if (typeof parser !== "string") return [parser.parser(raw), parser];
      return [await parseFormat(parser, raw), parser];
    } catch (err) {
      console.debug(
        `Parser ${typeof parser === "string" ? parser : parser.name} failed:`,
        err,
      );
    }
  }
  throw new Error(
    `Failed to parse content. Tried parsers: ${parsers.map((p) => (typeof p === "string" ? p : p.name)).join(", ")}`,
  );
};

/** Internal parser dispatcher for supported formats. */
export const parseFormat = async (
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
        throw new Error(
          "json5 parser not installed. Please install as peer dependency.",
        );
      }
    }
    case "yaml": {
      try {
        const { parse } = await import("yaml");
        return parse(raw);
      } catch {
        throw new Error(
          "yaml parser not installed. Please install as peer dependency.",
        );
      }
    }
    case "toml": {
      try {
        const { parse } = await import("smol-toml");
        return parse(raw);
      } catch {
        throw new Error(
          "toml parser not installed. Please install as peer dependency.",
        );
      }
    }
    case "xml": {
      try {
        const { XMLParser } = await import("fast-xml-parser");
        return new XMLParser().parse(raw);
      } catch {
        throw new Error(
          "fast-xml-parser not installed. Please install as peer dependency.",
        );
      }
    }
  }
};
