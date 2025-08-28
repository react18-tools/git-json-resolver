---
layout: default
title: README
parent: Types
nav_order: 27
---

# types

## Modules

- [\<internal\>](-internal-.md)

## Enumerations

### StrategyStatus

Defined in: [types.ts:29](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L29)

Strategy status codes.

#### Enumeration Members

##### CONTINUE

> **CONTINUE**: `1`

Defined in: [types.ts:31](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L31)

##### FAIL

> **FAIL**: `2`

Defined in: [types.ts:32](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L32)

##### OK

> **OK**: `0`

Defined in: [types.ts:30](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L30)

##### SKIP

> **SKIP**: `3`

Defined in: [types.ts:33](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L33)

## Interfaces

### Config\<T, TContext\>

Defined in: [types.ts:74](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L74)

High-level config object for conflict resolution.

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](#inbuiltmergestrategies)

##### TContext

`TContext` = `unknown`

#### Properties

##### byStrategy?

> `optional` **byStrategy**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`T`, `string`[]\>\>

Defined in: [types.ts:82](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L82)

Strategy → list of fields to apply it to

##### customStrategies?

> `optional` **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)\<[`ForbidBangEnd`](-internal-.md#forbidbangend)\<`T`\>, [`InbuiltMergeStrategies`](#inbuiltmergestrategies)\>, [`StrategyFn`](#strategyfn)\<`TContext`\>\>

Defined in: [types.ts:85](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L85)

Custom strategies (excluding built-in names)

##### debug?

> `optional` **debug**: `boolean`

Defined in: [types.ts:109](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L109)

Debug mode - slower but more logs + traceability

##### defaultStrategy?

> `optional` **defaultStrategy**: `T` \| `T`[]

Defined in: [types.ts:76](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L76)

Fallback strategy when no rule matches

##### exclude?

> `optional` **exclude**: `string`[]

Defined in: [types.ts:94](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L94)

File exclusion globs

##### include?

> `optional` **include**: `string`[]

Defined in: [types.ts:91](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L91)

File inclusion globs

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [types.ts:104](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L104)

Whether to include files that do not contain conflicts.
Useful for applying strategies, e.g., drop even when conflicts aren’t present.
Defaults to `false`.

##### matcher?

> `optional` **matcher**: [`Matcher`](../matcher.md#matcher) \| `"micromatch"` \| `"picomatch"`

Defined in: [types.ts:97](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L97)

Glob matcher: `"micromatch"`, `"picomatch"`, or custom implementation

##### rules?

> `optional` **rules**: [`RuleTree`](#ruletree)\<`T`\>

Defined in: [types.ts:79](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L79)

Rule tree mapping globs → strategies

##### strictArrays?

> `optional` **strictArrays**: `boolean`

Defined in: [types.ts:114](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L114)

##### writeConflictSidecar?

> `optional` **writeConflictSidecar**: `boolean`

Defined in: [types.ts:119](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L119)

## Type Aliases

### InbuiltMergeStrategies

> **InbuiltMergeStrategies** = `"merge"` \| `"ours"` \| `"theirs"` \| `"base"` \| `"skip"` \| `"drop"` \| `"non-empty"` \| `"update"`

Defined in: [types.ts:18](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L18)

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

### RuleTree\<T\>

> **RuleTree**\<`T`\> = \{\[`fieldGlob`: `string`\]: [`RuleTree`](#ruletree)\<`T`\> \| `T`[]; \}

Defined in: [types.ts:67](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L67)

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

Defined in: [types.ts:47](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L47)

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

Defined in: [types.ts:37](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/types.ts#L37)

Strategy result contract.

## References

### Matcher

Re-exports [Matcher](../matcher.md#matcher)
