"use client";

import React, { useState } from "react";
import SocialProofBadge from "@/app/components/ui/SocialProofBadge";
import FormInput from "@/app/components/ui/FormInput";
import FormSelect from "@/app/components/ui/FormSelect";
import Button from "@/app/components/ui/Button";

interface WaitlistFormProps {
  variant?: "default" | "compact";
  showSocialProof?: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

/**
 * Waitlist form with success state and optional social proof badge
 * Supports both default (full fields) and compact (email only) variants
 */
export default function WaitlistForm({
  variant = "default",
  showSocialProof = false,
}: WaitlistFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "New York City",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual submission logic with Supabase
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4 p-6 bg-white/95 rounded-xl border border-bridge-border shadow-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bridge-success/10">
          <svg
            className="h-7 w-7 text-bridge-success"
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
        <div>
          <h3 className="text-xl font-semibold text-bridge-text mb-2">
            You're on the list!
          </h3>
          <p className="text-bridge-text-muted">
            We'll email you when we open in NYC.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col sm:flex-row gap-2">
          <FormInput
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="flex-1"
          />
          <Button type="submit">Join waitlist</Button>
        </div>
      </form>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {showSocialProof && (
        <div className="mb-8 flex justify-center">
          <SocialProofBadge
            count="1,000+"
            label="founding members"
            className="text-sm"
          />
        </div>
      )}

      <div className="bg-white/95 border border-bridge-border rounded-xl p-8 shadow-lg">
        <p className="text-center text-bridge-text-muted mb-6 text-sm">
          Be among the first to experience thoughtful dating in NYC
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
            />
            <FormInput
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
            />
          </div>
          <FormInput
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <FormInput
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
          <div>
            <FormSelect
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              options={[{ value: "New York City", label: "New York City" }]}
              disabled
            />
            <p className="mt-1.5 text-xs text-bridge-text-muted text-center">
              More cities coming soon
            </p>
          </div>
          <Button type="submit" fullWidth>
            Claim your founding member spot
          </Button>
          <p className="text-xs text-bridge-text-muted text-center pt-2">
            We'll only notify you when launching and to claim your benefits. No spam.
          </p>
        </form>
      </div>
    </div>
  );
}
