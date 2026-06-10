"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps the site Header/Footer so they can be dropped on specific routes.
 * The /links bio page is a standalone "linktree" — it renders without the
 * site nav, marquee banner, or footer for a clean, mobile-first experience.
 */
export default function LayoutChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/links") ?? false;

  return (
    <>
      {!bare && header}
      <main>{children}</main>
      {!bare && footer}
    </>
  );
}
