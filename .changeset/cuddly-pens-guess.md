---
"git-json-resolver": major
---

# 🚨 Breaking Change: Array Merge Strategy

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
rules: [{ pattern: "*", strategy: "merge" }]

// After (explicit array handling)
rules: [
  { pattern: "dependencies", strategy: "concat" },
  { pattern: "scripts", strategy: "ours" },
  { pattern: "*", strategy: "merge" } // objects only
]
```

This ensures **predictable and safe** conflict resolution.
