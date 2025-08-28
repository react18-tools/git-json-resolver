import fs from "node:fs/promises";
import path from "node:path";

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
const hasConflict = (content: string): boolean => {
  return content.includes("<<<<<<<") && content.includes("=======") && content.includes(">>>>>>>");
};

export interface CollectFilesOptions {
  /** Root directory to start traversal (defaults to `process.cwd()`). */
  root?: string;

  /** Function used to decide if a file should be considered at all. */
  fileFilter: (filePath: string) => boolean;

  /**
   * Whether to include files even if they don’t contain conflicts.
   * Defaults to `false`.
   */
  includeNonConflicted?: boolean;
}

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
  const { root = process.cwd(), fileFilter, includeNonConflicted = false } = options;

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
        if (!/node_modules|\.git/.test(entry.name)) {
          await walk(fullPath);
        }
      } else if (fileFilter(path.relative(root, fullPath))) {
        try {
          const content = await fs.readFile(fullPath, "utf8");

          if (includeNonConflicted || hasConflict(content)) {
            fileEntries.push({ filePath: fullPath, content });
          } else {
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

const BACKUP_DIR = ".merge-backups";

export const backupFile = async (filePath: string) => {
  const relPath = path.relative(process.cwd(), filePath);
  const backupPath = path.join(BACKUP_DIR, relPath);

  await fs.mkdir(path.dirname(backupPath), { recursive: true });
  await fs.copyFile(filePath, backupPath);

  return backupPath;
};
