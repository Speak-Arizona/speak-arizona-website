import type { NextConfig } from "next";

// Content-Security-Policy. External surface is small and fully enumerated:
// Google Tag Manager + GA4 (analytics), YouTube (video embeds + thumbnails),
// and the AWeber lead-magnet form POST. 'unsafe-inline' is required for Next's
// inline bootstrap/gtag config scripts and the site's inline style attributes.
// form-action is the directive that would break the lead magnet if wrong, so it
// explicitly allows www.aweber.com (the addlead.pl POST target).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.ytimg.com https://*.ytimg.com https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self'",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "form-action 'self' https://www.aweber.com",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        // Static images use descriptive content-based filenames and are never
        // edited in place (a changed image gets a new filename), so they are
        // safe to cache forever. Cuts revalidation round-trips for returning
        // visitors.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
