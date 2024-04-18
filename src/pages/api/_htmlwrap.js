// as suggested by https://twitter.com/scottgallant
export function wrapInStyledHtml(content) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
    </head>
    <body>
      <article class="prose lg:prose-xl mx-auto py-10">
        ${content}
      </article>
    </body>
  </html>`;
}
