---
layout: default
title: Internal
parent: Merger
nav_order: 13
---

# \<internal\>

## Interfaces

### MergeArgs\<TContext\>

Defined in: [merger.ts:56](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/merger.ts#L56)

Internal args passed to strategies.

#### Type Parameters

##### TContext

`TContext`

#### Properties

##### base?

> `optional` **base**: `unknown`

Defined in: [merger.ts:59](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/merger.ts#L59)

##### conflicts

> **conflicts**: [`Conflict`](README.md#conflict)[]

Defined in: [merger.ts:63](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/merger.ts#L63)

##### ctx

> **ctx**: [`MergeContext`](README.md#mergecontext)\<`TContext`\>

Defined in: [merger.ts:62](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/merger.ts#L62)

##### filePath?

> `optional` **filePath**: `string`

Defined in: [merger.ts:61](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/merger.ts#L61)

##### logger

> **logger**: \{ `debug`: (`fileId`: `string`, `msg`: `string`) => `void`; `error`: (`fileId`: `string`, `msg`: `string`) => `void`; `flush`: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>; `info`: (`fileId`: `string`, `msg`: `string`) => `void`; `warn`: (`fileId`: `string`, `msg`: `string`) => `void`; \}

Defined in: [merger.ts:64](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/merger.ts#L64)

###### debug()

> **debug**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

###### error()

> **error**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

###### flush()

> **flush**: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

###### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

###### info()

> **info**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

###### warn()

> **warn**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

##### ours

> **ours**: `unknown`

Defined in: [merger.ts:57](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/merger.ts#L57)

##### path

> **path**: `string`

Defined in: [merger.ts:60](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/merger.ts#L60)

##### theirs

> **theirs**: `unknown`

Defined in: [merger.ts:58](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/merger.ts#L58)
