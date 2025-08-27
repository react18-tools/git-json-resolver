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

Defined in: [types.ts:59](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/types.ts#L59)

Utility type: forbids strategy names ending with "!".
(Reserved suffix for internal overrides.)

#### Type Parameters

##### T

`T` _extends_ `string`
