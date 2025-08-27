---
layout: default
title: README
parent: Merger
nav_order: 24
---

# merger

## Modules

- [\<internal\>](-internal-.md)

## Enumerations

### StrategyStatus

Defined in: [merger.ts:26](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L26)

Strategy status codes.

#### Enumeration Members

##### CONTINUE

> **CONTINUE**: `1`

Defined in: [merger.ts:28](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L28)

##### FAIL

> **FAIL**: `2`

Defined in: [merger.ts:29](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L29)

##### OK

> **OK**: `0`

Defined in: [merger.ts:27](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L27)

##### SKIP

> **SKIP**: `3`

Defined in: [merger.ts:30](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L30)

## Interfaces

### Conflict

Defined in: [merger.ts:9](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L9)

Conflict entry (minimal by default).

#### Properties

##### base?

> `optional` **base**: `unknown`

Defined in: [merger.ts:15](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L15)

##### ours?

> `optional` **ours**: `unknown`

Defined in: [merger.ts:13](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L13)

enriched only if debug enabled

##### path

> **path**: `string`

Defined in: [merger.ts:10](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L10)

##### reason

> **reason**: `string`

Defined in: [merger.ts:11](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L11)

##### theirs?

> `optional` **theirs**: `unknown`

Defined in: [merger.ts:14](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L14)

---

### MergeContext\<TContext\>

Defined in: [merger.ts:57](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L57)

Merge context (runtime state + config).

#### Type Parameters

##### TContext

`TContext` = `unknown`

#### Properties

##### \_strategyCache?

> `optional` **\_strategyCache**: [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, `string`[]\>

Defined in: [merger.ts:61](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L61)

##### config

> **config**: [`NormalizedConfig`](../normalizer.md#normalizedconfig)

Defined in: [merger.ts:58](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L58)

##### context?

> `optional` **context**: `TContext`

Defined in: [merger.ts:60](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L60)

##### strategies

> **strategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyFn`](../types/README.md#strategyfn)\<`TContext`\>\>

Defined in: [merger.ts:59](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L59)

---

### MergeResult

Defined in: [merger.ts:19](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L19)

Result of merging a file.

#### Properties

##### conflicts

> **conflicts**: [`Conflict`](#conflict)[]

Defined in: [merger.ts:22](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L22)

##### filePath

> **filePath**: `string`

Defined in: [merger.ts:20](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L20)

##### merged

> **merged**: `unknown`

Defined in: [merger.ts:21](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L21)

## Type Aliases

### StrategyResult

> **StrategyResult** = \{ `status`: [`OK`](#ok); `value`: `unknown`; \} \| \{ `reason?`: `string`; `status`: [`CONTINUE`](#continue); \} \| \{ `reason`: `string`; `status`: [`SKIP`](#skip); \} \| \{ `reason`: `string`; `status`: [`FAIL`](#fail); \}

Defined in: [merger.ts:50](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L50)

Strategy result contract.

## Variables

### BuiltInStrategies

> `const` **BuiltInStrategies**: \{ `base`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult); `drop`: \<`TContext`\>(`_skipped`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult); `merge`: \<`TContext`\>(`args`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](#strategyresult)\>; `non-empty`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult); `ours`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult); `skip`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult); `theirs`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult); `update`: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult); \}

Defined in: [merger.ts:80](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L80)

Built-in strategies.

#### Type Declaration

##### base()

> `readonly` **base**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](#strategyresult)

##### drop()

> `readonly` **drop**: \<`TContext`\>(`_skipped`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_skipped

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](#strategyresult)

##### merge()

> `readonly` **merge**: \<`TContext`\>(`args`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](#strategyresult)\>

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### args

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](#strategyresult)\>

##### non-empty()

> `readonly` **non-empty**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](#strategyresult)

##### ours()

> `readonly` **ours**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](#strategyresult)

##### skip()

> `readonly` **skip**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](#strategyresult)

##### theirs()

> `readonly` **theirs**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](#strategyresult)

##### update()

> `readonly` **update**: \<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>) => [`StrategyResult`](#strategyresult)

###### Type Parameters

###### TContext

`TContext`

###### Parameters

###### \_\_namedParameters

[`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>

###### Returns

[`StrategyResult`](#strategyresult)

---

### DROP

> `const` **DROP**: _typeof_ [`DROP`](#drop-1)

Defined in: [merger.ts:6](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L6)

Sentinel used to explicitly drop a value.

## Functions

### mergeObject()

> **mergeObject**\<`TContext`\>(`__namedParameters`: [`MergeArgs`](-internal-.md#mergeargs)\<`TContext`\>): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`unknown`\>

Defined in: [merger.ts:180](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L180)

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

> **statusToString**(`s`: [`StrategyStatus`](#strategystatus)): `string`

Defined in: [merger.ts:34](https://github.com/react18-tools/git-json-resolver/blob/b16e9f00b0c7f0f44241518b44b07a7c1b0a0401/lib/src/merger.ts#L34)

Helper: stringify status for logs.

#### Parameters

##### s

[`StrategyStatus`](#strategystatus)

#### Returns

`string`
