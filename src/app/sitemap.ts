import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

// Last substantive change to the static (non-post) pages. Bump this when the
// homepage / about / guide / news-listing content actually changes. Using a
// real date instead of `new Date()` avoids the false "everything changed on
// every deploy" freshness signal that Google learns to ignore.
const STATIC_PAGES_UPDATED = new Date("2026-07-08");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `https://speakarizona.com/news/${post.slug}/`,
    // Real edit date when a post declares `updated` in frontmatter, else its
    // publish date — never the deploy time.
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://speakarizona.com/",
      lastModified: STATIC_PAGES_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://speakarizona.com/about/",
      lastModified: STATIC_PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://speakarizona.com/get-better-at-public-speaking/",
      lastModified: STATIC_PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://speakarizona.com/news/",
      lastModified: STATIC_PAGES_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
  ];
}
