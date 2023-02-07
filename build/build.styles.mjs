import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { generateStyles } from "../style-dictionary.mjs";
import config from "../token.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function init() {
  // build styles
  Object.entries(config.tokenSets).forEach(async ([setName, set]) => {
    console.log(`\n🟣 Generating set: ${setName}`);
    generateStyles(`dist/json/${setName}.json`, setName);
    console.log(); // new line
  });

  // create package.json file for the package
  const packageJson = fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8");
  const packageJsonParsed = JSON.parse(packageJson);
  const newPackageJsonTemplate = fs.readFileSync(path.resolve(__dirname, "./templates/package.json"), "utf8");
  const newPackageJsonParsed = JSON.parse(newPackageJsonTemplate);

  // update dependency versions to match the main package.json
  if (newPackageJsonParsed.dependencies) {
    const dependencies = Object.keys(newPackageJsonParsed.dependencies);
    dependencies.forEach((packageName) => {
      const version = packageJsonParsed.dependencies[packageName];
      newPackageJsonParsed.dependencies[packageName] = version;
    });
  }
  fs.writeFileSync(path.resolve(__dirname, "../dist/package.json"), JSON.stringify(newPackageJsonParsed, null, 2));

  // create readme.md file for the package
  fs.copyFileSync(path.resolve(__dirname, "./templates/README.md"), path.resolve(__dirname, "../dist/README.md"));
}

init();
