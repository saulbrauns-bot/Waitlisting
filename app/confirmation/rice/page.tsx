"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  copyReferralLink,
  openSMSShare,
  openEmailShare,
} from "@/app/lib/referral";
import { Mail, MessageSquare, Copy, Check } from "lucide-react";

function RiceConfirmationContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const name = searchParams.get("name") || undefined;
  const email = searchParams.get("email") || undefined;
  const refCode = searchParams.get("refCode") || undefined;

  const showShareModule = !!refCode;

  const thanksText = name ? `Thanks for your interest, ${name}!` : "Thanks for your interest!";

  const handleCopyLink = async () => {
    try {
      await copyReferralLink(refCode);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleTextShare = () => {
    try {
      openSMSShare(refCode);
    } catch (error) {
      toast.error("Failed to open SMS");
    }
  };

  const handleEmailShare = () => {
    try {
      openEmailShare(refCode);
    } catch (error) {
      toast.error("Failed to open email client");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-bridge-neutral-bg">
      <div className="w-full max-w-2xl">
        {/* Main Content */}
        <div className="text-center space-y-6 mb-12">
          {/* Headline */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-bridge-primary">
            You're on the list!
          </h1>

          {/* Subcopy */}
          <div className="space-y-3 max-w-xl mx-auto">
            <p className="text-bridge-text-primary text-lg md:text-xl">
              {thanksText}
            </p>
            <p className="text-bridge-text-secondary text-base md:text-lg">
              We're launching our beta at <span className="font-semibold text-bridge-primary">Rice on February 28th</span> — Get Ready!
            </p>
            {email && (
              <p className="text-bridge-text-secondary text-base md:text-lg">
                We'll keep you updated at {email}.
              </p>
            )}
          </div>
        </div>

        {/* Share Module */}
        {showShareModule && (
          <div className="bg-white rounded-xl border border-bridge-border shadow-sm p-8 md:p-10 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-bridge-text-primary">
                Share Bridge with a friend
              </h2>
              <p className="text-bridge-text-secondary text-sm md:text-base">
                Know other Rice students who'd love Bridge? Spread the word!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="w-full h-auto py-4 flex-col gap-2 hover:bg-bridge-primary-light hover:border-bridge-primary transition-colors"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-bridge-success" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
                <span className="text-sm font-medium">
                  {copied ? "Copied!" : "Copy link"}
                </span>
              </Button>

              <Button
                variant="outline"
                onClick={handleTextShare}
                className="w-full h-auto py-4 flex-col gap-2 hover:bg-bridge-primary-light hover:border-bridge-primary transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm font-medium">Text</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleEmailShare}
                className="w-full h-auto py-4 flex-col gap-2 hover:bg-bridge-primary-light hover:border-bridge-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm font-medium">Email</span>
              </Button>
            </div>
          </div>
        )}

        {!showShareModule && (
          <div className="text-center">
            <p className="text-bridge-text-secondary text-sm">
              Referral link unavailable right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RiceConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-bridge-text-secondary">Loading...</p>
        </div>
      }
    >
      <RiceConfirmationContent />
    </Suspense>
  );
}
