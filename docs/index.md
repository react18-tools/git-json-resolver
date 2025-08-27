---
layout: default
title: Home
nav_order: 1
---

# Git Json Resolver <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

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
- 🔄 **YAML, XML, TOML** supported via conversion
- 🧩 **Rule-based strategies** (per path/pattern)
- 🗂️ Handles small configs to **huge repos** (optimizations built-in)
- 🔌 **Pluggable matcher** abstraction (picomatch, micromatch supported out of the box with peerDependency)
- 🛠️ Configurable trade-offs for **speed vs. memory**
- 🗃️ **Planned**: extend configuration to use **different strategies per file** (ideas and edge cases welcome!)

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

Add a custom merge driver to your Git config:

```bash
git config merge.json-resolver.name "Custom JSON merge driver"
git config merge.json-resolver.driver "npx git-json-resolver %A %O %B"
```

Update `.gitattributes` to use it for JSON files:

```gitattributes
*.json merge=json-resolver
```

## Example Config

```ts
import { resolveConflicts } from "git-json-resolver";

const result = resolveConflicts({
  filePath: "package.json",
  rules: [
    { pattern: "dependencies.*", strategy: "ours" },
    { pattern: "version", strategy: "theirs", important: true },
    { pattern: "scripts.build", strategy: "manual" },
  ],
  matcher: "picomatch", // default
  optimize: {
    cacheMatchers: true,
    streamMode: false, // set true for very large repos
  },
});
```

### Upcoming: File-Specific Strategies

We are exploring the ability to define **per-file strategy sets** in config, e.g.:

```ts
rulesByFile: {
  "package.json": { version: ["theirs"], dependencies: ["ours"] },
  "*.config.json": { "*": ["merge"] },
},
```

This raises interesting questions/edge cases:

- How to merge file-level vs. global rules?
- Should `include/exclude` still apply if a file is explicitly listed?
- Should conflicting rules between file + global fall back to default strategy or error?

We welcome ideas & edge cases here!

## Supported Strategies

- **ours** → take current branch value
- **theirs** → take incoming branch value
- **manual** → mark for human resolution
- **drop** → remove the key entirely
- **custom** → user-defined resolver function

## Supported Formats

- **JSON** (native)
- **YAML, XML, TOML** → converted to JSON → resolved → converted back

## Performance & Optimization

- **Matcher caching** for repeated patterns
- **Streaming mode** for very large repos (low memory footprint)
- Trade-offs are configurable via `optimize` field

## Roadmap

- [ ] Richer strategies via plugins (e.g., semantic version resolver)
- [ ] CLI UX improvements
- [ ] Pluggable format converters customizations
- [ ] VSCode integration for previewing merge resolutions
- [ ] **Per-file strategies support** (current RFC)

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
- [cli.test](cli.test.md)
- [conflict-helper](conflict-helper.md)
- [conflict-helper.test](conflict-helper.test.md)
- [file-parser](file-parser.md)
- [file-parser.test](file-parser.test.md)
- [file-serializer](file-serializer.md)
- [file-serializer.test](file-serializer.test.md)
- [index](index.md)
- [logger](logger/README.md)
- [matcher](matcher.md)
- [matcher.test](matcher.test.md)
- [merger](merger/README.md)
- [merger.test](merger.test.md)
- [normalizer](normalizer.md)
- [normalizer.test](normalizer.test.md)
- [strategy-resolver](strategy-resolver.md)
- [strategy-resolver.test](strategy-resolver.test.md)
- [types](types/README.md)
- [utils](utils.md)
- [utils.test](utils.test.md)
