"use client";

import React, { useState } from "react";
import { waitlistSchema } from "@/app/lib/validation-schemas";
import SocialProofBadge from "@/app/components/ui/SocialProofBadge";
import FormInput from "@/app/components/ui/FormInput";
import FormSelect from "@/app/components/ui/FormSelect";
import Button from "@/app/components/ui/Button";
import SuccessMessage from "@/app/components/forms/SuccessMessage";
import {
  FORM_MESSAGES,
  FORM_PLACEHOLDERS,
  CITY_OPTIONS,
  CITY_MESSAGE,
  REFERRAL_SOURCE_OPTIONS,
  REFERRAL_SOURCE_LABEL,
} from "@/app/constants/form-config";

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
  source: string;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
}

type SubmitState = "idle" | "pending" | "success" | "duplicate";

const DUPLICATE_MESSAGE =
  "You're already on the waitlist! We'll email you when we launch.";

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
    source: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setFieldErrors({});
    setServerError(null);

    // Client-side validation
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      source: formData.source,
    };

    const validation = waitlistSchema.safeParse(payload);
    if (!validation.success) {
      const errors: FieldErrors = {};
      validation.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FieldErrors;
        errors[field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setSubmitState("pending");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json();

      // Check duplicate FIRST before checking for id
      if (result.ok === true && result.duplicate === true) {
        setSubmitState("duplicate");
      } else if (result.ok === true && result.id) {
        setSubmitState("success");
      } else if (result.ok === false && result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
        setSubmitState("idle");
      } else {
        setServerError(
          result.message || "Something went wrong. Please try again."
        );
        setSubmitState("idle");
      }
    } catch (error) {
      setServerError("Network error. Please check your connection and try again.");
      setSubmitState("idle");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    // Clear field error on input change
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear server error on any change
    if (serverError) {
      setServerError(null);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitState === "success") {
    return <SuccessMessage firstName={formData.firstName} email={formData.email} />;
  }

  if (submitState === "duplicate") {
    return (
      <div className="text-center space-y-4 p-8 md:p-10 bg-white/95 rounded-xl border border-bridge-border shadow-lg max-w-lg mx-auto">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bridge-primary/10">
          <svg
            className="h-8 w-8 text-bridge-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-3xl font-medium text-bridge-text">
          Already on the list!
        </h3>
        <p className="text-bridge-text-muted text-base leading-relaxed">
          {DUPLICATE_MESSAGE}
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return <CompactForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} isPending={submitState === "pending"} fieldErrors={fieldErrors} />;
  }

  return (
    <div className="max-w-lg mx-auto">
      {showSocialProof && (
        <div className="mb-8 flex justify-center">
          <SocialProofBadge
            count="1,000+"
            label="early members"
            className="text-sm"
          />
        </div>
      )}

      {serverError && (
        <div className="mb-4 p-4 bg-bridge-error/10 border border-bridge-error/30 rounded-lg text-sm text-bridge-error text-center">
          {serverError}
        </div>
      )}

      <DefaultForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isPending={submitState === "pending"}
        fieldErrors={fieldErrors}
      />
    </div>
  );
}


/**
 * Compact form variant (email only)
 */
interface CompactFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  fieldErrors: FieldErrors;
}

function CompactForm({ formData, onChange, onSubmit, isPending, fieldErrors }: CompactFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <FormInput
          type="email"
          name="email"
          required
          disabled={isPending}
          value={formData.email}
          onChange={onChange}
          error={fieldErrors.email}
          placeholder={FORM_PLACEHOLDERS.EMAIL_COMPACT}
          className="flex-1"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <span className="flex items-center gap-2">Joining...</span>
          ) : (
            FORM_MESSAGES.SUBMIT_BUTTON_COMPACT
          )}
        </Button>
      </div>
    </form>
  );
}

/**
 * Default full form variant
 */
interface DefaultFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  fieldErrors: FieldErrors;
}

function DefaultForm({ formData, onChange, onSubmit, isPending, fieldErrors }: DefaultFormProps) {
  return (
    <div className="bg-white/95 border border-bridge-border rounded-xl p-8 shadow-lg">
      <p className="text-center text-bridge-text-muted mb-6 text-sm">
        {FORM_MESSAGES.DESCRIPTION}
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            type="text"
            name="firstName"
            required
            disabled={isPending}
            value={formData.firstName}
            onChange={onChange}
            error={fieldErrors.firstName}
            placeholder={FORM_PLACEHOLDERS.FIRST_NAME}
          />
          <FormInput
            type="text"
            name="lastName"
            required
            disabled={isPending}
            value={formData.lastName}
            onChange={onChange}
            error={fieldErrors.lastName}
            placeholder={FORM_PLACEHOLDERS.LAST_NAME}
          />
        </div>
        <FormInput
          type="email"
          name="email"
          required
          disabled={isPending}
          value={formData.email}
          onChange={onChange}
          error={fieldErrors.email}
          label="Personal Email*"
          placeholder={FORM_PLACEHOLDERS.EMAIL_COMPACT}
        />
        <FormInput
          type="tel"
          name="phone"
          required
          disabled={isPending}
          value={formData.phone}
          onChange={onChange}
          error={fieldErrors.phone}
          placeholder={FORM_PLACEHOLDERS.PHONE}
        />
        <div>
          <FormSelect
            name="source"
            label={REFERRAL_SOURCE_LABEL}
            required
            value={formData.source}
            onChange={onChange}
            options={REFERRAL_SOURCE_OPTIONS}
            error={fieldErrors.source}
            disabled={isPending}
          />
        </div>
        <div>
          <FormSelect
            name="city"
            required
            value={formData.city}
            onChange={onChange}
            options={CITY_OPTIONS}
            disabled
          />
          <p className="mt-1.5 text-xs text-bridge-text-muted text-center">
            {CITY_MESSAGE}
          </p>
        </div>
        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? (
            <span className="flex items-center justify-center gap-2">Joining...</span>
          ) : (
            FORM_MESSAGES.SUBMIT_BUTTON
          )}
        </Button>
        <p className="text-xs text-bridge-text-muted text-center pt-2">
          {FORM_MESSAGES.DISCLAIMER}
        </p>
      </form>
    </div>
  );
}
