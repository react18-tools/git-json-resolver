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

Defined in: [types.ts:60](https://github.com/react18-tools/git-json-resolver/blob/9afc574ba0e78c5147c107dece96697303cc4a06/lib/src/types.ts#L60)

Utility type: forbids strategy names ending with "!".
(Reserved suffix for internal overrides.)

#### Type Parameters

##### T

`T` _extends_ `string`
