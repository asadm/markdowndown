/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import puppeteer from "@cloudflare/puppeteer";

let browser;
export default {
	async fetch(request, env, ctx) {
		const { searchParams } = new URL(request.url);
		let url = searchParams.get("url");
		if (!url) {
			return new Response("Missing url parameter", { status: 400 });
		}
		url = new URL(url).toString(); // normalize
		console.log(`Fetching ${url}`);
		const browser = await puppeteer.launch(env.MYBROWSER);
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle0' });
		const data = await page.content();
		await browser.close();
		// send as txt
		return new Response(data, {
			headers: {
				"content-type": "text/plain",
			},
		});

	},
};
