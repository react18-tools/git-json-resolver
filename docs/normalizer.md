---
layout: default
title: Normalizer
nav_order: 13
---

# normalizer

## Interfaces

### NormalizedConfig

Defined in: [normalizer.ts:28](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L28)

#### Properties

##### customStrategies

> **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyFn`](types/README.md#strategyfn)\>

Defined in: [normalizer.ts:32](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L32)

##### debug

> **debug**: `boolean`

Defined in: [normalizer.ts:34](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L34)

##### fileFilter()

> **fileFilter**: (`filepath`: `string`) => `boolean`

Defined in: [normalizer.ts:31](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L31)

###### Parameters

###### filepath

`string`

###### Returns

`boolean`

##### includeNonConflicted

> **includeNonConflicted**: `boolean`

Defined in: [normalizer.ts:33](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L33)

##### matcher

> **matcher**: [`Matcher`](matcher.md#matcher)

Defined in: [normalizer.ts:30](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L30)

##### rules

> **rules**: [`NormalizedRules`](#normalizedrules)

Defined in: [normalizer.ts:29](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L29)

##### strictArrays

> **strictArrays**: `boolean`

Defined in: [normalizer.ts:35](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L35)

##### writeConflictSidecar

> **writeConflictSidecar**: `boolean`

Defined in: [normalizer.ts:36](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L36)

---

### NormalizedRules

Defined in: [normalizer.ts:21](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L21)

#### Properties

##### default

> **default**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:25](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L25)

##### exact

> **exact**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:22](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L22)

##### exactFields

> **exactFields**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:23](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L23)

##### patterns

> **patterns**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:24](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L24)

---

### StrategyItem

Defined in: [normalizer.ts:10](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L10)

#### Properties

##### important

> **important**: `boolean`

Defined in: [normalizer.ts:12](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L12)

##### name

> **name**: `string`

Defined in: [normalizer.ts:11](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L11)

---

### StrategyList

Defined in: [normalizer.ts:15](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L15)

#### Properties

##### order

> **order**: `number`

Defined in: [normalizer.ts:17](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L17)

##### source

> **source**: `string`

Defined in: [normalizer.ts:18](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L18)

##### strategies

> **strategies**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:16](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L16)

## Variables

### DEFAULT_CONFIG

> `const` **DEFAULT_CONFIG**: \{ `debug`: `boolean`; `defaultStrategy`: `string`[]; `exclude`: `string`[]; `include`: `string`[]; `writeConflictSidecar`: `boolean`; \}

Defined in: [normalizer.ts:40](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L40)

Defaults

#### Type Declaration

##### debug

> **debug**: `boolean` = `false`

##### defaultStrategy

> **defaultStrategy**: `string`[]

##### exclude

> **exclude**: `string`[]

Add \*\*/ prefix to ensure proper handling in monorepo

##### include

> **include**: `string`[]

##### writeConflictSidecar

> **writeConflictSidecar**: `boolean` = `false`

## Functions

### normalizeConfig()

> **normalizeConfig**\<`T`\>(`config`: [`Config`](types/README.md#config)\<`T`\>): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`NormalizedConfig`](#normalizedconfig)\>

Defined in: [normalizer.ts:52](https://github.com/react18-tools/git-json-resolver/blob/dc8d77b61daa61f118acc2f74e260f814fc055fe/lib/src/normalizer.ts#L52)

Normalize user config into fully expanded and classified form.

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies)

#### Parameters

##### config

[`Config`](types/README.md#config)\<`T`\>

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`NormalizedConfig`](#normalizedconfig)\>
