"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  description: string;
  linkedin?: string;
  website?: string;
};

const team: TeamMember[] = [
  {
    name: "Matthew Malan",
    role: "Marketing & Video",
    image: "/images/matthew-malan-video-editor-speak-arizona-by-marie-feutrier.webp",
    description:
      "Matthew Malan is a marketing strategist and content creator who brings a data-driven edge to the Speak Arizona creative team. As Marketing Manager at Vemo Smart Energy, he leads an eight-person team focused on paid acquisition and lead generation. He channels that same strategic mindset into content — editing and shaping raw podcast episodes into sharp highlight reels for TikTok, Instagram, and LinkedIn. The result: every conversation is packaged to reach the right audience, on the right platform.",
    linkedin: "https://www.linkedin.com/in/matthew-malan8",
  },
  {
    name: "Vincent Feutrier",
    role: "Video Editor",
    image: "/images/vincent-feutrier-video-editor-speak-arizona-by-marie-feutrier.webp",
    description:
      "Vincent Feutrier brings precision from two worlds to Speak Arizona. By day, he leads teams in the semiconductor industry, where clear communication and attention to detail aren't optional — they're everything. By night (and weekends), he serves as Area Director for District 3 Toastmasters, supporting five clubs across the district. As the video editor for Speak Arizona, Vincent is the one who turns raw conversations into polished episodes ready for your screen. His leadership experience — both in the boardroom and in Toastmasters — gives him a sharp eye for what makes a message land.",
    linkedin: "https://www.linkedin.com/in/vincentfeutrier/",
  },
  {
    name: "Marie Feutrier",
    role: "Public Relations Manager",
    image: "/images/marie-feutrier-pr-manager-speak-arizona-by-marie-feutrier.webp",
    description:
      "Marie Feutrier is the voice, and the eye, behind the brand. A professional photographer and District 3's Public Relations Manager, she brings a rare combination of visual and strategic thinking to Speak Arizona. Marie leads social media, content creation, and brand strategy across every platform where the podcast shows up. Her camera captures the hosts and guests; her PR expertise makes sure every episode reaches the right audience. A Past President of Gilbert Toastmasters, she knows the Toastmasters journey from the inside. She believes your voice matters; now use it.",
    linkedin: "https://www.linkedin.com/in/mariefeutrier/",
    website: "https://headshotsbymarie.com",
  },
  {
    name: "Edna Saucke",
    role: "Social Media Strategist",
    image: "/images/edna-saucke-social-media-strategist-speak-arizona.webp",
    description:
      "Edna Saucke is the Social Media Strategist for Speak Arizona, where she combines her passion for digital marketing with her commitment to helping others find their voice through Toastmasters. A longtime Toastmaster, Edna has served in numerous leadership roles, including Vice President Public Relations, Area Director, Division Director, Club Coach, and district communications volunteer. With a background in content strategy and social media, she enjoys creating engaging campaigns that spotlight members, promote clubs and events, and inspire people to develop their communication and leadership skills. Edna believes every person has a story worth telling and is dedicated to helping the Arizona Toastmasters community grow, one post, one connection, and one conversation at a time.",
  },
];

const THUMB_BAR_HEIGHT = 140; // px — thumbnail bar height
const HEADER_HEIGHT_FALLBACK = 104; // px — used only before the real header is measured (SSR / first paint)

export default function StickyTeamCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const zoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [headerH, setHeaderH] = useState(HEADER_HEIGHT_FALLBACK);

  useEffect(() => {
    // Measure the real sticky <header> (banner + nav) instead of assuming fixed
    // pixel heights — the mobile banner is taller than the old 48px guess and
    // can wrap, which would silently drift the sticky offsets below.
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setHeaderH(header.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = headerH + THUMB_BAR_HEIGHT + 100;
      for (let i = zoneRefs.current.length - 1; i >= 0; i--) {
        const el = zoneRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          setActiveIndex(i);
          return;
        }
      }
      setActiveIndex(0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerH]);

  return (
    <div ref={sectionRef}>
      {/* Sticky thumbnail bar */}
      <div
        className="sticky z-20 bg-white border-b border-gray-200"
        style={{ top: headerH, height: THUMB_BAR_HEIGHT }}
      >
        <div className="mx-auto px-6 md:w-[90%] h-full flex items-center justify-center md:justify-end gap-6 md:gap-10">
          {team.map((member, i) => (
            <button
              key={member.name}
              onClick={() => {
                const el = zoneRefs.current[i];
                if (el) {
                  const y =
                    el.getBoundingClientRect().top +
                    window.scrollY -
                    headerH - THUMB_BAR_HEIGHT;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer group"
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  activeIndex === i
                    ? "ring-2 ring-blue scale-110 shadow-lg"
                    : "opacity-50 grayscale group-hover:opacity-80 group-hover:grayscale-0"
                }`}
              >
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} for Speak Arizona`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-xs font-heading font-semibold transition-colors duration-300 hidden md:block ${
                  activeIndex === i ? "text-blue" : "text-text-light"
                }`}
              >
                {member.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Card scroll zones */}
      {team.map((member, i) => (
        <div
          key={member.name}
          ref={(el) => {
            zoneRefs.current[i] = el;
          }}
          style={{ minHeight: "70vh" }}
        >
          <div
            className="sticky overflow-hidden pt-6 pb-6 md:pt-3 md:pb-3"
            style={{ top: headerH + THUMB_BAR_HEIGHT }}
          >
            <div
              className="mx-4 md:mx-auto md:w-[90%] rounded-xl overflow-hidden shadow-xl bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/gradient-card.webp')",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr]">
                {/* Photo — mobile: full width at top */}
                <div className="relative aspect-[5/4] md:hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} for Speak Arizona`}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Photo — desktop: square with rounded corners */}
                <div className="hidden md:flex items-center justify-start p-10">
                  <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role} for Speak Arizona`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center p-8 md:py-10 md:pr-10 md:pl-0">
                  <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-yellow font-heading font-semibold text-lg mb-6">
                    {member.role}
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {member.description}
                  </p>
                  {(member.linkedin || member.website) && (
                    <div className="mt-4 flex items-center gap-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                      {member.website && (
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s website`}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
