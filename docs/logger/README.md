---
layout: default
title: README
parent: Logger
nav_order: 21
---

# logger

## Modules

- [\<internal\>](-internal-.md)

## Variables

### globalLogger

> `const` **globalLogger**: \{ `debug`: (`fileId`: `string`, `msg`: `string`) => `void`; `error`: (`fileId`: `string`, `msg`: `string`) => `void`; `flush`: () => `void`; `info`: (`fileId`: `string`, `msg`: `string`) => `void`; `warn`: (`fileId`: `string`, `msg`: `string`) => `void`; \}

Defined in: [logger.ts:91](https://github.com/react18-tools/git-json-resolver/blob/c32c446f3456c8b10ea1a76708d6e28d4435684a/lib/src/logger.ts#L91)

#### Type Declaration

##### debug()

> **debug**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

##### error()

> **error**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

##### flush()

> **flush**: () => `void`

###### Returns

`void`

##### info()

> **info**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

##### warn()

> **warn**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

## Functions

### createLogger()

> **createLogger**(`config`: [`LoggerConfig`](-internal-.md#loggerconfig)): \{ `debug`: (`fileId`: `string`, `msg`: `string`) => `void`; `error`: (`fileId`: `string`, `msg`: `string`) => `void`; `flush`: () => `void`; `info`: (`fileId`: `string`, `msg`: `string`) => `void`; `warn`: (`fileId`: `string`, `msg`: `string`) => `void`; \}

Defined in: [logger.ts:24](https://github.com/react18-tools/git-json-resolver/blob/c32c446f3456c8b10ea1a76708d6e28d4435684a/lib/src/logger.ts#L24)

#### Parameters

##### config

[`LoggerConfig`](-internal-.md#loggerconfig) = `{}`

#### Returns

\{ `debug`: (`fileId`: `string`, `msg`: `string`) => `void`; `error`: (`fileId`: `string`, `msg`: `string`) => `void`; `flush`: () => `void`; `info`: (`fileId`: `string`, `msg`: `string`) => `void`; `warn`: (`fileId`: `string`, `msg`: `string`) => `void`; \}

##### debug()

> **debug**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

##### error()

> **error**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

##### flush()

> **flush**: () => `void`

###### Returns

`void`

##### info()

> **info**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`

##### warn()

> **warn**: (`fileId`: `string`, `msg`: `string`) => `void`

###### Parameters

###### fileId

`string`

###### msg

`string`

###### Returns

`void`
