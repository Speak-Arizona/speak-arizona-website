"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MobileMenuProps = {
  variant?: "light" | "dark";
};

export default function MobileMenu({ variant = "dark" }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const iconColor = variant === "light" ? "text-white" : "text-text";

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <svg
          className={`w-7 h-7 ${iconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute right-0 top-10 bg-white rounded-2xl shadow-lg py-4 px-6 space-y-3 min-w-[160px] z-50"
        >
          <Link
            href="/about"
            className="block font-heading font-medium text-text hover:text-black"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/news"
            className="block font-heading font-medium text-text hover:text-black"
            onClick={() => setOpen(false)}
          >
            News
          </Link>
          <Link
            href="/contact"
            className="block font-heading font-medium text-text hover:text-black"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}
