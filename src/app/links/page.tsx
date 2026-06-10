import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Speak Arizona — download the free confidence guide, watch on YouTube, listen to the podcast, and visit the website.",
  robots: { index: false, follow: false },
};

type LinkItem = {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
  download?: boolean;
};

const links: LinkItem[] = [
  {
    label: "Download the FREE 10 Confidence Tips",
    href: "/10-tips-to-look-more-confident-while-speaking.pdf",
    primary: true,
    download: true,
  },
  {
    label: "Watch on YouTube",
    href: "https://www.youtube.com/@speakarizona",
    external: true,
  },
  {
    label: "Listen on Spotify",
    href: "https://open.spotify.com/show/53gLq1FiWjTgPR4q9n7Kc4",
    external: true,
  },
  {
    label: "Listen on Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/speak-arizona/id1463493084",
    external: true,
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/showcase/speak-arizona/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/speakarizona/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Speak-Arizona/61587110443189/",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@speakarizona",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
];

const website = { label: "Visit speakarizona.com", href: "/" };

export default function LinksPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <h1 className="sr-only">Speak Arizona — Links</h1>

      <div className="flex w-full max-w-md flex-1 flex-col items-center">
        {/* Top section — blue gradient is the base layer; photo + logo + tagline sit on top */}
        <div
          className="w-full"
          style={{
            backgroundImage: "url('/images/gradient-square.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 40px), 50% 100%, 0 calc(100% - 40px))",
          }}
        >
          {/* Host photo — sits on top of the gradient */}
          <div className="h-72 w-full overflow-hidden">
            <Image
              src="/images/rupesh-parbhoo-speak-arizona-links-banner-by-marie-feutrier.webp"
              alt="Rupesh Parbhoo, host of the Speak Arizona podcast"
              width={1200}
              height={800}
              className="h-full w-full object-cover object-top"
              priority
            />
          </div>

          {/* Logo (overlapping the photo) + tagline, over the gradient */}
          <div className="relative z-10 -mt-14 flex w-full flex-col items-center px-5 pb-16 text-center">
            <div className="mb-6 h-28 w-28 overflow-hidden rounded-full shadow-lg">
              <Image
                src="/images/logo.png"
                alt="Speak Arizona"
                width={112}
                height={112}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <p className="text-lg font-medium leading-relaxed text-white/90">
              Courageous conversations to lead authentically, inspire action,
              and find your voice.
            </p>

            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-white/80">
              With Rupesh Parbhoo
            </p>
          </div>
        </div>

        {/* White section: buttons + footer */}
        <div className="flex w-full flex-1 flex-col items-center bg-white px-5 pt-10 pb-12 text-center">
            <nav
              className="flex w-3/4 flex-col gap-4"
              aria-label="Speak Arizona links"
            >
              {links.map((link) => {
                const base =
                  "block w-full rounded-full px-6 py-4 text-base font-semibold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg";
                const theme = link.primary
                  ? "bg-yellow text-[#1a1a1a]"
                  : "bg-[#1a1a1a] text-white";
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`${base} ${theme}`}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(link.download ? { download: true } : {})}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <a
              href={website.href}
              className="mt-4 block w-3/4 rounded-full bg-[#1a1a1a] px-6 py-4 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {website.label}
            </a>

            <div className="mt-8 flex items-center justify-center gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[#1a1a1a] transition hover:opacity-70"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            <p className="mt-10 text-sm text-[#555555]">
              Powered by{" "}
              <a
                href="https://d3toastmasters.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue underline underline-offset-2 hover:text-blue-light"
              >
                District 3 Toastmasters
              </a>
            </p>
          </div>
      </div>
    </div>
  );
}
