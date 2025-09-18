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

Defined in: [types.ts:86](https://github.com/react18-tools/git-json-resolver/blob/1a536885b518aadb4442332b4a0bab3ea438307f/lib/src/types.ts#L86)

Utility type: excludes strategy names ending with "!".
The "!" suffix is reserved for internal overrides.

#### Type Parameters

##### T

`T` _extends_ `string`
