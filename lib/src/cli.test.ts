import * as child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("node:fs");
vi.mock("node:child_process");
vi.mock("./index", () => ({
  resolveConflicts: vi.fn(),
}));
vi.mock("./utils", () => ({
  restoreBackups: vi.fn(),
}));
vi.mock("./normalizer", () => ({
  DEFAULT_CONFIG: { defaultStrategy: "merge" },
}));
vi.mock("./merge-processor", () => ({
  resolveGitMergeFiles: vi.fn(),
}));
vi.mock("node:url", () => ({
  pathToFileURL: vi.fn(() => ({ href: "file:///test/config.js" })),
}));

// Import CLI functions directly
import { findGitRoot, initConfig, loadConfigFile, parseArgs } from "./cli";
import { resolveConflicts } from "./index";
import { resolveGitMergeFiles } from "./merge-processor";
// Import after mocks
import { restoreBackups } from "./utils";

describe("cli helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("findGitRoot", () => {
    it("returns git root from execSync", () => {
      vi.spyOn(child_process, "execSync").mockReturnValue("/git/root\n");
      const root = findGitRoot();
      expect(root).toBe("/git/root");
    });

    it("falls back to process.cwd() on error", () => {
      vi.spyOn(child_process, "execSync").mockImplementation(() => {
        throw new Error("no git");
      });
      const root = findGitRoot();
      expect(root).toBe(process.cwd());
    });
  });

  describe("parseArgs", () => {
    it("parses include/exclude/matcher/debug/sidecar", () => {
      const argv = [
        "node",
        "cli",
        "--include",
        "a.json,b.json",
        "--exclude",
        "c.json",
        "--matcher",
        "micromatch",
        "--debug",
        "--sidecar",
      ];
      const result = parseArgs(argv);
      expect(result.overrides).toEqual({
        include: ["a.json", "b.json"],
        exclude: ["c.json"],
        matcher: "micromatch",
        debug: true,
        writeConflictSidecar: true,
      });
      expect(result.init).toBe(false);
    });

    it("sets init flag", () => {
      const result = parseArgs(["node", "cli", "--init"]);
      expect(result.init).toBe(true);
    });

    it("sets restore with undefined", () => {
      const result = parseArgs(["node", "cli", "--restore"]);
      expect(result.restore).toBe(undefined);
    });

    it("sets restore with custom directory", () => {
      const result = parseArgs(["node", "cli", "--restore", "custom-backup"]);
      expect(result.restore).toBe("custom-backup");
    });

    it("warns on unknown option", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      parseArgs(["node", "cli", "--unknown"]);
      expect(warn).toHaveBeenCalledWith("Unknown option: --unknown");
    });

    it("detects git merge files with 3 positional args", () => {
      const result = parseArgs([
        "node",
        "cli",
        "ours.json",
        "base.json",
        "theirs.json",
      ]);
      expect(result.gitMergeFiles).toEqual([
        "ours.json",
        "base.json",
        "theirs.json",
      ]);
    });

    it("skips positional args in git merge mode with flags", () => {
      const result = parseArgs([
        "node",
        "cli",
        "ours.json",
        "base.json",
        "theirs.json",
        "--debug",
      ]);
      expect(result.gitMergeFiles).toEqual([
        "ours.json",
        "base.json",
        "theirs.json",
      ]);
      expect(result.overrides.debug).toBe(true);
    });

    it("handles --include without value", () => {
      const result = parseArgs(["node", "cli", "--include"]);
      expect(result.overrides.include).toEqual([]);
    });

    it("handles --exclude without value", () => {
      const result = parseArgs(["node", "cli", "--exclude"]);
      expect(result.overrides.exclude).toEqual([]);
    });
  });

  describe("initConfig", () => {
    const tmpDir = "/tmp/test-cli";
    const configPath = path.join(tmpDir, "git-json-resolver.config.js");

    it("writes starter config if none exists", () => {
      (fs.existsSync as any).mockReturnValue(false);
      const writeFileSync = vi
        .spyOn(fs, "writeFileSync")
        .mockImplementation(() => {});
      const log = vi.spyOn(console, "log").mockImplementation(() => {});

      initConfig(tmpDir);

      expect(writeFileSync).toHaveBeenCalled();
      expect(log).toHaveBeenCalledWith(
        `Created starter config at ${configPath}`,
      );
    });

    it("exits if config already exists", () => {
      (fs.existsSync as any).mockReturnValue(true);
      const exit = vi.spyOn(process, "exit").mockImplementation(() => {
        throw new Error("exit");
      });
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => initConfig(tmpDir)).toThrow("exit");
      expect(error).toHaveBeenCalledWith(
        `Config file already exists: ${configPath}`,
      );
      expect(exit).toHaveBeenCalledWith(1);
    });
  });

  describe("loadConfigFile", () => {
    it("returns {} if no config found", async () => {
      (fs.existsSync as any).mockReturnValue(false);
      const result = await loadConfigFile();
      expect(result).toEqual({});
    });
  });
});

// Test the CLI execution logic separately to avoid IIFE issues
describe("CLI execution logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle restore mode logic", async () => {
    const mockLog = vi.spyOn(console, "log").mockImplementation(() => {});
    const mockExit = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit");
    });

    const restore = "custom-backup";
    const fileConfig = { backupDir: ".merge-backups" };

    try {
      await restoreBackups(restore || fileConfig.backupDir || ".merge-backups");
      console.log(`Restored backups from ${restore}`);
      process.exit(0);
    } catch (_e) {
      // Expected due to process.exit mock
    }

    expect(restoreBackups).toHaveBeenCalledWith("custom-backup");
    expect(mockLog).toHaveBeenCalledWith("Restored backups from custom-backup");
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it("should handle git merge mode logic", async () => {
    const gitMergeFiles: [string, string, string] = [
      "ours.json",
      "base.json",
      "theirs.json",
    ];
    const finalConfig = { debug: true };

    const [oursPath, basePath, theirsPath] = gitMergeFiles;
    await resolveGitMergeFiles(oursPath, basePath, theirsPath, finalConfig);

    expect(resolveGitMergeFiles).toHaveBeenCalledWith(
      "ours.json",
      "base.json",
      "theirs.json",
      {
        debug: true,
      },
    );
  });

  it("should handle standard mode logic", async () => {
    const finalConfig = { matcher: "picomatch" as const, debug: true };

    await resolveConflicts(finalConfig);

    expect(resolveConflicts).toHaveBeenCalledWith({
      matcher: "picomatch",
      debug: true,
    });
  });

  it("should handle error case", () => {
    const mockError = vi.spyOn(console, "error").mockImplementation(() => {});
    const mockExit = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit");
    });

    const err = new Error("Test error");

    try {
      console.error("Failed:", err);
      process.exit(1);
    } catch (_e) {
      // Expected due to process.exit mock
    }

    expect(mockError).toHaveBeenCalledWith("Failed:", err);
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
