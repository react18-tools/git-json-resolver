---
layout: default
title: Internal
parent: Merger
nav_order: 23
---

# \<internal\>

## Interfaces

### MergeArgs\<TContext\>

Defined in: [merger.ts:50](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/merger.ts#L50)

Internal args passed to strategies.

#### Type Parameters

##### TContext

`TContext`

#### Properties

##### base?

> `optional` **base**: `unknown`

Defined in: [merger.ts:53](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/merger.ts#L53)

##### conflicts

> **conflicts**: [`Conflict`](README.md#conflict)[]

Defined in: [merger.ts:57](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/merger.ts#L57)

##### ctx

> **ctx**: [`MergeContext`](README.md#mergecontext)\<`TContext`\>

Defined in: [merger.ts:56](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/merger.ts#L56)

##### filePath?

> `optional` **filePath**: `string`

Defined in: [merger.ts:55](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/merger.ts#L55)

##### ours

> **ours**: `unknown`

Defined in: [merger.ts:51](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/merger.ts#L51)

##### path

> **path**: `string`

Defined in: [merger.ts:54](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/merger.ts#L54)

##### theirs

> **theirs**: `unknown`

Defined in: [merger.ts:52](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/merger.ts#L52)
