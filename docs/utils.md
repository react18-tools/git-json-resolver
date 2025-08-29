---
layout: default
title: Utils
nav_order: 22
---

# utils

## Interfaces

### FileEntry

Defined in: [utils.ts:5](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L5)

#### Properties

##### content

> **content**: `string`

Defined in: [utils.ts:7](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L7)

##### filePath

> **filePath**: `string`

Defined in: [utils.ts:6](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L6)

## Type Aliases

### CollectFilesOptions

> **CollectFilesOptions** = [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`NormalizedConfig`](normalizer.md#normalizedconfig), `"include"` \| `"exclude"` \| `"matcher"` \| `"includeNonConflicted"` \| `"debug"` \| `"backupDir"`\> & \{ `root?`: `string`; \}

Defined in: [utils.ts:23](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L23)

#### Type Declaration

##### root?

> `optional` **root**: `string`

Root directory to start traversal (defaults to `process.cwd()`).

## Variables

### DROP

> `const` **DROP**: _typeof_ [`DROP`](#drop)

Defined in: [utils.ts:11](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L11)

Sentinel used to explicitly drop a value.

## Functions

### backupFile()

> **backupFile**(`filePath`: `string`, `backupDir`: `string`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [utils.ts:154](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L154)

#### Parameters

##### filePath

`string`

##### backupDir

`string` = `".merge-backups"`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

---

### createSkipDirectoryMatcher()

> **createSkipDirectoryMatcher**(`include`: `string`[], `exclude`: `string`[], `matcher`: [`Matcher`](matcher.md#matcher)): (`dirPath`: `string`) => `boolean`

Defined in: [utils.ts:112](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L112)

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

Defined in: [utils.ts:19](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L19)

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

Defined in: [utils.ts:40](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L40)

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

Defined in: [utils.ts:164](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/utils.ts#L164)

#### Parameters

##### backupDir

`string` = `".merge-backups"`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>
