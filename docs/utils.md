---
layout: default
title: Utils
nav_order: 11
---

# utils

## Interfaces

### FileEntry

Defined in: [utils.ts:5](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L5)

#### Properties

##### content

> **content**: `string`

Defined in: [utils.ts:7](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L7)

##### filePath

> **filePath**: `string`

Defined in: [utils.ts:6](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L6)

## Type Aliases

### CollectFilesOptions

> **CollectFilesOptions** = [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`NormalizedConfig`](normalizer.md#normalizedconfig), `"include"` \| `"exclude"` \| `"matcher"` \| `"includeNonConflicted"` \| `"debug"` \| `"backupDir"`\> & \{ `root?`: `string`; \}

Defined in: [utils.ts:33](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L33)

#### Type Declaration

##### root?

> `optional` **root**: `string`

Root directory to start traversal (defaults to `process.cwd()`).

## Variables

### DEFAULT_BACKUP_DIR

> `const` **DEFAULT_BACKUP_DIR**: `".merge-backups"` = `".merge-backups"`

Defined in: [utils.ts:12](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L12)

---

### DROP

> `const` **DROP**: _typeof_ [`DROP`](#drop)

Defined in: [utils.ts:11](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L11)

Sentinel used to explicitly drop a value.

---

### StrategyStatus_CONTINUE

> `const` **StrategyStatus_CONTINUE**: `1`

Defined in: [utils.ts:19](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L19)

---

### StrategyStatus_FAIL

> `const` **StrategyStatus_FAIL**: `2`

Defined in: [utils.ts:20](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L20)

---

### StrategyStatus_OK

> `const` **StrategyStatus_OK**: `0`

Defined in: [utils.ts:18](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L18)

Status codes returned by strategy functions.
Using individual constants for optimal bundle size.

---

### StrategyStatus_SKIP

> `const` **StrategyStatus_SKIP**: `3`

Defined in: [utils.ts:21](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L21)

## Functions

### backupFile()

> **backupFile**(`filePath`: `string`, `backupDir`: `string`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [utils.ts:169](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L169)

#### Parameters

##### filePath

`string`

##### backupDir

`string` = `DEFAULT_BACKUP_DIR`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

---

### createSkipDirectoryMatcher()

> **createSkipDirectoryMatcher**(`include`: `string`[], `exclude`: `string`[], `matcher`: [`Matcher`](matcher.md#matcher)): (`dirPath`: `string`) => `boolean`

Defined in: [utils.ts:128](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L128)

Derive directory pruning patterns from include/exclude rules.
These patterns are used to avoid walking unnecessary directories.

#### Parameters

##### include

`string`[]

##### exclude

`string`[]

##### matcher

[`Matcher`](matcher.md#matcher)

#### Returns

> (`dirPath`: `string`): `boolean`

##### Parameters

###### dirPath

`string`

##### Returns

`boolean`

---

### hasConflict()

> **hasConflict**(`content`: `string`): `boolean`

Defined in: [utils.ts:29](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L29)

Checks whether the given file contains Git merge conflict markers.

#### Parameters

##### content

`string`

File content to check.

#### Returns

`boolean`

`true` if conflict markers exist, otherwise `false`.

---

### listMatchingFiles()

> **listMatchingFiles**(`options`: [`CollectFilesOptions`](#collectfilesoptions)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`FileEntry`](#fileentry)[]\>

Defined in: [utils.ts:50](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L50)

Recursively collects files that match the provided `fileFilter`.

- By default, only conflicted files are returned.
- If `includeNonConflicted` is enabled, matching files are always included.

#### Parameters

##### options

[`CollectFilesOptions`](#collectfilesoptions)

Collection options, including `fileFilter` and traversal root.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`FileEntry`](#fileentry)[]\>

A promise that resolves with an array of `{ filePath, content }`.

---

### restoreBackups()

> **restoreBackups**(`backupDir`: `string`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [utils.ts:179](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/utils.ts#L179)

#### Parameters

##### backupDir

`string` = `".merge-backups"`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>
