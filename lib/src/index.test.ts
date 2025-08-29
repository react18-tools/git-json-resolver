import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { resolveConflicts } from "./index";
import { execSync } from "node:child_process";
import fs from "node:fs/promises";

// Mock all dependencies
vi.mock("node:child_process");
vi.mock("node:fs/promises");
vi.mock("./file-parser");
vi.mock("./file-serializer");
vi.mock("./merger");
vi.mock("./normalizer");
vi.mock("./utils");
vi.mock("./conflict-helper");
vi.mock("./logger");

import { parseConflictContent } from "./file-parser";
import { serialize } from "./file-serializer";
import { mergeObject } from "./merger";
import { normalizeConfig } from "./normalizer";
import { backupFile, listMatchingFiles } from "./utils";
import { reconstructConflict } from "./conflict-helper";
import { createLogger } from "./logger";

const mockExecSync = vi.mocked(execSync);
const mockFs = vi.mocked(fs);
const mockParseConflictContent = vi.mocked(parseConflictContent);
const mockSerialize = vi.mocked(serialize);
const mockMergeObject = vi.mocked(mergeObject);
const mockNormalizeConfig = vi.mocked(normalizeConfig);
const mockBackupFile = vi.mocked(backupFile);
const mockListMatchingFiles = vi.mocked(listMatchingFiles);
const mockReconstructConflict = vi.mocked(reconstructConflict);
const mockCreateLogger = vi.mocked(createLogger);

describe("resolveConflicts", () => {
  const mockLogger = {
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    flush: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateLogger.mockReturnValue(mockLogger);
    mockNormalizeConfig.mockResolvedValue({
      debug: false,
      customStrategies: {},
    } as any);
    mockListMatchingFiles.mockResolvedValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("processes files without conflicts successfully", async () => {
    const config = { defaultStrategy: "ours" as const };
    const fileEntry = { filePath: "test.json", content: "content" };
    const parsedContent = { theirs: { a: 1 }, ours: { a: 2 }, format: "json" };
    const mergedResult = { a: 2 };

    mockListMatchingFiles.mockResolvedValue([fileEntry]);
    mockParseConflictContent.mockResolvedValue(parsedContent);
    mockMergeObject.mockResolvedValue(mergedResult);
    mockSerialize.mockResolvedValue('{"a":2}');
    mockBackupFile.mockResolvedValue("backup/test.json");

    await resolveConflicts(config);

    expect(mockNormalizeConfig).toHaveBeenCalledWith(config);
    expect(mockListMatchingFiles).toHaveBeenCalled();
    expect(mockParseConflictContent).toHaveBeenCalledWith("content", { filename: "test.json" });
    expect(mockMergeObject).toHaveBeenCalledWith({
      ours: { a: 2 },
      theirs: { a: 1 },
      base: undefined,
      filePath: "test.json",
      conflicts: [],
      path: "",
      ctx: expect.objectContaining({
        config: expect.any(Object),
        strategies: {},
        _strategyCache: expect.any(Map),
      }),
    });
    expect(mockBackupFile).toHaveBeenCalledWith("test.json", undefined);
    expect(mockSerialize).toHaveBeenCalledWith("json", mergedResult);
    expect(mockFs.writeFile).toHaveBeenCalledWith("test.json", '{"a":2}', "utf8");
    expect(mockExecSync).toHaveBeenCalledWith("git add test.json");
    expect(mockLogger.flush).toHaveBeenCalled();
  });

  it("handles files with conflicts", async () => {
    const config = { writeConflictSidecar: true };
    const conflicts = [{ path: "a", reason: "test conflict" }];
    const reconstructedContent = "conflict content";

    mockListMatchingFiles.mockResolvedValue([{ filePath: "test.json", content: "content" }]);
    mockParseConflictContent.mockResolvedValue({ theirs: {}, ours: {}, format: "json" });
    mockMergeObject.mockImplementation(({ conflicts: conflictsArray }) => {
      conflictsArray.push(...conflicts);
      return Promise.resolve({});
    });
    mockReconstructConflict.mockResolvedValue(reconstructedContent);

    await resolveConflicts(config);

    expect(mockReconstructConflict).toHaveBeenCalledWith({}, {}, {}, "json");
    expect(mockFs.writeFile).toHaveBeenCalledWith("test.json", reconstructedContent, "utf8");
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      "test.json.conflict.json",
      JSON.stringify(conflicts, null, 2)
    );
    expect(mockExecSync).not.toHaveBeenCalled();
  });

  it("handles git staging errors gracefully", async () => {
    mockListMatchingFiles.mockResolvedValue([{ filePath: "test.json", content: "content" }]);
    mockParseConflictContent.mockResolvedValue({ theirs: {}, ours: {}, format: "json" });
    mockMergeObject.mockResolvedValue({});
    mockSerialize.mockResolvedValue("{}");
    mockExecSync.mockImplementation(() => {
      throw new Error("git error");
    });

    await resolveConflicts({});

    expect(mockLogger.warn).toHaveBeenCalledWith("test.json", "Failed to stage file: Error: git error");
  });

  it("enables debug logging when configured", async () => {
    const config = { debug: true };
    mockNormalizeConfig.mockResolvedValue({ debug: true, customStrategies: {} } as any);
    mockListMatchingFiles.mockResolvedValue([{ filePath: "test.json", content: "content" }]);
    mockParseConflictContent.mockResolvedValue({ theirs: {}, ours: {}, format: "json" });
    mockMergeObject.mockResolvedValue({});

    await resolveConflicts(config);

    expect(mockLogger.info).toHaveBeenCalledWith(
      "all",
      expect.stringContaining("normalizedConfig")
    );
    expect(mockLogger.debug).toHaveBeenCalledWith(
      "test.json",
      expect.stringContaining("merged")
    );
  });

  it("processes multiple files concurrently", async () => {
    const files = [
      { filePath: "file1.json", content: "content1" },
      { filePath: "file2.json", content: "content2" },
    ];

    mockListMatchingFiles.mockResolvedValue(files);
    mockParseConflictContent.mockResolvedValue({ theirs: {}, ours: {}, format: "json" });
    mockMergeObject.mockResolvedValue({});
    mockSerialize.mockResolvedValue("{}");

    await resolveConflicts({});

    expect(mockParseConflictContent).toHaveBeenCalledTimes(2);
    expect(mockMergeObject).toHaveBeenCalledTimes(2);
    expect(mockBackupFile).toHaveBeenCalledTimes(2);
  });

  it("uses custom backup directory", async () => {
    const config = { backupDir: "custom-backup" };
    mockListMatchingFiles.mockResolvedValue([{ filePath: "test.json", content: "content" }]);
    mockParseConflictContent.mockResolvedValue({ theirs: {}, ours: {}, format: "json" });
    mockMergeObject.mockResolvedValue({});

    await resolveConflicts(config);

    expect(mockBackupFile).toHaveBeenCalledWith("test.json", "custom-backup");
  });
});