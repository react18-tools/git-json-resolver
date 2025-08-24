# Git Json Resolver <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/react18-tools/git-json-resolver/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/git-json-resolver/actions/workflows/test.yml)
[![Maintainability](https://qlty.sh/gh/react18-tools/projects/git-json-resolver/maintainability.svg)](https://qlty.sh/gh/react18-tools/projects/git-json-resolver)
[![codecov](https://codecov.io/gh/react18-tools/git-json-resolver/graph/badge.svg)](https://codecov.io/gh/react18-tools/git-json-resolver)
[![Version](https://img.shields.io/npm/v/git-json-resolver.svg?colorB=green)](https://www.npmjs.com/package/git-json-resolver)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/git-json-resolver.svg)](https://www.npmjs.com/package/git-json-resolver)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/git-json-resolver)

Git Json Resolver is a comprehensive library designed to unlock the full potential of React 18 server components. It provides customizable loading animation components and a fullscreen loader container, seamlessly integrating with React and Next.js.

✅ Fully Treeshakable (import from `git-json-resolver/client/loader-container`)

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with [Typedoc](https://react18-tools.github.io/git-json-resolver) ([Docs](https://react18-tools.github.io/git-json-resolver))

✅ Examples for Next.js, and Vite

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Star [this repository](https://github.com/react18-tools/git-json-resolver) and share it with your friends.

## Getting Started

### Installation

```bash
pnpm add git-json-resolver
```

**_or_**

```bash
npm install git-json-resolver
```

**_or_**

```bash
yarn add git-json-resolver
```

## Want Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/git-json-resolver-lite)](https://www.npmjs.com/package/git-json-resolver-lite) [![Version](https://img.shields.io/npm/v/git-json-resolver-lite.svg?colorB=green)](https://www.npmjs.com/package/git-json-resolver-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/git-json-resolver-lite.svg)](https://www.npmjs.com/package/git-json-resolver-lite)

```bash
pnpm add git-json-resolver-lite
```

**or**

```bash
npm install git-json-resolver-lite
```

**or**

```bash
yarn add git-json-resolver-lite
```

> You need `r18gs` as a peer-dependency

### Import Styles

You can import styles globally or within specific components.

```css
/* globals.css */
@import "git-json-resolver/dist";
```

```tsx
// layout.tsx
import "git-json-resolver/dist/index.css";
```

For selective imports:

```css
/* globals.css */
@import "git-json-resolver/dist/client"; /** required if you are using LoaderContainer */
@import "git-json-resolver/dist/server/bars/bars1";
```

### Usage

Using loaders is straightforward.

```tsx
import { Bars1 } from "git-json-resolver/dist/server/bars/bars1";

export default function MyComponent() {
  return someCondition ? <Bars1 /> : <>Something else...</>;
}
```

For detailed API and options, refer to [the API documentation](https://react18-tools.github.io/git-json-resolver).

**Using LoaderContainer**

`LoaderContainer` is a fullscreen component. You can add this component directly in your layout and then use `useLoader` hook to toggle its visibility.

```tsx
// layout.tsx
<LoaderContainer />
	 ...
```

```tsx
// some other page or component
import { useLoader } from "git-json-resolver/dist/hooks";

export default MyComponent() {
	const { setLoading } = useLoader();
	useCallback(()=>{
		setLoading(true);
		...do some work
		setLoading(false);
	}, [])
	...
}
```

## License

This library is licensed under the MPL-2.0 open-source license.



> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
