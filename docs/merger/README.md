---
layout: default
title: README
parent: Merger
nav_order: 26
---

# merger

## Modules

- [\<internal\>](-internal-.md)

## Interfaces

### Conflict

Defined in: [merger.ts:7](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L7)

Conflict entry (minimal by default).

#### Properties

##### base?

> `optional` **base**: `unknown`

Defined in: [merger.ts:13](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L13)

##### ours?

> `optional` **ours**: `unknown`

Defined in: [merger.ts:11](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L11)

enriched only if debug enabled

##### path

> **path**: `string`

Defined in: [merger.ts:8](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L8)

##### reason

> **reason**: `string`

Defined in: [merger.ts:9](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L9)

##### theirs?

> `optional` **theirs**: `unknown`

Defined in: [merger.ts:12](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L12)

---

### MergeContext\<TContext\>

Defined in: [merger.ts:40](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L40)

Merge context (runtime state + config).

#### Type Parameters

##### TContext

`TContext` = `unknown`

#### Properties

##### \_strategyCache?

> `optional` **\_strategyCache**: [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, `string`[]\>

Defined in: [merger.ts:44](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L44)

##### config

> **config**: [`NormalizedConfig`](../normalizer.md#normalizedconfig)

Defined in: [merger.ts:41](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L41)

##### context?

> `optional` **context**: `TContext`

Defined in: [merger.ts:43](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L43)

##### strategies

> **strategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyFn`](../types/README.md#strategyfn)\<`TContext`\>\>

Defined in: [merger.ts:42](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L42)

---

### MergeResult

Defined in: [merger.ts:17](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L17)

Result of merging a file.

#### Properties

##### conflicts

> **conflicts**: [`Conflict`](#conflict)[]

Defined in: [merger.ts:20](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L20)

##### filePath

> **filePath**: `string`

Defined in: [merger.ts:18](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L18)

##### merged

> **merged**: `unknown`

Defined in: [merger.ts:19](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L19)

## Variables

### BuiltInStrategies

> `const` **BuiltInStrategies**: \{ `base`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `concat`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `drop`: \<`TContext`\>(`_skipped`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `merge`: \<`TContext`\>(`args`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](../types/README.md#strategyresult)\>; `non-empty`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `ours`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `skip`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `theirs`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `unique`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); `update`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](../types/README.md#strategyresult); \}

Defined in: [merger.ts:63](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L63)

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

Defined in: [merger.ts:153](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L153)

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

Defined in: [merger.ts:24](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/merger.ts#L24)

Helper: stringify status for logs.

#### Parameters

##### s

[`StrategyStatus`](../types/README.md#strategystatus)

#### Returns

`string`
