"use client";

import React, { useEffect, useState } from "react";
import { NAV_LINKS } from "@/app/constants/landing-content";

const SCROLL_THRESHOLD = 96;

export default function StickySubnav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-40 border-b border-bridge-border backdrop-blur transition-opacity duration-300 bg-bridge-background/70 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-8 py-3 flex gap-2">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-1.5 rounded-full border border-bridge-border text-sm hover:bg-bridge-surface transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
