// Import the necessary modules using ES6 import syntax
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';
import { processMarkdownWithImages } from './_imgProcessor';
import fs from 'fs';

const PUPPETEERREMOTEURL = `https://markdownworker.asadmemon.workers.dev/?url=`;

// Define the function using ES6 arrow function syntax
const fetchCleanMarkdownFromUrl = async (url, filePath, fetchImages = false, imgDirName = "images", imagesBasePathOverride = undefined) => {
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
    const markdown = turndownService.turndown(article.content);

    // Close the Puppeteer browser instance
    // await browser.close();

    
    
    fs.writeFileSync(filePath, markdown, 'utf8');
    if (!fetchImages){
      return markdown;
    }
    
    // move images to local
    console.log("Moving images to local...");
    await processMarkdownWithImages(filePath, imgDirName, imagesBasePathOverride);
  } catch (error) {
    console.error(`Error fetching clean markdown from URL: ${error.message}`);
    throw error;
  }
};

// Export the function as a default export
export default fetchCleanMarkdownFromUrl;
