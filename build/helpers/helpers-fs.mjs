import fs from "fs-extra";

/**
 * Write json to file
 * @param {String} dir - The directory to create
 * @param {String} filename - The name of the file to create
 * @param {Object} json - The json to write to the file
 */
export const writeJson = async (dir, filename, json) => {
  try {
    // console.log("writeJson", `${dir}${filename}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await fs.writeFileSync(`${dir}${filename}`, JSON.stringify(json, null, 2));
  } catch (err) {
    console.error(err);
  }
};

/**
 * Prepare the dist folder
 */
export const prepareDist = async () => {
  try {
    // remove dist folder
    await clearDir("dist");

    // prepare dist folders
    await makeDir("dist/json");
    await makeDir("dist/js");
    await makeDir("dist/scss");
    await makeDir("dist/css");

    console.log(); // new line
  } catch (err) {
    console.error(err);
  }
};

/**
 * Create directory
 * @param {String} dir - The directory to create
 */
export const makeDir = async (dir) => {
  try {
    // console.log("makeDir", `${dir}`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * Clear a directory
 * @param {String} dir - The directory to clear
 */
const clearDir = (dir) => {
  // console.log("clearDir", `${dir}`);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
  fs.mkdirSync(dir, { recursive: true });
};

// /**
//  * Copy a directory
//  * @param {String} src - The source directory
//  * @param {String} dest - The destination directory
//  */
// const copyDir = (src, dest) => {
//   // check if the src exists
//   if (!fs.existsSync(src)) {
//     console.log("copyDir", `${src} does not exist`);
//     return;
//   }

//   // check if the dest exists
//   if (!fs.existsSync(dest)) {
//     fs.mkdirSync(dest, { recursive: true });
//   }

//   // copy
//   console.log("codyDir", `${src}`, "to", `${dest}`);
//   fs.copySync(src, dest);
// };
