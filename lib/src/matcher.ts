/**
 * Matcher abstraction + adapters for micromatch/picomatch (optional).
 *
 * Default matcher understands:
 * - `*`   → matches any single field segment
 * - `**`  → matches any number of nested field segments
 * - Prefix/suffix like `prefix-*`, `*-suffix`
 * - Backslash escaping (micromatch-style): `a\/b` → literal slash, `\*` → literal asterisk
 *
 * Micromatch/Picomatch can be loaded at runtime as optional peers.
 */

export interface Matcher {
  /**
   * Returns true if `str` matches at least one of the provided glob `patterns`.
   */
  isMatch: (str: string, patterns: string[]) => boolean;
}

/**
 * Minimal homegrown matcher (default).
 * Supports:
 * - `*`   → matches any single field segment
 * - `**`  → matches any number of nested field segments
 * - Literal prefix/suffix like `prefix-*`, `*-suffix`
 * - Backslash escaping for `*` and `.`
 */
export const basicMatcher: Matcher = {
  isMatch: (str, patterns) => {
    const internalStr = toInternal(str);
    return patterns.some(p => matchOne(internalStr, toInternal(p)));
  },
};

/**
 * Attempts to load a named matcher adapter.
 * @param name `"micromatch" | "picomatch"`
 * @returns A Matcher implementation.
 */

export const loadMatcher = async (name: "micromatch" | "picomatch"): Promise<Matcher> => {
  if (name === "micromatch") {
    let micromatch: any;
    try {
      micromatch = await import("micromatch");
    } catch {
      /* v8 ignore next 4 - difficult to simulate this case with micromatch in devDeps */
      throw new Error(
        `micromatch is not installed. Please add it as a dependency if you want to use it.`,
      );
    }

    return {
      isMatch: (str, pats) => {
        try {
          return micromatch.isMatch(toInternal(str), pats.map(toInternal));
        } catch (err) {
          /* v8 ignore next 4 - difficult to simulate this case with micromatch/picomatch in devDeps */
          throw new Error(`micromatch failed to run isMatch: ${(err as Error).message}`);
        }
      },
    };
  }

  if (name === "picomatch") {
    let picomatch: any;
    try {
      picomatch = (await import("picomatch")).default;
    } catch {
      /* v8 ignore next 4 - difficult to simulate this case with micromatch/picomatch in devDeps */
      throw new Error(
        `picomatch is not installed. Please add it as a dependency if you want to use it.`,
      );
    }

    return {
      isMatch: (str, pats) => {
        try {
          const fn = picomatch(pats.map(toInternal));
          return fn(toInternal(str));
        } catch (err) {
          /* v8 ignore next 4 - difficult to simulate this case with micromatch/picomatch in devDeps */
          throw new Error(`picomatch failed to run isMatch: ${(err as Error).message}`);
        }
      },
    };
  }

  throw new Error(`Unknown matcher name: ${name}`);
};

/* ---------------- Internal helpers ---------------- */

/**
 * Convert a pattern/field path into internal form (`/` separated).
 * - Unescaped `.` → `/`
 * - Unescaped `/` → `/`
 * - Escaped `\.` → `.`
 * - Escaped `\/` → `/`
 */
const toInternal = (input: string): string => {
  let out = "";
  let escaped = false;
  for (const ch of input) {
    if (escaped) {
      out += ch; // take literally
      escaped = false;
    } else if (ch === "\\") {
      escaped = true;
      out += "\\"; // preserve backslash for downstream escape handling
    } else if (ch === ".") {
      out += "/"; // dot becomes slash
    } else {
      out += ch;
    }
  }
  return out;
};

/**
 * Splits a glob pattern into dot-separated segments, honoring backslash escaping.
 * - Do not split on `\.` (literal dot remains within the same segment)
 * - Preserve backslashes so segment-level matching can distinguish escaped `*`
 *   Examples:
 *     "a\.b.c"   → ["a\.b", "c"]
 *     "foo\*bar" → ["foo\*bar"]
 */
const splitPattern = (pattern: string): string[] => {
  const negated = pattern.startsWith("!");
  const raw = negated ? pattern.slice(1) : pattern;

  const segments: string[] = [];
  let buf = "";
  let escaped = false;

  for (const ch of raw) {
    if (escaped) {
      buf += "\\" + ch;
      escaped = false;
    } else if (ch === "\\") {
      escaped = true;
    } else if (ch === "/") {
      segments.push(buf);
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (escaped) buf += "\\"; // trailing backslash literal
  segments.push(buf);

  // @ts-expect-error - mark negation explicitly
  if (negated) segments.negated = true;

  return segments;
};

const matchOne = (str: string, pattern: string): boolean => {
  const strSegments = str.split("/");
  const patSegments = splitPattern(pattern);
  const isNegated = (patSegments as any).negated === true;

  const matched = matchSegments(strSegments, patSegments);
  return isNegated ? !matched : matched;
};

/**
 * `**` matches zero or more segments (only when unescaped as a whole segment).
 */
const matchSegments = (strSegments: string[], patternSegments: string[]): boolean => {
  let si = 0;
  let pi = 0;

  while (si < strSegments.length && pi < patternSegments.length) {
    const pat = patternSegments[pi];

    if (pat === "**") {
      if (pi === patternSegments.length - 1) return true; // consume rest
      for (let skip = 0; si + skip <= strSegments.length; skip++) {
        if (matchSegments(strSegments.slice(si + skip), patternSegments.slice(pi + 1))) {
          return true;
        }
      }
      return false;
    }

    if (!segmentMatches(strSegments[si], pat)) return false;

    si++;
    pi++;
  }

  // consume trailing ** patterns
  while (pi < patternSegments.length && patternSegments[pi] === "**") pi++;

  return si === strSegments.length && pi === patternSegments.length;
};

/**
 * Segment-level match with micromatch-like escapes:
 * - Unescaped `*` → wildcard (prefix/suffix; exactly one wildcard supported)
 * - `\*` → literal `*`
 * - `\.` → literal `.`
 * - Backslash escapes any next char (becomes literal)
 */
const segmentMatches = (seg: string, pat: string): boolean => {
  let escaped = false;
  let sawUnescapedStar = false;
  let pre = "";
  let buf = "";

  for (let i = 0; i < pat.length; i++) {
    const ch = pat[i];

    if (escaped) {
      buf += ch;
      escaped = false;
      continue;
    }
    if (ch === "\\") {
      escaped = true;
      continue;
    }
    if (ch === "*") {
      if (!sawUnescapedStar) {
        sawUnescapedStar = true;
        pre = buf;
        buf = "";
        continue;
      }
      buf += "*";
      continue;
    }
    buf += ch;
  }
  if (escaped) buf += "\\";

  if (!sawUnescapedStar) {
    // No wildcard: exact match after unescaping (remove backslashes)
    const literal = buf.replace(/\\(.)/g, "$1");
    return seg === literal;
  }

  const suf = buf.replace(/\\(.)/g, "$1");
  const prefix = pre.replace(/\\(.)/g, "$1");
  return seg.startsWith(prefix) && seg.endsWith(suf);
};
