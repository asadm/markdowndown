import puppeteer from "@cloudflare/puppeteer";

export default {
	async fetch(request, env) {

		let id = env.BROWSER.idFromName("browser");
		let obj = env.BROWSER.get(id);
		// Send a request to the Durable Object (defined below), then await its response.
		let resp = await obj.fetch(request.url);

		return resp;
	}
};

const KEEP_BROWSER_ALIVE_IN_SECONDS = 30;
export class Browser {
	constructor(state, env) {
		this.state = state;
		this.env = env;
		this.keptAliveInSeconds = 0;
		this.storage = this.state.storage;
	}

	async fetch(request, env, ctx) {
		//if there's a browser session open, re-use it
		if (!this.browser || !this.browser.isConnected()) {
			console.log(`Browser DO: Starting new instance`);
			try {
				this.browser = await puppeteer.launch(this.env.MYBROWSER);
			} catch (e) {
				console.log(`Browser DO: Could not start browser instance. Error: ${e}`);
			}
		}
		const { searchParams } = new URL(request.url);
		let url = searchParams.get("url");
		if (!url) {
			return new Response("Missing url parameter", { status: 400 });
		}
		url = new URL(url).toString(); // normalize
		console.log(`Fetching ${url}`);
		const page = await this.browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle0' });
		const data = await page.content();
		// Close tab when there is no more work to be done on the page
		await page.close();
		// Reset keptAlive after each call to the DO
		this.keptAliveInSeconds = 0;
		// set the first alarm to keep DO alive
		let currentAlarm = await this.storage.getAlarm();
		if (currentAlarm == null) {
			console.log(`Browser DO: setting alarm`);
			const TEN_SECONDS = 10 * 1000;
			await this.storage.setAlarm(Date.now() + TEN_SECONDS);
		}
		// send as txt
		return new Response(data, {
			headers: {
				"content-type": "text/plain",
			},
		});

	}
	async alarm() {
		this.keptAliveInSeconds += 10;

		// Extend browser DO life
		if (this.keptAliveInSeconds < KEEP_BROWSER_ALIVE_IN_SECONDS) {
			console.log(`Browser DO: has been kept alive for ${this.keptAliveInSeconds} seconds. Extending lifespan.`);
			await this.storage.setAlarm(Date.now() + 10 * 1000);
			// You could ensure the ws connection is kept alive by requesting something
			// or just let it close automatically when there  is no work to be done
			// for example, `await this.browser.version()`
		} else {
			console.log(`Browser DO: exceeded life of ${KEEP_BROWSER_ALIVE_IN_SECONDS}s.`);
			if (this.browser) {
				console.log(`Closing browser.`);
				await this.browser.close();
			}
		}
	}
}