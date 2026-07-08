import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const blogDir = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  guest?: string;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  imagePosition?: string;
  cardImage?: string;
  cardImageAlt?: string;
  youtubeUrl?: string;
  quote?: string;
  quoteAttribution?: string;
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

// Required frontmatter fields — every consumer assumes these are present and
// non-empty (news listing, post header, sitemap, schema).
const REQUIRED_FIELDS = ["title", "date", "excerpt", "tag"] as const;

// Validate a post's frontmatter at build time and fail loudly (naming the file
// and field) rather than shipping a silent "" default or crashing later on
// `new Date("").toISOString()`. Returns the validated required fields.
function validateFrontmatter(
  data: Record<string, unknown>,
  filename: string
): { title: string; date: string; excerpt: string; tag: string } {
  for (const field of REQUIRED_FIELDS) {
    const value = data[field];
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(
        `Blog post "${filename}": missing or empty required frontmatter field "${field}".`
      );
    }
  }
  const date = data.date as string;
  if (Number.isNaN(new Date(date).getTime())) {
    throw new Error(
      `Blog post "${filename}": frontmatter "date" is not a valid date (got "${date}").`
    );
  }
  return {
    title: data.title as string,
    date,
    excerpt: data.excerpt as string,
    tag: data.tag as string,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(blogDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const { title, date, excerpt, tag } = validateFrontmatter(data, filename);

    return {
      slug,
      title,
      date,
      excerpt,
      tag,
      guest: data.guest || undefined,
      image: data.image || undefined,
      imageAlt: data.imageAlt || undefined,
      imageCredit: data.imageCredit || undefined,
      imagePosition: data.imagePosition || undefined,
      cardImage: data.cardImage || undefined,
      cardImageAlt: data.cardImageAlt || undefined,
      youtubeUrl: data.youtubeUrl || undefined,
      quote: data.quote || undefined,
      quoteAttribution: data.quoteAttribution || undefined,
    };
  });

  // Sort by date descending
  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return posts;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content: rawContent } = matter(fileContents);
  const { title, date, excerpt, tag } = validateFrontmatter(data, `${slug}.md`);

  // remark-html sanitizes by default (strips <script>, raw HTML, etc.). We keep
  // that on: post bodies are trusted prose today, but the default guards against
  // stored XSS the day a guest post or pasted embed lands in content/blog.
  const processed = await remark().use(html).process(rawContent);
  // Add target="_blank" and rel="noopener noreferrer" to external links
  const content = processed
    .toString()
    .replace(
      /<a href="(https?:\/\/[^"]+)">/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">'
    );

  return {
    slug,
    title,
    date,
    excerpt,
    tag,
    guest: data.guest || undefined,
    image: data.image || undefined,
    imageAlt: data.imageAlt || undefined,
    imageCredit: data.imageCredit || undefined,
    imagePosition: data.imagePosition || undefined,
    cardImage: data.cardImage || undefined,
    cardImageAlt: data.cardImageAlt || undefined,
    youtubeUrl: data.youtubeUrl || undefined,
    quote: data.quote || undefined,
    quoteAttribution: data.quoteAttribution || undefined,
    content,
  };
}
