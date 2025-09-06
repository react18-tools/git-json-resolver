---
layout: default
title: Cli
nav_order: 2
---

# cli

## Functions

### findGitRoot()

> **findGitRoot**(): `string`

Defined in: [cli.ts:17](https://github.com/react18-tools/git-json-resolver/blob/bb35490ece54a122e412f67ef51d4b2dbeac2ebb/lib/src/cli.ts#L17)

Find Git root directory

#### Returns

`string`

---

### initConfig()

> **initConfig**(`targetDir`: `string`): `void`

Defined in: [cli.ts:47](https://github.com/react18-tools/git-json-resolver/blob/bb35490ece54a122e412f67ef51d4b2dbeac2ebb/lib/src/cli.ts#L47)

Write a starter config file

#### Parameters

##### targetDir

`string`

#### Returns

`void`

---

### loadConfigFile()

> **loadConfigFile**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\<[`AllStrategies`](types/README.md#allstrategies), `unknown`\>\>\>

Defined in: [cli.ts:28](https://github.com/react18-tools/git-json-resolver/blob/bb35490ece54a122e412f67ef51d4b2dbeac2ebb/lib/src/cli.ts#L28)

Load configuration file (js/ts) from current dir or Git root.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\<[`AllStrategies`](types/README.md#allstrategies), `unknown`\>\>\>

---

### parseArgs()

> **parseArgs**(`argv`: `string`[]): \{ `gitMergeFiles?`: \[`string`, `string`, `string`\]; `init?`: `boolean`; `overrides`: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\>; `restore?`: `string`; \}

Defined in: [cli.ts:68](https://github.com/react18-tools/git-json-resolver/blob/bb35490ece54a122e412f67ef51d4b2dbeac2ebb/lib/src/cli.ts#L68)

CLI argument parser (minimal, no external deps).

#### Parameters

##### argv

`string`[]

#### Returns

\{ `gitMergeFiles?`: \[`string`, `string`, `string`\]; `init?`: `boolean`; `overrides`: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\>; `restore?`: `string`; \}

##### gitMergeFiles?

> `optional` **gitMergeFiles**: \[`string`, `string`, `string`\]

##### init?

> `optional` **init**: `boolean`

##### overrides

> **overrides**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\>

##### restore?

> `optional` **restore**: `string`
