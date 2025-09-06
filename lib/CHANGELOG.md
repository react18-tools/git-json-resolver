# git-json-resolver

## 1.3.4

### Patch Changes

- 97bc259: Fix field name escaping for dots and slashes in object keys

  Improves handling of complex field names containing dots and slashes (e.g., scoped package names like `@scope/package` or URLs) by introducing proper escape sequences and updating the matcher logic to handle these cases consistently across all matcher implementations.

## 1.3.3

### Patch Changes

- 2d85037: Improve logging

## 1.3.2

### Patch Changes

- cb112b3: Improve debug logging and cross-platform path handling
  - Enhanced debug logging with pretty-printed JSON output for better readability
  - Fixed Windows path separator handling in file matching utilities for consistent cross-platform behavior

## 1.3.1

### Patch Changes

- df062c3: Fix logger
- 27daef2: Enhance merge processing and debugging capabilities
  - Improve 3-way merge support with proper base handling in merge strategies
  - Refactor strategy types and interfaces for better type safety
  - Add comprehensive test coverage for merge scenarios and edge cases
  - Enhance logger configuration with debug-aware level settings
  - Add default backup directory support to backupFile utility
  - Improve conflict debugging with structured data when debug mode enabled
  - Optimize merge processing with better error handling and validation

## 1.3.0

### Minor Changes

- 54de9e1: Add Git integration for 3-way merge support and fix file path handling
  - Add base content support to ParsedConflict interface for 3-way merges
  - Integrate Git commands to fetch base and ours content when parsing conflicts
  - Make filename parameter required in ParseConflictOptions for Git operations
  - Fix file path handling in utils to return relative paths instead of absolute paths
  - Improve conflict detection for cases where ours and theirs are identical

## 1.2.0

### Minor Changes

- feat: Add comprehensive plugin system with JSON config support
  - **Plugin Architecture**: Added `StrategyPlugin` interface for extensible custom strategies
  - **JSON Config Support**: Removed function dependencies, enabling pure JSON configurations
  - **Plugin Loading**: Dynamic import system for NPM package plugins with `plugins` array
  - **Plugin Configuration**: Added `pluginConfig` for passing custom options to plugins
  - **TypeScript Integration**: ES2015 interface augmentation for automatic strategy name extension
  - **JSON Schema Validation**: Complete schema for config validation with plugin strategy support
  - **Examples**: Added example plugin with semantic versioning, timestamp, and array strategies

  **Usage:**

  ```json
  {
    "plugins": ["my-plugin"],
    "pluginConfig": {
      "my-plugin": { "option": "value" }
    },
    "rules": {
      "version": ["semantic-version"]
    }
  }
  ```

## 1.1.0

### Minor Changes

- 33df0e7: Export utils for custom strategies. Add autoAdd config option
- 537f127: Add Git merge driver support and improve architecture
  - **New feature**: CLI now supports Git merge driver mode when called with 3 positional arguments (%A %O %B)
  - **Refactored**: Extracted common merge logic into reusable `processMerge` utility (DRY principle)
  - **Testing**: Added comprehensive unit tests for merge-processor module
  - **Backward compatible**: Existing CLI workflows continue to work unchanged
  - **Auto-detection**: Automatically detects Git merge mode vs. standard conflict resolution mode
  - **Full configuration**: All existing config options (rules, strategies, matchers) work in Git merge mode
  - **Exit codes**: Proper Git merge driver exit codes (0 for success, 1 for conflicts)

  Usage:

  ```bash
  git config merge.json-resolver.driver "npx git-json-resolver %A %O %B"
  ```

  This enables automatic JSON conflict resolution during Git merges using the same powerful rule-based strategies.

## 1.0.0

### Major Changes

- 7e959e6: # 🚨 Breaking Change: Array Merge Strategy

  **Arrays are no longer merged element-by-element** under the default `merge` strategy.

  ## What Changed
  - Only **plain objects** are merged by default
  - Arrays now require explicit strategies: `concat`, `unique`, or custom resolvers

  ## Why This Change

  Previous array merging was unpredictable when arrays had:
  - Different lengths
  - Different semantic meanings
  - Mixed data types

  ## Migration Guide

  ```ts
  // Before (automatic array merging)
  rules: [{ pattern: "*", strategy: "merge" }];

  // After (explicit array handling)
  rules: [
    { pattern: "dependencies", strategy: "concat" },
    { pattern: "scripts", strategy: "ours" },
    { pattern: "*", strategy: "merge" }, // objects only
  ];
  ```

  This ensures **predictable and safe** conflict resolution.

### Minor Changes

- Add `concat` and `unique` array merge strategies
  - **`concat`**: Concatenate arrays from both sides (applies only if both are arrays)
  - **`unique`**: Merge arrays and remove duplicates (applies only if both are arrays)

  These strategies provide explicit control over array merging behavior for better conflict resolution.

- 50f0ee1: # 📁 Configurable Backup Path

  ## New Feature

  **Backup file location is now fully configurable** for enhanced flexibility.

  ## Usage

  ```ts
  import { resolveConflicts } from "git-json-resolver";

  resolveConflicts({
    filePath: "package.json",
    backupPath: "./backups/package.json.backup", // Custom backup location
    rules: [
      /* your rules */
    ],
  });
  ```

  ## Benefits
  - **Custom backup directories** for better organization
  - **Integration with existing backup strategies**
  - **Compliance with project structure requirements**

- e3f85e9: # 🔄 CLI Restore Command

  ## New CLI Feature

  **Restore backup files** with a dedicated command for quick recovery.

  ## Usage

  ```bash
  # Restore specific backup
  npx git-json-resolver restore package.json.backup

  # Restore all backups in directory
  npx git-json-resolver restore --all

  # Restore with confirmation prompt
  npx git-json-resolver restore --interactive
  ```

  ## Benefits
  - **Quick recovery** from failed merges
  - **Batch restore operations** for multiple files
  - **Interactive mode** for safer restoration
  - **Seamless CI/CD integration** for rollback scenarios

- 58df9b2: # ⚡ Pattern Negation Support

  ## New Matcher Feature

  **Pattern negation with `!` prefix** for the default `basicMatcher`.

  ## Usage

  ```ts
  import { resolveConflicts } from "git-json-resolver";

  resolveConflicts({
    filePath: "package.json",
    rules: [
      { pattern: "dependencies.*", strategy: "ours" },
      { pattern: "!dependencies.react", strategy: "theirs" }, // Negation
      { pattern: "scripts.*", strategy: "merge" },
      { pattern: "!scripts.test", strategy: "manual" }, // Exception
    ],
  });
  ```

  ## Benefits
  - **Fine-grained control** over merge strategies
  - **Exception handling** within broader patterns
  - **Intuitive syntax** familiar from gitignore patterns
  - **Enhanced rule flexibility** for complex scenarios

### Patch Changes

- 973fc14: # 🔧 Code Refactoring

  ## Normalizer Simplification
  - **Streamlined normalizer logic** for better maintainability
  - **Moved file handling utilities** to dedicated utils module
  - **Improved separation of concerns** between components

  ## Benefits
  - Cleaner, more focused code structure
  - Enhanced testability and debugging
  - Better code reusability across modules

- f9d3ea8: # 🚀 Quality & Performance Improvements

  ## Enhanced Error Handling
  - **More descriptive error messages** with context
  - **Graceful fallbacks** for edge cases
  - **Better error recovery** mechanisms

  ## Expanded Test Coverage
  - **Additional unit tests** for critical paths
  - **Edge case validation** scenarios
  - **Performance regression tests**

  ## Performance Enhancements
  - **Optimized pattern matching** algorithms
  - **Reduced memory footprint** for large files
  - **Faster conflict resolution** processing

  ## Benefits
  - More reliable conflict resolution
  - Better debugging experience
  - Improved performance for large repositories

## 0.1.8

### Patch Changes

- 420d6df: Fix: handle POSIX

## 0.1.7

### Patch Changes

- 5eb95b3: Wire loggerConfig and isolate logger per instance.

## 0.1.6

### Patch Changes

- 4313ee4: fix file walker. Do not walk .git and cleanly process only relative path to ensure proper pattern match.

## 0.1.5

### Patch Changes

- 10b5462: Fix logger

## 0.1.4

### Patch Changes

- 4bb154f: Do not walk through node_modules

## 0.1.3

### Patch Changes

- 27f6a2e: Timestampt log files

## 0.1.2

### Patch Changes

- 562e0ea: Enhance logging

## 0.1.1

### Patch Changes

- 2464e00: Add logs

## 0.1.0

### Minor Changes

- f3ec835: Ensure node_modules is always excluded to avoid common pitfall or missing it while providing custom exclude list.

## 0.0.2

### Patch Changes

- 41d3ec8: Fix types - keep types in types.ts file and reuse to ensure type collisions.

## 0.0.1

### Patch Changes

- Wire generic types through resolveConflicts function for improved type safety with custom strategies
