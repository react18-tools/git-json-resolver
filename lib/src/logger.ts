import fs from "fs";
import { promises as fsPromises, Mode } from "fs";
import path from "path";
import { LogLevel, LoggerConfig } from "./types";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
}

export const createLogger = async (config: LoggerConfig = {}) => {
  const mode: Mode = config.mode ?? "memory";
  const logDir = config.logDir ?? ".logs";
  const singleFile = config.singleFile ?? false;
  const levels = {
    stdout: config.levels?.stdout ?? ["warn", "error"],
    file: config.levels?.file ?? ["info", "warn", "error"],
  };

  // Async directory creation
  try {
    await fsPromises.mkdir(logDir, { recursive: true });
  } catch (error) {
    /* v8 ignore next 2 -- logs only */
    console.warn(`Failed to create log directory: ${error}`);
  }

  const buffers = new Map<string, LogEntry[]>();
  const streams = new Map<string, fs.WriteStream>();

  const getStream = (fileId: string) => {
    const key = singleFile ? "all" : fileId;
    if (!streams.has(key)) {
      const filePath = path.join(logDir, singleFile ? "combined.log" : `${fileId}.log`);
      streams.set(key, fs.createWriteStream(filePath, { flags: "a" }));
    }
    return streams.get(key)!;
  };

  const write = (fileId: string, level: LogLevel, message: string) => {
    const entry: LogEntry = { timestamp: new Date().toISOString(), level, message };

    // Console output if enabled
    if (levels.stdout.includes(level)) {
      const fn = level === "error" ? console.error : console.log;
      fn(`[${fileId}] [${entry.timestamp}] [${level.toUpperCase()}] ${entry.message}`);
    }

    // File output
    if (levels.file.includes(level)) {
      if (mode === "memory") {
        if (!buffers.has(fileId)) buffers.set(fileId, []);
        buffers.get(fileId)!.push(entry);
      } else {
        getStream(fileId).write(`[${entry.timestamp}] [${level.toUpperCase()}] ${entry.message}\n`);
      }
    }
  };

  const flush = async () => {
    if (mode === "memory") {
      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const writePromises = Array.from(buffers.entries()).map(async ([fileId, entries]) => {
        try {
          const filePath = path.join(
            logDir,
            singleFile ? `combined-${timestamp}.log` : `${fileId}-${timestamp}.log`,
          );
          const lines = entries.map(
            e => `[${e.timestamp}] [${e.level.toUpperCase()}] ${e.message}`,
          );
          await fsPromises.appendFile(filePath, lines.join("\n") + "\n");
        } catch (error) {
          /* v8 ignore next 2 -- logs only */
          console.warn(`Failed to write log file for ${fileId}: ${error}`);
        }
      });
      await Promise.all(writePromises);
    }
    for (const s of streams.values()) {
      try {
        s.end();
      } catch (error) {
        /* v8 ignore next 2 -- logs only */
        console.warn(`Failed to close log stream: ${error}`);
      }
    }

    // Wait for stream to close
    await new Promise(resolve => setTimeout(resolve, 10));
  };

  return {
    info: (fileId: string, msg: string) => write(fileId, "info", msg),
    warn: (fileId: string, msg: string) => write(fileId, "warn", msg),
    error: (fileId: string, msg: string) => write(fileId, "error", msg),
    debug: (fileId: string, msg: string) => write(fileId, "debug", msg),
    flush,
  };
};
