---
"git-json-resolver": minor
---

# 🔄 CLI Restore Command

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