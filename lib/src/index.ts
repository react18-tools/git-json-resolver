import { execSync } from "node:child_process";
import { parseConflictContent } from "./file-parser";
import { serialize } from "./file-serializer";
import { Conflict, mergeObject } from "./merger";
import { normalizeConfig, NormalizedConfig } from "./normalizer";
import { Config, InbuiltMergeStrategies } from "./types";
import { backupFile, listMatchingFiles } from "./utils";
import fs from "node:fs/promises";
import { reconstructConflict } from "./conflict-helper";
import { globalLogger } from "./logger";

export * from "./types";

const _strategyCache = new Map<string, string[]>();

export const resolveConflicts = async <T extends string = InbuiltMergeStrategies>(
  config: Config<T>,
) => {
  const normalizedConfig: NormalizedConfig = await normalizeConfig<T>(config);
  const filesEntries = await listMatchingFiles(normalizedConfig);
  if (normalizedConfig.debug) {
    globalLogger.info("all", JSON.stringify({ normalizedConfig, filesEntries }, null, 2));
  }
  await Promise.all(
    filesEntries.map(async ({ filePath, content }) => {
      const { theirs, ours, format } = await parseConflictContent(content, { filename: filePath });
      const conflicts: Conflict[] = [];
      const [merged] = await Promise.all([
        mergeObject({
          ours,
          theirs,
          base: undefined,
          filePath,
          conflicts,
          path: "",
          ctx: {
            config: normalizedConfig,
            strategies: normalizedConfig.customStrategies ?? {},
            _strategyCache,
          },
        }),
        backupFile(filePath),
      ]);

      if (normalizedConfig.debug) {
        globalLogger.debug(filePath, JSON.stringify({ merged, conflicts }, null, 2));
      }

      if (conflicts.length === 0) {
        const serialized = await serialize(format, merged);
        await fs.writeFile(filePath, serialized, "utf8");
        execSync(`git add ${filePath}`);
      } else {
        const serialized = await reconstructConflict(merged, ours, theirs, format);
        await Promise.all([
          fs.writeFile(filePath, serialized, "utf8"),
          config.writeConflictSidecar
            ? fs.writeFile(`${filePath}.conflict.json`, JSON.stringify(conflicts, null, 2))
            : null,
        ]);
      }
    }),
  );
  globalLogger.flush();
};
