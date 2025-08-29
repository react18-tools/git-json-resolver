---
"git-json-resolver": minor
---

# ⚡ Pattern Negation Support

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
    { pattern: "!scripts.test", strategy: "manual" } // Exception
  ]
});
```

## Benefits
- **Fine-grained control** over merge strategies
- **Exception handling** within broader patterns
- **Intuitive syntax** familiar from gitignore patterns
- **Enhanced rule flexibility** for complex scenarios
