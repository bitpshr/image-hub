<img src="public/favicon.ico?raw=true" width="72px" height="auto" />

**Image Hub** is a browser-based tool for uploading and browsing image files.

[https://image-hub.bitpshr.vercel.app](https://image-hub.bitpshr.vercel.app)

## Table of contents

- [Architecture](#architecture)

  - [TypeScript](#typescript)
  - [React via Next.js](#react-via-nextjs)
  - [SWR](#swr)
  - [RESTful API](#restful-api)
  - [Jest](#jest)
  - [Prettier](#prettier)
  - [ESLint](#eslint)
  - [CSS modules with variables](#css-modules-with-variables)
  - [Dark mode support](#dark-mode-support)
  - [Filesystem storage](#filesystem-storage)
  - [Custom media query hook](#custom-media-query-hook)
  - [Declarative Flex Box component](#declarative-flex-box-component)
  - [Aggressive memoization](#aggressive-memoization)

- [Security](#security)
  - [Server-validated content](#server-validated-content)
  - [Server-validated file size](#server-validated-file-size)
  - [Server-validated file type](#server-validated-file-type)
- [Going forward](#going-forward)
  - [Improved testing](#improved-testing)
  - [Additional breakpoints](#additional-breakpoints)
  - [Upload to a CDN](#upload-to-a-cdn)

## Architecture

### TypeScript

TypeScript was used as the static type checker of choice. Relying on a type system allowed for greater confidence while making cross-cutting changes to APIs like function signatures and component prop interfaces.

### React via Next.js

React was used to power the frontend by way of Vercel's Next.js platform. This mitigated the need for a huge amount of application boilerplate and allowed for easy code sharing between client and server.

### SWR

Vercel's `swr` module was used for data loading in order to provide hook-based entity loading within each component, backed by a robust cache to mitigate unnecessary requests.

### RESTful API

A RESTful `documents` API was provided by way of Vercel serverless functions that's meant to mimic a real-world API for a single entity type. The API is not exhaustive, and only includes the endpoints required for specified application functionality:

- `GET /documents`
- `POST /documents`
- `DELETE /documents/[id]`

### Jest

Jest was used as the core test runner due to its native support for snapshot testing, which is ideal for robustly testing component states. Internally, the `react-test-renderer` package was used to generate component snapshots for comparison, and the `@testing-library/react-hooks` package was used to easily test hooks outside actual components.

### Prettier

Prettier was used to format code uniformly. By relying on an external formatter, developers are able to code in any style they desire and ultimately format their code according to a standard format.

### ESLint

ESLint was used to verify code correctness where possible (e.g. where static analysis is not required.) This mitigates common errors that wouldn't otherwise be caught by the TypeScript compiler.

### CSS modules with variables

CSS modules were used in order to modularize CSS class names through build-time obfuscation. Native CSS variables were used as a means of consolidating all colors and dimensions used throughout the application in a single file. A two-stage variable paradigm was used: a base palette was defined, and then application-specific colors variables were built using this base palette. This allows application colors to be changed by only changing a single variable, instead of all uses of a specific color.

### Dark mode support

Dark mode support is provided by way of native CSS variables, the values of which are changed dynamically using a `@media (prefers-color-scheme: dark)` rule block.

### Filesystem storage

Filesystem storage was used for uploads for simplicity. In a real-world scenario, uploads would be stored using a cloud CDN such as Fastly or S3, and the APIs to deal with these files would be specific to these services as opposed to the filesystem Node APIs currently used.

### Custom media query hook

A custom hook was created to ease the creation of breakpoint-aware components. It internally relies on the context API, and it allows for declarative component prop modifications based on screen size.

### Declarative Flex Box component

A declarative flex box component was created to ease the creation of flex box based layouts across the application. This mitigates a huge amount of CSS rules that would otherwise be required to achieve the required visual structure.

### Aggressive memoization

Callbacks, expensive values, and entire component states were memoized as aggressively as possible using the `React.useCallback`, `React.useMemo`, and `React.memo` APIs. Care was given not to overuse these APIs in cases where the underlying value would never memoize properly.

## Security

### Server-validated content

As a means of mitigating man-in-the-middle attacks and other unwanted content-tampering attack vectors, a client-server hash handshake strategy was used. Specifically, a SHA-256 hash of the uploaded file is computed on the client immediately before being sent to the backing API. The API then independently hashes the file, and if the client and server hashes are not equal, the upload fails. By validating file contents on the server in this manner, both in-flight data tampering and non-client-based API access is prevented..

### Server-validated file size

File size is validated on the server instead of on the client since client form validation can be easily circumvented through runtime script modification.

### Server-validated file type

Similarly, file types are validated on the server instead of on the client since client form validation can be easily circumvented through runtime script modification.

## Going forward

### Improved testing

Jest snapshot testing is provided for key components and for key component states. These tests should be made more robust, and they should use `@testing-library/react` to simulate user interaction to achieve more-exhaustive coverage. Cypress could ultimately be used for end-to-end testing if holistic application verification of specific environments is desired, such as verifying a production deployment.

### Additional breakpoints

The custom `useMedia` hook only defines a single phone-specific breakpoint. More breakpoints (and proper application styling) should be added to support a larger range of screen resolutions.

### Upload to a CDN

Filesystem storage felt sufficient for this demo application, but a cloud CDN should be used to efficiently store and deliver image content to users.
