---
layout: default
title: Internal
parent: Types
nav_order: 26
---

# \<internal\>

## Type Aliases

### ForbidBangEnd\<T\>

> **ForbidBangEnd**\<`T`\> = `T` _extends_ `` `${string}!` `` ? `never` : `T`

Defined in: [types.ts:60](https://github.com/react18-tools/git-json-resolver/blob/c1a0da129ec7d3f24591e9f70d996d635b9e341f/lib/src/types.ts#L60)

Utility type: forbids strategy names ending with "!".
(Reserved suffix for internal overrides.)

#### Type Parameters

##### T

`T` _extends_ `string`
