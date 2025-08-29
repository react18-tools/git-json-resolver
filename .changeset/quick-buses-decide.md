---
"git-json-resolver": minor
---

# 📁 Configurable Backup Path

## New Feature
**Backup file location is now fully configurable** for enhanced flexibility.

## Usage
```ts
import { resolveConflicts } from "git-json-resolver";

resolveConflicts({
  filePath: "package.json",
  backupPath: "./backups/package.json.backup", // Custom backup location
  rules: [/* your rules */]
});
```

## Benefits
- **Custom backup directories** for better organization
- **Integration with existing backup strategies**
- **Compliance with project structure requirements**
