---
layout: default
title: README
parent: Types
nav_order: 17
---

# types

## Modules

- [\<internal\>](-internal-.md)

## Interfaces

### Config\<T, TContext\>

Defined in: [types.ts:194](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L194)

High-level configuration object for conflict resolution.

#### Type Parameters

##### T

`T` _extends_ `string` = [`AllStrategies`](#allstrategies)

Strategy string type (defaults to built-in strategies).

##### TContext

`TContext` = `unknown`

Context object type passed to strategies.

#### Properties

##### autoStage?

> `optional` **autoStage**: `boolean`

Defined in: [types.ts:251](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L251)

Whether to automatically stage resolved files.
Default: `true`.

##### backupDir?

> `optional` **backupDir**: `string`

Defined in: [types.ts:236](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L236)

Directory for backing up original files before modification.

##### byStrategy?

> `optional` **byStrategy**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`T`, `string`[]\>\>

Defined in: [types.ts:202](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L202)

Reverse mapping: strategy → list of field globs.

##### customStrategies?

> `optional` **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)\<[`ForbidBangEnd`](-internal-.md#forbidbangend)\<`T`\>, [`InbuiltMergeStrategies`](#inbuiltmergestrategies)\>, [`StrategyFn`](#strategyfn)\<`TContext`\>\>

Defined in: [types.ts:205](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L205)

Custom strategies (names must not clash with built-ins).

##### debug?

> `optional` **debug**: `boolean`

Defined in: [types.ts:227](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L227)

Enable debug mode for verbose logs and traceability (slower).

##### defaultStrategy?

> `optional` **defaultStrategy**: `T` \| `T`[]

Defined in: [types.ts:196](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L196)

Fallback strategy when no rule matches.

##### exclude?

> `optional` **exclude**: `string`[]

Defined in: [types.ts:214](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L214)

File exclusion globs.

##### include?

> `optional` **include**: `string`[]

Defined in: [types.ts:211](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L211)

File inclusion globs.

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [types.ts:224](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L224)

Whether to include files that do not contain conflicts.
Useful if strategies (e.g., "drop") should apply even to clean files.
Default: `false`.

##### loggerConfig?

> `optional` **loggerConfig**: [`LoggerConfig`](#loggerconfig-1)

Defined in: [types.ts:233](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L233)

Logger configuration.

##### matcher?

> `optional` **matcher**: [`Matcher`](../matcher.md#matcher) \| `"micromatch"` \| `"picomatch"`

Defined in: [types.ts:217](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L217)

Glob matcher: `"micromatch"`, `"picomatch"`, or a custom implementation. Defaults to internal minimal matcher

##### parsers?

> `optional` **parsers**: `"auto"` \| [`SupportedParsers`](#supportedparsers) \| [`SupportedParsers`](#supportedparsers)[]

Defined in: [types.ts:245](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L245)

Parsers to attempt, in order:

- A single parser (`"json"`, `"yaml"`, custom function, etc.).
- An array of parsers (e.g. `["yaml", "json5"]`).

Defaults to `"json"`.

##### pluginConfig?

> `optional` **pluginConfig**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`PluginConfigs`](#pluginconfigs)\>

Defined in: [types.ts:257](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L257)

Plugin-specific configuration passed to plugin.init().

##### plugins?

> `optional` **plugins**: `string`[]

Defined in: [types.ts:254](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L254)

NPM package names of strategy plugins to load.

##### rules?

> `optional` **rules**: [`RuleTree`](#ruletree)\<`T`\>

Defined in: [types.ts:199](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L199)

Rule tree mapping globs → strategies.

##### writeConflictSidecar?

> `optional` **writeConflictSidecar**: `boolean`

Defined in: [types.ts:230](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L230)

Whether to write sidecar files with unresolved conflicts.

---

### LoggerConfig

Defined in: [types.ts:151](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L151)

Logger configuration.

#### Properties

##### levels?

> `optional` **levels**: \{ `file?`: [`LogLevel`](#loglevel)[]; `stdout?`: [`LogLevel`](#loglevel)[]; \}

Defined in: [types.ts:162](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L162)

Level filters for stdout and file logging.

###### file?

> `optional` **file**: [`LogLevel`](#loglevel)[]

Levels to write into files (default: `["info", "warn", "error"]`).

###### stdout?

> `optional` **stdout**: [`LogLevel`](#loglevel)[]

Levels to print on stdout (default: `["warn", "error"]`).

##### logDir?

> `optional` **logDir**: `string`

Defined in: [types.ts:156](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L156)

Directory for log files (default: `"logs"`).

##### mode?

> `optional` **mode**: [`LogMode`](#logmode)

Defined in: [types.ts:153](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L153)

Logging mode (default: `"memory"`).

##### singleFile?

> `optional` **singleFile**: `boolean`

Defined in: [types.ts:159](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L159)

Whether to log into a single file instead of per-input-file logs.

---

### PluginConfigs

Defined in: [types.ts:128](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L128)

Interface for plugin-specific configuration.
Plugins augment this interface with their own config types.

Example plugin declaration:

```ts
declare module "git-json-resolver" {
  interface PluginConfigs {
    "git-json-resolver-semver": {
      strict?: boolean;
      fallback?: "ours" | "theirs" | "continue" | "error";
      preferValid?: boolean;
      preferRange?: boolean;
      workspacePattern?: string;
    };
  }
}
```

#### Indexable

\[`pluginName`: `string`\]: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>

---

### PluginStrategies

Defined in: [types.ts:102](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L102)

Interface for plugin-contributed strategies.
Plugins should augment this interface to add their strategy names.

Example plugin declaration:

```ts
declare module "git-json-resolver" {
  interface PluginStrategies {
    "semantic-version": string;
    "timestamp-latest": string;
  }
}
```

---

### StrategyPlugin\<TContext\>

Defined in: [types.ts:180](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L180)

Plugin interface that strategy plugins must implement.

#### Type Parameters

##### TContext

`TContext` = `unknown`

#### Properties

##### strategies

> **strategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`StrategyFn`](#strategyfn)\<`TContext`\>\>

Defined in: [types.ts:182](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L182)

Strategy functions provided by this plugin.

#### Methods

##### init()?

> `optional` **init**(`config`: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>): `void` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [types.ts:185](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L185)

Optional plugin initialization with config.

###### Parameters

###### config

[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>

###### Returns

`void` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

## Type Aliases

### AllStrategies

> **AllStrategies** = [`InbuiltMergeStrategies`](#inbuiltmergestrategies) \| keyof [`PluginStrategies`](#pluginstrategies)

Defined in: [types.ts:107](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L107)

All available strategy names (built-in + plugins).

---

### InbuiltMergeStrategies

> **InbuiltMergeStrategies** = `"merge"` \| `"ours"` \| `"theirs"` \| `"base"` \| `"skip"` \| `"drop"` \| `"non-empty"` \| `"update"` \| `"concat"` \| `"unique"`

Defined in: [types.ts:27](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L27)

Built-in merge strategies.
⚠️ Reserved names — plugin authors should avoid reusing these.

| Strategy    | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `merge`     | Deep merge objects/arrays where possible; conflicts bubble up otherwise.     |
| `ours`      | Always take the value from "ours".                                           |
| `theirs`    | Always take the value from "theirs".                                         |
| `base`      | Revert to the common ancestor ("base").                                      |
| `skip`      | Leave unresolved; conflict entry is created with `undefined`.                |
| `drop`      | Remove the field entirely (always).                                          |
| `non-empty` | Prefer non-empty value: `ours` \> `theirs` \> `base`; fallback to undefined. |
| `update`    | Update with "theirs" if field exists in "ours"; drop if missing in "ours".   |
| `concat`    | Concatenate arrays from both sides (applies only if both are arrays).        |
| `unique`    | Merge arrays and remove duplicates (applies only if both are arrays).        |

---

### LogLevel

> **LogLevel** = `"info"` \| `"warn"` \| `"error"` \| `"debug"`

Defined in: [types.ts:143](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L143)

Logging levels available to the logger.

---

### LogMode

> **LogMode** = `"memory"` \| `"stream"`

Defined in: [types.ts:146](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L146)

Logging modes: in-memory or streaming to files.

---

### Parser

> **Parser** = \{ `name`: `string`; `parser`: (`input`: `string`) => `unknown`; \}

Defined in: [types.ts:172](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L172)

A parser function that takes a raw string and returns parsed content.

#### Properties

##### name

> **name**: `string`

Defined in: [types.ts:172](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L172)

##### parser()

> **parser**: (`input`: `string`) => `unknown`

Defined in: [types.ts:172](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L172)

###### Parameters

###### input

`string`

###### Returns

`unknown`

---

### RuleTree\<T\>

> **RuleTree**\<`T`\> = \{\[`fieldGlob`: `string`\]: [`RuleTree`](#ruletree)\<`T`\> \| `T`[]; \}

Defined in: [types.ts:138](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L138)

Rule tree: maps field glob patterns → strategy names or nested rule trees.

- Keys: field glob patterns (matcher configurable)
- Values: one or more strategies, or further nested rules

#### Type Parameters

##### T

`T` _extends_ `string` = [`AllStrategies`](#allstrategies)

#### Index Signature

\[`fieldGlob`: `string`\]: [`RuleTree`](#ruletree)\<`T`\> \| `T`[]

---

### StrategyFn()\<TContext\>

> **StrategyFn**\<`TContext`\> = (`args`: \{ `base?`: `unknown`; `context?`: `TContext`; `filePath?`: `string`; `logger`: [`Awaited`](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)\<[`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)\<_typeof_ [`createLogger`](../logger.md#createlogger)\>\>; `ours`: `unknown`; `path`: `string`; `theirs`: `unknown`; \}) => [`StrategyResult`](#strategyresult) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](#strategyresult)\>

Defined in: [types.ts:59](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L59)

Strategy function signature.

#### Type Parameters

##### TContext

`TContext` = `unknown`

Optional context type passed during resolution.

#### Parameters

##### args

###### base?

`unknown`

Value from common ancestor (if available).

###### context?

`TContext`

Custom context object, if provided by caller.

###### filePath?

`string`

Full file path of the file being merged.

###### logger

[`Awaited`](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)\<[`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)\<_typeof_ [`createLogger`](../logger.md#createlogger)\>\>

logger

###### ours

`unknown`

Value from "ours".

###### path

`string`

JSON path of the current field.

###### theirs

`unknown`

Value from "theirs".

#### Returns

[`StrategyResult`](#strategyresult) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](#strategyresult)\>

---

### StrategyResult

> **StrategyResult** = \{ `status`: _typeof_ [`StrategyStatus_OK`](../utils.md#strategystatus_ok); `value`: `unknown`; \} \| \{ `reason?`: `string`; `status`: _typeof_ [`StrategyStatus_CONTINUE`](../utils.md#strategystatus_continue); \} \| \{ `reason`: `string`; `status`: _typeof_ [`StrategyStatus_SKIP`](../utils.md#strategystatus_skip); \} \| \{ `reason`: `string`; `status`: _typeof_ [`StrategyStatus_FAIL`](../utils.md#strategystatus_fail); \}

Defined in: [types.ts:48](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L48)

Union type representing the outcome of a strategy function.

---

### StrategyStatus

> **StrategyStatus** = _typeof_ [`StrategyStatus_OK`](../utils.md#strategystatus_ok) \| _typeof_ [`StrategyStatus_CONTINUE`](../utils.md#strategystatus_continue) \| _typeof_ [`StrategyStatus_FAIL`](../utils.md#strategystatus_fail) \| _typeof_ [`StrategyStatus_SKIP`](../utils.md#strategystatus_skip)

Defined in: [types.ts:39](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L39)

---

### SupportedParsers

> **SupportedParsers** = `"json"` \| `"json5"` \| `"yaml"` \| `"toml"` \| `"xml"` \| [`Parser`](#parser)

Defined in: [types.ts:175](https://github.com/react18-tools/git-json-resolver/blob/9b3eafde93c5cdd7078466539ccff7dff2a4fc0c/lib/src/types.ts#L175)

Built-in parser identifiers or a custom parser function.

## References

### Matcher

Re-exports [Matcher](../matcher.md#matcher)
