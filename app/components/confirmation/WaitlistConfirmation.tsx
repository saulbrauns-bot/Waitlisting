"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  copyReferralLink,
  openSMSShare,
  openEmailShare,
} from "@/app/lib/referral";
import { Mail, MessageSquare, Copy, Check } from "lucide-react";

interface WaitlistConfirmationProps {
  firstName?: string;
  email?: string;
  refCode?: string;
}

/**
 * Confirmation screen shown after successful waitlist signup
 * Displays personalized message and share options with graceful fallbacks
 */
export default function WaitlistConfirmation({
  firstName,
  email,
  refCode,
}: WaitlistConfirmationProps) {
  const [friendPhone, setFriendPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Show share module only if refCode is available
  const showShareModule = !!refCode;

  // Graceful fallback messages
  const headlineText = "You're in.";
  const thanksText = firstName ? `Thanks, ${firstName}.` : "Thanks for joining.";
  const spotText = "Your early-member spot is secured.";
  const emailText = email
    ? `We will email you at ${email} when we launch and to claim your one-year free access.`
    : "We will email you when we launch with instructions to claim your one-year free access.";

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

  const handleInviteFriend = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple phone validation (10+ digits)
    const phoneDigits = friendPhone.replace(/\D/g, "");
    if (!friendPhone || phoneDigits.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement invite endpoint
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: friendPhone, refCode }),
      });

      if (!response.ok) throw new Error("Failed to send invite");

      toast.success("Invite sent!");
      setFriendPhone("");
    } catch (error) {
      toast.error("Failed to send invite. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-bridge-neutral-bg">
      <div className="w-full max-w-2xl">
        {/* Main Content */}
        <div className="text-center space-y-6 mb-12">
          {/* Headline */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-bridge-primary">
            {headlineText}
          </h1>

          {/* Subcopy */}
          <div className="space-y-2 max-w-xl mx-auto">
            <p className="text-bridge-text-primary text-lg md:text-xl">
              {thanksText} {spotText}
            </p>
            <p className="text-bridge-text-secondary text-base md:text-lg">
              {emailText}
            </p>
          </div>
        </div>

        {/* Share Module - Only shown if refCode exists */}
        {showShareModule && (
          <div className="bg-white rounded-xl border border-bridge-border shadow-sm p-8 md:p-10 space-y-6">
            {/* Title & Subtext */}
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-bridge-text-primary">
                Share Bridge with a friend
              </h2>
              <p className="text-bridge-text-secondary text-sm md:text-base">
                Invite someone who would love a calmer way to meet busy New Yorkers.
              </p>
            </div>

            {/* Share Actions */}
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

            {/* Optional Friend Phone Input - DISABLED: /api/invite endpoint not yet implemented */}
            {false && (
              <div className="pt-4 border-t border-bridge-border">
                <form onSubmit={handleInviteFriend} className="space-y-3">
                  <label
                    htmlFor="friend-phone"
                    className="block text-sm font-medium text-bridge-text-secondary text-center"
                  >
                    Or text a friend directly:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="friend-phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="(555) 123-4567"
                      value={friendPhone}
                      onChange={(e) => setFriendPhone(e.target.value)}
                      className="flex-1"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting || !friendPhone}
                      className="bg-bridge-primary hover:bg-bridge-primary-dark text-white"
                    >
                      {isSubmitting ? "Sending..." : "Send invite"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Fallback message when no refCode */}
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
