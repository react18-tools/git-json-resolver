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

Defined in: [types.ts:60](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/types.ts#L60)

Utility type: forbids strategy names ending with "!".
(Reserved suffix for internal overrides.)

#### Type Parameters

##### T

`T` _extends_ `string`
