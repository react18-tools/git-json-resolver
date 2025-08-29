---
layout: default
title: Normalizer
nav_order: 18
---

# normalizer

## Interfaces

### NormalizedConfig\<T, TContext\>

Defined in: [normalizer.ts:28](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L28)

#### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`Config`](types/README.md#config)\<`T`, `TContext`\>, `"byStrategy"` \| `"rules"` \| `"defaultStrategy"`\>

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies)

##### TContext

`TContext` = `unknown`

#### Properties

##### autoStage?

> `optional` **autoStage**: `boolean`

Defined in: [types.ts:197](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L197)

Whether to automatically stage resolved files.
Default: `true`.

###### Inherited from

`Omit.autoStage`

##### backupDir?

> `optional` **backupDir**: `string`

Defined in: [types.ts:182](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L182)

Directory for backing up original files before modification.

###### Inherited from

`Omit.backupDir`

##### customStrategies?

> `optional` **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)\<[`ForbidBangEnd`](types/-internal-.md#forbidbangend)\<`T`\>, [`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies)\>, [`StrategyFn`](types/README.md#strategyfn)\<`TContext`\>\>

Defined in: [types.ts:151](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L151)

Custom strategies (names must not clash with built-ins).

###### Inherited from

`Omit.customStrategies`

##### debug?

> `optional` **debug**: `boolean`

Defined in: [types.ts:173](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L173)

Enable debug mode for verbose logs and traceability (slower).

###### Inherited from

`Omit.debug`

##### exclude

> **exclude**: `string`[]

Defined in: [normalizer.ts:33](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L33)

File exclusion globs.

###### Overrides

`Omit.exclude`

##### include

> **include**: `string`[]

Defined in: [normalizer.ts:32](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L32)

File inclusion globs.

###### Overrides

`Omit.include`

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [types.ts:170](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L170)

Whether to include files that do not contain conflicts.
Useful if strategies (e.g., "drop") should apply even to clean files.
Default: `false`.

###### Inherited from

`Omit.includeNonConflicted`

##### loggerConfig?

> `optional` **loggerConfig**: [`LoggerConfig`](types/README.md#loggerconfig-1)

Defined in: [types.ts:179](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L179)

Logger configuration.

###### Inherited from

`Omit.loggerConfig`

##### matcher

> **matcher**: [`Matcher`](matcher.md#matcher)

Defined in: [normalizer.ts:31](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L31)

Glob matcher: `"micromatch"`, `"picomatch"`, or a custom implementation. Defaults to internal minimal matcher

###### Overrides

`Omit.matcher`

##### parsers?

> `optional` **parsers**: [`SupportedParsers`](types/README.md#supportedparsers) \| `"auto"` \| [`SupportedParsers`](types/README.md#supportedparsers)[]

Defined in: [types.ts:191](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L191)

Parsers to attempt, in order:

- A single parser (`"json"`, `"yaml"`, custom function, etc.).
- An array of parsers (e.g. `["yaml", "json5"]`).

Defaults to `"json"`.

###### Inherited from

`Omit.parsers`

##### rules

> **rules**: [`NormalizedRules`](#normalizedrules)

Defined in: [normalizer.ts:30](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L30)

##### writeConflictSidecar?

> `optional` **writeConflictSidecar**: `boolean`

Defined in: [types.ts:176](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L176)

Whether to write sidecar files with unresolved conflicts.

###### Inherited from

`Omit.writeConflictSidecar`

---

### NormalizedRules

Defined in: [normalizer.ts:21](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L21)

#### Properties

##### default

> **default**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:25](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L25)

##### exact

> **exact**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:22](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L22)

##### exactFields

> **exactFields**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:23](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L23)

##### patterns

> **patterns**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:24](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L24)

---

### StrategyItem

Defined in: [normalizer.ts:10](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L10)

#### Properties

##### important

> **important**: `boolean`

Defined in: [normalizer.ts:12](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L12)

##### name

> **name**: `string`

Defined in: [normalizer.ts:11](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L11)

---

### StrategyList

Defined in: [normalizer.ts:15](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L15)

#### Properties

##### order

> **order**: `number`

Defined in: [normalizer.ts:17](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L17)

##### source

> **source**: `string`

Defined in: [normalizer.ts:18](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L18)

##### strategies

> **strategies**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:16](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L16)

## Variables

### DEFAULT_CONFIG

> `const` **DEFAULT_CONFIG**: \{ `debug`: `boolean`; `defaultStrategy`: `string`[]; `exclude`: `string`[]; `include`: `string`[]; `writeConflictSidecar`: `boolean`; \}

Defined in: [normalizer.ts:37](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L37)

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

> **normalizeConfig**\<`T`\>(`config`: [`Config`](types/README.md#config)\<`T`\>): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`NormalizedConfig`](#normalizedconfig)\<[`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies), `unknown`\>\>

Defined in: [normalizer.ts:49](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/normalizer.ts#L49)

Normalize user config into fully expanded and classified form.

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies)

#### Parameters

##### config

[`Config`](types/README.md#config)\<`T`\>

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`NormalizedConfig`](#normalizedconfig)\<[`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies), `unknown`\>\>
