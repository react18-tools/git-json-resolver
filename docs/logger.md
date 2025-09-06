---
layout: default
title: Logger
nav_order: 6
---

# logger

## Functions

### createLogger()

> **createLogger**(`config`: [`LoggerConfig`](types/README.md#loggerconfig-1), `debug?`: `boolean`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `debug`: (`fileId`: `string`, `msg`: `string`) => `void`; `error`: (`fileId`: `string`, `msg`: `string`) => `void`; `flush`: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>; `info`: (`fileId`: `string`, `msg`: `string`) => `void`; `warn`: (`fileId`: `string`, `msg`: `string`) => `void`; \}\>

Defined in: [logger.ts:12](https://github.com/react18-tools/git-json-resolver/blob/bb35490ece54a122e412f67ef51d4b2dbeac2ebb/lib/src/logger.ts#L12)

#### Parameters

##### config

[`LoggerConfig`](types/README.md#loggerconfig-1) = `{}`

##### debug?

`boolean`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `debug`: (`fileId`: `string`, `msg`: `string`) => `void`; `error`: (`fileId`: `string`, `msg`: `string`) => `void`; `flush`: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>; `info`: (`fileId`: `string`, `msg`: `string`) => `void`; `warn`: (`fileId`: `string`, `msg`: `string`) => `void`; \}\>
