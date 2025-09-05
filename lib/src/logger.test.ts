import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs";
import path from "path";
import { createLogger } from "./logger";

const TEST_LOG_DIR = "test-logs";

beforeEach(() => {
  vi.clearAllMocks();
  if (fs.existsSync(TEST_LOG_DIR)) {
    fs.rmSync(TEST_LOG_DIR, { recursive: true, force: true });
  }
});

afterEach(() => {
  if (fs.existsSync(TEST_LOG_DIR)) {
    fs.rmSync(TEST_LOG_DIR, { recursive: true, force: true });
  }
});

describe("createLogger", async () => {
  it("creates logger with default config", async () => {
    const logger = await createLogger();
    expect(logger).toHaveProperty("info");
    expect(logger).toHaveProperty("warn");
    expect(logger).toHaveProperty("error");
    expect(logger).toHaveProperty("debug");
    expect(logger).toHaveProperty("flush");
  });

  it("logs to console for stdout levels", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const logger = await createLogger({ levels: { stdout: ["warn", "error"] } });

    logger.warn("test", "warning message");
    logger.error("test", "error message");
    logger.info("test", "info message");

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[WARN] warning message"));
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR] error message"));
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining("[INFO] info message"));
  });

  it("writes to files in memory mode", async () => {
    const logger = await createLogger({
      mode: "memory",
      logDir: TEST_LOG_DIR,
      levels: { file: ["info", "warn"] },
    });

    logger.info("test", "info message");
    logger.warn("test", "warning message");
    await logger.flush();

    const files = fs.readdirSync(TEST_LOG_DIR);
    expect(files.length).toBeGreaterThan(0);

    const logContent = fs.readFileSync(path.join(TEST_LOG_DIR, files[0]), "utf8");
    expect(logContent).toContain("[INFO] info message");
    expect(logContent).toContain("[WARN] warning message");
  });

  it("writes to single file when singleFile is true", async () => {
    const logger = await createLogger(
      {
        mode: "memory",
        logDir: TEST_LOG_DIR,
        singleFile: true,
      },
      true,
    );

    logger.info("file1", "message1");
    logger.info("file2", "message2");
    await logger.flush();

    const files = fs.readdirSync(TEST_LOG_DIR);
    expect(files.length).toBe(1);
    expect(files[0]).toMatch(/combined-/);
  });

  it("creates log directory if it doesn't exist", async () => {
    const logger = await createLogger({ logDir: TEST_LOG_DIR });
    expect(fs.existsSync(TEST_LOG_DIR)).toBe(true);
  });

  it("handles stream mode", async () => {
    const logger = await createLogger({
      mode: "stream",
      logDir: TEST_LOG_DIR,
    });

    logger.error("test", "stream message");
    await logger.flush();

    const files = fs.readdirSync(TEST_LOG_DIR);
    expect(files.length).toBeGreaterThan(0);
  });

  it("filters logs by level", async () => {
    const logger = await createLogger({
      mode: "memory",
      logDir: TEST_LOG_DIR,
      levels: { file: ["error"] },
    });

    logger.info("test", "info");
    logger.error("test", "error");
    await logger.flush();

    const files = fs.readdirSync(TEST_LOG_DIR);
    const content = fs.readFileSync(path.join(TEST_LOG_DIR, files[0]), "utf8");
    expect(content).toContain("error");
    expect(content).not.toContain("info");
  });
});
