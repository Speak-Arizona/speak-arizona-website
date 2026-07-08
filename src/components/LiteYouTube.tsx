"use client";

import { useState } from "react";

/**
 * Click-to-load YouTube facade.
 *
 * Renders the video thumbnail + a play button and only injects the real iframe
 * once the user clicks. Until then the page makes ZERO requests to YouTube, so
 * no third-party cookies are set and the ~1 MB YouTube player JS never loads on
 * first paint (fixes the Lighthouse "third-party cookies" / "browser errors" /
 * console-issues audits and improves LCP). The thumbnail comes from i.ytimg.com
 * and the loaded embed uses youtube-nocookie.com — both already allow-listed in
 * the CSP (img-src / frame-src). Fills its parent, so the caller owns the aspect
 * ratio and rounding.
 */
export default function LiteYouTube({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play video: ${title}`}
      className="group relative w-full h-full cursor-pointer overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
        <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue/90 shadow-lg transition-transform group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 md:w-10 md:h-10 text-white translate-x-0.5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
