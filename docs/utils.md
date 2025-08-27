---
layout: default
title: Utils
nav_order: 17
---

# utils

## Interfaces

### CollectFilesOptions

Defined in: [utils.ts:19](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/utils.ts#L19)

#### Properties

##### fileFilter()

> **fileFilter**: (`filePath`: `string`) => `boolean`

Defined in: [utils.ts:24](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/utils.ts#L24)

Function used to decide if a file should be considered at all.

###### Parameters

###### filePath

`string`

###### Returns

`boolean`

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [utils.ts:30](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/utils.ts#L30)

Whether to include files even if they don’t contain conflicts.
Defaults to `false`.

##### root?

> `optional` **root**: `string`

Defined in: [utils.ts:21](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/utils.ts#L21)

Root directory to start traversal (defaults to `process.cwd()`).

---

### FileEntry

Defined in: [utils.ts:4](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/utils.ts#L4)

#### Properties

##### content

> **content**: `string`

Defined in: [utils.ts:6](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/utils.ts#L6)

##### filePath

> **filePath**: `string`

Defined in: [utils.ts:5](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/utils.ts#L5)

## Functions

### backupFile()

> **backupFile**(`filePath`: `string`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [utils.ts:84](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/utils.ts#L84)

#### Parameters

##### filePath

`string`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

---

### listMatchingFiles()

> **listMatchingFiles**(`options`: [`CollectFilesOptions`](#collectfilesoptions)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`FileEntry`](#fileentry)[]\>

Defined in: [utils.ts:42](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/utils.ts#L42)

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
