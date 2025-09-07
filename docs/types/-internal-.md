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

Defined in: [types.ts:86](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L86)

Utility type: excludes strategy names ending with "!".
The "!" suffix is reserved for internal overrides.

#### Type Parameters

##### T

`T` _extends_ `string`
