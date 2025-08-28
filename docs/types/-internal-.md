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

Defined in: [types.ts:60](https://github.com/react18-tools/git-json-resolver/blob/c32c446f3456c8b10ea1a76708d6e28d4435684a/lib/src/types.ts#L60)

Utility type: forbids strategy names ending with "!".
(Reserved suffix for internal overrides.)

#### Type Parameters

##### T

`T` _extends_ `string`
