---
"git-json-resolver": minor
---

Add Git merge driver support and improve architecture

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
