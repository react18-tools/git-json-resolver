---
layout: default
title: Internal
parent: Merger
nav_order: 23
---

# \<internal\>

## Interfaces

### MergeArgs\<TContext\>

Defined in: [merger.ts:65](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L65)

Internal args passed to strategies.

#### Type Parameters

##### TContext

`TContext`

#### Properties

##### base?

> `optional` **base**: `unknown`

Defined in: [merger.ts:68](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L68)

##### conflicts

> **conflicts**: [`Conflict`](README.md#conflict)[]

Defined in: [merger.ts:72](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L72)

##### ctx

> **ctx**: [`MergeContext`](README.md#mergecontext)\<`TContext`\>

Defined in: [merger.ts:71](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L71)

##### filePath?

> `optional` **filePath**: `string`

Defined in: [merger.ts:70](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L70)

##### ours

> **ours**: `unknown`

Defined in: [merger.ts:66](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L66)

##### path

> **path**: `string`

Defined in: [merger.ts:69](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L69)

##### theirs

> **theirs**: `unknown`

Defined in: [merger.ts:67](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L67)
