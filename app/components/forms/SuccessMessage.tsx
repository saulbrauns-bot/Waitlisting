"use client";

import React from "react";
import Button from "@/app/components/ui/Button";
import { shareOrCopy } from "@/app/lib/sharing";

interface SuccessMessageProps {
  firstName: string;
  email: string;
  onShare?: () => void;
}

/**
 * Success message component shown after waitlist form submission
 * Displays confirmation and sharing options
 */
export default function SuccessMessage({
  firstName,
  email,
  onShare,
}: SuccessMessageProps) {
  const handleShare = async () => {
    try {
      const result = await shareOrCopy();

      // TODO: Show appropriate toast based on result.method
      if (result.method === 'clipboard') {
        // Show "Link copied!" toast
      }

      onShare?.();
    } catch (error) {
      // User cancelled, do nothing
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Share failed:', error);
    }
  };

  return (
    <div className="text-center space-y-6 p-8 md:p-10 bg-white/95 rounded-xl border border-bridge-border shadow-lg max-w-lg mx-auto">
      {/* Success Icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bridge-success/10">
        <svg
          className="h-8 w-8 text-bridge-success"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Headline */}
      <div>
        <h3 className="font-heading text-3xl md:text-4xl font-medium text-bridge-text mb-4">
          You&apos;re in.
        </h3>

        {/* Body Text */}
        <p className="text-bridge-text-muted text-base md:text-lg leading-relaxed">
          Thanks, <span className="font-medium text-bridge-text">{firstName}</span>! Your early
          member spot is secured.
          <br />
          We&apos;ll email you at <span className="font-medium text-bridge-text">{email}</span> when we
          launch and when it&apos;s time to claim your one-year free access.
        </p>
      </div>

      {/* Share Section */}
      <div className="pt-4 border-t border-bridge-border">
        <p className="text-bridge-text-muted mb-4 text-sm md:text-base">
          Know someone with a full schedule who&apos;d love Bridge?
        </p>
        <Button onClick={handleShare} variant="secondary">
          Share Bridge with a friend
        </Button>
      </div>
    </div>
  );
}
