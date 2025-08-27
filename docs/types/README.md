---
layout: default
title: README
parent: Types
nav_order: 26
---

# types

## Modules

- [\<internal\>](-internal-.md)

## Enumerations

### StrategyStatus

Defined in: [types.ts:28](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L28)

#### Enumeration Members

##### CONTINUE

> **CONTINUE**: `"continue"`

Defined in: [types.ts:30](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L30)

##### FAIL

> **FAIL**: `"fail"`

Defined in: [types.ts:31](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L31)

##### OK

> **OK**: `"ok"`

Defined in: [types.ts:29](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L29)

##### SKIP

> **SKIP**: `"skip"`

Defined in: [types.ts:32](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L32)

## Interfaces

### Config\<T, TContext\>

Defined in: [types.ts:73](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L73)

High-level config object for conflict resolution.

#### Type Parameters

##### T

`T` _extends_ `string` = [`InbuiltMergeStrategies`](#inbuiltmergestrategies)

##### TContext

`TContext` = `unknown`

#### Properties

##### byStrategy?

> `optional` **byStrategy**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`T`, `string`[]\>\>

Defined in: [types.ts:81](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L81)

Strategy → list of fields to apply it to

##### customStrategies?

> `optional` **customStrategies**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)\<[`ForbidBangEnd`](-internal-.md#forbidbangend)\<`T`\>, [`InbuiltMergeStrategies`](#inbuiltmergestrategies)\>, [`StrategyFn`](#strategyfn)\<`TContext`\>\>

Defined in: [types.ts:84](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L84)

Custom strategies (excluding built-in names)

##### debug?

> `optional` **debug**: `boolean`

Defined in: [types.ts:108](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L108)

Debug mode - slower but more logs + traceability

##### defaultStrategy?

> `optional` **defaultStrategy**: `T` \| `T`[]

Defined in: [types.ts:75](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L75)

Fallback strategy when no rule matches

##### exclude?

> `optional` **exclude**: `string`[]

Defined in: [types.ts:93](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L93)

File exclusion globs

##### include?

> `optional` **include**: `string`[]

Defined in: [types.ts:90](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L90)

File inclusion globs

##### includeNonConflicted?

> `optional` **includeNonConflicted**: `boolean`

Defined in: [types.ts:103](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L103)

Whether to include files that do not contain conflicts.
Useful for applying strategies, e.g., drop even when conflicts aren’t present.
Defaults to `false`.

##### matcher?

> `optional` **matcher**: [`Matcher`](../matcher.md#matcher) \| `"micromatch"` \| `"picomatch"`

Defined in: [types.ts:96](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L96)

Glob matcher: `"micromatch"`, `"picomatch"`, or custom implementation

##### rules?

> `optional` **rules**: [`RuleTree`](#ruletree)\<`T`\>

Defined in: [types.ts:78](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L78)

Rule tree mapping globs → strategies

##### strictArrays?

> `optional` **strictArrays**: `boolean`

Defined in: [types.ts:113](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L113)

##### writeConflictSidecar?

> `optional` **writeConflictSidecar**: `boolean`

Defined in: [types.ts:118](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L118)

## Type Aliases

### InbuiltMergeStrategies

> **InbuiltMergeStrategies** = `"merge"` \| `"ours"` \| `"theirs"` \| `"base"` \| `"skip"` \| `"drop"` \| `"non-empty"` \| `"update"`

Defined in: [types.ts:18](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L18)

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

Defined in: [types.ts:66](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L66)

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

Defined in: [types.ts:46](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L46)

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

> **StrategyResult** = \{ `ok`: `true`; `value`: `unknown`; \} \| \{ `ok`: `false`; `reason?`: `string`; \}

Defined in: [types.ts:40](https://github.com/react18-tools/git-json-resolver/blob/983ecea05a6699ed0124b500e82e9f563b676c3f/lib/src/types.ts#L40)

Result contract for a strategy function.

- `ok: true` → merge produced a value
- `ok: false` → merge failed (with optional reason)

## References

### Matcher

Re-exports [Matcher](../matcher.md#matcher)
