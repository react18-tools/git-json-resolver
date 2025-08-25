/**
 * Matcher abstraction + adapters for micromatch/picomatch (optional).
 *
 * By default, a minimal matcher is used that understands:
 * - `*`   → matches any single field segment
 * - `**`  → matches any number of nested field segments
 * - Literal prefix/suffix globs like `prefix-*` or `*-suffix`
 *
 * Micromatch or Picomatch can be loaded at runtime if available,
 * but they are treated as optional peer dependencies.
 */

export interface Matcher {
  /**
   * Returns true if `str` matches at least one of the provided glob `patterns`.
   */
  isMatch: (str: string, patterns: string[]) => boolean;
}

/**
 * Minimal homegrown matcher (default).
 * Only supports `*` and `**` operators on dot-paths.
 */
export const basicMatcher: Matcher = {
  isMatch: (str, patterns) => {
    return patterns.some(pattern => matchOne(str, pattern));
  },
};

/**
 * Attempts to load a named matcher adapter.
 * @param name `"micromatch" | "picomatch"`
 * @returns A Matcher implementation.
 */
export const loadMatcher = (name: "micromatch" | "picomatch"): Matcher => {
  if (name === "micromatch") {
    try {
      const micromatch = require("micromatch");
      return { isMatch: (str, pats) => micromatch.isMatch(str, pats) };
    } catch {
      throw new Error(
        `micromatch is not installed. Please add it as a dependency if you want to use it.`,
      );
    }
  }

  if (name === "picomatch") {
    try {
      const picomatch = require("picomatch");
      return {
        isMatch: (str, pats) => {
          const fn = picomatch(pats);
          return fn(str);
        },
      };
    } catch {
      throw new Error(
        `picomatch is not installed. Please add it as a dependency if you want to use it.`,
      );
    }
  }

  throw new Error(`Unknown matcher name: ${name}`);
};

/* ---------------- Internal helpers ---------------- */

/**
 * Matches a single string against a glob pattern using only * and ** semantics.
 */
const matchOne = (str: string, pattern: string): boolean => {
  const strSegments = str.split(".");
  const patSegments = pattern.split(".");

  return matchSegments(strSegments, patSegments);
};

/**
 * Matches field segments against pattern segments.
 * - `*`  = any single segment
 * - `**` = zero or more segments
 */
const matchSegments = (strSegments: string[], patternSegments: string[]): boolean => {
  let si = 0;
  let pi = 0;

  while (si < strSegments.length && pi < patternSegments.length) {
    const pat = patternSegments[pi];
    if (pat === "**") {
      // match remainder greedily
      if (pi === patternSegments.length - 1) return true;
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
 * Matches a single field segment against a pattern segment.
 * - `*` = any
 * - `prefix-*` / `*-suffix` = prefix/suffix match
 */
const segmentMatches = (seg: string, pat: string): boolean => {
  if (pat === "*") return true;

  if (pat.includes("*")) {
    const [pre, suf] = pat.split("*");
    return seg.startsWith(pre) && seg.endsWith(suf);
  }

  return seg === pat;
};
