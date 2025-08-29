import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import { hasConflict, createSkipDirectoryMatcher, listMatchingFiles, backupFile } from "./utils"; // adjust import
import { basicMatcher } from "./matcher";

const matcher = basicMatcher;

const TMP = path.join(process.cwd(), "tmp-test");

beforeAll(async () => {
  await fs.rm(TMP, { recursive: true, force: true });
  await fs.mkdir(TMP, { recursive: true });

  // Create dirs & files
  await fs.writeFile(path.join(TMP, "clean.txt"), "hello");
  await fs.writeFile(
    path.join(TMP, "conflict.txt"),
    "line1\n<<<<<<< ours\nconflict\n=======\ntheirs\n>>>>>>>",
  );
  await fs.mkdir(path.join(TMP, "src"));
  await fs.writeFile(path.join(TMP, "src", "index.ts"), "console.log('ok')");
  await fs.mkdir(path.join(TMP, "node_modules"));
  await fs.writeFile(path.join(TMP, "node_modules", "ignore.js"), "ignored");
});

afterAll(async () => {
  await fs.rm(TMP, { recursive: true, force: true });
});

describe("hasConflict", () => {
  it("detects conflict markers", () => {
    expect(hasConflict("<<<<<<<\n=======\n>>>>>>>")).toBe(true);
  });
  it("returns false for clean content", () => {
    expect(hasConflict("no conflicts here")).toBe(false);
  });
});

describe("listMatchingFiles", () => {
  it("finds only conflicted files by default", async () => {
    const files = await listMatchingFiles({
      root: TMP,
      include: ["**/*.txt"],
      exclude: ["node_modules/**"],
      matcher,
    });
    const names = files.map(f => path.basename(f.filePath));
    expect(names).toContain("conflict.txt");
    expect(names).not.toContain("clean.txt");
  });

  it("includes non-conflicted if option enabled", async () => {
    const files = await listMatchingFiles({
      root: TMP,
      include: ["**/*.txt"],
      exclude: [],
      matcher,
      includeNonConflicted: true,
    });
    const names = files.map(f => path.basename(f.filePath));
    expect(names).toEqual(expect.arrayContaining(["clean.txt", "conflict.txt"]));
  });

  it("only files - no dirs", async () => {
    const files = await listMatchingFiles({
      root: TMP,
      include: ["*.txt"],
      exclude: [],
      matcher,
    });
    const names = files.map(f => path.basename(f.filePath));
    expect(names).toEqual(expect.arrayContaining(["conflict.txt"]));
  });
});

describe("backupFile", () => {
  it("creates backup copy under .merge-backups", async () => {
    const src = path.join(TMP, "clean.txt");
    const backup = await backupFile(src);
    const exists = await fs.readFile(backup, "utf8");
    expect(exists).toBe("hello");
    expect(backup).toMatch(/\.merge-backups/);
  });
});
