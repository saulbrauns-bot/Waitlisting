"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CountUpBadge from "@/app/components/ui/CountUpBadge";
import { generateRefCode } from "@/app/lib/refcode";

type FormState = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  source: string;
};

export default function WaitlistSection() {
  const router = useRouter();
  const [form, setForm] = React.useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    source: "",
  });
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [loading, setLoading] = React.useState(false);

  const emailValid = React.useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    [form.email]
  );
  const firstNameValid = form.firstName.trim().length > 1;
  const sourceValid = ['email', 'friend', 'other'].includes(form.source);
  const isValid = firstNameValid && emailValid && sourceValid;

  function onBlur(field: string) {
    setTouched((p) => ({ ...p, [field]: true }));
  }
  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ firstName: true, email: true, source: true });
    if (!isValid) return;
    setLoading(true);

    try {
      // Call backend API
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName?.trim() || "",
          email: form.email.trim(),
          phone: form.phone?.trim() || "",
          source: form.source,
        }),
      });

      const result = await response.json();

      // Check for duplicate FIRST
      if (result.ok === true && result.duplicate === true) {
        // Show duplicate message inline
        alert("You're already on the waitlist! We'll email you when we launch.");
        setLoading(false);
        return;
      }

      // Success - redirect to confirmation
      if (result.ok === true && result.id) {
        // Generate refCode for confirmation page
        const refCode = generateRefCode(form.firstName);

        const params = new URLSearchParams({
          firstName: form.firstName,
          email: form.email,
          refCode: refCode,
        });

        router.push(`/confirmation?${params.toString()}`);
        return;
      }

      // Handle validation errors or other failures
      if (result.ok === false) {
        alert(result.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch (error) {
      alert("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <section id="waitlist" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-bridge-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-bridge-text mb-4 sm:mb-6">
          Join the <span className="text-bridge-blue">NYC</span> Waitlist
        </h2>
        <p className="text-bridge-text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
          Be among the first to experience thoughtful online dating in <span className="text-bridge-blue">NYC</span>.
        </p>

        {/* CountUp badge with confetti */}
        <div className="mt-4 sm:mt-6 flex justify-center">
          <CountUpBadge />
        </div>

        {/* Card */}
        <div className="mt-6 sm:mt-8 mx-auto max-w-2xl rounded-2xl md:rounded-3xl border border-bridge-border bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]">
          <form noValidate onSubmit={onSubmit} className="p-4 sm:p-6 md:p-8 text-left">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First name (required) */}
              <div>
                <Label htmlFor="firstName">First name*</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  onBlur={() => onBlur("firstName")}
                  aria-invalid={touched.firstName && !firstNameValid}
                  aria-describedby="firstNameHelp"
                  placeholder="Emma"
                  className="mt-1"
                  required
                />
                <p id="firstNameHelp" className="mt-1 text-xs text-bridge-text-muted">
                  Required
                </p>
                {touched.firstName && !firstNameValid && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    Enter your first name
                  </p>
                )}
              </div>

              {/* Last name (optional) */}
              <div>
                <Label htmlFor="lastName">Last name (optional)</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Morgan"
                  className="mt-1"
                />
              </div>

              {/* Email (required) */}
              <div>
                <Label htmlFor="email">Personal Email*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => onBlur("email")}
                  aria-invalid={touched.email && !emailValid}
                  aria-describedby="emailHelp"
                  placeholder="emma@gmail.com"
                  className="mt-1"
                  required
                />
                <p id="emailHelp" className="mt-1 text-xs text-bridge-text-muted">
                  We'll notify you when Bridge launches. No spam, ever.
                </p>
                {touched.email && !emailValid && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    Enter a valid email
                  </p>
                )}
              </div>

              {/* Phone (recommended) */}
              <div>
                <Label htmlFor="phone">Phone (recommended)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-bridge-text-muted">
                  Enter your number for faster access to your reward.
                </p>
              </div>

            </div>

            {/* Source dropdown (required) - centered */}
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-md">
                <Label htmlFor="source" className="text-center block">How did you hear about us?*</Label>
                <Select
                  value={form.source}
                  onValueChange={(value) => update("source", value)}
                >
                  <SelectTrigger
                    id="source"
                    className={`mt-1 w-full ${
                      touched.source && !sourceValid
                        ? "border-red-600 aria-invalid:border-red-600"
                        : ""
                    }`}
                    aria-invalid={touched.source && !sourceValid}
                    aria-describedby="sourceHelp"
                  >
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p id="sourceHelp" className="mt-1 text-xs text-bridge-text-muted text-center">
                  Required
                </p>
                {touched.source && !sourceValid && (
                  <p role="alert" className="mt-1 text-xs text-red-600 text-center">
                    Please select how you heard about us
                  </p>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full rounded-2xl h-12 text-base relative overflow-hidden ${
                  isValid && !loading ? 'shimmer-button' : ''
                }`}
                aria-live="polite"
              >
                {loading ? "Joining…" : "Join 1,000+ New Yorkers waiting for Bridge"}
              </Button>
              <p className="mt-3 text-xs text-bridge-text-muted text-center">
                Only 2,500 spots.
              </p>
              <p className="mt-2 text-xs text-bridge-text-muted text-center">
                No spam. We never sell your data.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
