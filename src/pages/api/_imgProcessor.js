import fs from "fs";
import path from "path";
import pReplace from "string-replace-async";
import crypto from "crypto";
function sha1(str) {
  const hash = crypto.createHash("sha1");
  hash.update(str);
  return hash.digest("hex");
}

export async function processMarkdownWithImages(filePath, imgDirName, imagesBasePathOverride) {
  console.log(`Processing: ${filePath}`);
    const content = fs.readFileSync(filePath, "utf8");
    const { dir: fileDir } = path.parse(filePath);
    const imagesDir = `${fileDir || "."}/${imgDirName}`;
    try {
      fs.mkdirSync(imagesDir);
    } catch (e) {
      // It's okay if the directory already exists
      if (e.code === "EEXIST") {
      } else {
        console.log(e);
        process.exit(1);
      }
    }

    const transformed = await pReplace(
      content,
      /!\[[^\]]*\]\(([^)]*)\)/g,
      async (match, url, ...rest) => {
        if (!/^http/.test(url)) {
          // ignore local images
          return match;
        }
        const imgName = `${sha1(url)}${path.extname(url)}`
        const destImagePath = `${imagesDir}/${imgName}`;
        if (await checkFileExists(destImagePath)) {
          console.log(`Skipping: ${url} (already exists)`);
          if (imagesBasePathOverride){
            return match.replace(url, `${imagesBasePathOverride}${imgName}`)
          }
          return match.replace(url, `./${path.relative(fileDir, destImagePath)}`);
        }
        let res;
        try{
          res = await fetch(url);
        }
        catch(e){
          console.log(e)
          throw e;
        }
        const contentType = res.headers.get("content-type");
        // const extension = contentType.split("/")[1];
        console.log(`Downloading: ${url} to ${destImagePath}`);
        const buffer = await res.arrayBuffer();

        fs.writeFileSync(destImagePath, Buffer.from(buffer), "binary");

        // const dest = fs.createWriteStream(destImagePath);
        // await res.body.pipe(dest);
        // await new Promise((res, rej) => {
        //   dest.on("finish", res);
        // });
        if (imagesBasePathOverride){
          return match.replace(url, `${imagesBasePathOverride}${imgName}`)
        }
        return match.replace(url, `./${path.relative(fileDir, destImagePath)}`);
      }
    );
    fs.writeFileSync(filePath, transformed, "utf8");
}

async function checkFileExists(file) {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}