import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("🟣 Update package version in dist");

// take package version from package.json and copy it to dist/package.json
const packageJson = fs.readJsonSync(path.resolve(__dirname, "../package.json"));
const packageVersion = packageJson.version;
console.log("🟣 New version: " + packageVersion);
const distPackageJson = fs.readJsonSync(path.resolve(__dirname, "../dist/package.json"));
distPackageJson.version = packageVersion;
fs.writeJsonSync(path.resolve(__dirname, "../dist/package.json"), distPackageJson, { spaces: 2 });
