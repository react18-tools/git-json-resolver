---
layout: default
title: README
parent: Merger
nav_order: 24
---

# merger

## Modules

- [\<internal\>](-internal-.md)

## Interfaces

### Conflict

Defined in: [merger.ts:9](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L9)

Conflict entry (minimal by default).

#### Properties

##### base?

> `optional` **base**: `unknown`

Defined in: [merger.ts:15](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L15)

##### ours?

> `optional` **ours**: `unknown`

Defined in: [merger.ts:13](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L13)

enriched only if debug enabled

##### path

> **path**: `string`

Defined in: [merger.ts:10](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L10)

##### reason

> **reason**: `string`

Defined in: [merger.ts:11](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L11)

##### theirs?

> `optional` **theirs**: `unknown`

Defined in: [merger.ts:14](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L14)

---

### MergeContext\<TContext\>

Defined in: [merger.ts:42](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L42)

Merge context (runtime state + config).

#### Type Parameters

##### TContext

`TContext` = `unknown`

#### Properties

##### \_strategyCache?

> `optional` **\_strategyCache**: [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, `string`[]\>

Defined in: [merger.ts:46](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L46)

##### config

> **config**: [`NormalizedConfig`](../normalizer.md#normalizedconfig)

Defined in: [merger.ts:43](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L43)

##### context?

> `optional` **context**: `TContext`

Defined in: [merger.ts:45](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L45)

##### strategies

> **strategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyFn`](../types/README.md#strategyfn)\<`TContext`\>\>

Defined in: [merger.ts:44](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L44)

---

### MergeResult

Defined in: [merger.ts:19](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L19)

Result of merging a file.

#### Properties

##### conflicts

> **conflicts**: [`Conflict`](#conflict)[]

Defined in: [merger.ts:22](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L22)

##### filePath

> **filePath**: `string`

Defined in: [merger.ts:20](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L20)

##### merged

> **merged**: `unknown`

Defined in: [merger.ts:21](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L21)

## Variables

### BuiltInStrategies

> `const` **BuiltInStrategies**: \{ `base`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `drop`: \<`TContext`\>(`_skipped`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `merge`: \<`TContext`\>(`args`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](../types/README.md#strategyresult)\>; `non-empty`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `ours`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `skip`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `theirs`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `update`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); \}

Defined in: [merger.ts:65](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L65)

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

---

### DROP

> `const` **DROP**: _typeof_ [`DROP`](#drop-1)

Defined in: [merger.ts:6](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L6)

Sentinel used to explicitly drop a value.

## Functions

### mergeObject()

> **mergeObject**\<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`unknown`\>

Defined in: [merger.ts:165](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L165)

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

Defined in: [merger.ts:26](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/merger.ts#L26)

Helper: stringify status for logs.

#### Parameters

##### s

[`StrategyStatus`](../types/README.md#strategystatus)

#### Returns

`string`
