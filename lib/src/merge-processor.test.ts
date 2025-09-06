import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { processMerge, resolveGitMergeFiles } from "./merge-processor";
import { execSync } from "node:child_process";
import fs from "node:fs/promises";

// Mock all dependencies
vi.mock("node:child_process");
vi.mock("node:fs/promises");
vi.mock("./file-serializer");
vi.mock("./merger");
vi.mock("./normalizer");
vi.mock("./utils");
vi.mock("./conflict-helper");
vi.mock("./logger");
vi.mock("./file-parser");

import { serialize } from "./file-serializer";
import { mergeObject } from "./merger";
import { normalizeConfig } from "./normalizer";
import { backupFile } from "./utils";
import { reconstructConflict } from "./conflict-helper";
import { createLogger } from "./logger";
import { normalizeParsers, runParser } from "./file-parser";

const mockExecSync = vi.mocked(execSync);
const mockFs = vi.mocked(fs);
const mockSerialize = vi.mocked(serialize);
const mockMergeObject = vi.mocked(mergeObject);
const mockNormalizeConfig = vi.mocked(normalizeConfig);
const mockBackupFile = vi.mocked(backupFile);
const mockReconstructConflict = vi.mocked(reconstructConflict);
const mockCreateLogger = vi.mocked(createLogger);
const mockNormalizeParsers = vi.mocked(normalizeParsers);
const mockRunParser = vi.mocked(runParser);

describe("processMerge", () => {
  const mockLogger = {
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    flush: vi.fn(),
  };

  const mockConfig = { defaultStrategy: "ours" as const };
  const mockNormalizedConfig = { debug: false, customStrategies: {} } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockBackupFile.mockResolvedValue("backup/test.json");
    mockSerialize.mockResolvedValue('{"merged":true}');
  });

  it("processes successful merge without conflicts", async () => {
    const mergedResult = { merged: true };
    mockMergeObject.mockResolvedValue(mergedResult);

    const result = await processMerge({
      ours: { a: 1 },
      theirs: { b: 2 },
      base: { c: 3 },
      format: "json",
      filePath: "test.json",
      config: mockConfig,
      normalizedConfig: mockNormalizedConfig,
      logger: mockLogger,
      autoStage: true,
    });

    expect(mockMergeObject).toHaveBeenCalledWith({
      ours: { a: 1 },
      theirs: { b: 2 },
      base: { c: 3 },
      filePath: "test.json",
      conflicts: [],
      path: "",
      ctx: expect.objectContaining({
        config: mockNormalizedConfig,
        strategies: {},
        _strategyCache: expect.any(Map),
      }),
      logger: mockLogger,
    });
    expect(mockBackupFile).toHaveBeenCalledWith("test.json", undefined);
    expect(mockSerialize).toHaveBeenCalledWith("json", mergedResult);
    expect(mockFs.writeFile).toHaveBeenCalledWith("test.json", '{"merged":true}', "utf8");
    expect(mockExecSync).toHaveBeenCalledWith("git add test.json");
    expect(result).toEqual({ success: true, conflicts: [] });
  });

  it("processes merge with conflicts", async () => {
    const conflicts = [{ path: "a", reason: "test conflict" }];
    const reconstructedContent = "conflict content";

    mockMergeObject.mockImplementation(({ conflicts: conflictsArray }) => {
      conflictsArray.push(...conflicts);
      return Promise.resolve({});
    });
    mockReconstructConflict.mockResolvedValue(reconstructedContent);

    const result = await processMerge({
      ours: { a: 1 },
      theirs: { a: 2 },
      format: "json",
      filePath: "test.json",
      config: { writeConflictSidecar: true },
      normalizedConfig: mockNormalizedConfig,
      logger: mockLogger,
      autoStage: false,
    });

    expect(mockReconstructConflict).toHaveBeenCalledWith({}, { a: 1 }, { a: 2 }, "json");
    expect(mockFs.writeFile).toHaveBeenCalledWith("test.json", reconstructedContent, "utf8");
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      "test.json.conflict.json",
      JSON.stringify(conflicts, null, 2),
    );
    expect(mockExecSync).not.toHaveBeenCalled();
    expect(result).toEqual({ success: false, conflicts });
  });

  it("handles git staging errors gracefully", async () => {
    mockMergeObject.mockResolvedValue({});
    mockExecSync.mockImplementation(() => {
      throw new Error("git error");
    });

    const result = await processMerge({
      ours: {},
      theirs: {},
      format: "json",
      filePath: "test.json",
      config: mockConfig,
      normalizedConfig: mockNormalizedConfig,
      logger: mockLogger,
      autoStage: true,
    });

    expect(mockLogger.warn).toHaveBeenCalledWith(
      "test.json",
      "Failed to stage file: Error: git error",
    );
    expect(result.success).toBe(true);
  });

  it("enables debug logging when configured", async () => {
    const debugConfig = { debug: true, customStrategies: {} } as any;
    mockMergeObject.mockResolvedValue({ merged: true });

    await processMerge({
      ours: {},
      theirs: {},
      format: "json",
      filePath: "test.json",
      config: mockConfig,
      normalizedConfig: debugConfig,
      logger: mockLogger,
    });

    expect(mockLogger.debug).toHaveBeenCalledWith("test.json", expect.stringContaining("merged"));
  });

  it("skips auto-staging when disabled", async () => {
    mockMergeObject.mockResolvedValue({});

    await processMerge({
      ours: {},
      theirs: {},
      format: "json",
      filePath: "test.json",
      config: mockConfig,
      normalizedConfig: mockNormalizedConfig,
      logger: mockLogger,
      autoStage: false,
    });

    expect(mockExecSync).not.toHaveBeenCalled();
  });
});

describe("resolveGitMergeFiles", () => {
  const mockLogger = {
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    flush: vi.fn(),
  };

  const mockExit = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateLogger.mockResolvedValue(mockLogger);
    mockNormalizeConfig.mockResolvedValue({ debug: false, customStrategies: {} } as any);
    mockFs.readFile.mockImplementation(path => {
      if (path === "ours.json") return Promise.resolve('{"a":1}');
      if (path === "base.json") return Promise.resolve('{"a":0}');
      if (path === "theirs.json") return Promise.resolve('{"a":2}');
      return Promise.reject(new Error("File not found"));
    });
    mockNormalizeParsers.mockReturnValue(["json"]);
    mockRunParser.mockResolvedValue([{ a: 1 }, "json"]);
    mockMergeObject.mockResolvedValue({ a: 1 });
    mockSerialize.mockResolvedValue('{"a":1}');
    mockBackupFile.mockResolvedValue("backup/ours.json");
  });

  afterEach(() => {
    mockExit.mockClear();
  });

  it("successfully merges files without conflicts", async () => {
    await resolveGitMergeFiles("ours.json", "base.json", "theirs.json", {});

    expect(mockFs.readFile).toHaveBeenCalledWith("ours.json", "utf8");
    expect(mockFs.readFile).toHaveBeenCalledWith("base.json", "utf8");
    expect(mockFs.readFile).toHaveBeenCalledWith("theirs.json", "utf8");
    expect(mockRunParser).toHaveBeenCalledTimes(3);
    expect(mockFs.writeFile).toHaveBeenCalledWith("ours.json", '{"a":1}', "utf8");
    expect(mockLogger.flush).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it("handles merge conflicts", async () => {
    const conflicts = [{ path: "a", reason: "conflict" }];
    mockMergeObject.mockImplementation(({ conflicts: conflictsArray }) => {
      conflictsArray.push(...conflicts);
      return Promise.resolve({});
    });
    mockReconstructConflict.mockResolvedValue("conflict content");

    await resolveGitMergeFiles("ours.json", "base.json", "theirs.json", {});

    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("handles missing base file gracefully", async () => {
    mockFs.readFile.mockImplementation(path => {
      if (path === "ours.json") return Promise.resolve('{"a":1}');
      if (path === "base.json") return Promise.reject(new Error("Not found"));
      if (path === "theirs.json") return Promise.resolve('{"a":2}');
      return Promise.reject(new Error("File not found"));
    });

    await resolveGitMergeFiles("ours.json", "base.json", "theirs.json", {});

    expect(mockRunParser).toHaveBeenCalledWith("{}", ["json"]);
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it("enables debug logging when configured", async () => {
    mockNormalizeConfig.mockResolvedValue({ debug: true, customStrategies: {} } as any);

    await resolveGitMergeFiles("ours.json", "base.json", "theirs.json", { debug: true });

    expect(mockLogger.debug).toHaveBeenCalledWith(
      "git-merge",
      "Merging files: ours=ours.json, base=base.json, theirs=theirs.json",
    );
  });
});
