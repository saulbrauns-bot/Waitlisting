"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

/**
 * CountUpBadge - Celebratory badge with CountUp animation and blue check icon
 * Triggers glow animation when badge becomes visible and count completes
 */
export default function CountUpBadge() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [startCountUp, setStartCountUp] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldGlow, setShouldGlow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Delay CountUp by 250ms
            setTimeout(() => {
              setStartCountUp(true);
            }, 250);

            // Trigger glow when CountUp finishes (250ms delay + 2200ms duration = 2450ms)
            setTimeout(() => {
              setShouldGlow(true);
            }, 2450);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of badge is visible
    );

    if (badgeRef.current) {
      observer.observe(badgeRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={badgeRef}
      className={`inline-flex items-center gap-2 rounded-full border border-bridge-blue/30 bg-bridge-blue/10 px-4 py-2.5 text-bridge-blue transition-all duration-1000 ${
        shouldGlow ? "animate-glow" : ""
      }`}
    >
      {/* Blue check icon */}
      <svg
        className="w-4 h-4 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>

      {/* CountUp text - delayed by 250ms after visibility */}
      <span className="text-sm font-medium">
        {startCountUp ? (
          <CountUp
            start={0}
            end={1000}
            duration={2.2}
            separator=","
            suffix="+ early members already joined"
          />
        ) : (
          "0+ early members already joined"
        )}
      </span>

      {/* Glow animation styles */}
      <style jsx>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 0 rgba(74, 144, 226, 0);
          }
          50% {
            box-shadow: 0 0 20px 8px rgba(74, 144, 226, 0.6);
          }
          100% {
            box-shadow: 0 0 0 rgba(74, 144, 226, 0);
          }
        }

        .animate-glow {
          animation: glow 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
