"use client";

import React, { useEffect, useState } from "react";

interface SignupNotification {
  name: string;
  industry: string;
  timeAgo: string;
}

const MOCK_SIGNUPS: SignupNotification[] = [
  { name: "Sarah L.", industry: "Finance", timeAgo: "2 minutes ago" },
  { name: "Michael T.", industry: "Tech", timeAgo: "5 minutes ago" },
  { name: "Emily R.", industry: "Consulting", timeAgo: "8 minutes ago" },
  { name: "David K.", industry: "Law", timeAgo: "12 minutes ago" },
  { name: "Jessica M.", industry: "Medicine", timeAgo: "15 minutes ago" },
  { name: "Alex P.", industry: "Finance", timeAgo: "18 minutes ago" },
  { name: "Rachel W.", industry: "Tech", timeAgo: "22 minutes ago" },
  { name: "James H.", industry: "Consulting", timeAgo: "25 minutes ago" },
];

/**
 * Live social proof banner showing recent signups
 * Creates FOMO and urgency with scrolling notifications
 */
export default function LiveSocialProof() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show component after a brief delay for dramatic effect
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Duplicate items for seamless infinite scroll
  const duplicatedSignups = [...MOCK_SIGNUPS, ...MOCK_SIGNUPS];

  if (!isVisible) return null;

  return (
    <section className="bg-bridge-blue/5 border-y border-bridge-blue/10 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-bridge-blue rounded-full animate-pulse" />
            <span className="text-sm font-medium text-bridge-text">
              Live Activity
            </span>
          </div>
          <span className="text-sm text-bridge-text-muted">
            Professionals joining Bridge right now
          </span>
        </div>

        {/* Infinite scrolling notifications */}
        <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            className="flex gap-4 motion-safe:animate-[scroll_40s_linear_infinite]"
            style={{ willChange: "transform" }}
          >
            {duplicatedSignups.map((signup, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-white/80 backdrop-blur-sm border border-bridge-border rounded-xl px-4 py-3 flex items-center gap-3 min-w-[280px]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bridge-blue to-bridge-blue-dark flex items-center justify-center text-white font-medium">
                  {signup.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-bridge-text text-sm">
                      {signup.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-bridge-blue/10 text-bridge-blue">
                      {signup.industry}
                    </span>
                  </div>
                  <p className="text-xs text-bridge-text-muted">
                    Joined {signup.timeAgo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-medium text-bridge-blue">500+</div>
            <div className="text-xs text-bridge-text-muted">Professionals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-bridge-blue">NYC</div>
            <div className="text-xs text-bridge-text-muted">Launching first</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-bridge-blue">Mar 1</div>
            <div className="text-xs text-bridge-text-muted">Launch Date</div>
          </div>
        </div>
      </div>
    </section>
  );
}
