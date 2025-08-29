---
layout: default
title: README
parent: Types
nav_order: 29
---

# types

## Modules

- [\<internal\>](-internal-.md)

## Enumerations

### StrategyStatus

Defined in: [types.ts:35](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L35)

Status codes returned by strategy functions.

#### Enumeration Members

##### CONTINUE

> **CONTINUE**: `1`

Defined in: [types.ts:40](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L40)

Strategy deferred — let other strategies continue.

##### FAIL

> **FAIL**: `2`

Defined in: [types.ts:43](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L43)

Strategy failed — unrecoverable error, stop processing.

##### OK

> **OK**: `0`

Defined in: [types.ts:37](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L37)

Strategy successfully produced a value.

##### SKIP

> **SKIP**: `3`

Defined in: [types.ts:46](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L46)

Strategy explicitly skipped this field.

## Interfaces

### Config\<T, TContext\>

Defined in: [types.ts:140](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L140)

High-level configuration object for conflict resolution.

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](#inbuiltmergestrategies)

Strategy string type (defaults to built-in strategies).

##### TContext

`TContext` = `unknown`

Context object type passed to strategies.

#### Properties

##### autoStage?

> `optional` **autoStage**: `boolean`

Defined in: [types.ts:197](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L197)

Whether to automatically stage resolved files.
Default: `true`.

##### backupDir?

> `optional` **backupDir**: `string`

Defined in: [types.ts:182](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L182)

Directory for backing up original files before modification.

##### byStrategy?

> `optional` **byStrategy**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`T`, `string`[]\>\>

Defined in: [types.ts:148](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L148)

Reverse mapping: strategy → list of field globs.

##### customStrategies?

> `optional` **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)\<[`ForbidBangEnd`](-internal-.md#forbidbangend)\<`T`\>, [`InbuiltMergeStrategies`](#inbuiltmergestrategies)\>, [`StrategyFn`](#strategyfn)\<`TContext`\>\>

Defined in: [types.ts:151](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L151)

Custom strategies (names must not clash with built-ins).

##### debug?

> `optional` **debug**: `boolean`

Defined in: [types.ts:173](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L173)

Enable debug mode for verbose logs and traceability (slower).

##### defaultStrategy?

> `optional` **defaultStrategy**: `T` \| `T`[]

Defined in: [types.ts:142](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L142)

Fallback strategy when no rule matches.

##### exclude?

> `optional` **exclude**: `string`[]

Defined in: [types.ts:160](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L160)

File exclusion globs.

##### include?

> `optional` **include**: `string`[]

Defined in: [types.ts:157](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L157)

File inclusion globs.

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [types.ts:170](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L170)

Whether to include files that do not contain conflicts.
Useful if strategies (e.g., "drop") should apply even to clean files.
Default: `false`.

##### loggerConfig?

> `optional` **loggerConfig**: [`LoggerConfig`](#loggerconfig-1)

Defined in: [types.ts:179](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L179)

Logger configuration.

##### matcher?

> `optional` **matcher**: [`Matcher`](../matcher.md#matcher) \| `"micromatch"` \| `"picomatch"`

Defined in: [types.ts:163](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L163)

Glob matcher: `"micromatch"`, `"picomatch"`, or a custom implementation. Defaults to internal minimal matcher

##### parsers?

> `optional` **parsers**: [`SupportedParsers`](#supportedparsers) \| `"auto"` \| [`SupportedParsers`](#supportedparsers)[]

Defined in: [types.ts:191](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L191)

Parsers to attempt, in order:

- A single parser (`"json"`, `"yaml"`, custom function, etc.).
- An array of parsers (e.g. `["yaml", "json5"]`).

Defaults to `"json"`.

##### rules?

> `optional` **rules**: [`RuleTree`](#ruletree)\<`T`\>

Defined in: [types.ts:145](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L145)

Rule tree mapping globs → strategies.

##### writeConflictSidecar?

> `optional` **writeConflictSidecar**: `boolean`

Defined in: [types.ts:176](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L176)

Whether to write sidecar files with unresolved conflicts.

---

### LoggerConfig

Defined in: [types.ts:108](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L108)

Logger configuration.

#### Properties

##### levels?

> `optional` **levels**: \{ `file?`: [`LogLevel`](#loglevel)[]; `stdout?`: [`LogLevel`](#loglevel)[]; \}

Defined in: [types.ts:119](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L119)

Level filters for stdout and file logging.

###### file?

> `optional` **file**: [`LogLevel`](#loglevel)[]

Levels to write into files (default: `["info", "warn", "error"]`).

###### stdout?

> `optional` **stdout**: [`LogLevel`](#loglevel)[]

Levels to print on stdout (default: `["warn", "error"]`).

##### logDir?

> `optional` **logDir**: `string`

Defined in: [types.ts:113](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L113)

Directory for log files (default: `"logs"`).

##### mode?

> `optional` **mode**: [`LogMode`](#logmode)

Defined in: [types.ts:110](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L110)

Logging mode (default: `"memory"`).

##### singleFile?

> `optional` **singleFile**: `boolean`

Defined in: [types.ts:116](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L116)

Whether to log into a single file instead of per-input-file logs.

## Type Aliases

### InbuiltMergeStrategies

> **InbuiltMergeStrategies** = `"merge"` \| `"ours"` \| `"theirs"` \| `"base"` \| `"skip"` \| `"drop"` \| `"non-empty"` \| `"update"` \| `"concat"` \| `"unique"`

Defined in: [types.ts:20](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L20)

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

Defined in: [types.ts:100](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L100)

Logging levels available to the logger.

---

### LogMode

> **LogMode** = `"memory"` \| `"stream"`

Defined in: [types.ts:103](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L103)

Logging modes: in-memory or streaming to files.

---

### Parser

> **Parser** = \{ `name`: `string`; `parser`: (`input`: `string`) => `unknown`; \}

Defined in: [types.ts:129](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L129)

A parser function that takes a raw string and returns parsed content.

#### Properties

##### name

> **name**: `string`

Defined in: [types.ts:129](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L129)

##### parser()

> **parser**: (`input`: `string`) => `unknown`

Defined in: [types.ts:129](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L129)

###### Parameters

###### input

`string`

###### Returns

`unknown`

---

### RuleTree\<T\>

> **RuleTree**\<`T`\> = \{\[`fieldGlob`: `string`\]: [`RuleTree`](#ruletree)\<`T`\> \| `T`[]; \}

Defined in: [types.ts:95](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L95)

Rule tree: maps field glob patterns → strategy names or nested rule trees.

- Keys: field glob patterns (matcher configurable)
- Values: one or more strategies, or further nested rules

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](#inbuiltmergestrategies)

#### Index Signature

\[`fieldGlob`: `string`\]: [`RuleTree`](#ruletree)\<`T`\> \| `T`[]

---

### StrategyFn()\<TContext\>

> **StrategyFn**\<`TContext`\> = (`args`: \{ `base?`: `unknown`; `context?`: `TContext`; `filePath?`: `string`; `ours`: `unknown`; `path`: `string`; `theirs`: `unknown`; \}) => [`StrategyResult`](#strategyresult) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](#strategyresult)\>

Defined in: [types.ts:63](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L63)

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

> **StrategyResult** = \{ `status`: [`OK`](#ok); `value`: `unknown`; \} \| \{ `reason?`: `string`; `status`: [`CONTINUE`](#continue); \} \| \{ `reason`: `string`; `status`: [`SKIP`](#skip); \} \| \{ `reason`: `string`; `status`: [`FAIL`](#fail); \}

Defined in: [types.ts:52](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L52)

Union type representing the outcome of a strategy function.

---

### SupportedParsers

> **SupportedParsers** = `"json"` \| `"json5"` \| `"yaml"` \| `"toml"` \| `"xml"` \| [`Parser`](#parser)

Defined in: [types.ts:132](https://github.com/react18-tools/git-json-resolver/blob/f4a78307ca1912fa18ae0a9600625f9d3b3c8372/lib/src/types.ts#L132)

Built-in parser identifiers or a custom parser function.

## References

### Matcher

Re-exports [Matcher](../matcher.md#matcher)
