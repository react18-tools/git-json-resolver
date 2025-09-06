---
"git-json-resolver": patch
---

Fix field name escaping for dots and slashes in object keys

Improves handling of complex field names containing dots and slashes (e.g., scoped package names like `@scope/package` or URLs) by introducing proper escape sequences and updating the matcher logic to handle these cases consistently across all matcher implementations.