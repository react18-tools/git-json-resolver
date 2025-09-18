import { execSync } from "node:child_process";
import { serialize } from "./file-serializer";
import { Conflict, mergeObject } from "./merger";
import { reconstructConflict } from "./conflict-helper";
import { backupFile } from "./utils";
import { Config, InbuiltMergeStrategies } from "./types";
import { normalizeConfig, NormalizedConfig } from "./normalizer";
import { createLogger } from "./logger";
import fs from "node:fs/promises";
import { normalizeParsers, runParser } from "./file-parser";

const _strategyCache = new Map<string, string[]>();

/**
 * Common merge logic for processing a single file with ours/theirs/base data
 */
export const processMerge = async <T extends string = InbuiltMergeStrategies>({
  ours,
  theirs,
  base,
  format,
  filePath,
  config,
  normalizedConfig,
  logger,
  autoStage = false,
}: {
  ours: unknown;
  theirs: unknown;
  base?: unknown;
  format: string;
  filePath: string;
  config: Config<T>;
  normalizedConfig: NormalizedConfig;
  logger: Awaited<ReturnType<typeof createLogger>>;
  autoStage?: boolean;
}) => {
  const conflicts: Conflict[] = [];
  const [merged] = await Promise.all([
    mergeObject({
      ours,
      theirs,
      base,
      filePath,
      conflicts,
      path: "",
      ctx: {
        config: normalizedConfig,
        strategies: normalizedConfig.customStrategies ?? {},
        _strategyCache,
      },
      logger,
    }),
    backupFile(filePath, config.backupDir),
  ]);

  logger.debug(filePath, JSON.stringify({ merged, conflicts }, null, 2));

  if (conflicts.length === 0) {
    const serialized = await serialize(format, merged);
    await fs.writeFile(filePath, serialized, "utf8");
    if (autoStage) {
      try {
        execSync(`git add ${filePath}`);
      } catch (error) {
        logger.warn(filePath, `Failed to stage file: ${error}`);
      }
    }
    return { success: true, conflicts: [] };
  } else {
    const serialized = await reconstructConflict(merged, ours, theirs, format);
    await Promise.all([
      fs.writeFile(filePath, `${serialized}\n`, "utf8"),
      config.writeConflictSidecar
        ? fs.writeFile(`${filePath}.conflict.json`, `${JSON.stringify(conflicts, null, 2)}\n`)
        : null,
    ]);
    return { success: false, conflicts };
  }
};

/**
 * Resolves Git merge conflicts for a single file using the three-way merge approach.
 * This function is designed to work as a Git merge driver.
 *
 * @param oursPath - Path to the "ours" version of the file
 * @param basePath - Path to the common ancestor version of the file
 * @param theirsPath - Path to the "theirs" version of the file
 * @param config - Configuration for conflict resolution
 * @returns Promise that resolves when merge is complete
 */
export const resolveGitMergeFiles = async <T extends string = InbuiltMergeStrategies>(
  oursPath: string,
  basePath: string,
  theirsPath: string,
  config: Config<T> = {} as Config<T>,
) => {
  const globalLogger = await createLogger(config.loggerConfig, config.debug);
  const normalizedConfig: NormalizedConfig = await normalizeConfig<T>(config);

  globalLogger.debug(
    "git-merge",
    `Merging files: ours=${oursPath}, base=${basePath}, theirs=${theirsPath}`,
  );

  const [oursContent, baseContent, theirsContent] = await Promise.all([
    fs.readFile(oursPath, "utf8"),
    fs.readFile(basePath, "utf8").catch(() => "{}"), // fallback if base doesn't exist
    fs.readFile(theirsPath, "utf8"),
  ]);

  const parsers = normalizeParsers({ ...normalizedConfig, filename: "" });

  const [ours, parser] = await runParser(oursContent, parsers);
  const [base, theirs] = await Promise.all(
    [baseContent, theirsContent].map(content =>
      runParser(content, [parser]).then(([result]) => result),
    ),
  );

  const format = typeof parser === "string" ? parser : parser.name;
  const { success } = await processMerge({
    ours,
    theirs,
    base,
    format,
    filePath: oursPath,
    config,
    normalizedConfig,
    logger: globalLogger,
    autoStage: false,
  });

  await globalLogger.flush();
  process.exit(success ? 0 : 1);
};
