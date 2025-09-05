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
  const globalLogger = await createLogger(config.loggerConfig, config.debug);
  const normalizedConfig: NormalizedConfig = await normalizeConfig<T>(config);
  const filesEntries = await listMatchingFiles(normalizedConfig);
  await Promise.all(
    filesEntries.map(async ({ filePath, content }) => {
      const { theirs, ours, base, format } = await parseConflictContent(content, {
        filename: filePath,
        parsers: normalizedConfig.parsers,
      });
      globalLogger.debug(filePath, JSON.stringify({ ours, theirs, base, format }));
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
