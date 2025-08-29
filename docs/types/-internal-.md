---
layout: default
title: Internal
parent: Types
nav_order: 28
---

# \<internal\>

## Type Aliases

### ForbidBangEnd\<T\>

> **ForbidBangEnd**\<`T`\> = `T` _extends_ `` `${string}!` `` ? `never` : `T`

Defined in: [types.ts:87](https://github.com/react18-tools/git-json-resolver/blob/1c522503a4da2b0c40b914a11887e11d24ab51da/lib/src/types.ts#L87)

Utility type: excludes strategy names ending with "!".
The "!" suffix is reserved for internal overrides.

#### Type Parameters

##### T

`T` _extends_ `string`
