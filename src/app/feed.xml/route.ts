import { getAllPosts } from "@/lib/blog";

// Posts are file-based and only change on deploy, so prerender the feed at build
// time and serve it from the CDN instead of re-rendering per request.
export const dynamic = "force-static";

const SITE = "https://speakarizona.com";

// Escape the five XML predefined entities so post titles/excerpts with &, <, >,
// or quotes can't produce a malformed feed.
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Blog RSS 2.0 feed built from the same post source as the site. Gives readers,
// aggregators, and crawlers a clean ingestion path for the /news posts.
export function GET() {
  const posts = getAllPosts();
  const lastBuild = posts[0]?.date
    ? new Date(posts[0].date).toUTCString()
    : new Date(0).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE}/news/${post.slug}/`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.tag)}</category>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Speak Arizona | Public Speaking &amp; Leadership News</title>
    <link>${SITE}/news/</link>
    <description>Tips, stories, and strategies on public speaking, communication skills, and leadership from the Speak Arizona podcast.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
