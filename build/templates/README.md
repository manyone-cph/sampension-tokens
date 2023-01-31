# Sampension Design Tokens

This is design tokens for the Sampension digital design system.

## Usage

On npm, you can find the design tokens as `@manyone/sampensiontokens`.

Add the design tokens and its peer dependencies to your project:

```bash
# using npm
npm install @manyone/sampension-tokens
```

## Docs

To read the documentation, please visit [Sampension Digital Design System Documentation (Storybook)](https://sampension-design-system-react-js.netlify.app/).

## Importing styles

To get all shared tokens:

```css
@import "@manyone/sampension-tokens/scss/shared-map.scss";
```

```js
import * as sharedTokens from "@manyone/sampension-tokens/js/shared.js";
```

We also serve a json file and a scss file without map, but we recommend using the map version:

* `/scss/shared.scss`
* `/json/shared.json`
