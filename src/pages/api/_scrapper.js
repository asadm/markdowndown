// Import the necessary modules using ES6 import syntax
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';
import { processMarkdownWithImages } from './_imgProcessor';
import fs from 'fs';
import { runGPT } from './_gpt';
import Showdown from 'showdown';

const gptModel = 'gpt-3.5-turbo-0125';
const gptModelBig = 'gpt-4-turbo-2024-04-09'
const PUPPETEERREMOTEURL = `https://markdownworker.asadmemon.workers.dev/?url=`;

// Define the function using ES6 arrow function syntax
const fetchCleanMarkdownFromUrl = async (url, filePath, fetchImages = false, imgDirName = "images", imagesBasePathOverride = undefined, removeNonContent = true, applyGpt="", bigModel = false) => {
  try {
    // Launch Puppeteer browser instance
    console.log('Launching Puppeteer browser instance...');
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();

    // // Navigate to the provided URL
    // await page.goto(url, { waitUntil: 'networkidle0' });

    // // Get the page content
    // console.log('Fetching page content...');
    // const data = await page.content();

    // fetch from remote
    const resp = await fetch(`${PUPPETEERREMOTEURL}${url}`);
    if (!resp.ok){
      throw new Error(`Failed to fetch ${url}`);
    }
    const data = await resp.text();
    // Use JSDOM to parse the HTML content
    const doc = new JSDOM(data, { url });

    // Use Readability to extract the main content of the page
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    // Convert the main content HTML to Markdown
    const turndownService = new TurndownService();
    let markdown = turndownService.turndown(removeNonContent?`<h1>${article.title}</h1>${article.content}`:data);
    
    fs.writeFileSync(filePath, markdown, 'utf8');
    if (!fetchImages){
      return markdown;
    }
    
    // move images to local
    console.log("Moving images to local...");
    await processMarkdownWithImages(filePath, imgDirName, imagesBasePathOverride);
    // Apply GPT if requested
    if (applyGpt){
      const curMarkdown = fs.readFileSync(filePath, "utf8");
      console.log("Applying GPT...");
      const instructions = applyGpt
      const gptResponse = await runGPT(bigModel?gptModelBig:gptModel, curMarkdown, instructions);
      markdown = gptResponse.content || markdown;
      fs.writeFileSync(filePath, markdown, 'utf8');
      // fs.writeFileSync(filePath.replace(".md", ".gpt.json"), JSON.stringify(gptResponse.changes), 'utf8');
    }

    // also save the markdown to html
    const converter = new Showdown.Converter();
    const html = converter.makeHtml(markdown);
    fs.writeFileSync(filePath.replace(".md", ".html"), html, 'utf8');
  } catch (error) {
    console.error(`Error fetching clean markdown from URL: ${error.message}`);
    throw error;
  }
};

// Export the function as a default export
export default fetchCleanMarkdownFromUrl;
