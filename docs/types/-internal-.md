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

Defined in: [types.ts:86](https://github.com/react18-tools/git-json-resolver/blob/39336b33e116055265cb78e2e7ef769cc52bdba1/lib/src/types.ts#L86)

Utility type: excludes strategy names ending with "!".
The "!" suffix is reserved for internal overrides.

#### Type Parameters

##### T

`T` _extends_ `string`
