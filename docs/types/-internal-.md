---
layout: default
title: Internal
parent: Types
nav_order: 24
---

# \<internal\>

## Type Aliases

### ForbidBangEnd\<T\>

> **ForbidBangEnd**\<`T`\> = `T` _extends_ `` `${string}!` `` ? `never` : `T`

Defined in: [types.ts:60](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L60)

Utility type: forbids strategy names ending with "!".
(Reserved suffix for internal overrides.)

#### Type Parameters

##### T

`T` _extends_ `string`
