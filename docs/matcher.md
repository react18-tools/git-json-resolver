---
layout: default
title: Matcher
nav_order: 7
---

# matcher

## Interfaces

### Matcher

Defined in: [matcher.ts:17](https://github.com/react18-tools/git-json-resolver/blob/1a536885b518aadb4442332b4a0bab3ea438307f/lib/src/matcher.ts#L17)

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

Defined in: [matcher.ts:21](https://github.com/react18-tools/git-json-resolver/blob/1a536885b518aadb4442332b4a0bab3ea438307f/lib/src/matcher.ts#L21)

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

Defined in: [matcher.ts:32](https://github.com/react18-tools/git-json-resolver/blob/1a536885b518aadb4442332b4a0bab3ea438307f/lib/src/matcher.ts#L32)

Minimal homegrown matcher (default).
Supports:

- `*` → matches any single field segment
- `**` → matches any number of nested field segments
- Literal prefix/suffix like `prefix-*`, `*-suffix`
- Backslash escaping for `*` and `.`

---

### ESCAPED_DOT

> `const` **ESCAPED_DOT**: "\u0000" = `"\u0000"`

Defined in: [matcher.ts:2](https://github.com/react18-tools/git-json-resolver/blob/1a536885b518aadb4442332b4a0bab3ea438307f/lib/src/matcher.ts#L2)

Escape sequence for literal dots in field names

---

### ESCAPED_SLASH

> `const` **ESCAPED_SLASH**: "\u0001" = `"\u0001"`

Defined in: [matcher.ts:4](https://github.com/react18-tools/git-json-resolver/blob/1a536885b518aadb4442332b4a0bab3ea438307f/lib/src/matcher.ts#L4)

Escape sequence for literal slashes in field names

## Functions

### loadMatcher()

> **loadMatcher**(`name`: `"micromatch"` \| `"picomatch"`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Matcher`](#matcher)\>

Defined in: [matcher.ts:45](https://github.com/react18-tools/git-json-resolver/blob/1a536885b518aadb4442332b4a0bab3ea438307f/lib/src/matcher.ts#L45)

Attempts to load a named matcher adapter.

#### Parameters

##### name

`"micromatch" | "picomatch"`

`"micromatch"` | `"picomatch"`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Matcher`](#matcher)\>

A Matcher implementation.
