"use client";

import React, { useEffect, useState } from "react";
import { NAV_LINKS } from "@/app/constants/landing-content";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show header after typing animation completes (approximately 3 seconds)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-bridge-border/30 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-bridge-text">Bridge</div>

          {/* Navigation buttons */}
          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-bridge-text-secondary hover:text-bridge-blue hover:bg-bridge-blue/5 rounded-lg transition-all duration-200 ease-out"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
