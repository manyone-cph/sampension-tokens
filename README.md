# Sampension Design Tokens

Transforming tokens from Figma Tokens Studio to json, js and scss files.

Change your tokens in `tokens.json` (either directly or with the Figma Tokens plugin in Figma). The GitHub action will automatically generate tokens to the `dist/json` directory that can then be read by Style Dictionary, which will output tokens to the format you define in `style-dictionary.mjs`

## Generate tokens

1. `nvm use` to switch to the correct node version
2. `npm install` to install dependencies
3. `npm run build` to generate tokens

### Generate new theme tokens

To add a new theme go to `token.config.mjs` and list which sets to include in the new theme under `tokenSets`.

NB: The *shared* token set is mandatory.

```js
// example
"theme-dotcom": ["dotcom/semantic/typography", "dotcom/semantic/color"],
"theme-subbrand-a": ["subbrand-a/semantic/typography", "subbrand-a/semantic/color"],
```

### 🏃‍♀️ npm scripts

* `clean` - remove the `dist` directory
* `build-json:shared` - generate a json file for the *shared* tokens
* `build-js-scss:shared` - generate js and scss files for all tokens
* `build` - clean folders, then generate the tokens as json, js and scss

## 👷‍♀️ Workflow

* `tokens`-branch is used by the designers in the Figma Tokens plugin to pull and push tokens
* `main`-branch is used by the developers to generate the tokens npm package

When a designer is happy with their token changes they should make a pull request from `tokens` to `main` - if needed they should ask a developer for an introduction to pull requests.

## 🚀 Release

To release a new version, follow these steps:

1. Commit your changes to `main` branch - use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
2. A new version will automatically be released using `semantic-release` in a Github Action and published to npm.

## 👋 Contact

This project was set up by:

* Caroline Hansen: [caroline.hansen@manyone.com](mailto:caroline.hansen@manyone.com)
* Lau Rasmussen: [lau.rasmussen@manyone.com](mailto:lau.rasmussen@manyone.com)
