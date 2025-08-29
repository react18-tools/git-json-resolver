---
layout: default
title: Internal
parent: Merger
nav_order: 25
---

# \<internal\>

## Interfaces

### MergeArgs\<TContext\>

Defined in: [merger.ts:48](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/merger.ts#L48)

Internal args passed to strategies.

#### Type Parameters

##### TContext

`TContext`

#### Properties

##### base?

> `optional` **base**: `unknown`

Defined in: [merger.ts:51](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/merger.ts#L51)

##### conflicts

> **conflicts**: [`Conflict`](README.md#conflict)[]

Defined in: [merger.ts:55](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/merger.ts#L55)

##### ctx

> **ctx**: [`MergeContext`](README.md#mergecontext)\<`TContext`\>

Defined in: [merger.ts:54](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/merger.ts#L54)

##### filePath?

> `optional` **filePath**: `string`

Defined in: [merger.ts:53](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/merger.ts#L53)

##### ours

> **ours**: `unknown`

Defined in: [merger.ts:49](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/merger.ts#L49)

##### path

> **path**: `string`

Defined in: [merger.ts:52](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/merger.ts#L52)

##### theirs

> **theirs**: `unknown`

Defined in: [merger.ts:50](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/merger.ts#L50)
