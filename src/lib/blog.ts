import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const blogDir = path.join(process.cwd(), "content/blog");
const publicDir = path.join(process.cwd(), "public");

// Intrinsic dimensions read once per file at build time, then memoized so a
// build that renders 19 posts never re-reads the same image header.
const imageDimensionCache = new Map<
  string,
  { width: number; height: number } | null
>();

// Read a WebP's intrinsic pixel dimensions straight from its header (no image
// library dependency). Handles the three chunk types cwebp can emit: VP8
// (lossy), VP8L (lossless), VP8X (extended/animated). Returns null for anything
// it can't confidently parse so the caller falls back to omitting dimensions.
function getWebpDimensions(
  absPath: string
): { width: number; height: number } | null {
  if (imageDimensionCache.has(absPath)) return imageDimensionCache.get(absPath)!;

  let result: { width: number; height: number } | null = null;
  try {
    const buf = fs.readFileSync(absPath);
    if (
      buf.length >= 30 &&
      buf.toString("ascii", 0, 4) === "RIFF" &&
      buf.toString("ascii", 8, 12) === "WEBP"
    ) {
      const format = buf.toString("ascii", 12, 16);
      if (format === "VP8 ") {
        // Lossy: 14-bit width/height at offset 26, little-endian.
        const width = (buf[26] | (buf[27] << 8)) & 0x3fff;
        const height = (buf[28] | (buf[29] << 8)) & 0x3fff;
        result = { width, height };
      } else if (format === "VP8L") {
        // Lossless: 14-bit (width-1)/(height-1) packed across 4 bytes at 21.
        const b0 = buf[21];
        const b1 = buf[22];
        const b2 = buf[23];
        const b3 = buf[24];
        const width = 1 + (((b1 & 0x3f) << 8) | b0);
        const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
        result = { width, height };
      } else if (format === "VP8X") {
        // Extended: 24-bit (canvas-1) dimensions at offset 24, little-endian.
        const width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
        const height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
        result = { width, height };
      }
    }
  } catch {
    result = null;
  }

  imageDimensionCache.set(absPath, result);
  return result;
}

// Intrinsic dimensions of a public image referenced by site-absolute path
// (e.g. "/images/foo.webp"), for og:image width/height. Returns null if it
// can't be measured. Reuses the memoized WebP header parser above.
export function getPublicImageDimensions(
  imagePath: string
): { width: number; height: number } | null {
  if (!imagePath.startsWith("/")) return null;
  return getWebpDimensions(path.join(publicDir, imagePath));
}

// Post-process the rendered markdown <img> tags: inject loading="lazy" and
// decoding="async" (below-the-fold images no longer download eagerly) plus the
// real intrinsic width/height read at build time, which gives the browser an
// aspect ratio to reserve space and eliminates layout shift as images load.
// Idempotent: skips attributes that are already present. Width/height are only
// added for local /images/* assets we can measure; external images still get
// the lazy/async hints.
function enhanceBlogImages(htmlContent: string): string {
  return htmlContent.replace(/<img\b([^>]*)>/g, (_full, attrs: string) => {
    let extra = "";

    const srcMatch = attrs.match(/\bsrc="([^"]+)"/);
    if (srcMatch && srcMatch[1].startsWith("/images/") && !/\bwidth=/.test(attrs)) {
      const dims = getWebpDimensions(path.join(publicDir, srcMatch[1]));
      if (dims) extra += ` width="${dims.width}" height="${dims.height}"`;
    }
    if (!/\bloading=/.test(attrs)) extra += ` loading="lazy"`;
    if (!/\bdecoding=/.test(attrs)) extra += ` decoding="async"`;

    return `<img${attrs}${extra}>`;
  });
}

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
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
      updated: data.updated || undefined,
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
  // Add target="_blank" and rel="noopener noreferrer" to external links, then
  // inject lazy-loading + intrinsic dimensions on images (CLS + eager-load fix).
  const content = enhanceBlogImages(
    processed
      .toString()
      .replace(
        /<a href="(https?:\/\/[^"]+)">/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">'
      )
  );

  return {
    slug,
    title,
    date,
    excerpt,
    tag,
    updated: data.updated || undefined,
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
