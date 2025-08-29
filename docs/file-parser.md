---
layout: default
title: File Parser
nav_order: 6
---

# file-parser

## Interfaces

### ParseConflictOptions

Defined in: [file-parser.ts:20](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L20)

Options for parsing conflicted content.

#### Extends

- [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`Config`](types/README.md#config), `"parsers"`\>

#### Properties

##### filename?

> `optional` **filename**: `string`

Defined in: [file-parser.ts:29](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L29)

Optional filename hint to prioritize parser choice.
Example:

- `config.yaml` → try `yaml` first.
- `data.toml` → try `toml` first.

If extension is unknown, falls back to `parsers` or `"json"`.

##### parsers?

> `optional` **parsers**: [`SupportedParsers`](types/README.md#supportedparsers) \| `"auto"` \| [`SupportedParsers`](types/README.md#supportedparsers)[]

Defined in: [types.ts:231](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/types.ts#L231)

Parsers to attempt, in order:

- A single parser (`"json"`, `"yaml"`, custom function, etc.).
- An array of parsers (e.g. `["yaml", "json5"]`).

Defaults to `"json"`.

###### Inherited from

`Pick.parsers`

---

### ParsedConflict\<T\>

Defined in: [file-parser.ts:8](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L8)

Represents a parsed conflict from a file with `ours` and `theirs` versions.

#### Type Parameters

##### T

`T` = `unknown`

The type of the parsed content.

#### Properties

##### format

> **format**: `string`

Defined in: [file-parser.ts:14](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L14)

Format used to parse the content (`json`, `yaml`, `toml`, `xml`, or `custom`).

##### ours

> **ours**: `T`

Defined in: [file-parser.ts:10](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L10)

Parsed content from the "ours" side of the conflict.

##### theirs

> **theirs**: `T`

Defined in: [file-parser.ts:12](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L12)

Parsed content from the "theirs" side of the conflict.

## Functions

### normalizeParsers()

> **normalizeParsers**(`options`: [`ParseConflictOptions`](#parseconflictoptions)): [`SupportedParsers`](types/README.md#supportedparsers)[]

Defined in: [file-parser.ts:120](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L120)

Normalize parsers based on filename + options.

#### Parameters

##### options

[`ParseConflictOptions`](#parseconflictoptions)

#### Returns

[`SupportedParsers`](types/README.md#supportedparsers)[]

---

### parseConflictContent()

> **parseConflictContent**\<`T`\>(`content`: `string`, `options`: [`ParseConflictOptions`](#parseconflictoptions)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`ParsedConflict`](#parsedconflict)\<`T`\>\>

Defined in: [file-parser.ts:49](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L49)

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

---

### parseFormat()

> **parseFormat**(`parser`: `"json"` \| `"json5"` \| `"yaml"` \| `"toml"` \| `"xml"`, `raw`: `string`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`unknown`\>

Defined in: [file-parser.ts:159](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L159)

Internal parser dispatcher for supported formats.

#### Parameters

##### parser

`"json"` | `"json5"` | `"yaml"` | `"toml"` | `"xml"`

##### raw

`string`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`unknown`\>

---

### runParser()

> **runParser**(`raw`: `string`, `parsers`: [`SupportedParsers`](types/README.md#supportedparsers)[]): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\[`unknown`, [`SupportedParsers`](types/README.md#supportedparsers)\]\>

Defined in: [file-parser.ts:141](https://github.com/react18-tools/git-json-resolver/blob/d66fea6d97a1504766ed9007635bb4e3c057eb5c/lib/src/file-parser.ts#L141)

Internal helper to try parsers in order.

#### Parameters

##### raw

`string`

##### parsers

[`SupportedParsers`](types/README.md#supportedparsers)[]

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\[`unknown`, [`SupportedParsers`](types/README.md#supportedparsers)\]\>
