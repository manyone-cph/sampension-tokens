import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// get new package version
const packageJson = fs.readJsonSync(path.resolve(__dirname, "../package.json"));
const packageVersion = packageJson.version;

console.log("🟣 Update package version in dist: " + packageVersion);

// update version in dist/package.json to match the main package.json
const distPackageJson = fs.readJsonSync(path.resolve(__dirname, "../dist/package.json"));
distPackageJson.version = packageVersion;
fs.writeJsonSync(path.resolve(__dirname, "../dist/package.json"), distPackageJson, { spaces: 2 });
