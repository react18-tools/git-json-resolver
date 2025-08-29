# Plugin System Guide

## Overview

The plugin system allows extending git-json-resolver with custom merge strategies while maintaining JSON config compatibility.

## Creating a Plugin

### 1. Plugin Structure

```typescript
import { StrategyPlugin, StrategyStatus } from "git-json-resolver";

// Augment types for TypeScript support
declare module "git-json-resolver" {
  interface PluginStrategies {
    "my-strategy": string;
  }
}

// Individual strategy function (can be imported directly)
export const myStrategy = ({ ours, theirs, base, path }) => {
  // Custom logic here
  return { status: StrategyStatus.OK, value: result };
};

// Plugin interface for dynamic loading
const plugin: StrategyPlugin = {
  strategies: {
    "my-strategy": myStrategy,
  },
  init: async (config) => {
    // Optional initialization
  }
};

export default plugin;
```

### 2. Publishing

```bash
npm publish my-git-json-resolver-plugin
```

## Using Plugins

### Direct Import (Recommended)

```typescript
import { myStrategy } from "my-plugin";
import { resolveConflicts } from "git-json-resolver";

await resolveConflicts({
  customStrategies: {
    "my-strategy": myStrategy,
  },
  rules: {
    version: ["my-strategy"]
  }
});
```

### Dynamic Loading (JSON Config)

```json
{
  "plugins": ["my-plugin"],
  "pluginConfig": {
    "my-plugin": {
      "customOption": "value"
    }
  },
  "rules": {
    "version": ["my-strategy"]
  }
}
```

### TypeScript Config

```typescript
// git-json-resolver.config.ts
import type { Config } from "git-json-resolver";

const config: Config = {
  plugins: ["my-plugin"],
  pluginConfig: {
    "my-plugin": { customOption: "value" }
  },
  rules: {
    version: ["my-strategy"] // TypeScript will know about this strategy
  }
};

export default config;
```

## Plugin Development Best Practices

1. **Naming**: Use descriptive strategy names
2. **Fallback**: Return `CONTINUE` when strategy doesn't apply
3. **Validation**: Check input types before processing
4. **Error Handling**: Return `FAIL` for unrecoverable errors
5. **Type Safety**: Augment `PluginStrategies` interface

## Example Strategies

- `semantic-version`: Compare semantic versions
- `timestamp-latest`: Choose most recent timestamp
- `array-union`: Merge arrays with unique values
- `file-size-larger`: Choose larger file content
- `priority-field`: Use priority-based resolution