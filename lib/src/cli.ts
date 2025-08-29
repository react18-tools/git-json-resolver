#!/usr/bin/env node
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { resolveConflicts } from "./index";
import type { Config } from "./types";
import { DEFAULT_CONFIG } from "./normalizer";
import { restoreBackups } from "./utils";
import { resolveGitMergeFiles } from "./merge-processor";

const CONFIG_FILENAME = "git-json-resolver.config.js";

/**
 * Find Git root directory
 */
export const findGitRoot = (): string => {
  try {
    return execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
  } catch {
    return process.cwd();
  }
};

/**
 * Load configuration file (js/ts) from current dir or Git root.
 */
export const loadConfigFile = async (): Promise<Partial<Config>> => {
  const searchDirs = [process.cwd(), findGitRoot()];
  const configNames = [CONFIG_FILENAME, "git-json-resolver.config.ts"];

  for (const dir of searchDirs) {
    for (const name of configNames) {
      const fullPath = path.join(dir, name);
      if (fs.existsSync(fullPath)) {
        const mod = await import(pathToFileURL(fullPath).href);
        return mod.default || mod;
      }
    }
  }
  return {};
};

/**
 * Write a starter config file
 */
export const initConfig = (targetDir: string) => {
  const targetPath = path.join(targetDir, CONFIG_FILENAME);
  if (fs.existsSync(targetPath)) {
    console.error(`Config file already exists: ${targetPath}`);
    process.exit(1);
  }

  const starter = `/**
 * git-json-resolver configuration
 * Docs: https://github.com/react18-tools/git-json-resolver
 */
module.exports = ${JSON.stringify(DEFAULT_CONFIG, null, 2)};
`;

  fs.writeFileSync(targetPath, starter, "utf8");
  console.log(`Created starter config at ${targetPath}`);
};

/**
 * CLI argument parser (minimal, no external deps).
 */
export const parseArgs = (
  argv: string[],
): {
  overrides: Partial<Config>;
  init?: boolean;
  restore?: string;
  gitMergeFiles?: [string, string, string];
} => {
  const overrides: Partial<Config> = {};
  let init = false;
  let restore: string | undefined;
  let gitMergeFiles: [string, string, string] | undefined;

  // Check for Git merge driver mode (3 positional arguments)
  const positionalArgs = argv.slice(2).filter(arg => !arg.startsWith("--"));
  if (positionalArgs.length === 3) {
    gitMergeFiles = [positionalArgs[0], positionalArgs[1], positionalArgs[2]];
  }

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];

    // Skip positional arguments in Git merge mode
    if (gitMergeFiles && !arg.startsWith("--")) {
      continue;
    }

    switch (arg) {
      case "--include":
        overrides.include = next?.split(",") ?? [];
        i++;
        break;
      case "--exclude":
        overrides.exclude = next?.split(",") ?? [];
        i++;
        break;
      case "--matcher":
        overrides.matcher = next as Config["matcher"];
        i++;
        break;
      case "--debug":
        overrides.debug = true;
        break;
      case "--sidecar":
        overrides.writeConflictSidecar = true;
        break;
      case "--init":
        init = true;
        break;
      case "--restore":
        restore = next;
        i++;
        break;
      default:
        if (arg.startsWith("--")) {
          console.warn(`Unknown option: ${arg}`);
        }
    }
  }
  return { overrides, init, restore, gitMergeFiles };
};

(async () => {
  try {
    const { overrides, init, restore, gitMergeFiles } = parseArgs(process.argv);

    if (init) {
      initConfig(process.cwd());
      process.exit(0);
    }

    const fileConfig = await loadConfigFile();
    const finalConfig: Config = {
      ...fileConfig,
      ...overrides,
    };

    if (restore) {
      await restoreBackups(restore || fileConfig.backupDir || ".merge-backups");
      console.log(`Restored backups from ${restore}`);
      process.exit(0);
    }

    // Git merge driver mode: handle 3-way merge
    if (gitMergeFiles) {
      const [oursPath, basePath, theirsPath] = gitMergeFiles;
      await resolveGitMergeFiles(oursPath, basePath, theirsPath, finalConfig);
      return; // resolveGitMergeFiles handles process.exit
    }

    // Standard mode: process files with conflict markers
    await resolveConflicts(finalConfig);
  } catch (err) {
    console.error("Failed:", err);
    process.exit(1);
  }
})();
