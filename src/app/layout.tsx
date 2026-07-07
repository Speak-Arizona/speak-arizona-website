import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LayoutChrome from "@/components/LayoutChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://speakarizona.com"),
  verification: {
    google: "NKTRu2mFMXokSvQ0Nfvo6nntxWnVnq4KD2VumEeEhHk",
  },
  title: {
    default: "Speak Arizona | Public Speaking & Communication Skills Podcast",
    template: "%s | Speak Arizona Podcast",
  },
  description:
    "Weekly podcast on public speaking, leadership, and communication skills. Hosted by Rupesh Parbhoo with World Champions of Public Speaking, bestselling authors, and executive coaches. Powered by District 3 Toastmasters.",
  keywords: [
    "public speaking podcast",
    "communication skills podcast",
    "leadership podcast",
    "public speaking tips",
    "Arizona public speaking",
    "Toastmasters podcast",
    "workplace communication",
    "Speak Arizona",
    "Rupesh Parbhoo",
  ],
  openGraph: {
    title: "Speak Arizona | Public Speaking & Communication Skills Podcast",
    description:
      "Weekly podcast on public speaking, leadership, and communication. Courageous conversations with World Champions of Public Speaking, bestselling authors, and executive coaches.",
    url: "https://speakarizona.com",
    siteName: "Speak Arizona",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://speakarizona.com/images/speak-arizona-podcast-public-speaking-leadership-by-marie-feutrier.webp",
        width: 1400,
        height: 626,
        alt: "Speak Arizona Podcast — Public Speaking, Leadership & Communication",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speak Arizona | Public Speaking & Communication Skills Podcast",
    description:
      "Weekly podcast on public speaking, leadership, and communication. Hosted by Rupesh Parbhoo.",
    images: ["https://speakarizona.com/images/speak-arizona-podcast-public-speaking-leadership-by-marie-feutrier.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Speak Arizona",
              url: "https://speakarizona.com",
              logo: "https://speakarizona.com/images/logo.png",
              description:
                "Weekly podcast on public speaking, leadership, and communication skills. Powered by District 3 Toastmasters.",
              foundingDate: "2024",
              sameAs: [
                "https://www.youtube.com/@speakarizona",
                "https://open.spotify.com/show/53gLq1FiWjTgPR4q9n7Kc4",
                "https://podcasts.apple.com/us/podcast/speak-arizona/id1463493084",
                "https://www.instagram.com/speakarizona/",
                "https://www.linkedin.com/showcase/speak-arizona/",
                "https://www.facebook.com/people/Speak-Arizona/61587110443189/",
                "https://www.tiktok.com/@speakarizona",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PodcastSeries",
              name: "Speak Arizona",
              description:
                "Weekly podcast on public speaking, leadership, and communication skills. Hosted by Rupesh Parbhoo with World Champions of Public Speaking, bestselling authors, and executive coaches.",
              url: "https://speakarizona.com",
              webFeed: "https://feed.podbean.com/speakarizona/feed.xml",
              author: {
                "@type": "Person",
                name: "Rupesh Parbhoo",
              },
              publisher: {
                "@type": "Organization",
                name: "District 3 Toastmasters",
                url: "https://d3toastmasters.org",
              },
              inLanguage: "en-US",
              genre: ["Public Speaking", "Leadership", "Communication"],
            }),
          }}
        />
        <Script id="gtag-bootstrap" strategy="afterInteractive">
          {`
            (function() {
              var h = window.location.hostname;
              var isLocal = h === 'localhost' || h === '127.0.0.1' ||
                h.endsWith('.local') ||
                /^192\\.168\\.|^10\\.|^172\\.(1[6-9]|2\\d|3[01])\\./.test(h);
              window.dataLayer = window.dataLayer || [];
              if (isLocal) {
                window.gtag = function(){};
                return;
              }
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-61S8X9W46R');
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=G-61S8X9W46R';
              document.head.appendChild(s);
            })();
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${sourceSans.variable} antialiased`}
      >
        <LayoutChrome header={<Header />} footer={<Footer />}>
          {children}
        </LayoutChrome>
      </body>
    </html>
  );
}
