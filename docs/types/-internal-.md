---
layout: default
title: Internal
parent: Types
nav_order: 25
---

# \<internal\>

## Type Aliases

### ForbidBangEnd\<T\>

> **ForbidBangEnd**\<`T`\> = `T` _extends_ `` `${string}!` `` ? `never` : `T`

Defined in: [types.ts:59](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L59)

Utility type: forbids strategy names ending with "!".
(Reserved suffix for internal overrides.)

#### Type Parameters

##### T

`T` _extends_ `string`
