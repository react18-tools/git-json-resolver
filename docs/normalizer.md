---
layout: default
title: Normalizer
nav_order: 18
---

# normalizer

## Interfaces

### NormalizedConfig\<T, TContext\>

Defined in: [normalizer.ts:35](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L35)

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

Defined in: [types.ts:251](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/types.ts#L251)

Whether to automatically stage resolved files.
Default: `true`.

###### Inherited from

[`Config`](types/README.md#config).[`autoStage`](types/README.md#autostage)

##### backupDir?

> `optional` **backupDir**: `string`

Defined in: [types.ts:236](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/types.ts#L236)

Directory for backing up original files before modification.

###### Inherited from

[`Config`](types/README.md#config).[`backupDir`](types/README.md#backupdir)

##### customStrategies

> **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyFn`](types/README.md#strategyfn)\<`TContext`\>\>

Defined in: [normalizer.ts:44](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L44)

##### debug?

> `optional` **debug**: `boolean`

Defined in: [types.ts:227](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/types.ts#L227)

Enable debug mode for verbose logs and traceability (slower).

###### Inherited from

[`Config`](types/README.md#config).[`debug`](types/README.md#debug)

##### exclude

> **exclude**: `string`[]

Defined in: [normalizer.ts:43](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L43)

File exclusion globs.

###### Overrides

[`Config`](types/README.md#config).[`exclude`](types/README.md#exclude)

##### include

> **include**: `string`[]

Defined in: [normalizer.ts:42](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L42)

File inclusion globs.

###### Overrides

[`Config`](types/README.md#config).[`include`](types/README.md#include)

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [types.ts:224](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/types.ts#L224)

Whether to include files that do not contain conflicts.
Useful if strategies (e.g., "drop") should apply even to clean files.
Default: `false`.

###### Inherited from

[`Config`](types/README.md#config).[`includeNonConflicted`](types/README.md#includenonconflicted)

##### loggerConfig?

> `optional` **loggerConfig**: [`LoggerConfig`](types/README.md#loggerconfig-1)

Defined in: [types.ts:233](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/types.ts#L233)

Logger configuration.

###### Inherited from

[`Config`](types/README.md#config).[`loggerConfig`](types/README.md#loggerconfig)

##### matcher

> **matcher**: [`Matcher`](matcher.md#matcher)

Defined in: [normalizer.ts:41](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L41)

Glob matcher: `"micromatch"`, `"picomatch"`, or a custom implementation. Defaults to internal minimal matcher

###### Overrides

[`Config`](types/README.md#config).[`matcher`](types/README.md#matcher)

##### parsers?

> `optional` **parsers**: `"auto"` \| [`SupportedParsers`](types/README.md#supportedparsers) \| [`SupportedParsers`](types/README.md#supportedparsers)[]

Defined in: [types.ts:245](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/types.ts#L245)

Parsers to attempt, in order:

- A single parser (`"json"`, `"yaml"`, custom function, etc.).
- An array of parsers (e.g. `["yaml", "json5"]`).

Defaults to `"json"`.

###### Inherited from

[`Config`](types/README.md#config).[`parsers`](types/README.md#parsers)

##### pluginConfig?

> `optional` **pluginConfig**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`PluginConfigs`](types/README.md#pluginconfigs)\>

Defined in: [types.ts:257](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/types.ts#L257)

Plugin-specific configuration passed to plugin.init().

###### Inherited from

[`Config`](types/README.md#config).[`pluginConfig`](types/README.md#pluginconfig)

##### plugins?

> `optional` **plugins**: `string`[]

Defined in: [types.ts:254](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/types.ts#L254)

NPM package names of strategy plugins to load.

###### Inherited from

[`Config`](types/README.md#config).[`plugins`](types/README.md#plugins)

##### rules

> **rules**: [`NormalizedRules`](#normalizedrules)

Defined in: [normalizer.ts:40](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L40)

##### writeConflictSidecar?

> `optional` **writeConflictSidecar**: `boolean`

Defined in: [types.ts:230](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/types.ts#L230)

Whether to write sidecar files with unresolved conflicts.

###### Inherited from

[`Config`](types/README.md#config).[`writeConflictSidecar`](types/README.md#writeconflictsidecar)

---

### NormalizedRules

Defined in: [normalizer.ts:28](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L28)

#### Properties

##### default

> **default**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:32](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L32)

##### exact

> **exact**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:29](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L29)

##### exactFields

> **exactFields**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:30](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L30)

##### patterns

> **patterns**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyList`](#strategylist)[]\>

Defined in: [normalizer.ts:31](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L31)

---

### StrategyItem

Defined in: [normalizer.ts:17](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L17)

#### Properties

##### important

> **important**: `boolean`

Defined in: [normalizer.ts:19](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L19)

##### name

> **name**: `string`

Defined in: [normalizer.ts:18](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L18)

---

### StrategyList

Defined in: [normalizer.ts:22](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L22)

#### Properties

##### order

> **order**: `number`

Defined in: [normalizer.ts:24](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L24)

##### source

> **source**: `string`

Defined in: [normalizer.ts:25](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L25)

##### strategies

> **strategies**: [`StrategyItem`](#strategyitem)[]

Defined in: [normalizer.ts:23](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L23)

## Variables

### DEFAULT_CONFIG

> `const` **DEFAULT_CONFIG**: \{ `debug`: `boolean`; `defaultStrategy`: `string`[]; `exclude`: `string`[]; `include`: `string`[]; `writeConflictSidecar`: `boolean`; \}

Defined in: [normalizer.ts:48](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L48)

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

Defined in: [normalizer.ts:60](https://github.com/react18-tools/git-json-resolver/blob/6e75e49557f9b5e6210062de3c8a81741a79c347/lib/src/normalizer.ts#L60)

Normalize user config into fully expanded and classified form.

#### Type Parameters

##### T

`T` _extends_ `string` = [`AllStrategies`](types/README.md#allstrategies)

#### Parameters

##### config

[`Config`](types/README.md#config)\<`T`\>

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`NormalizedConfig`](#normalizedconfig)\<[`AllStrategies`](types/README.md#allstrategies), `unknown`\>\>
