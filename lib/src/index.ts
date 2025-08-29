import { parseConflictContent } from "./file-parser";
import { normalizeConfig, NormalizedConfig } from "./normalizer";
import { Config, InbuiltMergeStrategies } from "./types";
import { listMatchingFiles } from "./utils";
import { createLogger } from "./logger";
import { processMerge } from "./merge-processor";

export * from "./types";

export const resolveConflicts = async <T extends string = InbuiltMergeStrategies>(
  config: Config<T>,
) => {
  const globalLogger = await createLogger(config.loggerConfig);
  const normalizedConfig: NormalizedConfig = await normalizeConfig<T>(config);
  const filesEntries = await listMatchingFiles(normalizedConfig);
  if (normalizedConfig.debug) {
    globalLogger.info("all", JSON.stringify({ normalizedConfig, filesEntries }, null, 2));
  }
  await Promise.all(
    filesEntries.map(async ({ filePath, content }) => {
      const { theirs, ours, format } = await parseConflictContent(content, {
        filename: filePath,
        parsers: normalizedConfig.parsers,
      });
      await processMerge({
        ours,
        theirs,
        base: undefined,
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
