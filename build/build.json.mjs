import { transformTokens } from "token-transformer";
import { prepareDist, writeJson } from "./helpers/helpers-fs.mjs";
import rawTokens from "../tokens.json" assert { type: "json" };
import config from "../config.mjs";

await prepareDist();

const sets = config.tokenSets;
const transformerOptions = {
  expandTypography: true,
  expandShadow: true,
  expandComposition: true,
  preserveRawValue: false,
  throwErrorWhenNotResolved: true,
  resolveReferences: true,
};

// loop through and build all sets
Object.entries(sets).forEach(async ([setName, set]) => {
  console.log(`🟣 Building set as JSON: ${setName}`);

  // list of token sets to include and exclude
  let includes = [...sets.shared];
  const excludes = [];
  if (setName !== "shared") {
    includes.push(...set);
    excludes.push(...sets.shared);
  }

  // transform tokens
  const resolved = transformTokens(rawTokens, includes, excludes, transformerOptions);

  // write to file
  await writeJson("dist/json/", `${setName}.json`, resolved);
});

console.log(); // new line
console.log("🟣 Finished building JSON files\n");
