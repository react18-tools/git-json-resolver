---
"git-json-resolver": minor
---

Add Git integration for 3-way merge support and fix file path handling

- Add base content support to ParsedConflict interface for 3-way merges
- Integrate Git commands to fetch base and ours content when parsing conflicts
- Make filename parameter required in ParseConflictOptions for Git operations
- Fix file path handling in utils to return relative paths instead of absolute paths
- Improve conflict detection for cases where ours and theirs are identical