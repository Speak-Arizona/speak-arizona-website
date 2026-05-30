import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're Almost There",
  description:
    "Check your email to confirm your subscription and your free guide is on its way.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://speakarizona.com/guide-thank-you/",
  },
};

export default function GuideThankYou() {
  return (
    <section
      className="flex items-center min-h-[70vh] py-20 md:py-28"
      style={{
        backgroundImage: "url('/images/gradient-square.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl mx-auto px-6 text-center text-white">
        <p className="text-yellow text-sm uppercase tracking-widest font-semibold mb-4">
          One last step
        </p>
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl leading-tight mb-6">
          You&apos;re almost there!
        </h1>
        <p className="text-white/90 text-lg leading-relaxed mb-4">
          Check your inbox and click the{" "}
          <span
            style={{
              backgroundColor: "#F2DF74",
              color: "#000",
              padding: "0 6px",
            }}
          >
            confirm
          </span>{" "}
          link we just sent you. The moment you do, your free guide —{" "}
          <em>10 Tips to Look More Confident While Speaking</em> — lands in your
          inbox.
        </p>
        <p className="text-white/80 text-base leading-relaxed mb-10">
          Don&apos;t see it within a few minutes? Check your spam or Promotions
          tab, and add us to your contacts so you never miss a tip.
        </p>
        <Link
          href="/"
          className="inline-block bg-yellow text-black font-heading font-bold text-sm px-8 py-4 rounded-full hover:bg-yellow-light transition-colors"
        >
          BACK TO SPEAK ARIZONA
        </Link>
      </div>
    </section>
  );
}
