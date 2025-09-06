---
layout: default
title: Merge Processor
nav_order: 15
---

# merge-processor

## Functions

### processMerge()

> **processMerge**\<`T`\>(`__namedParameters`: \{ `autoStage?`: `boolean`; `base?`: `unknown`; `config`: [`Config`](types/README.md#config)\<`T`\>; `filePath`: `string`; `format`: `string`; `logger`: \{ `debug`: (`fileId`: `string`, `msg`: `string`) => `void`; `error`: (`fileId`: `string`, `msg`: `string`) => `void`; `flush`: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>; `info`: (`fileId`: `string`, `msg`: `string`) => `void`; `warn`: (`fileId`: `string`, `msg`: `string`) => `void`; \}; `normalizedConfig`: [`NormalizedConfig`](normalizer.md#normalizedconfig); `ours`: `unknown`; `theirs`: `unknown`; \}): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `conflicts`: [`Conflict`](merger/README.md#conflict)[]; `success`: `boolean`; \}\>

Defined in: [merge-processor.ts:17](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/merge-processor.ts#L17)

Common merge logic for processing a single file with ours/theirs/base data

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies)

#### Parameters

##### \_\_namedParameters

###### autoStage?

`boolean` = `false`

###### base?

`unknown`

###### config

[`Config`](types/README.md#config)\<`T`\>

###### filePath

`string`

###### format

`string`

###### logger

\{ `debug`: (`fileId`: `string`, `msg`: `string`) => `void`; `error`: (`fileId`: `string`, `msg`: `string`) => `void`; `flush`: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>; `info`: (`fileId`: `string`, `msg`: `string`) => `void`; `warn`: (`fileId`: `string`, `msg`: `string`) => `void`; \}

###### logger.debug

(`fileId`: `string`, `msg`: `string`) => `void` = `...`

###### logger.error

(`fileId`: `string`, `msg`: `string`) => `void` = `...`

###### logger.flush

() => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

###### logger.info

(`fileId`: `string`, `msg`: `string`) => `void` = `...`

###### logger.warn

(`fileId`: `string`, `msg`: `string`) => `void` = `...`

###### normalizedConfig

[`NormalizedConfig`](normalizer.md#normalizedconfig)

###### ours

`unknown`

###### theirs

`unknown`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `conflicts`: [`Conflict`](merger/README.md#conflict)[]; `success`: `boolean`; \}\>

---

### resolveGitMergeFiles()

> **resolveGitMergeFiles**\<`T`\>(`oursPath`: `string`, `basePath`: `string`, `theirsPath`: `string`, `config`: [`Config`](types/README.md#config)\<`T`\>): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`never`\>

Defined in: [merge-processor.ts:92](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/merge-processor.ts#L92)

Resolves Git merge conflicts for a single file using the three-way merge approach.
This function is designed to work as a Git merge driver.

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies)

#### Parameters

##### oursPath

`string`

Path to the "ours" version of the file

##### basePath

`string`

Path to the common ancestor version of the file

##### theirsPath

`string`

Path to the "theirs" version of the file

##### config

[`Config`](types/README.md#config)\<`T`\> = `...`

Configuration for conflict resolution

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`never`\>

Promise that resolves when merge is complete
