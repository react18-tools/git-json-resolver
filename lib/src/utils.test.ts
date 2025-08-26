import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { collectFiles } from "./utils";

const conflictContent = `
{
<<<<<<< ours
  "value": 1
=======
  "value": 2
>>>>>>> theirs
}
`;

const cleanContent = `
{
  "value": 42
}
`;

describe("collectFiles", () => {
  let tmpDir: string;
  let conflictedFile: string;
  let cleanFile: string;
  let ignoredFile: string;

  beforeAll(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "collect-files-"));

    conflictedFile = path.join(tmpDir, "conflicted.json");
    cleanFile = path.join(tmpDir, "clean.json");
    ignoredFile = path.join(tmpDir, "ignored.txt");

    await fs.writeFile(conflictedFile, conflictContent, "utf8");
    await fs.writeFile(cleanFile, cleanContent, "utf8");
    await fs.writeFile(ignoredFile, cleanContent, "utf8");
  });

  afterAll(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("collects only conflicted files by default", async () => {
    const files = await collectFiles({
      root: tmpDir,
      fileFilter: file => file.endsWith(".json"),
    });

    const paths = files.map(f => f.filePath);

    expect(paths).toContain(conflictedFile);
    expect(paths).not.toContain(cleanFile);
    expect(paths).not.toContain(ignoredFile);

    // check content as well
    const conflicted = files.find(f => f.filePath === conflictedFile);
    expect(conflicted?.content).toContain("<<<<<<<");
  });

  it("collects conflicted + clean files when includeNonConflicted is true", async () => {
    const files = await collectFiles({
      root: tmpDir,
      fileFilter: file => file.endsWith(".json"),
      includeNonConflicted: true,
    });

    const paths = files.map(f => f.filePath);

    expect(paths).toContain(conflictedFile);
    expect(paths).toContain(cleanFile);
    expect(paths).not.toContain(ignoredFile);

    const clean = files.find(f => f.filePath === cleanFile);
    expect(clean?.content).toContain('"value": 42');
  });

  it("skips files that do not match fileFilter", async () => {
    const files = await collectFiles({
      root: tmpDir,
      fileFilter: file => file.endsWith(".json"),
    });

    const paths = files.map(f => f.filePath);
    expect(paths).not.toContain(ignoredFile);
  });
});
