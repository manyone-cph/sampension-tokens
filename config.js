module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    scss: {
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
      ],
    },
  },
};
