/**
 * Example plugin demonstrating how to create custom strategies
 * for git-json-resolver.
 */

import { StrategyPlugin, StrategyStatus, PluginConfig, StrategyFn } from "git-json-resolver";

// Augment the plugin types
declare module "git-json-resolver" {
  interface PluginStrategies {
    "semantic-version": string;
    "timestamp-latest": string;
    "array-union": string;
  }
}

interface ExamplePluginConfig extends PluginConfig {
  semverPreferStable?: boolean;
  timestampFormat?: string;
}

// Individual strategy functions (can be imported directly)
export const semanticVersion: StrategyFn<ExamplePluginConfig> = ({ ours, theirs, context }) => {
  if (typeof ours !== "string" || typeof theirs !== "string") {
    return { status: StrategyStatus.CONTINUE };
  }

  const preferStable = context?.semverPreferStable ?? true;

  // Simple semver comparison (production code should use semver library)
  const parseVersion = (v: string) => v.split(".").map(Number);
  const oursVer = parseVersion(ours);
  const theirsVer = parseVersion(theirs);

  for (let i = 0; i < 3; i++) {
    if (oursVer[i] > theirsVer[i]) {
      return { status: StrategyStatus.OK, value: ours };
    }
    if (theirsVer[i] > oursVer[i]) {
      return { status: StrategyStatus.OK, value: theirs };
    }
  }

  return { status: StrategyStatus.OK, value: preferStable ? ours : theirs };
};

export const timestampLatest: StrategyFn = ({ ours, theirs }) => {
  const oursTime = new Date(ours as string).getTime();
  const theirsTime = new Date(theirs as string).getTime();

  if (isNaN(oursTime) || isNaN(theirsTime)) {
    return { status: StrategyStatus.CONTINUE };
  }

  return {
    status: StrategyStatus.OK,
    value: oursTime > theirsTime ? ours : theirs,
  };
};

export const arrayUnion: StrategyFn = ({ ours, theirs }) => {
  if (!Array.isArray(ours) || !Array.isArray(theirs)) {
    return { status: StrategyStatus.CONTINUE };
  }

  const union = [...new Set([...ours, ...theirs])];
  return { status: StrategyStatus.OK, value: union };
};

// Plugin interface for dynamic loading
const plugin: StrategyPlugin<ExamplePluginConfig> = {
  strategies: {
    "semantic-version": semanticVersion,
    "timestamp-latest": timestampLatest,
    "array-union": arrayUnion,
  },

  init: async (config: ExamplePluginConfig) => {
    console.log(`Initializing example plugin with config:`, config);
  },
};

// Export strategies object for direct import
export const strategies = {
  "semantic-version": semanticVersion,
  "timestamp-latest": timestampLatest,
  "array-union": arrayUnion,
};

export default plugin;
