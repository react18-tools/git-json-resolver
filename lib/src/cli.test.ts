// cli.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import * as child_process from "node:child_process";

vi.mock("node:fs");
vi.mock("node:child_process");
vi.mock("./index", () => ({
  resolveConflicts: vi.fn(),
}));
vi.mock("./normalizer", () => ({
  DEFAULT_CONFIG: { defaultStrategy: "merge" },
}));

// Import after mocks
import type { Config } from "./types";

// Re-import CLI helpers (not the top-level IIFE)
import * as cli from "./cli";

describe("cli helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("findGitRoot", () => {
    it("returns git root from execSync", () => {
      vi.spyOn(child_process, "execSync").mockReturnValue("/git/root\n" as any);
      const root = (cli as any).findGitRoot();
      expect(root).toBe("/git/root");
    });

    it("falls back to process.cwd() on error", () => {
      vi.spyOn(child_process, "execSync").mockImplementation(() => {
        throw new Error("no git");
      });
      const root = (cli as any).findGitRoot();
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
      const result = (cli as any).parseArgs(argv);
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
      const result = (cli as any).parseArgs(["node", "cli", "--init"]);
      expect(result.init).toBe(true);
    });

    it("warns on unknown option", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      (cli as any).parseArgs(["node", "cli", "--unknown"]);
      expect(warn).toHaveBeenCalledWith("[git-json-resolver] Unknown option: --unknown");
    });
  });

  describe("initConfig", () => {
    const tmpDir = "/tmp/test-cli";
    const configPath = path.join(tmpDir, "git-json-resolver.config.js");

    it("writes starter config if none exists", () => {
      (fs.existsSync as any).mockReturnValue(false);
      const writeFileSync = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
      const log = vi.spyOn(console, "log").mockImplementation(() => {});

      (cli as any).initConfig(tmpDir);

      expect(writeFileSync).toHaveBeenCalled();
      expect(log).toHaveBeenCalledWith(
        `[git-json-resolver] Created starter config at ${configPath}`,
      );
    });

    it("exits if config already exists", () => {
      (fs.existsSync as any).mockReturnValue(true);
      const exit = vi.spyOn(process, "exit").mockImplementation(() => {
        throw new Error("exit");
      });
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => (cli as any).initConfig(tmpDir)).toThrow("exit");
      expect(error).toHaveBeenCalledWith(
        `[git-json-resolver] Config file already exists: ${configPath}`,
      );
      expect(exit).toHaveBeenCalledWith(1);
    });
  });

  describe("loadConfigFile", () => {
    it("returns {} if no config found", async () => {
      (fs.existsSync as any).mockReturnValue(false);
      const result = await (cli as any).loadConfigFile();
      expect(result).toEqual({});
    });

    it.skip("loads config from js file", async () => {
      const fakeConfig: Partial<Config> = { debug: true };
      (fs.existsSync as any).mockReturnValue(true);
      vi.doMock("/git/root/git-json-resolver.config.js", () => ({
        default: fakeConfig,
      }));
      vi.spyOn(child_process, "execSync").mockReturnValue("/git/root\n" as any);

      const mod = await (cli as any).loadConfigFile();
      expect(mod).toEqual(fakeConfig);
    });
  });
});
