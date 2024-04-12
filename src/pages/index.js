import { Homepage } from "@/components/homepage";
import Head from 'next/head'

const metadata = {
  title: 'MarkdownDown',
  openGraph: {
    title: 'MarkdownDown',
    description: 'Convert any webpage to a clean markdown w/ images downloaded.',
    url: 'https://markdowndown.vercel.app/',
    siteName: 'MarkdownDown',
    images: [
      {
        url: 'https://markdowndown.vercel.app/og.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
}
export default function Home() {
  return (
    <>
    <Head>
      <title>{metadata.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={metadata.openGraph.title} />
      <meta property="og:description" content={metadata.openGraph.description} />
      <meta property="og:url" content={metadata.openGraph.url} />
      <meta property="og:site_name" content={metadata.openGraph.siteName} />
      <meta property="og:type" content={metadata.openGraph.type} />
      <meta property="og:locale" content={metadata.openGraph.locale} />
      <meta property="og:image" content={metadata.openGraph.images[0].url} />
      <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
      <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
    </Head>
    <Homepage />
    </>
  );
}
