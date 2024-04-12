// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fetchCleanMarkdownFromUrl from "./_scrapper";
import path from "path";
import os from "os";
import fs from "fs";
import archiver from "archiver";

export default async function handler(req, res) {
  // get url
  let { url, downloadImages, imagesDir, imagesBasePathOverride } = req.query;
  if (!url) {
    res.status(400).send("Missing url parameter");
  }

  if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
  }
  
  // normalize
  // url = new URL(url).toString();
  console.log(`Fetching ${url}`);
  // random tmp folder in tmp directory
  const folder = path.join(os.tmpdir(), Math.random().toString(36).substring(7));
  // create dir if no exist
  try {
    fs.mkdirSync(folder);
  }
  catch(e){
    console.log(e)
  }
  console.log("f", folder)
  const md = await fetchCleanMarkdownFromUrl(url, `${folder}/index.md`, downloadImages === "true", imagesDir || "images", imagesBasePathOverride);
  if (downloadImages === "true"){
    // Set the headers to indicate a file download
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=markdd.zip');

    // Create a zip archive using archiver
    const archive = archiver('zip', {
      zlib: { level: 9 } // Compression level
    });

     // Catch warnings and errors
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      throw err;
    }
  });
  archive.on('error', (err) => {
    throw err;
  });
    // Pipe the archive to the response
    archive.pipe(res);
    archive.directory(folder, false);

    archive.finalize();

    // archive.on('end', () => res.end());


  }
  else{
    res.setHeader("Content-Type", "text/plain");
    res.send(md);
  }
}

// This function can run for a maximum of 30 seconds
export const config = {
  maxDuration: 30,
};