// build.js
const StyleDictionary = require("style-dictionary");

const cleanRemSize = (val) => {
  if (typeof val == "number") {
    return val / 16 + "rem";
  } else {
    return val;
  }
};
// Convert to rem
StyleDictionary.registerTransform({
  name: "size/toREM",
  type: "value",
  matcher: function (prop) {
    console.log(prop);
    return (
      prop.type === "fontSizes" ||
      prop.type === "spacing" ||
      prop.type === "sizing" ||
      (prop.path.includes("typography") && prop.path.includes("fontSize"))
    );
  },
  transformer: function (prop) {
    return cleanRemSize(prop.value);
  },
});
// This code takes the tokens from the tokens/shared.json folder
// SCSS file with a _core.scss file and a JS file with a core.js file.

const filePaths = {
  shared: "tokens/shared.json"
};

const myStyleDictionary = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "./dist/scss/",
      transforms: ["name/cti/kebab", "size/toREM"],
      files: [
        {
          destination: "_shared.scss",
          format: "scss/variables",
          filter: (token) => {
            // only include: shared
            return token.filePath === filePaths.shared;
          },
        },
        {
          destination: "_shared_map.scss",
          format: "scss/map-deep",
          filter: (token) => {
            // only include: shared
            return token.filePath === filePaths.shared;
          },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "./dist/js/",
      files: [
        {
          destination: "_shared.js",
          format: "javascript/es6",
          filter: (token) => {
            // only include: shared
            return token.filePath === filePaths.shared;
          },
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
