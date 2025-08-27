---
layout: default
title: File Parser
nav_order: 6
---

# file-parser

## Interfaces

### ParseConflictOptions

Defined in: [file-parser.ts:24](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L24)

Options for parsing conflicted content.

#### Properties

##### filename?

> `optional` **filename**: `string`

Defined in: [file-parser.ts:42](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L42)

Optional filename hint to prioritize parser choice.
Example:

- `config.yaml` → try `yaml` first.
- `data.toml` → try `toml` first.

If extension is unknown, falls back to `parsers` or `"json"`.

##### parsers?

> `optional` **parsers**: [`SupportedParsers`](#supportedparsers) \| `"auto"` \| [`SupportedParsers`](#supportedparsers)[]

Defined in: [file-parser.ts:32](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L32)

Parsers to attempt, in order:

- A single parser (`"json"`, `"yaml"`, custom function, etc.).
- An array of parsers (e.g. `["yaml", "json5"]`).

Defaults to `"json"`.

---

### ParsedConflict\<T\>

Defined in: [file-parser.ts:6](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L6)

Represents a parsed conflict from a file with `ours` and `theirs` versions.

#### Type Parameters

##### T

`T` = `unknown`

The type of the parsed content.

#### Properties

##### format

> **format**: `string`

Defined in: [file-parser.ts:12](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L12)

Format used to parse the content (`json`, `yaml`, `toml`, `xml`, or `custom`).

##### ours

> **ours**: `T`

Defined in: [file-parser.ts:8](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L8)

Parsed content from the "ours" side of the conflict.

##### theirs

> **theirs**: `T`

Defined in: [file-parser.ts:10](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L10)

Parsed content from the "theirs" side of the conflict.

## Type Aliases

### Parser

> **Parser** = \{ `name`: `string`; `parser`: (`input`: `string`) => `unknown`; \}

Defined in: [file-parser.ts:16](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L16)

A parser function that takes a raw string and returns parsed content.

#### Properties

##### name

> **name**: `string`

Defined in: [file-parser.ts:16](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L16)

##### parser()

> **parser**: (`input`: `string`) => `unknown`

Defined in: [file-parser.ts:16](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L16)

###### Parameters

###### input

`string`

###### Returns

`unknown`

---

### SupportedParsers

> **SupportedParsers** = `"json"` \| `"json5"` \| `"yaml"` \| `"toml"` \| `"xml"` \| [`Parser`](#parser)

Defined in: [file-parser.ts:19](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L19)

Built-in parser identifiers or a custom parser function.

## Functions

### parseConflictContent()

> **parseConflictContent**\<`T`\>(`content`: `string`, `options`: [`ParseConflictOptions`](#parseconflictoptions)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`ParsedConflict`](#parsedconflict)\<`T`\>\>

Defined in: [file-parser.ts:62](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/file-parser.ts#L62)

Parses a conflicted file's content into separate `ours` and `theirs` objects.

- Preserves non-conflicted lines in both versions.
- Supports JSON, JSON5, YAML, TOML, and XML.
- Lazy-loads optional peer dependencies (`json5`, `yaml`, `toml`, `fast-xml-parser`).
- Parser order is determined by:
  1. `filename` extension hint (if provided).
  2. Explicit `parsers` option.
  3. Default `"json"`.

#### Type Parameters

##### T

`T` = `unknown`

Expected type of parsed content.

#### Parameters

##### content

`string`

Raw file content containing conflict markers.

##### options

[`ParseConflictOptions`](#parseconflictoptions) = `{}`

Parsing options (parsers + filename hint).

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`ParsedConflict`](#parsedconflict)\<`T`\>\>

Parsed conflict with both sides and detected format.

#### Throws

If parsing fails or conflict markers are invalid.
