@AGENTS.md

# Speak Arizona Website

## Project Overview
Next.js website for the Speak Arizona podcast — Arizona's public speaking, leadership, and communication podcast hosted by Rupesh Parbhoo. Powered by District 3 Toastmasters.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (`@tailwindcss/postcss`)
- **Package Manager**: pnpm
- **Content**: Markdown with gray-matter frontmatter
- **Markdown Rendering**: remark + remark-html
- **Email**: None (contact page shows a plain `podcast@aztoastmasters.org` mailto; no form, no SMTP)
- **Hosting**: Vercel (auto-deploys from GitHub push)
- **Fonts**: Inter (headings), Source Sans 3 (body) — loaded via `next/font/google`

## Project Structure
```
speak-arizona-website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx        # About — story, host, team
│   │   ├── news/page.tsx         # Blog listing (featured + grid)
│   │   ├── news/[slug]/page.tsx  # Individual blog post
│   │   ├── contact/page.tsx      # Contact page (plain email, no form)
│   │   ├── legal/page.tsx        # Terms, privacy, copyright (noindex)
│   │   ├── feed.xml/route.ts     # Blog RSS 2.0 feed (static)
│   │   ├── layout.tsx            # Root layout (Header/Footer, fonts, metadata)
│   │   ├── globals.css           # Tailwind theme, custom styles
│   │   └── sitemap.ts            # Dynamic XML sitemap
│   ├── components/
│   │   ├── Header.tsx            # Nav with yellow marquee banner
│   │   ├── Footer.tsx            # Links, listen buttons, copyright
│   │   ├── LatestVideo.tsx       # Latest YouTube video embed
│   │   ├── EpisodeCarousel.tsx   # Scrollable episode cards
│   │   ├── StickyTeamCards.tsx   # Sticky team member profiles
│   │   ├── ListenSubscribe.tsx   # Platform CTA buttons
│   │   ├── FaqAccordion.tsx      # Expandable FAQ
│   │   ├── AnimateOnScroll.tsx   # Scroll-triggered fade-in
│   │   └── MobileMenu.tsx        # Mobile hamburger nav
│   └── lib/
│       └── blog.ts               # Blog utilities (getAllPosts, getPostBySlug)
├── content/
│   └── blog/                     # Markdown blog posts
├── public/
│   └── images/                   # All images (WebP)
├── .env.local                    # YOUTUBE_API_KEY (no RESEND — contact has no form)
├── next.config.ts
├── package.json
└── CLAUDE.md                     # This file
```

## Development
```bash
cd "/Users/mariefeutrier/Sites/speak-arizona-website/github"
pnpm run dev              # Starts on default port (3000 or next available)
pnpm run build            # Production build
pnpm run lint             # ESLint
```
**Local Dev:** http://localhost:3000 (or next available port)

## Deployment
```bash
git add [files]
git commit -m "message"
git push origin main      # Vercel auto-deploys from GitHub
```
**Production:** https://speakarizona.com
**GitHub:** https://github.com/Speak-Arizona/speak-arizona-website (Speak-Arizona org; DodoBird05 is org owner)

## Brand Colors
| Tailwind Name | Hex | Usage |
|---------------|-----|-------|
| `blue` | `#004165` | Primary brand, links, buttons |
| `blue-light` | `#005a8c` | Hover states |
| `yellow` | `#F2DF74` | Accent, badges, banner, CTAs |
| `yellow-light` | `#f7edb3` | Light yellow variant |
| `text` | `#1a1a1a` | Body text |
| `text-light` | `#555555` | Secondary text |
| `gray-light` | `#f5f5f5` | Section backgrounds |

## Brand Gradient
Two gradient images replace solid blue in hero sections and cards:
- **`/images/gradient-square.webp`** — used in hero sections (news, about, blog posts)
- **`/images/gradient-card.webp`** — used in team cards, audience tiles
- Applied via `backgroundImage: "url('/images/gradient-square.webp')"` with `backgroundSize: cover`

## Blog Posts
- **Content**: `/content/blog/*.md` (markdown with gray-matter frontmatter)
- **Route**: `/news/[slug]`
- **Listing**: `/news` — latest post as featured hero, remaining as cards
- **Rendering**: `src/lib/blog.ts` — remark converts markdown to HTML
- **External links**: Automatically get `target="_blank" rel="noopener noreferrer"`
- **Default OG image**: Posts without a featured image use `/images/speak-arizona-default-og.webp`

### After creating a blog post
- Always start the dev server and open the post in the browser for preview before considering it done.

### Blog Categories
Every post's `tag` must be one of these four (the list lives in `BLOG_CATEGORIES`, `src/lib/blog.ts`; any other value fails the build). "You May Also Like" shows the 3 most recent posts in the same category.

- **Public Speaking**: speaking *to an audience*. Stage, speeches, contests, keynotes: openings, humor, delivery, feedback on speeches, stage presence.
- **Communication**: talking *with people*, one-to-one or in small groups, no stage. Conversations, networking, pitching yourself, teams, language, how you come across.
- **Leadership**: *influencing and guiding others*, or steering your own career. Executive presence, mentoring, leading volunteers and teams, career decisions.
- **Resilience Stories**: *the guest's own setback*, "this happened to me, and here's how I got through it". The personal story is the point, more than the skill.

**Tie-break:** if the guest's own struggle is the heart of the post, it is Resilience Stories. Otherwise go by setting: stage → Public Speaking, conversation → Communication, leading people → Leadership.

### Blog Frontmatter
```yaml
---
title: "Post Title"
seoTitle: "Shorter Google title (optional — use when title is over ~60 chars; replaces the browser/Google <title> exactly, no site suffix. Headline, share previews, schema keep title)"
date: "March 15, 2026"
excerpt: "Short summary for listings and meta description"
tag: "Leadership (one of the four Blog Categories above)"
guest: "Guest Name (optional — omit for host-authored posts)"
image: "/images/featured-image.webp"
imageAlt: "Descriptive alt text"
youtubeUrl: "https://youtu.be/VIDEO_ID (optional — embeds at top of post)"
quote: "Pull quote from the episode (optional — displayed between video and excerpt)"
quoteAttribution: "Who said the quote (optional — defaults to guest; set it when the quote is from the host or someone else)"
imagePosition: "center (optional — featured image crop anchor; default is top)"
cardImage: "/images/card-image.webp (optional — the image that represents the post outside its page: news listing cards, social share preview (og:image), Article schema; falls back to image)"
cardImageAlt: "Alt text for card image (optional)"
---
```

### Blog Image Sizing
- **Featured image on blog post page**: 5:4 aspect ratio, `object-cover object-top`
- **Featured image on news listing (hero)**: 5:4 on desktop (in two-column grid), 16:9 on mobile
- **Card thumbnails (desktop only)**: 5:4, 192px wide, hidden on mobile
- **Inline images in blog content**: max-height 500px on desktop (`blog-content img` in globals.css), auto on mobile

## Image Optimization
- **Format**: All images must be WebP
- **Convert command**: `cwebp -q 85 -resize 800 0 "source.jpg" -o "public/images/output.webp"`
- **Hero/OG images**: resize to 1200px wide
- **Blog/content images**: resize to 800px wide
- **Location**: All in `/public/images/` (flat directory, no subfolders)
- **Naming convention**: descriptive slugs with context (e.g., `rupesh-parbhoo-teaching-yoga.webp`)
- **Photo credits**: Marie Feutrier photos include `-by-marie-feutrier` in filename
- **HEIC conversion**: `sips -s format jpeg source.HEIC --out /tmp/temp.jpg` then `cwebp`
- **Rotation fix for HEIC**: add `-r 90` to sips if photo comes out sideways
- **Immutable cache**: `/images/*` is served `Cache-Control: public, max-age=31536000, immutable` (next.config.ts). So **never edit an image in place** — a changed image gets a **new filename**, otherwise cached copies never refresh.
- **Never delete source images**: when re-encoding, move the original to `~/Sites/speak-arizona-website/speak-arizona-originals/` (the parent folder, OUTSIDE this repo — it is public on GitHub), never `rm` it.

## Contact Page
- **Page**: `/contact` (server component, no form)
- Shows a plain `podcast@aztoastmasters.org` mailto link (plain text is canon — decided over obfuscation)
- No API route, no SMTP, no env vars
- Form was removed 2026-05-08 — Marie didn't want her personal Gmail tied to Speak Arizona for SMTP, and no one on the AZ Toastmasters team had time to set up domain-verified email sending

## YouTube Integration
- **Component**: `LatestVideo.tsx` — fetches latest uploads from YouTube channel
- **API**: YouTube Data API v3, cached for 1 hour (ISR revalidation)
- **Env var**: `YOUTUBE_API_KEY` in `.env.local`
- **Filters** (API path only; the RSS fallback has no durations or frames):
  - **Shorts**: anything 3 minutes or shorter (YouTube's Shorts limit since Oct 2024; a 60-second cutoff let the channel's 66-87s Shorts through)
  - **Audio-only copies**: the podcast host auto-publishes each episode to YouTube as the cover art held still, with the same title and length as the real video. Detected by comparing YouTube's frames at 25/50/75% (`hq1-3.jpg`) with `sharp`; identical picture = audio-only, hidden. Any failure keeps the video.
- **`sharp` is a direct dependency** for that frame check (server-side only). Check it in the monthly CVE audit like any other runtime dependency.

## SEO
- **Title template**: `"%s | Speak Arizona Podcast"`
- **Default title**: "Speak Arizona | Public Speaking & Communication Skills Podcast"
- **Canonical**: `https://speakarizona.com`
- **Sitemap**: Dynamic via `src/app/sitemap.ts`
- **Schema markup**:
  - Organization + PodcastSeries (root layout)
  - Person schema (about page — Rupesh Parbhoo)
  - Article schema (each blog post)
- **noindex pages**: `/legal`, `/contact`

## Social Media Links
| Platform | URL |
|----------|-----|
| YouTube | https://www.youtube.com/@speakarizona |
| Instagram | https://www.instagram.com/speakarizona/ |
| LinkedIn | https://www.linkedin.com/showcase/speak-arizona/ |
| Facebook | https://www.facebook.com/people/Speak-Arizona/61587110443189/ |
| TikTok | https://www.tiktok.com/@speakarizona |
| Spotify | https://open.spotify.com/show/speak-arizona |
| Apple Podcasts | https://podcasts.apple.com/us/podcast/speak-arizona |
| RSS | https://feed.podbean.com/speakarizona/feed.xml |

## Desktop / Mobile Rules
- **"on desktop"** = only change `md:` breakpoints and up. Do NOT touch mobile.
- **"on mobile"** = only change below `md:`. Do NOT touch desktop.
- **Never bleed changes across breakpoints** unless explicitly asked to change both.

## Key Conventions
- Blog posts use `tag` field (not `category`)
- Blog posts use `guest` field (omit for host-authored content — do NOT show "Guest: Rupesh Parbhoo")
- All images are WebP, optimized for web before adding
- Brand gradient images (`gradient-square.webp`, `gradient-card.webp`) used instead of solid `bg-blue` on hero sections and cards
- Tagline: "Courageous conversations to lead authentically, inspire action, and find your voice."

---
*This file serves as persistent memory for Claude Code across sessions.*
