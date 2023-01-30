# figma-tokens 

This example illustrates how you can transform your tokens stored on Figma Tokens (with GitHub sync enabled) to be automatically transformed with token-transformer and Style Dictionary.

Change your tokens in `tokens.json` (either directly or with the Figma Tokens plugin in Figma). The GitHub action will automatically generate tokens to the `tokens/` directory that can then be read by Style Dictionary, which will output tokens to the format you defined in `config.json`

## Generate tokens

1. `nvm use` to switch to the correct node version
2. `npm install` to install dependencies
3. `npm run build` to generate tokens

## 🚀 Release

To release a new version, follow these steps:

1. Commit your changes to `main` branch.
2. A new version will automatically be released using `semantic-release` in a Github Action.

### All commands

Here's a breakdown of the commands we have:

* `clean:token-transformer` - remove the `tokens` directory
* `clean:style-dictionary` - remove the `dist` directory
* `clean` - run both `clean:token-transformer` and `clean:style-dictionary`
* `generate-tokens:shared` - generate a json file for the *shared* tokens
* `generate-styles` - run the `build-shared.js` script to generate the `dist` directory which contains the scss and js files that can be used in other projects
* `build` - clean folders, then generate the tokens and styles
