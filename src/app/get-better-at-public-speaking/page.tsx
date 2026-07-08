import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FaqAccordion from "@/components/FaqAccordion";
import GuideSignupForm from "@/components/GuideSignupForm";
import { jsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "How to Become a Better, More Confident Public Speaker",
  description:
    "Want to get better at public speaking? Learn what actually builds confidence — regular practice, honest feedback, and a supportive room — and find a Toastmasters club near you in Arizona.",
  alternates: {
    canonical: "https://speakarizona.com/get-better-at-public-speaking/",
  },
  openGraph: {
    title: "How to Become a Better, More Confident Public Speaker",
    description:
      "What actually makes you a better speaker isn't talent — it's practice, honest feedback, and a room where it's safe to be imperfect. Here's where to start in Arizona.",
    url: "https://speakarizona.com/get-better-at-public-speaking/",
    siteName: "Speak Arizona",
    type: "website",
    images: [
      {
        url: "https://speakarizona.com/images/get-better-public-speaking-og-by-marie-feutrier.webp",
        width: 1200,
        height: 630,
        alt: "A speaker presenting confidently, captured on camera at a District 3 Toastmasters event in Phoenix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Become a Better, More Confident Public Speaker",
    description:
      "What actually makes you a better speaker isn't talent — it's practice, honest feedback, and a room where it's safe to be imperfect. Here's where to start in Arizona.",
    images: ["https://speakarizona.com/images/get-better-public-speaking-og-by-marie-feutrier.webp"],
  },
};

const faqItems = [
  {
    question: "How can I become a better public speaker?",
    answer:
      "You get better at public speaking the same way you get better at anything — by doing it, regularly, in front of people who give you honest feedback. Reading and watching videos help, but real growth comes from repetition in a low-stakes setting where it's safe to be imperfect. That's exactly what a Toastmasters club gives you: a supportive room, a chance to speak every week, and feedback you can actually use.",
  },
  {
    question: "How do I get over the fear of public speaking?",
    answer:
      "The fear rarely disappears overnight, but it shrinks fast with exposure. Each time you stand up and speak and survive, your brain updates its sense of what's actually at risk. The trick is to start somewhere the stakes are low and the people are on your side — not on a conference stage. A weekly practice group is one of the most reliable ways to turn that fear into manageable nerves, and eventually into confidence.",
  },
  {
    question: "Do I have to be a good speaker to join Toastmasters?",
    answer:
      "Not at all — most people walk in because they're not yet confident speakers, and that's the whole point. You'll find first-time presenters, people who get tongue-tied in meetings, and seasoned speakers polishing a keynote, all in the same room. You start wherever you are and grow from there at your own pace.",
  },
  {
    question: "Where can I practice public speaking in Arizona?",
    answer:
      "District 3 Toastmasters has clubs across Arizona — in Phoenix, Gilbert, Mesa, Scottsdale, Tempe, and many other communities — plus southern New Mexico (including Las Cruces) and West Texas. Most clubs welcome guests to visit a meeting for free before deciding to join, so you can see how it works with no pressure. Visit the District 3 Toastmasters website to find a club near you.",
  },
  {
    question: "What's the connection between Speak Arizona and Toastmasters?",
    answer:
      "Speak Arizona is the podcast powered by District 3 Toastmasters. The podcast brings you conversations with world-class speakers and coaches; Toastmasters is where you go to actually practice the skills those conversations talk about. Listening makes you think differently about communication — joining a club is how you build the habit.",
  },
];

export default function GetBetterAtPublicSpeaking() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://speakarizona.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Get Better at Public Speaking",
        item: "https://speakarizona.com/get-better-at-public-speaking/",
      },
    ],
  };

  const reasons = [
    "I want to be more confident when speaking with someone about business topics. I get tongue-tied and stumble at times to say what I mean.",
    "I would like to feel more confident in public speaking, or even in workplace conversations. I am a meek person.",
    "More experience communicating effectively in meetings and being persuasive as a software engineer.",
    "I'm practicing my keynote story. I'd love feedback and encouragement.",
  ];

  const guideTeasers = [
    "Why your racing heart almost never shows — and the simple shift that shrinks the nerves",
    "The posture, hands, and eye-contact habits that read as authority before you say a word",
    "How to steady your voice and pace so nerves don't give you away",
    "A science-backed visualization trick to rehearse confidence in your head before you ever stand up",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section
        className="py-16 md:py-24"
        style={{
          backgroundImage: "url('/images/gradient-square.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <a
            href="#get-the-guide"
            className="inline-block bg-white/10 text-white font-heading font-bold text-sm px-8 py-4 rounded-full hover:bg-white/20 transition-colors mb-8"
          >
            DOWNLOAD THE FREE GUIDE
          </a>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl leading-snug mb-6">
            Want to Become a More{" "}
            <span
              style={{
                backgroundColor: "#F2DF74",
                color: "#000",
                padding: "0 8px",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }}
            >
              Confident Speaker?
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            You&apos;re in the right place if you want to improve how you give a
            presentation, lead a meeting, raise a toast at a celebration, or
            simply feel more confident when you&apos;re networking.
          </p>
        </div>
      </section>

      {/* Honest reasons */}
      <section className="bg-gray-light py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <p className="text-text-light text-sm uppercase tracking-widest font-semibold mb-3">
              Sound Familiar?
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-black uppercase leading-tight mb-6">
              If Any of These Sound Like You, You&apos;re in the Right Place.
            </h2>
          </AnimateOnScroll>
          <p className="text-text-light text-lg leading-relaxed max-w-2xl mb-10">
            These are real reasons people give when they walk through the door
            of a Toastmasters club for the first time. Not polished mission
            statements. Just honest, human things people want to get better at.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, i) => (
              <AnimateOnScroll key={i} className="h-full">
                <blockquote className="bg-white rounded-2xl p-8 shadow-sm h-full transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg">
                  <span
                    className="font-heading font-bold italic text-yellow text-6xl leading-none block mb-2"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <p className="text-text leading-relaxed italic">{reason}</p>
                </blockquote>
              </AnimateOnScroll>
            ))}
          </div>
          <p className="text-text-light text-lg leading-relaxed max-w-2xl mt-10">
            None of these people were &ldquo;naturals.&rdquo; They just decided
            they wanted to communicate better — and went looking for a place to
            practice. If you saw yourself in any of those sentences, keep
            reading.
          </p>
        </div>
      </section>

      {/* How you actually get better */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-black mb-6">
              How Do You Actually Get Better at Public Speaking?
            </h2>
          </AnimateOnScroll>
          <p className="text-text-light text-lg leading-relaxed mb-10 max-w-3xl">
            You don&apos;t read your way to confidence, and you don&apos;t watch
            your way there either. Books,
            podcasts, and videos can change how you <em>think</em> about
            speaking — but the skill itself only grows when you actually stand up
            and do it.
          </p>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/toastmasters-tli-tucson-learn-through-enjoyment.webp"
                alt="Two District 3 Toastmasters members at a Tucson leadership training, beside a screen showing founder Ralph Smedley's quote: We learn best in moments of enjoyment"
                width={800}
                height={1063}
                className="w-full h-auto transition-transform duration-500 md:hover:scale-105"
              />
            </div>
            <div>
              <p className="text-text-light text-lg leading-relaxed mb-8">
                The people who improve the fastest all have the same four things
                in common:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-light rounded-2xl p-6 transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-md">
                  <h3 className="font-heading font-bold text-lg text-black mb-2">
                    1. A room where it&apos;s safe to be imperfect
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    You can&apos;t learn to speak well while terrified of being
                    judged. Real growth needs a low-stakes setting where
                    stumbling is expected and nobody&apos;s career is on the line.
                  </p>
                </div>
                <div className="bg-gray-light rounded-2xl p-6 transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-md">
                  <h3 className="font-heading font-bold text-lg text-black mb-2">
                    2. Honest, specific feedback
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    &ldquo;Good job&rdquo; doesn&apos;t make you better. You need
                    people who&apos;ll tell you what landed, what didn&apos;t,
                    and exactly what to try next time.
                  </p>
                </div>
                <div className="bg-gray-light rounded-2xl p-6 transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-md">
                  <h3 className="font-heading font-bold text-lg text-black mb-2">
                    3. Regular reps
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    Speaking once a year guarantees you&apos;ll always feel
                    rusty. Speaking a little, often, is how nerves turn into
                    instinct and confidence compounds.
                  </p>
                </div>
                <div className="bg-gray-light rounded-2xl p-6 transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-md">
                  <h3 className="font-heading font-bold text-lg text-black mb-2">
                    4. People to learn from
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    Watching others tackle the same challenge — and cheering
                    each other on — accelerates everything. You borrow what works
                    and skip mistakes you&apos;d otherwise have to make yourself.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <AnimateOnScroll>
            <figure
              className="max-w-3xl mx-auto text-center mt-16 rounded-3xl px-8 py-12 md:px-12 text-white"
              style={{
                backgroundImage: "url('/images/gradient-square.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span
                aria-hidden="true"
                className="font-heading font-bold italic text-yellow text-6xl leading-none block mb-2"
              >
                &ldquo;
              </span>
              <blockquote className="font-heading font-medium text-2xl md:text-3xl leading-snug">
                I spent 15 years believing I couldn&apos;t speak to people.
                Toastmasters is where I learned that wasn&apos;t true.
              </blockquote>
              <figcaption className="text-white/80 mt-4">
                &mdash;{" "}
                <Link
                  href="/news/from-stutter-to-stage-matt-malan"
                  className="underline hover:text-yellow transition-colors"
                >
                  Matt Malan
                </Link>
                , Speak Arizona guest
              </figcaption>
            </figure>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Lead magnet — download the guide */}
      <section
        id="get-the-guide"
        className="scroll-mt-32 py-16 md:py-20"
        style={{
          backgroundImage: "url('/images/gradient-square.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Guide cover */}
            <AnimateOnScroll className="bg-white rounded-3xl shadow-lg flex items-center justify-center p-8 md:p-12">
              <div className="max-w-xs mx-auto overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/images/10-tips-confident-speaking-guide-cover.webp"
                  alt="Cover of the free Speak Arizona guide, 10 Tips to Look More Confident While Speaking"
                  width={800}
                  height={1036}
                  className="w-full h-auto transition-transform duration-500 md:hover:scale-105"
                />
              </div>
            </AnimateOnScroll>

            {/* Copy + signup form */}
            <div>
              <AnimateOnScroll>
                <p className="text-yellow text-sm uppercase tracking-widest font-semibold mb-3">
                  Free Download
                </p>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
                  10 Tips to Look More{" "}
                  <span
                    style={{
                      backgroundColor: "#F2DF74",
                      color: "#000",
                      padding: "0 8px",
                      boxDecorationBreak: "clone",
                      WebkitBoxDecorationBreak: "clone",
                    }}
                  >
                    Confident
                  </span>{" "}
                  While Speaking
                </h2>
              </AnimateOnScroll>
              <p className="font-heading font-bold text-white mb-3">
                Inside the free guide:
              </p>
              <ul className="space-y-2 mb-8">
                {guideTeasers.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-white/90"
                  >
                    <svg
                      className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <GuideSignupForm />
            </div>
          </div>
        </div>
      </section>

      {/* Where to find all of that */}
      <section className="bg-gray-light py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-black mb-6">
              It All Comes Together in a Toastmasters Club
            </h2>
          </AnimateOnScroll>
          <p className="text-text-light text-lg leading-relaxed">
            That combination — a supportive room, honest feedback, regular
            practice, and people to learn from — is exactly what a{" "}
            <strong>Toastmasters club</strong> is built to provide. It&apos;s a
            small, friendly group that meets regularly so members can practice
            speaking, get coached, and grow at their own pace. No experience
            required, and you start wherever you are.
          </p>
        </div>
      </section>

      {/* What is Toastmasters */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <AnimateOnScroll>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-black uppercase mb-6">
                  What Is Toastmasters?
                </h2>
              </AnimateOnScroll>
              <p className="text-text-light text-lg leading-relaxed mb-4">
                Toastmasters International is a global nonprofit organization
                that helps people develop public speaking, communication, and
                leadership skills.
              </p>
              <p className="text-text-light text-lg leading-relaxed mb-4">
                But here&apos;s what makes it different from a class or a
                seminar: Toastmasters is{" "}
                <span
                  style={{
                    backgroundColor: "#F2DF74",
                    color: "#000",
                    padding: "0 4px",
                  }}
                >
                  peer-driven
                </span>
                . There&apos;s no instructor standing at the front of the room
                lecturing. Instead, members learn by doing — giving speeches,
                receiving feedback, leading meetings, and supporting each other
                in a space where making mistakes is not just okay, it&apos;s
                expected.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                You don&apos;t need experience to join. You don&apos;t need to be
                &ldquo;good at speaking.&rdquo; You just need to show up willing
                to try.
              </p>
            </div>
            <AnimateOnScroll>
              <div
                className="rounded-3xl p-8 md:p-10 text-white"
                style={{
                  backgroundImage: "url('/images/gradient-square.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="font-heading font-extrabold text-4xl md:text-5xl text-yellow leading-none">
                      1924
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed mt-3">
                      Founded — over a century of communication training
                    </p>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-4xl md:text-5xl leading-none">
                      14,000+
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed mt-3">
                      Clubs around the world
                    </p>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-4xl md:text-5xl text-yellow leading-none">
                      140+
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed mt-3">
                      Countries where Toastmasters is active
                    </p>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-4xl md:text-5xl leading-none">
                      Peer-led
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed mt-3">
                      No instructors. Members learn from each other.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* What is District 3 Toastmasters */}
      <section className="bg-gray-light py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/district-3-toastmasters-tli-phoenix-2026.webp"
                alt="A speaker addressing a full room of District 3 Toastmasters members at the 2026 Toastmasters Leadership Institute in Phoenix"
                width={800}
                height={1200}
                className="w-full h-auto transition-transform duration-500 md:hover:scale-105"
              />
            </div>
            <div>
              <AnimateOnScroll>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-black uppercase mb-6">
                  What Is District 3 Toastmasters?
                </h2>
              </AnimateOnScroll>
              <p className="text-text-light text-lg leading-relaxed mb-4">
                District 3 is the regional arm of Toastmasters International,{" "}
                <span
                  style={{
                    backgroundColor: "#F2DF74",
                    color: "#000",
                    padding: "0 4px",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                  }}
                >
                  serving over 125 clubs
                </span>{" "}
                across Arizona, southern New Mexico, and West Texas.
              </p>
              <p className="text-text-light text-lg leading-relaxed mb-4">
                That means there&apos;s a club near you — whether you&apos;re in
                Phoenix, Tucson, Las Cruces, El Paso, or somewhere in between.
                Some clubs meet in the morning before work. Some meet at lunch.
                Some meet in the evening. Some are in person, some are online,
                and some are hybrid.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Every club has its own personality. Some are large and
                competitive. Some are small and intimate. Some lean corporate.
                Some are casual and community-driven. The best way to find your
                fit is to visit a few — every club welcomes guests, and your
                first visit is always free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What a meeting looks like */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-black mb-6">
              Here&apos;s What a Meeting Actually Looks Like
            </h2>
          </AnimateOnScroll>
          <p className="text-text-light text-lg leading-relaxed mb-10 max-w-3xl">
            If you&apos;ve never been to one, a Toastmasters meeting can feel
            like a mystery. In reality, most follow a friendly, predictable
            format built around three main parts:
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center mb-4 font-heading font-bold text-black">
                1
              </div>
              <h3 className="font-heading font-bold text-lg text-black mb-2">
                Prepared Speeches
              </h3>
              <p className="text-text-light leading-relaxed">
                Members deliver speeches they&apos;ve worked on ahead of time,
                each one designed to build a specific skill — from structuring a
                clear message to using vocal variety and body language.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center mb-4 font-heading font-bold text-black">
                2
              </div>
              <h3 className="font-heading font-bold text-lg text-black mb-2">
                Evaluations
              </h3>
              <p className="text-text-light leading-relaxed">
                After each prepared speech, another member offers constructive
                feedback — what landed, and a couple of specific things to try
                next time. Learning to give and receive feedback is a skill all
                its own.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center mb-4 font-heading font-bold text-black">
                3
              </div>
              <h3 className="font-heading font-bold text-lg text-black mb-2">
                Table Topics
              </h3>
              <p className="text-text-light leading-relaxed">
                A round of impromptu speaking, where you respond to a surprise
                question with no preparation. It&apos;s the part that sharpens
                your ability to think — and speak — on your feet, the same
                instinct{" "}
                <Link
                  href="/news/what-improv-teaches-about-speaking-leading-connecting"
                  className="text-blue underline hover:text-blue-light transition-colors"
                >
                  improv is built on
                </Link>
                .
              </p>
            </div>
          </div>
          <p className="text-text-light text-lg leading-relaxed mt-12 max-w-3xl">
            Throughout the meeting, other members take on supporting roles. A{" "}
            <strong>timekeeper</strong> tracks how long each person speaks, a{" "}
            <strong>grammarian</strong> highlights strong language and word
            choices, and an <strong>&ldquo;Ah-Counter&rdquo;</strong> keeps tally
            of filler words like &ldquo;um&rdquo; and &ldquo;uh.&rdquo; Every
            role — whether you&apos;re speaking, evaluating, or running the clock
            — is a chance to practice a different communication or leadership
            skill.
          </p>
        </div>
      </section>

      {/* What can Toastmasters do for you */}
      <section className="bg-gray-light py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-black mb-4">
              WHAT TOASTMASTERS CAN DO FOR YOU
            </h2>
          </AnimateOnScroll>
          <p className="text-text-light text-lg leading-relaxed mb-8">
            People come to Toastmasters for a lot of different reasons. Here are
            some of the most common:
          </p>
        </div>
        <div className="max-w-6xl mx-auto pl-6 md:px-6">
          <div
            className="flex gap-4 overflow-x-auto pb-4 pr-6 md:grid md:grid-cols-3 md:overflow-visible md:pr-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Build confidence */}
            <div
              className="audience-card flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between card-hover"
              style={{ width: "260px", minHeight: "300px", backgroundImage: "url('/images/gradient-card.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  Build Confidence in Speaking
                </h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Whether it&apos;s a room full of strangers, a team meeting, or a one-on-one conversation with your boss, Toastmasters gives you a safe space to practice until the nerves shrink and the confidence grows.
              </p>
            </div>

            {/* Get better at work */}
            <div
              className="audience-card flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between card-hover"
              style={{ width: "260px", minHeight: "300px", background: "#F2DF74" }}
            >
              <div>
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-black mb-2">
                  Get Better at Work
                </h3>
              </div>
              <p className="text-black/70 text-sm leading-relaxed">
                Clearer communication on conference calls. More persuasive presentations. Stronger interview skills. The ability to lead a meeting people actually want to attend. These aren&apos;t abstract skills — they&apos;re the things that get you noticed, promoted, and respected.
              </p>
            </div>

            {/* Think faster */}
            <div
              className="audience-card flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between card-hover"
              style={{ width: "260px", minHeight: "300px", backgroundImage: "url('/images/gradient-card.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  Think Faster on Your Feet
                </h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Every Toastmasters meeting includes impromptu speaking exercises called Table Topics, where you practice responding to unexpected questions with no preparation. It&apos;s the closest thing to a gym for your brain when it comes to unscripted communication.
              </p>
            </div>

            {/* Tell better stories */}
            <div
              className="audience-card flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between card-hover"
              style={{ width: "260px", minHeight: "300px", background: "#F2DF74" }}
            >
              <div>
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-black mb-2">
                  Tell Better Stories
                </h3>
              </div>
              <p className="text-black/70 text-sm leading-relaxed">
                Whether you&apos;re pitching a product, sharing a keynote, or trying to connect with a new team, storytelling is the skill that makes people listen. Toastmasters gives you the reps and the feedback to sharpen your stories until they land.
              </p>
            </div>

            {/* Build community */}
            <div
              className="audience-card flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between card-hover"
              style={{ width: "260px", minHeight: "300px", backgroundImage: "url('/images/gradient-card.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  Meet People and Build Community
                </h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Toastmasters is one of those rare spaces where you&apos;re surrounded by people who are all working on themselves. That shared vulnerability creates connections that go way beyond networking.
              </p>
            </div>

            {/* Develop leadership */}
            <div
              className="audience-card flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between card-hover"
              style={{ width: "260px", minHeight: "300px", background: "#F2DF74" }}
            >
              <div>
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-black mb-2">
                  Develop Leadership Skills
                </h3>
              </div>
              <p className="text-black/70 text-sm leading-relaxed">
                Every club is run entirely by its members. That means real leadership opportunities — running meetings, mentoring newer members, managing club operations, organizing events — all in a low-risk environment where you can experiment and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA handoff */}
      <section
        className="py-16 md:py-20"
        style={{
          backgroundImage: "url('/images/gradient-square.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              Find a Toastmasters Club Near You
            </h2>
          </AnimateOnScroll>
          <p className="text-white/90 text-lg leading-relaxed mb-10">
            The best way to get better is to take the first step. Visit District
            3 Toastmasters to see what a club can do for you — and find one you
            can visit, as a guest, with no pressure to join.
          </p>
          <a
            href="https://d3toastmasters.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow text-black font-heading font-bold text-sm px-8 py-4 rounded-full hover:bg-yellow-light transition-colors"
          >
            EXPLORE DISTRICT 3 TOASTMASTERS
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-light py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-black mb-8">
              Public Speaking Questions, Answered
            </h2>
          </AnimateOnScroll>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Closing CTA */}
      <section
        className="py-16 md:py-20"
        style={{
          backgroundImage: "url('/images/gradient-square.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              Your Voice Is Worth Working On
            </h2>
          </AnimateOnScroll>
          <p className="text-white/90 text-lg leading-relaxed mb-10">
            The hardest part is walking through the door the first time. Find a
            District 3 Toastmasters club near you and visit as a guest — no
            pressure, no cost.
          </p>
          <a
            href="https://www.toastmasters.org/find-a-club?latitude=33.448204&longitude=-112.0725848"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow text-black font-heading font-bold text-sm px-8 py-4 rounded-full hover:bg-yellow-light transition-colors"
          >
            FIND A CLUB NEAR YOU
          </a>
        </div>
      </section>
    </>
  );
}
