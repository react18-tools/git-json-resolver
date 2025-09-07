---
layout: default
title: Home
nav_order: 1
---

# Git Json Resolver <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

![Git JSON Resolver Banner](./banner.jpg)

[![test](https://github.com/react18-tools/git-json-resolver/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/git-json-resolver/actions/workflows/test.yml)
[![Maintainability](https://qlty.sh/gh/react18-tools/projects/git-json-resolver/maintainability.svg)](https://qlty.sh/gh/react18-tools/projects/git-json-resolver)
[![codecov](https://codecov.io/gh/react18-tools/git-json-resolver/graph/badge.svg)](https://codecov.io/gh/react18-tools/git-json-resolver)
[![Version](https://img.shields.io/npm/v/git-json-resolver.svg?colorB=green)](https://www.npmjs.com/package/git-json-resolver)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/git-json-resolver.svg)](https://www.npmjs.com/package/git-json-resolver)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/git-json-resolver)

A Git-aware conflict resolver for **JSON-first structured data**.

## Why?

- Git merge conflicts in structured files (JSON, YAML, XML, TOML) are painful.
- Manual resolution is error-prone, time-consuming, and breaks CI/CD pipelines.
- `git-json-resolver` automates conflict handling with **configurable strategies**.
- Non-JSON formats are internally normalized to JSON → resolved → converted back.

## Features

- ⚡ **Primary focus on JSON** (first-class support)
- 🔄 **YAML, XML, TOML, JSON5** supported via conversion
- 🧩 **Rule-based strategies** with path/pattern matching
- 📁 **Multiple file parallel processing** with include/exclude patterns
- 🔌 **Pluggable matcher** abstraction (picomatch, micromatch, or custom)
- 🛠️ **CLI and programmatic API** support
- 📝 **Conflict sidecar files** for unresolved conflicts
- 🔄 **Backup and restore** functionality
- 📊 **Configurable logging** (memory or file-based)
- 🔀 **Git merge driver** support for seamless Git integration
- 🔧 **Plugin system** for custom strategies with JSON config support

## Installation

```bash
pnpm add git-json-resolver
```

**_or_**

```bash
npm install git-json-resolver
```

**_or_**

```bash
yarn add git-json-resolver
```

## Quick Start

### CLI Usage

```bash
# Initialize config file
npx git-json-resolver --init

# Run with default config
npx git-json-resolver

# Run with options
npx git-json-resolver --include "**/*.json" --debug --sidecar

# Restore from backups
npx git-json-resolver --restore .merge-backups
```

### Git Integration

Add a custom merge driver to your Git config:

```bash
git config merge.json-resolver.name "Custom JSON merge driver"
git config merge.json-resolver.driver "npx git-json-resolver %A %O %B"
```

Update `.gitattributes` to use it for JSON files:

```gitattributes
*.json merge=json-resolver
*.yaml merge=json-resolver
*.yml merge=json-resolver
*.toml merge=json-resolver
*.xml merge=json-resolver
```

**How it works:**

- Git automatically calls the merge driver during conflicts
- Uses same configuration and strategies as CLI mode
- Supports 3-way merge (ours, base, theirs)
- Returns proper exit codes (0 = success, 1 = conflicts)

## Configuration

### Programmatic API

```ts
import { resolveConflicts } from "git-json-resolver";

await resolveConflicts({
  defaultStrategy: ["merge", "ours"],
  rules: {
    "dependencies.*": ["ours"],
    version: ["theirs!"], // ! marks as important
    "scripts.build": ["skip"],
  },
  include: ["**/*.json", "**/*.yaml"],
  exclude: ["**/node_modules/**"],
  matcher: "picomatch",
  debug: true,
  writeConflictSidecar: true,
  backupDir: ".merge-backups",
});
```

### Config File

**JavaScript Config (`git-json-resolver.config.js`)**

```js
module.exports = {
  defaultStrategy: ["merge", "ours"],
  rules: {
    // Exact path matching
    "package.json": {
      version: ["theirs!"],
      dependencies: ["ours"],
    },
    // Pattern matching
    "*.config.json": {
      "*": ["merge"],
    },
  },
  // Alternative: byStrategy format
  byStrategy: {
    ours: ["dependencies.*", "devDependencies.*"],
    "theirs!": ["version", "name"],
  },
  include: ["**/*.json", "**/*.yaml", "**/*.yml"],
  exclude: ["**/node_modules/**", "**/dist/**"],
  matcher: "picomatch",
  debug: false,
  writeConflictSidecar: false,
  loggerConfig: {
    mode: "memory", // or "stream"
    logDir: "logs",
    levels: {
      stdout: ["warn", "error"],
      file: ["info", "warn", "error"],
    },
  },
};
```

**JSON Config (`git-json-resolver.config.json`) - ⚠️ Experimental**

```json
{
  "$schema": "https://cdn.jsdelivr.net/npm/git-json-resolver@latest/schema/config.schema.json",
  "defaultStrategy": ["merge", "ours"],
  "plugins": ["my-plugin"],
  "pluginConfig": {
    "my-plugin": {
      "option": "value"
    }
  },
  "rules": {
    "package.json": {
      "version": ["semantic-version", "theirs"],
      "dependencies": ["ours"]
    }
  },
  "byStrategy": {
    "ours": ["dependencies.*", "devDependencies.*"],
    "theirs!": ["version", "name"]
  }
}
```

**⚠️ JSON Config Limitations:**

- No TypeScript intellisense for plugin strategies
- Limited validation for custom strategy names
- No compile-time type checking
- **Recommended:** Use `.js` or `.ts` config for better developer experience

## Supported Strategies

- **merge** → deep merge objects/arrays where possible
- **ours** → take current branch value
- **theirs** → take incoming branch value
- **base** → revert to common ancestor
- **skip** → leave unresolved (creates conflict entry)
- **drop** → remove the field entirely
- **non-empty** → prefer non-empty value (ours > theirs > base)
- **update** → update with theirs if field exists in ours
- **concat** → concatenate arrays from both sides
- **unique** → merge arrays and remove duplicates
- **custom** → user-defined resolver functions

### Strategy Priority

- Strategies marked with `!` (important) are applied first
- Multiple strategies can be specified as fallbacks
- Custom strategies can be defined via `customStrategies` config

## Supported Formats

- **JSON** (native)
- **JSON5** → via `json5` peer dependency
- **YAML** → via `yaml` peer dependency
- **TOML** → via `smol-toml` peer dependency
- **XML** → via `fast-xml-parser` peer dependency

All non-JSON formats are converted to JSON → resolved → converted back to original format.

## CLI Options

```bash
# File patterns
--include "**/*.json,**/*.yaml"  # Comma-separated patterns
--exclude "**/node_modules/**"   # Exclusion patterns

# Matcher selection
--matcher picomatch              # picomatch, micromatch, or custom

# Debug and logging
--debug                          # Enable verbose logging
--sidecar                        # Write conflict sidecar files

# Utilities
--init                           # Create starter config file
--restore .merge-backups         # Restore from backup directory
```

## Architecture

- **Modular design**: Separate concerns (parsing, merging, serialization)
- **Reusable utilities**: Common merge logic extracted for maintainability
- **Optimized bundle**: Constants over enums for better minification
- **Comprehensive testing**: Full test coverage with vitest
- **Type-safe**: Full TypeScript support with proper type inference

## Advanced Features

### Pattern Matching

- **Exact paths**: `"package.json"`, `"src.config.database.host"`
- **Field matching**: `"[version]"` → matches any `version` field
- **Glob patterns**: `"dependencies.*"`, `"**.config.**"`
- **Wildcards**: `"*.json"`, `"src/**/*.config.js"`

### Plugin System

**For TypeScript/JavaScript configs, you can use either approach:**

#### 1. Direct Import (Recommended)

```ts
import { strategies } from "my-plugin";
// or import { semanticVersion, timestampLatest } from "my-plugin";
import { resolveConflicts } from "git-json-resolver";

await resolveConflicts({
  customStrategies: {
    ...strategies,
    // or "semantic-version": semanticVersion,
  },
  rules: {
    version: ["semantic-version", "theirs"],
  },
});
```

#### 2. Dynamic Loading

```ts
// Also works in .js/.ts configs
const config = {
  plugins: ["my-plugin"],
  pluginConfig: {
    "my-plugin": { option: "value" },
  },
  rules: {
    version: ["semantic-version", "theirs"],
  },
};
```

#### 3. JSON Config (Dynamic Loading Only)

```json
{
  "plugins": ["my-plugin"],
  "pluginConfig": {
    "my-plugin": { "option": "value" }
  },
  "rules": {
    "version": ["semantic-version", "theirs"]
  }
}
```

**⚠️ If plugin doesn't provide global types:**

```ts
import type { Config } from "git-json-resolver";

const config: Config<AllStrategies | "semantic-version" | "timestamp-latest"> = {
  // ... your config
};
```

**Creating a Plugin**

```ts
import { StrategyPlugin, StrategyStatus, StrategyFn } from "git-json-resolver";

// Augment types for TypeScript support
declare module "git-json-resolver" {
  interface PluginStrategies {
    "semantic-version": string;
    "timestamp-latest": string;
  }
}

// Individual strategy functions (can be imported directly)
export const semanticVersion: StrategyFn = ({ ours, theirs }) => {
  if (isNewerVersion(theirs, ours)) {
    return { status: StrategyStatus.OK, value: theirs };
  }
  return { status: StrategyStatus.CONTINUE };
};

export const timestampLatest: StrategyFn = ({ ours, theirs }) => {
  const oursTime = new Date(ours as string).getTime();
  const theirsTime = new Date(theirs as string).getTime();
  return {
    status: StrategyStatus.OK,
    value: oursTime > theirsTime ? ours : theirs,
  };
};

// Export strategies object for direct import
export const strategies = {
  "semantic-version": semanticVersion,
  "timestamp-latest": timestampLatest,
};

// Plugin interface for dynamic loading (object-based)
const plugin: StrategyPlugin = {
  strategies,
  init: async config => {
    console.log("Plugin initialized with:", config);
  },
};

export default plugin;

// Alternative: Function-based plugin (NEW)
export default async function createPlugin(config?: any): Promise<StrategyPlugin> {
  // Initialize with config if needed
  console.log("Plugin initialized with:", config);

  return {
    strategies,
    init: async initConfig => {
      // Additional initialization if needed
    },
  };
}
```

### Custom Strategies (Inline)

```ts
import { StrategyStatus } from "git-json-resolver";

const config = {
  customStrategies: {
    "semantic-version": ({ ours, theirs }) => {
      // Custom logic for semantic version resolution
      if (isNewerVersion(theirs, ours)) {
        return { status: StrategyStatus.OK, value: theirs };
      }
      return { status: StrategyStatus.CONTINUE };
    },
  },
  rules: {
    version: ["semantic-version", "theirs"],
  },
};
```

### Logging & Debugging

- **Memory mode**: Fast, in-memory logging
- **Stream mode**: File-based logging for large operations
- **Per-file logs**: Separate log files for each processed file
- **Debug mode**: Detailed conflict information and strategy traces

## Plugin Development

See [PLUGIN_GUIDE.md](./PLUGIN_GUIDE.md) for detailed plugin development documentation.

## Contributing

Contributions welcome 🙌

- Fork, branch, PR — with tests (`vitest` required)
- Docs live in `libDocs/` (tutorials, guides, deep dives)
- API reference generated into `docs/` via TypeDoc

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

## Modules

- [cli](cli.md)
- [conflict-helper](conflict-helper.md)
- [file-parser](file-parser.md)
- [file-serializer](file-serializer.md)
- [index](index.md)
- [logger](logger.md)
- [matcher](matcher.md)
- [merge-processor](merge-processor.md)
- [merger](merger/README.md)
- [normalizer](normalizer.md)
- [strategy-resolver](strategy-resolver.md)
- [types](types/README.md)
- [utils](utils.md)
