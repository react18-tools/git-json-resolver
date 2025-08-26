import fs from "node:fs/promises";
import path from "node:path";
import { NormalizedConfig } from "./normalizer";

/**
 * Checks whether the given file contains Git merge conflict markers.
 *
 * @param filePath - Absolute path to the file.
 * @returns `true` if conflict markers exist, otherwise `false`.
 */
const hasConflict = async (filePath: string): Promise<boolean> => {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return (
      content.includes("<<<<<<<") && content.includes("=======") && content.includes(">>>>>>>")
    );
  } catch {
    // If file cannot be read (permissions, etc.), treat as non-conflicted
    return false;
  }
};

export interface CollectFilesOptions {
  /** Root directory to start traversal (defaults to `process.cwd()`). */
  root?: string;
  /**
   * Include files that match `fileFilter` even if they do not contain
   * merge conflicts. Defaults to `false`.
   */
  includeNonConflicted?: boolean;
}

/**
 * Recursively collects files that match the provided `fileFilter`.
 *
 * - By default, only conflicted files are returned.
 * - If `includeNonConflicted` is enabled, matching files are always included
 *   (skipping conflict check).
 *
 * @param config - Normalized configuration containing `fileFilter`.
 * @param options - Behavior flags (e.g., `includeNonConflicted`).
 * @returns A promise that resolves with an array of matching file paths.
 */
export const collectFiles = async (
  config: NormalizedConfig,
  options: CollectFilesOptions = {},
): Promise<string[]> => {
  const { root = process.cwd(), includeNonConflicted = false } = options;
  const allFiles: string[] = [];

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
        await walk(fullPath);
      } else if (config.fileFilter(fullPath)) {
        if (includeNonConflicted) {
          allFiles.push(fullPath);
        } else {
          if (await hasConflict(fullPath)) {
            allFiles.push(fullPath);
          } else {
            console.info(`Skipped (no conflicts): ${fullPath}`);
          }
        }
      }
    }
  };

  await walk(root);
  return allFiles;
};
