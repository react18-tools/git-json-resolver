---
layout: default
title: Internal
parent: Merger
nav_order: 22
---

# \<internal\>

## Interfaces

### MergeArgs\<TContext\>

Defined in: [merger.ts:65](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/merger.ts#L65)

Internal args passed to strategies.

#### Type Parameters

##### TContext

`TContext`

#### Properties

##### base?

> `optional` **base**: `unknown`

Defined in: [merger.ts:68](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/merger.ts#L68)

##### conflicts

> **conflicts**: [`Conflict`](README.md#conflict)[]

Defined in: [merger.ts:72](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/merger.ts#L72)

##### ctx

> **ctx**: [`MergeContext`](README.md#mergecontext)\<`TContext`\>

Defined in: [merger.ts:71](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/merger.ts#L71)

##### filePath?

> `optional` **filePath**: `string`

Defined in: [merger.ts:70](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/merger.ts#L70)

##### ours

> **ours**: `unknown`

Defined in: [merger.ts:66](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/merger.ts#L66)

##### path

> **path**: `string`

Defined in: [merger.ts:69](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/merger.ts#L69)

##### theirs

> **theirs**: `unknown`

Defined in: [merger.ts:67](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/merger.ts#L67)
