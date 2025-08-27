---
layout: default
title: Internal
parent: Logger
nav_order: 20
---

# \<internal\>

## Interfaces

### LoggerConfig

Defined in: [logger.ts:8](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/logger.ts#L8)

#### Properties

##### levels?

> `optional` **levels**: \{ `file?`: [`LogLevel`](#loglevel)[]; `stdout?`: [`LogLevel`](#loglevel)[]; \}

Defined in: [logger.ts:12](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/logger.ts#L12)

###### file?

> `optional` **file**: [`LogLevel`](#loglevel)[]

###### stdout?

> `optional` **stdout**: [`LogLevel`](#loglevel)[]

##### logDir?

> `optional` **logDir**: `string`

Defined in: [logger.ts:10](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/logger.ts#L10)

##### mode?

> `optional` **mode**: [`Mode`](#mode-1)

Defined in: [logger.ts:9](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/logger.ts#L9)

##### singleFile?

> `optional` **singleFile**: `boolean`

Defined in: [logger.ts:11](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/logger.ts#L11)

## Type Aliases

### LogLevel

> **LogLevel** = `"info"` \| `"warn"` \| `"error"` \| `"debug"`

Defined in: [logger.ts:4](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/logger.ts#L4)

---

### Mode

> **Mode** = `"memory"` \| `"stream"`

Defined in: [logger.ts:6](https://github.com/react18-tools/git-json-resolver/blob/9629b154d01f34b7a3d21fa5176bbe693744255c/lib/src/logger.ts#L6)
