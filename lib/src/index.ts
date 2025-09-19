import { parseConflictContent } from "./file-parser";
import { createLogger } from "./logger";
import { processMerge } from "./merge-processor";
import { type NormalizedConfig, normalizeConfig } from "./normalizer";
import type { Config, InbuiltMergeStrategies } from "./types";
import { listMatchingFiles } from "./utils";

export * from "./types";

export const resolveConflicts = async <
  T extends string = InbuiltMergeStrategies,
>(
  config: Config<T>,
) => {
  const globalLogger = await createLogger(config.loggerConfig, config.debug);
  const normalizedConfig: NormalizedConfig = await normalizeConfig<T>(config);
  const filesEntries = await listMatchingFiles(normalizedConfig);
  await Promise.all(
    filesEntries.map(async ({ filePath, content }) => {
      const { theirs, ours, base, format } = await parseConflictContent(
        content,
        {
          filename: filePath,
          parsers: normalizedConfig.parsers,
        },
      );
      globalLogger.debug(
        filePath,
        JSON.stringify({ ours, theirs, base, format }, null, 2),
      );
      await processMerge({
        ours,
        theirs,
        base,
        format,
        filePath,
        config,
        normalizedConfig,
        logger: globalLogger,
        autoStage: normalizedConfig.autoStage ?? true,
      });
    }),
  );
  await globalLogger.flush();
};
