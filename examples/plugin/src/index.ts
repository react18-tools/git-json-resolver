/**
 * Example plugin demonstrating how to create custom strategies
 * for git-json-resolver.
 */

import type { StrategyFn, StrategyPlugin } from "git-json-resolver";
import {
  StrategyStatus_CONTINUE,
  StrategyStatus_OK,
} from "git-json-resolver/utils";

// Augment the plugin types
declare module "git-json-resolver" {
  interface PluginStrategies {
    "semantic-version": string;
    "timestamp-latest": string;
    "array-union": string;
  }
}

interface SemVerPluginConfig {
  semverPreferStable?: boolean;
  timestampFormat?: string;
}

// Individual strategy functions (can be imported directly)
export const semanticVersion: StrategyFn<SemVerPluginConfig> = ({
  ours,
  theirs,
  context,
}) => {
  if (typeof ours !== "string" || typeof theirs !== "string") {
    return { status: StrategyStatus_CONTINUE };
  }

  const preferStable = context?.semverPreferStable ?? true;

  // Simple semver comparison (production code should use semver library)
  const parseVersion = (v: string) => v.split(".").map(Number);
  const oursVer = parseVersion(ours);
  const theirsVer = parseVersion(theirs);

  for (let i = 0; i < 3; i++) {
    if (oursVer[i] > theirsVer[i]) {
      return { status: StrategyStatus_OK, value: ours };
    }
    if (theirsVer[i] > oursVer[i]) {
      return { status: StrategyStatus_OK, value: theirs };
    }
  }

  return { status: StrategyStatus_OK, value: preferStable ? ours : theirs };
};

export const timestampLatest: StrategyFn = ({ ours, theirs }) => {
  const oursTime = new Date(ours as string).getTime();
  const theirsTime = new Date(theirs as string).getTime();

  if (Number.isNaN(oursTime) || Number.isNaN(theirsTime)) {
    return { status: StrategyStatus_CONTINUE };
  }

  return {
    status: StrategyStatus_OK,
    value: oursTime > theirsTime ? ours : theirs,
  };
};

export const arrayUnion: StrategyFn = ({ ours, theirs }) => {
  if (!Array.isArray(ours) || !Array.isArray(theirs)) {
    return { status: StrategyStatus_CONTINUE };
  }

  const union = [...new Set([...ours, ...theirs])];
  return { status: StrategyStatus_OK, value: union };
};

// Plugin interface for dynamic loading
const plugin: StrategyPlugin<SemVerPluginConfig> = {
  strategies: {
    "semantic-version": semanticVersion,
    "timestamp-latest": timestampLatest,
    "array-union": arrayUnion,
  },

  init: async (config: SemVerPluginConfig) => {
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
