---
layout: default
title: Normalizer
nav_order: 18
---

# normalizer

## Interfaces

### NormalizedConfig\<T, TContext\>

Defined in: [normalizer.ts:28](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L28)

#### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`Config`](types/README.md#config)\<`T`, `TContext`\>, `"byStrategy"` \| `"rules"` \| `"defaultStrategy"` \| `"customStrategies"`\>

#### Type Parameters

##### T

`T` _extends_ `string` = [`AllStrategies`](types/README.md#allstrategies)

##### TContext

`TContext` = `unknown`

#### Properties

##### autoStage?

> `optional` **autoStage**: `boolean`

Defined in: [types.ts:237](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L237)

Whether to automatically stage resolved files.
Default: `true`.

###### Inherited from

`Omit.autoStage`

##### backupDir?

> `optional` **backupDir**: `string`

Defined in: [types.ts:222](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L222)

Directory for backing up original files before modification.

###### Inherited from

`Omit.backupDir`

##### customStrategies

> **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyFn`](types/README.md#strategyfn)\<`TContext`\>\>

Defined in: [normalizer.ts:34](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L34)

##### debug?

> `optional` **debug**: `boolean`

Defined in: [types.ts:213](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L213)

Enable debug mode for verbose logs and traceability (slower).

###### Inherited from

`Omit.debug`

##### exclude

> **exclude**: `string`[]

Defined in: [normalizer.ts:33](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L33)

File exclusion globs.

###### Overrides

`Omit.exclude`

##### include

> **include**: `string`[]

Defined in: [normalizer.ts:32](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L32)

File inclusion globs.

###### Overrides

`Omit.include`

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [types.ts:210](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L210)

Whether to include files that do not contain conflicts.
Useful if strategies (e.g., "drop") should apply even to clean files.
Default: `false`.

###### Inherited from

`Omit.includeNonConflicted`

##### loggerConfig?

> `optional` **loggerConfig**: [`LoggerConfig`](types/README.md#loggerconfig-1)

Defined in: [types.ts:219](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L219)

Logger configuration.

###### Inherited from

`Omit.loggerConfig`

##### matcher

> **matcher**: [`Matcher`](matcher.md#matcher)

Defined in: [normalizer.ts:31](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L31)

Glob matcher: `"micromatch"`, `"picomatch"`, or a custom implementation. Defaults to internal minimal matcher

###### Overrides

`Omit.matcher`

##### parsers?

> `optional` **parsers**: [`SupportedParsers`](types/README.md#supportedparsers) \| `"auto"` \| [`SupportedParsers`](types/README.md#supportedparsers)[]

Defined in: [types.ts:231](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L231)

Parsers to attempt, in order:

- A single parser (`"json"`, `"yaml"`, custom function, etc.).
- An array of parsers (e.g. `["yaml", "json5"]`).

Defaults to `"json"`.

###### Inherited from

`Omit.parsers`

##### pluginConfig?

> `optional` **pluginConfig**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`PluginConfig`](types/README.md#pluginconfig-1)\>

Defined in: [types.ts:243](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L243)

Plugin-specific configuration passed to plugin.init().

###### Inherited from

`Omit.pluginConfig`

##### plugins?

> `optional` **plugins**: `string`[]

Defined in: [types.ts:240](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L240)

NPM package names of strategy plugins to load.

###### Inherited from

`Omit.plugins`

##### rules

> **rules**: [`NormalizedRules`](#normalizedrules)

Defined in: [normalizer.ts:30](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L30)

##### writeConflictSidecar?

> `optional` **writeConflictSidecar**: `boolean`

Defined in: [types.ts:216](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L216)

Whether to write sidecar files with unresolved conflicts.

###### Inherited from

`Omit.writeConflictSidecar`

---

### NormalizedRules

Defined in: [normalizer.ts:21](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L21)

#### Properties

##### default

> **default**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:25](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L25)

##### exact

> **exact**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:22](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L22)

##### exactFields

> **exactFields**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:23](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L23)

##### patterns

> **patterns**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:24](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L24)

---

### StrategyItem

Defined in: [normalizer.ts:10](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L10)

#### Properties

##### important

> **important**: `boolean`

Defined in: [normalizer.ts:12](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L12)

##### name

> **name**: `string`

Defined in: [normalizer.ts:11](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L11)

---

### StrategyList

Defined in: [normalizer.ts:15](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L15)

#### Properties

##### order

> **order**: `number`

Defined in: [normalizer.ts:17](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L17)

##### source

> **source**: `string`

Defined in: [normalizer.ts:18](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L18)

##### strategies

> **strategies**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:16](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L16)

## Variables

### DEFAULT_CONFIG

> `const` **DEFAULT_CONFIG**: \{ `debug`: `boolean`; `defaultStrategy`: `string`[]; `exclude`: `string`[]; `include`: `string`[]; `writeConflictSidecar`: `boolean`; \}

Defined in: [normalizer.ts:38](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L38)

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

> **normalizeConfig**\<`T`\>(`config`: [`Config`](types/README.md#config)\<`T`\>): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`NormalizedConfig`](#normalizedconfig)\<[`AllStrategies`](types/README.md#allstrategies), `unknown`\>\>

Defined in: [normalizer.ts:50](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/normalizer.ts#L50)

Normalize user config into fully expanded and classified form.

#### Type Parameters

##### T

`T` _extends_ `string` = [`AllStrategies`](types/README.md#allstrategies)

#### Parameters

##### config

[`Config`](types/README.md#config)\<`T`\>

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`NormalizedConfig`](#normalizedconfig)\<[`AllStrategies`](types/README.md#allstrategies), `unknown`\>\>
