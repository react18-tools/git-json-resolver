---
layout: default
title: README
parent: Types
nav_order: 25
---

# types

## Modules

- [\<internal\>](-internal-.md)

## Enumerations

### StrategyStatus

Defined in: [types.ts:29](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L29)

Strategy status codes.

#### Enumeration Members

##### CONTINUE

> **CONTINUE**: `1`

Defined in: [types.ts:31](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L31)

##### FAIL

> **FAIL**: `2`

Defined in: [types.ts:32](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L32)

##### OK

> **OK**: `0`

Defined in: [types.ts:30](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L30)

##### SKIP

> **SKIP**: `3`

Defined in: [types.ts:33](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L33)

## Interfaces

### Config\<T, TContext\>

Defined in: [types.ts:88](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L88)

High-level config object for conflict resolution.

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](#inbuiltmergestrategies)

##### TContext

`TContext` = `unknown`

#### Properties

##### byStrategy?

> `optional` **byStrategy**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`T`, `string`[]\>\>

Defined in: [types.ts:96](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L96)

Strategy → list of fields to apply it to

##### customStrategies?

> `optional` **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)\<[`ForbidBangEnd`](-internal-.md#forbidbangend)\<`T`\>, [`InbuiltMergeStrategies`](#inbuiltmergestrategies)\>, [`StrategyFn`](#strategyfn)\<`TContext`\>\>

Defined in: [types.ts:99](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L99)

Custom strategies (excluding built-in names)

##### debug?

> `optional` **debug**: `boolean`

Defined in: [types.ts:123](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L123)

Debug mode - slower but more logs + traceability

##### defaultStrategy?

> `optional` **defaultStrategy**: `T` \| `T`[]

Defined in: [types.ts:90](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L90)

Fallback strategy when no rule matches

##### exclude?

> `optional` **exclude**: `string`[]

Defined in: [types.ts:108](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L108)

File exclusion globs

##### include?

> `optional` **include**: `string`[]

Defined in: [types.ts:105](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L105)

File inclusion globs

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [types.ts:118](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L118)

Whether to include files that do not contain conflicts.
Useful for applying strategies, e.g., drop even when conflicts aren’t present.
Defaults to `false`.

##### loggerConfig?

> `optional` **loggerConfig**: [`LoggerConfig`](#loggerconfig-1)

Defined in: [types.ts:138](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L138)

##### matcher?

> `optional` **matcher**: [`Matcher`](../matcher.md#matcher) \| `"micromatch"` \| `"picomatch"`

Defined in: [types.ts:111](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L111)

Glob matcher: `"micromatch"`, `"picomatch"`, or custom implementation

##### rules?

> `optional` **rules**: [`RuleTree`](#ruletree)\<`T`\>

Defined in: [types.ts:93](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L93)

Rule tree mapping globs → strategies

##### strictArrays?

> `optional` **strictArrays**: `boolean`

Defined in: [types.ts:128](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L128)

##### writeConflictSidecar?

> `optional` **writeConflictSidecar**: `boolean`

Defined in: [types.ts:133](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L133)

---

### LoggerConfig

Defined in: [types.ts:75](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L75)

#### Properties

##### levels?

> `optional` **levels**: \{ `file?`: [`LogLevel`](#loglevel)[]; `stdout?`: [`LogLevel`](#loglevel)[]; \}

Defined in: [types.ts:79](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L79)

###### file?

> `optional` **file**: [`LogLevel`](#loglevel)[]

###### stdout?

> `optional` **stdout**: [`LogLevel`](#loglevel)[]

##### logDir?

> `optional` **logDir**: `string`

Defined in: [types.ts:77](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L77)

##### mode?

> `optional` **mode**: [`LogMode`](#logmode)

Defined in: [types.ts:76](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L76)

##### singleFile?

> `optional` **singleFile**: `boolean`

Defined in: [types.ts:78](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L78)

## Type Aliases

### InbuiltMergeStrategies

> **InbuiltMergeStrategies** = `"merge"` \| `"ours"` \| `"theirs"` \| `"base"` \| `"skip"` \| `"drop"` \| `"non-empty"` \| `"update"`

Defined in: [types.ts:18](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L18)

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

---

### LogLevel

> **LogLevel** = `"info"` \| `"warn"` \| `"error"` \| `"debug"`

Defined in: [types.ts:71](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L71)

---

### LogMode

> **LogMode** = `"memory"` \| `"stream"`

Defined in: [types.ts:73](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L73)

---

### RuleTree\<T\>

> **RuleTree**\<`T`\> = \{\[`fieldGlob`: `string`\]: [`RuleTree`](#ruletree)\<`T`\> \| `T`[]; \}

Defined in: [types.ts:67](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L67)

Rules tree: maps field globs → strategy names or nested rules.

- Keys: glob patterns (matcher configurable)
- Values: one or more strategies, or nested RuleTree

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](#inbuiltmergestrategies)

#### Index Signature

\[`fieldGlob`: `string`\]: [`RuleTree`](#ruletree)\<`T`\> \| `T`[]

---

### StrategyFn()\<TContext\>

> **StrategyFn**\<`TContext`\> = (`args`: \{ `base?`: `unknown`; `context?`: `TContext`; `filePath?`: `string`; `ours`: `unknown`; `path`: `string`; `theirs`: `unknown`; \}) => [`StrategyResult`](#strategyresult) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](#strategyresult)\>

Defined in: [types.ts:47](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L47)

Strategy function signature.
Custom strategies receive both sides, optional base, file path, and context.

#### Type Parameters

##### TContext

`TContext` = `unknown`

#### Parameters

##### args

###### base?

`unknown`

###### context?

`TContext`

###### filePath?

`string`

###### ours

`unknown`

###### path

`string`

###### theirs

`unknown`

#### Returns

[`StrategyResult`](#strategyresult) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StrategyResult`](#strategyresult)\>

---

### StrategyResult

> **StrategyResult** = \{ `status`: [`OK`](#ok); `value`: `unknown`; \} \| \{ `reason?`: `string`; `status`: [`CONTINUE`](#continue); \} \| \{ `reason`: `string`; `status`: [`SKIP`](#skip); \} \| \{ `reason`: `string`; `status`: [`FAIL`](#fail); \}

Defined in: [types.ts:37](https://github.com/react18-tools/git-json-resolver/blob/b38c33aa182eca9ca6d5408ecc380f54f3e1d39d/lib/src/types.ts#L37)

Strategy result contract.

## References

### Matcher

Re-exports [Matcher](../matcher.md#matcher)
