#!/usr/bin/env node
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { resolveConflicts } from "./index";
import type { Config } from "./types";
import { DEFAULT_CONFIG } from "./normalizer";

const CONFIG_FILENAME = "git-json-resolver.config.js";

/**
 * Find Git root directory
 */
const findGitRoot = (): string => {
  try {
    return execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
  } catch {
    return process.cwd();
  }
};

/**
 * Load configuration file (js/ts) from current dir or Git root.
 */
const loadConfigFile = async (): Promise<Partial<Config>> => {
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
const initConfig = (targetDir: string) => {
  const targetPath = path.join(targetDir, CONFIG_FILENAME);
  if (fs.existsSync(targetPath)) {
    console.error(`[git-json-resolver] Config file already exists: ${targetPath}`);
    process.exit(1);
  }

  const starter = `/**
 * git-json-resolver configuration
 * Docs: https://github.com/react18-tools/git-json-resolver
 */
module.exports = ${JSON.stringify(DEFAULT_CONFIG, null, 2)};
`;

  fs.writeFileSync(targetPath, starter, "utf8");
  console.log(`[git-json-resolver] Created starter config at ${targetPath}`);
};

/**
 * CLI argument parser (minimal, no external deps).
 */
const parseArgs = (argv: string[]): { overrides: Partial<Config>; init?: boolean } => {
  const overrides: Partial<Config> = {};
  let init = false;

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];

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
      case "--strict-arrays":
        overrides.strictArrays = true;
        break;
      case "--sidecar":
        overrides.writeConflictSidecar = true;
        break;
      case "--init":
        init = true;
        break;
      default:
        if (arg.startsWith("--")) {
          console.warn(`[git-json-resolver] Unknown option: ${arg}`);
        }
    }
  }
  return { overrides, init };
};

(async () => {
  try {
    const { overrides, init } = parseArgs(process.argv);

    if (init) {
      initConfig(process.cwd());
      process.exit(0);
    }

    const fileConfig = await loadConfigFile();
    const finalConfig: Config = {
      ...fileConfig,
      ...overrides,
    };

    await resolveConflicts(finalConfig);
  } catch (err) {
    console.error("[git-json-resolver] Failed:", err);
    process.exit(1);
  }
})();
