// build.js
import StyleDictionary from "style-dictionary";

// Convert to rem
const cleanRemSize = (val) => {
  // if the value is a string, remove the px and convert to rem
  if (typeof val == "string" && val.includes("px")) {
    val = Number(val.replace("px", ""));
  }

  if (typeof val == "number") {
    return val / 16 + "rem";
  } else {
    return val;
  }
};

// size/toREM -> Collection that needs converting to rem
StyleDictionary.registerTransform({
  name: "size/toREM",
  type: "value",
  matcher: function (prop) {
    return (
      prop.type === "fontSizes" ||
      prop.type === "lineHeights" ||
      prop.type === "lineHeight" ||
      prop.type === "spacing" ||
      prop.type === "sizing" ||
      prop.type === "dimension" ||
      prop.type === "borderRadius" ||
      (prop.path.includes("typography") && prop.path.includes("fontSize")) ||
      (prop.path.includes("typography") && prop.path.includes("lineHeights"))
    );
  },
  transformer: function (prop) {
    return cleanRemSize(prop.value);
  },
});

// border/toShorthand -> Convert border object to border shorthand
StyleDictionary.registerTransform({
  name: "border/toShorthand",
  type: "value",
  matcher: function (prop) {
    return prop.type === "border";
  },
  transformer: function (prop) {
    return `${cleanRemSize(prop.value.width)} ${prop.value.style} ${prop.value.color}`;
  },
});

// fontWeights/toNumber -> Convert fontWeights to numbers
StyleDictionary.registerTransform({
  name: "fontWeights/toNumber",
  type: "value",
  matcher: function (prop) {
    return prop.type === "fontWeights";
  },
  transformer: function (prop) {
    // We could make this more robust by checking for all possible font weight values from figma
    switch (prop.value.toLowerCase()) {
      case "thin":
        return 100;
      case "extralight":
        return 200;
      case "light":
        return 300;
      case "regular":
        return 400;
      case "medium":
        return 500;
      case "bold":
        return 700;
      case "black":
        return 700;
      default:
        return 400;
    }
  },
});

// Convert fontFamily to css variable
StyleDictionary.registerTransform({
  name: "fontFamily/toCSSVariable",
  type: "value",
  matcher: function (prop) {
    return prop.type === "fontFamilies";
  },
  transformer: function (prop) {
    return `var(--ff-${prop.value.toLowerCase()})`;
  },
});

const transforms = [
  "name/cti/kebab",
  "size/toREM",
  "border/toShorthand",
  "fontWeights/toNumber",
  "fontFamily/toCSSVariable",
];

export const generateStyles = async (jsonPath, setName) => {
  const styleDictionaryConfig = StyleDictionary.extend({
    source: [jsonPath],
    platforms: {
      js: {
        transformGroup: "js",
        buildPath: "dist/js/",
        files: [
          {
            destination: "shared.js",
            destination: `${setName}.js`,
            format: "javascript/es6",
          },
        ],
      },
      css: {
        transformGroup: "css",
        buildPath: "dist/css/",
        transforms,
        files: [
          {
            destination: `${setName}.css`,
            format: "css/variables",
          },
        ],
      },
      scss: {
        transformGroup: "scss",
        buildPath: "dist/scss/",
        transforms,
        files: [
          {
            destination: `${setName}.scss`,
            format: "scss/variables",
          },
          {
            destination: `${setName}-map.scss`,
            format: "scss/map-deep",
            mapName: `tokens-${setName}`,
          },
        ],
      },
      "scss-extend": {
        transformGroup: "css",
        buildPath: "dist/scss/",
        transforms,
        options: {
          selector: `%tokens-${setName}`,
        },
        files: [
          {
            destination: `${setName}-extend.scss`,
            format: "css/variables",
          },
        ],
      },
    },
  });

  await styleDictionaryConfig.buildAllPlatforms();
};
