<div align="center">
  <a href="https://markdowndown.vercel.app/">
    <h1>📥</h1>
  </a>
  <h2>Markdown<b>Down</b></h2>
  <p>Convert any webpage to a clean markdown w/ images downloaded.</p>
</div>

## 🚀 Features
- Convert webpage to markdown using [Puppeteer](https://pptr.dev/) and [Turndown](https://github.com/mixmark-io/turndown)
- Clean up content using [Mozilla Readability](https://github.com/mozilla/readability)
- Download images, embed them in markdown, and download as a zip
- Transform final markdown using GPT3/4 step

## 📦 Installation

If you want to run this locally, you can clone the repository and run the following commands:

```bash
npm install
npm run dev
```

By default, this will spawn and use a local puppeteer instance to convert the webpage to markdown. 

If you want to use Browserless, you can set the `BROWSERLESS_KEY` environment variable (in a `.env` or `.env.local` file) to your Browserless API key and it will use that instead.

There is also a cloudflare worker (under `./cfworker` directory) that uses [Browser Rendering API](https://developers.cloudflare.com/browser-rendering/) instead of a puppeteer instance. If you deploy that, you can set the `HTMLFETCHAPI` environment variable to the URL of the cloudflare worker and it will use that instead.