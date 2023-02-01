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

const filePaths = {
  dotcom: "dist/json/dotcom.json",
};

const customStyleDictionary = StyleDictionary.extend({
  source: ["dist/json/*.json"],
  platforms: {
    extend: {
      transformGroup: "css",
      buildPath: "dist/css/",
      options: {
        selector: "%theme-dotcom",
      },
      transforms: [
        "name/cti/kebab",
        "size/toREM",
        "border/toShorthand",
        "fontWeights/toNumber",
        "fontFamily/toCSSVariable",
      ],
      files: [
        {
          destination: "dotcom.scss",
          format: "css/variables",
          filter: (token) => {
            // only include: dotcom
            return token.filePath === filePaths.dotcom;
          },
        },
      ],
    },
    variables: {
      transformGroup: "css",
      buildPath: "dist/css/",
      transforms: [
        "name/cti/kebab",
        "size/toREM",
        "border/toShorthand",
        "fontWeights/toNumber",
        "fontFamily/toCSSVariable",
      ],
      files: [
        {
          destination: "dotcom.css",
          format: "css/variables",
          filter: (token) => {
            // only include: dotcom
            return token.filePath === filePaths.dotcom;
          },
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      buildPath: "dist/scss/",
      transforms: [
        "name/cti/kebab",
        "size/toREM",
        "border/toShorthand",
        "fontWeights/toNumber",
        "fontFamily/toCSSVariable",
      ],
      files: [
        {
          destination: "dotcom.scss",
          format: "scss/variables",
          filter: (token) => {
            // only include: dotcom
            return token.filePath === filePaths.dotcom;
          },
        },
        {
          destination: "dotcom-map.scss",
          format: "scss/map-deep",
          filter: (token) => {
            // only include: dotcom
            return token.filePath === filePaths.dotcom;
          },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "dist/js/",
      files: [
        {
          destination: "dotcom.js",
          format: "javascript/es6",
          filter: (token) => {
            // only include: dotcom
            return token.filePath === filePaths.dotcom;
          },
        },
      ],
    },
  },
});

export default customStyleDictionary;
