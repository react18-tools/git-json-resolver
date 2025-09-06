---
layout: default
title: Internal
parent: Types
nav_order: 16
---

# \<internal\>

## Type Aliases

### ForbidBangEnd\<T\>

> **ForbidBangEnd**\<`T`\> = `T` _extends_ `` `${string}!` `` ? `never` : `T`

Defined in: [types.ts:86](https://github.com/react18-tools/git-json-resolver/blob/bb35490ece54a122e412f67ef51d4b2dbeac2ebb/lib/src/types.ts#L86)

Utility type: excludes strategy names ending with "!".
The "!" suffix is reserved for internal overrides.

#### Type Parameters

##### T

`T` _extends_ `string`
