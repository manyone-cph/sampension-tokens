import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import styleDictionary from "../style-dictionary.mjs";
import styleDictionary2 from "../style-dictionary-dotcom.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function init() {
  // build styles
  await styleDictionary.buildAllPlatforms();
  await styleDictionary2.buildAllPlatforms();

  // create package.json file for the package
  const packageJson = fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8");
  const packageJsonParsed = JSON.parse(packageJson);
  const packageJsonTemplate = fs.readFileSync(path.resolve(__dirname, "./templates/package.json"), "utf8");
  const newPackageJson = packageJsonTemplate.replace(/__VERSION__/g, packageJsonParsed.version);
  const newPackageJsonParsed = JSON.parse(newPackageJson);

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
