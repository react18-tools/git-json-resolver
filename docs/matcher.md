---
layout: default
title: Matcher
nav_order: 10
---

# matcher

## Interfaces

### Matcher

Defined in: [matcher.ts:13](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/matcher.ts#L13)

Matcher abstraction + adapters for micromatch/picomatch (optional).

Default matcher understands:

- `*` → matches any single field segment
- `**` → matches any number of nested field segments
- Prefix/suffix like `prefix-*`, `*-suffix`
- Backslash escaping (micromatch-style): `a/b` → literal slash, `\*` → literal asterisk

Micromatch/Picomatch can be loaded at runtime as optional peers.

#### Properties

##### isMatch()

> **isMatch**: (`str`: `string`, `patterns`: `string`[]) => `boolean`

Defined in: [matcher.ts:17](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/matcher.ts#L17)

Returns true if `str` matches at least one of the provided glob `patterns`.

###### Parameters

###### str

`string`

###### patterns

`string`[]

###### Returns

`boolean`

## Variables

### basicMatcher

> `const` **basicMatcher**: [`Matcher`](#matcher)

Defined in: [matcher.ts:28](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/matcher.ts#L28)

Minimal homegrown matcher (default).
Supports:

- `*` → matches any single field segment
- `**` → matches any number of nested field segments
- Literal prefix/suffix like `prefix-*`, `*-suffix`
- Backslash escaping for `*` and `.`

## Functions

### loadMatcher()

> **loadMatcher**(`name`: `"micromatch"` \| `"picomatch"`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Matcher`](#matcher)\>

Defined in: [matcher.ts:41](https://github.com/react18-tools/git-json-resolver/blob/a2478ece98639631a4ef55ad595d0d4ff30f30d2/lib/src/matcher.ts#L41)

Attempts to load a named matcher adapter.

#### Parameters

##### name

`"micromatch" | "picomatch"`

`"micromatch"` | `"picomatch"`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Matcher`](#matcher)\>

A Matcher implementation.
