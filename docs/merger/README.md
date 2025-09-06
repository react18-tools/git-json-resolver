---
layout: default
title: README
parent: Merger
nav_order: 14
---

# merger

## Modules

- [\<internal\>](-internal-.md)

## Interfaces

### Conflict

Defined in: [merger.ts:15](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L15)

Conflict entry (minimal by default).

#### Properties

##### base?

> `optional` **base**: `unknown`

Defined in: [merger.ts:21](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L21)

##### ours?

> `optional` **ours**: `unknown`

Defined in: [merger.ts:19](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L19)

enriched only if debug enabled

##### path

> **path**: `string`

Defined in: [merger.ts:16](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L16)

##### reason

> **reason**: `string`

Defined in: [merger.ts:17](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L17)

##### theirs?

> `optional` **theirs**: `unknown`

Defined in: [merger.ts:20](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L20)

---

### MergeContext\<TContext\>

Defined in: [merger.ts:48](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L48)

Merge context (runtime state + config).

#### Type Parameters

##### TContext

`TContext` = `unknown`

#### Properties

##### \_strategyCache?

> `optional` **\_strategyCache**: [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, `string`[]\>

Defined in: [merger.ts:52](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L52)

##### config

> **config**: [`NormalizedConfig`](../normalizer.md#normalizedconfig)

Defined in: [merger.ts:49](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L49)

##### context?

> `optional` **context**: `TContext`

Defined in: [merger.ts:51](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L51)

##### strategies

> **strategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyFn`](../types/README.md#strategyfn)\<`TContext`\>\>

Defined in: [merger.ts:50](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L50)

---

### MergeResult

Defined in: [merger.ts:25](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L25)

Result of merging a file.

#### Properties

##### conflicts

> **conflicts**: [`Conflict`](#conflict)[]

Defined in: [merger.ts:28](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L28)

##### filePath

> **filePath**: `string`

Defined in: [merger.ts:26](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L26)

##### merged

> **merged**: `unknown`

Defined in: [merger.ts:27](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L27)

## Variables

### BuiltInStrategies

> `const` **BuiltInStrategies**: \{ `base`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `concat`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `drop`: \<`TContext`\>(`_skipped`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `merge`: \<`TContext`\>(`args`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](../types/README.md#strategyresult)\>; `non-empty`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `ours`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `skip`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `theirs`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `unique`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `update`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); \}

Defined in: [merger.ts:72](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L72)

Built-in strategies.

#### Type Declaration

##### base()

> `readonly` **base**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](../types/README.md#strategyresult)

##### concat()

> `readonly` **concat**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](../types/README.md#strategyresult)

##### drop()

> `readonly` **drop**: \<`TContext`\>(`_skipped`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_skipped

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](../types/README.md#strategyresult)

##### merge()

> `readonly` **merge**: \<`TContext`\>(`args`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](../types/README.md#strategyresult)\>

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### args

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](../types/README.md#strategyresult)\>

##### non-empty()

> `readonly` **non-empty**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](../types/README.md#strategyresult)

##### ours()

> `readonly` **ours**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](../types/README.md#strategyresult)

##### skip()

> `readonly` **skip**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](../types/README.md#strategyresult)

##### theirs()

> `readonly` **theirs**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](../types/README.md#strategyresult)

##### unique()

> `readonly` **unique**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](../types/README.md#strategyresult)

##### update()

> `readonly` **update**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](../types/README.md#strategyresult)

## Functions

### mergeObject()

> **mergeObject**\<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`unknown`\>

Defined in: [merger.ts:164](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L164)

Recursively merges two inputs using configured strategies.

Resolution order:

1. If values are strictly equal → return either.
2. Resolve strategy list from config (cached per path).
3. Apply built-in/custom strategies in order.
   - If a strategy succeeds → return its value immediately.
   - If a strategy fails → continue to next.
4. If all strategies fail → log conflict & fallback to ours.

#### Type Parameters

##### TContext

`TContext`

Type of optional user context for custom strategies.

#### Parameters

##### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`unknown`\>

---

### statusToString()

> **statusToString**(`s`: [`StrategyStatus`](../types/README.md#strategystatus)): `string`

Defined in: [merger.ts:32](https://github.com/react18-tools/git-json-resolver/blob/d61d9369fb47648a20fc0be0040b2aaa41b03a8c/lib/src/merger.ts#L32)

Helper: stringify status for logs.

#### Parameters

##### s

[`StrategyStatus`](../types/README.md#strategystatus)

#### Returns

`string`
