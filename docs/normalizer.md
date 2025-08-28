---
layout: default
title: Normalizer
nav_order: 14
---

# normalizer

## Interfaces

### NormalizedConfig\<T, TContext\>

Defined in: [normalizer.ts:29](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L29)

#### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`Config`](types/README.md#config)\<`T`, `TContext`\>, `"byStrategy"` \| `"rules"` \| `"defaultStrategy"`\>

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies)

##### TContext

`TContext` = `unknown`

#### Properties

##### customStrategies?

> `optional` **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)\<[`ForbidBangEnd`](types/-internal-.md#forbidbangend)\<`T`\>, [`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies)\>, [`StrategyFn`](types/README.md#strategyfn)\<`TContext`\>\>

Defined in: [types.ts:99](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/types.ts#L99)

Custom strategies (excluding built-in names)

###### Inherited from

`Omit.customStrategies`

##### debug?

> `optional` **debug**: `boolean`

Defined in: [types.ts:123](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/types.ts#L123)

Debug mode - slower but more logs + traceability

###### Inherited from

`Omit.debug`

##### exclude?

> `optional` **exclude**: `string`[]

Defined in: [types.ts:108](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/types.ts#L108)

File exclusion globs

###### Inherited from

`Omit.exclude`

##### fileFilter()

> **fileFilter**: (`filepath`: `string`) => `boolean`

Defined in: [normalizer.ts:33](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L33)

###### Parameters

###### filepath

`string`

###### Returns

`boolean`

##### include?

> `optional` **include**: `string`[]

Defined in: [types.ts:105](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/types.ts#L105)

File inclusion globs

###### Inherited from

`Omit.include`

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [types.ts:118](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/types.ts#L118)

Whether to include files that do not contain conflicts.
Useful for applying strategies, e.g., drop even when conflicts aren’t present.
Defaults to `false`.

###### Inherited from

`Omit.includeNonConflicted`

##### loggerConfig?

> `optional` **loggerConfig**: [`LoggerConfig`](types/README.md#loggerconfig-1)

Defined in: [types.ts:138](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/types.ts#L138)

###### Inherited from

`Omit.loggerConfig`

##### matcher

> **matcher**: [`Matcher`](matcher.md#matcher)

Defined in: [normalizer.ts:32](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L32)

Glob matcher: `"micromatch"`, `"picomatch"`, or custom implementation

###### Overrides

`Omit.matcher`

##### rules

> **rules**: [`NormalizedRules`](#normalizedrules)

Defined in: [normalizer.ts:31](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L31)

##### strictArrays?

> `optional` **strictArrays**: `boolean`

Defined in: [types.ts:128](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/types.ts#L128)

###### Inherited from

`Omit.strictArrays`

##### writeConflictSidecar?

> `optional` **writeConflictSidecar**: `boolean`

Defined in: [types.ts:133](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/types.ts#L133)

###### Inherited from

`Omit.writeConflictSidecar`

---

### NormalizedRules

Defined in: [normalizer.ts:22](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L22)

#### Properties

##### default

> **default**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:26](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L26)

##### exact

> **exact**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:23](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L23)

##### exactFields

> **exactFields**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:24](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L24)

##### patterns

> **patterns**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:25](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L25)

---

### StrategyItem

Defined in: [normalizer.ts:11](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L11)

#### Properties

##### important

> **important**: `boolean`

Defined in: [normalizer.ts:13](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L13)

##### name

> **name**: `string`

Defined in: [normalizer.ts:12](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L12)

---

### StrategyList

Defined in: [normalizer.ts:16](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L16)

#### Properties

##### order

> **order**: `number`

Defined in: [normalizer.ts:18](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L18)

##### source

> **source**: `string`

Defined in: [normalizer.ts:19](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L19)

##### strategies

> **strategies**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:17](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L17)

## Variables

### DEFAULT_CONFIG

> `const` **DEFAULT_CONFIG**: \{ `debug`: `boolean`; `defaultStrategy`: `string`[]; `exclude`: `string`[]; `include`: `string`[]; `writeConflictSidecar`: `boolean`; \}

Defined in: [normalizer.ts:37](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L37)

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

> **normalizeConfig**\<`T`\>(`config`: [`Config`](types/README.md#config)\<`T`\>, `globalLogger`: \{ `debug`: (`fileId`: `string`, `msg`: `string`) => `void`; `error`: (`fileId`: `string`, `msg`: `string`) => `void`; `flush`: () => `void`; `info`: (`fileId`: `string`, `msg`: `string`) => `void`; `warn`: (`fileId`: `string`, `msg`: `string`) => `void`; \}): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`NormalizedConfig`](#normalizedconfig)\<[`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies), `unknown`\>\>

Defined in: [normalizer.ts:49](https://github.com/react18-tools/git-json-resolver/blob/9c24fa243e2d39962b91e02dad8dd8c7b30d8e95/lib/src/normalizer.ts#L49)

Normalize user config into fully expanded and classified form.

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies)

#### Parameters

##### config

[`Config`](types/README.md#config)\<`T`\>

##### globalLogger

###### debug

(`fileId`: `string`, `msg`: `string`) => `void` = `...`

###### error

(`fileId`: `string`, `msg`: `string`) => `void` = `...`

###### flush

() => `void`

###### info

(`fileId`: `string`, `msg`: `string`) => `void` = `...`

###### warn

(`fileId`: `string`, `msg`: `string`) => `void` = `...`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`NormalizedConfig`](#normalizedconfig)\<[`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies), `unknown`\>\>
