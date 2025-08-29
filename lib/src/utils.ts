import fs from "node:fs/promises";
import path from "node:path";
import { NormalizedConfig } from "./normalizer";

export interface FileEntry {
  filePath: string;
  content: string;
}

/**
 * Checks whether the given file contains Git merge conflict markers.
 *
 * @param content - File content to check.
 * @returns `true` if conflict markers exist, otherwise `false`.
 */
export const hasConflict = (content: string): boolean => {
  return content.includes("<<<<<<<") && content.includes("=======") && content.includes(">>>>>>>");
};

export type CollectFilesOptions = Pick<
  NormalizedConfig,
  "include" | "exclude" | "matcher" | "includeNonConflicted" | "debug"
> & {
  /** Root directory to start traversal (defaults to `process.cwd()`). */
  root?: string;
};

/**
 * Recursively collects files that match the provided `fileFilter`.
 *
 * - By default, only conflicted files are returned.
 * - If `includeNonConflicted` is enabled, matching files are always included.
 *
 * @param options - Collection options, including `fileFilter` and traversal root.
 * @returns A promise that resolves with an array of `{ filePath, content }`.
 */
export const listMatchingFiles = async (options: CollectFilesOptions): Promise<FileEntry[]> => {
  const { root = process.cwd(), include, exclude, matcher, includeNonConflicted, debug } = options;

  for (const p of [...include, ...exclude]) {
    if (p.startsWith("!")) throw new Error(`Negation not allowed in include/exclude: ${p}`);
    if (p.includes("\\")) console.warn(`Use '/' as path separator: ${p}`);
  }

  const fileMatcher = (filepath: string) => {
    const posixPath = filepath.replace(/\\/g, "/");
    return matcher.isMatch(posixPath, include) && !matcher.isMatch(posixPath, exclude);
  };

  const skipDirMatcher = createSkipDirectoryMatcher(include, exclude, matcher);

  const fileEntries: FileEntry[] = [];

  /**
   * Recursively traverses a directory, checking each file against
   * the filter and (if enabled) conflict conditions.
   *
   * @param dir - Directory path to walk through.
   */
  const walk = async (dir: string) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        /* v8 ignore next */
        if (
          !/node_modules|\.git/.test(entry.name) &&
          !skipDirMatcher(path.relative(root, fullPath))
        ) {
          await walk(fullPath);
        }
      } else if (fileMatcher(path.relative(root, fullPath))) {
        try {
          const content = await fs.readFile(fullPath, "utf8");

          if (includeNonConflicted || hasConflict(content)) {
            fileEntries.push({ filePath: fullPath, content });
            /* v8 ignore next 6 -- Logging and warning only */
          } else if (debug) {
            console.info(`Skipped (no conflicts): ${fullPath}`);
          }
        } catch {
          console.warn(`Skipped (unreadable): ${fullPath}`);
        }
      }
    }
  };

  await walk(root);
  return fileEntries;
};

/**
 * Derive directory pruning patterns from include/exclude rules.
 * These patterns are used to avoid walking unnecessary directories.
 */
export const createSkipDirectoryMatcher = (
  include: string[],
  exclude: string[],
  matcher: NormalizedConfig["matcher"],
) => {
  // ---- Case 1: includes are only root-level files → prune all dirs
  if (include.length > 0 && include.every(p => !p.includes("/") && !p.includes("**"))) {
    return () => false; // minimal: just exclude all dirs
  }

  const keepDirs = new Set<string>();
  const dropDirs = new Set<string>();

  // ** => Keep all except the exclude list
  for (const inc of include) {
    if (inc.includes("/")) {
      // e.g. src/** → keep "src" or other/index.ts -> keep other or other/**/index.ts -> keep other/**
      const base = inc.split("/").slice(0, -1).join("/");
      if (base) keepDirs.add(base);
    }
  }

  // remove keepDirs if keeping all root directories
  if (keepDirs.has("**")) keepDirs.clear();

  // ---- derive dropDirs from exclude rules
  for (const exc of exclude) {
    if (exc.endsWith("/**")) {
      const base = exc.slice(0, -3);
      if (base) dropDirs.add(base);
    }
  }

  return (dirPath: string) => {
    const posixPath = dirPath.replace(/\\/g, "/");
    return (
      matcher.isMatch(posixPath, [...dropDirs]) ||
      (keepDirs.size > 0 && !matcher.isMatch(posixPath, [...keepDirs]))
    );
  };
};

export const backupFile = async (filePath: string, backupDir = ".merge-backups") => {
  const relPath = path.relative(process.cwd(), filePath);
  const backupPath = path.join(backupDir, relPath);

  await fs.mkdir(path.dirname(backupPath), { recursive: true });
  await fs.copyFile(filePath, backupPath);

  return backupPath;
};
