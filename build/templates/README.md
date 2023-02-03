# Sampension Design Tokens

This is design tokens for the Sampension digital design system.

## Usage

Add the design tokens and its peer dependencies to your project:

```bash
# using npm
npm install @manyone/sampension-tokens
```

## Docs

To read the documentation, please visit [Sampension Digital Design System Documentation (Storybook)](https://sampension-design-system-react-js.netlify.app/).

## Importing styles

```css
/* SCSS */

/* import sass variables and a sass map named $tokens-shared */
@import "@manyone/sampension-tokens/scss/shared-map.scss";

/* import extend named %tokens-shared */
@import "@manyone/sampension-tokens/scss/shared-extend.scss";

/* import sass variables */
@import "@manyone/sampension-tokens/scss/shared.scss";
```

```css
/* CSS */

/* import css variables on :root */
@import "@manyone/sampension-tokens/css/shared.css";
```

```js
// JS

// import all variables as tokensShared
import * as tokensShared from "@manyone/sampension-tokens/js/shared.js";

// import a single variable
import { CoreColorBlue500 } from "@manyone/sampension-tokens/js/shared.js";
```

```js
// JSON

// import all variables as an object
import sharedTokens from "@manyone/sampension-tokens/json/shared.json";
```

### Theme tokens

To use a theme import both the shared and theme tokens:
  
```css
/* example */
@import "@manyone/sampension-tokens/scss/shared-extends.scss";
@import "@manyone/sampension-tokens/scss/theme-dotcom-extend.scss";


:root {
  @extend %tokens-shared;
  @extend %tokens-theme-dotcom;
}

// or

:root {
  @extend %tokens-shared;
}
.theme-dotcom {
  @extend %tokens-theme-dotcom;
}
```
