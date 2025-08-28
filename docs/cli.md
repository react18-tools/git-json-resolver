---
layout: default
title: Cli
nav_order: 2
---

# cli

## Functions

### findGitRoot()

> **findGitRoot**(): `string`

Defined in: [cli.ts:15](https://github.com/react18-tools/git-json-resolver/blob/3e876ce8afe8c9047e8fa1534f0f522eac3b3dd4/lib/src/cli.ts#L15)

Find Git root directory

#### Returns

`string`

---

### initConfig()

> **initConfig**(`targetDir`: `string`): `void`

Defined in: [cli.ts:45](https://github.com/react18-tools/git-json-resolver/blob/3e876ce8afe8c9047e8fa1534f0f522eac3b3dd4/lib/src/cli.ts#L45)

Write a starter config file

#### Parameters

##### targetDir

`string`

#### Returns

`void`

---

### loadConfigFile()

> **loadConfigFile**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\<[`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies), `unknown`\>\>\>

Defined in: [cli.ts:26](https://github.com/react18-tools/git-json-resolver/blob/3e876ce8afe8c9047e8fa1534f0f522eac3b3dd4/lib/src/cli.ts#L26)

Load configuration file (js/ts) from current dir or Git root.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\<[`InbuiltMergeStrategies`](types/README.md#inbuiltmergestrategies), `unknown`\>\>\>

---

### parseArgs()

> **parseArgs**(`argv`: `string`[]): \{ `init?`: `boolean`; `overrides`: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\>; \}

Defined in: [cli.ts:66](https://github.com/react18-tools/git-json-resolver/blob/3e876ce8afe8c9047e8fa1534f0f522eac3b3dd4/lib/src/cli.ts#L66)

CLI argument parser (minimal, no external deps).

#### Parameters

##### argv

`string`[]

#### Returns

\{ `init?`: `boolean`; `overrides`: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\>; \}

##### init?

> `optional` **init**: `boolean`

##### overrides

> **overrides**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Config`](types/README.md#config)\>
