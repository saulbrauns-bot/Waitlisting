"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CountUpBadge from "@/app/components/ui/CountUpBadge";
import { generateRefCode } from "@/app/lib/refcode";
import {
  INTEREST_TYPE_OPTIONS,
  INTEREST_TYPE_LABEL,
  FORM_PLACEHOLDERS,
} from "@/app/constants/form-config";

type FormState = {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  interestType: string;
  smsConsent: boolean;
};

export default function WaitlistSection() {
  const router = useRouter();
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    location: "",
    interestType: "",
    smsConsent: false,
  });
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [loading, setLoading] = React.useState(false);

  const emailValid = React.useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    [form.email]
  );
  const nameValid = form.name.trim().length > 1;
  const interestTypeValid = ["user", "investor", "partner", "follower"].includes(
    form.interestType
  );
  const hasPhone = (form.phone?.trim() || "").length > 0;
  const smsConsentValid = !hasPhone || form.smsConsent;
  const isValid = nameValid && emailValid && interestTypeValid && smsConsentValid;

  function onBlur(field: string) {
    setTouched((p) => ({ ...p, [field]: true }));
  }
  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, interestType: true, smsConsent: true });
    if (!isValid) return;
    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone?.trim() || "",
          location: form.location?.trim() || "",
          interestType: form.interestType,
        }),
      });

      const result = await response.json();

      if (result.ok === true && result.duplicate === true) {
        alert("You're already on the list! We'll be in touch.");
        setLoading(false);
        return;
      }

      if (result.ok === true && result.id) {
        const refCode = generateRefCode(form.name);
        const primaryEmail = form.email.trim().toLowerCase();
        const isRiceEmail = primaryEmail.endsWith("@rice.edu");

        const params = new URLSearchParams({
          name: form.name,
          email: form.email,
          refCode: refCode,
        });

        if (isRiceEmail) {
          router.push(`/confirmation/rice?${params.toString()}`);
        } else {
          router.push(`/confirmation/general?${params.toString()}`);
        }
        return;
      }

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
    <section id="waitlist" className="py-12 sm:py-14 md:py-16 lg:py-20 bg-bridge-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-bridge-text mb-4 sm:mb-6">
          Express Your <span className="text-bridge-blue">Interest</span>
        </h2>
        <p className="text-bridge-text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
          Whether you want to use Bridge, invest, partner, or just stay updated.
        </p>

        {/* CountUp badge */}
        <div className="mt-4 sm:mt-6 flex justify-center">
          <CountUpBadge />
        </div>

        {/* Card */}
        <div className="mt-6 sm:mt-8 mx-auto max-w-2xl rounded-2xl md:rounded-3xl border border-bridge-border bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]">
          <form noValidate onSubmit={onSubmit} className="p-4 sm:p-6 md:p-8 text-left">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name (required) */}
              <div>
                <Label htmlFor="name">Name*</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  onBlur={() => onBlur("name")}
                  aria-invalid={touched.name && !nameValid}
                  aria-describedby="nameHelp"
                  placeholder={FORM_PLACEHOLDERS.NAME}
                  className="mt-1"
                  required
                />
                {touched.name && !nameValid && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    Enter your name
                  </p>
                )}
              </div>

              {/* Email (required) */}
              <div>
                <Label htmlFor="email">Email*</Label>
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
                  placeholder={FORM_PLACEHOLDERS.EMAIL}
                  className="mt-1"
                  required
                />
                <p id="emailHelp" className="mt-1 text-xs text-bridge-text-muted">
                  Use your student email (.edu) if you have one.
                </p>
                {touched.email && !emailValid && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    Enter a valid email
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder={FORM_PLACEHOLDERS.PHONE}
                  className="mt-1"
                />
                <div className="mt-3 flex items-start gap-2">
                  <Checkbox
                    id="smsConsent"
                    checked={form.smsConsent}
                    onCheckedChange={(checked) => {
                      update("smsConsent", checked === true);
                      setTouched((p) => ({ ...p, smsConsent: true }));
                    }}
                    aria-invalid={touched.smsConsent && !smsConsentValid}
                    className={
                      touched.smsConsent && !smsConsentValid
                        ? "border-red-600"
                        : ""
                    }
                  />
                  <label
                    htmlFor="smsConsent"
                    className="text-xs text-bridge-text-secondary leading-relaxed cursor-pointer select-none"
                  >
                    I agree to receive SMS/text messages from Bridge for one-time verification codes if I download the app. Messages will never include marketing or promotions.
                  </label>
                </div>
                {hasPhone && touched.smsConsent && !smsConsentValid && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    Please consent to receive SMS verification codes
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="address-level2"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder={FORM_PLACEHOLDERS.LOCATION}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Interest type dropdown (required) - centered */}
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-md">
                <Label htmlFor="interestType" className="text-center block">
                  {INTEREST_TYPE_LABEL}*
                </Label>
                <Select
                  value={form.interestType}
                  onValueChange={(value) => update("interestType", value)}
                >
                  <SelectTrigger
                    id="interestType"
                    className={`mt-1 w-full ${
                      touched.interestType && !interestTypeValid
                        ? "border-red-600 aria-invalid:border-red-600"
                        : ""
                    }`}
                    aria-invalid={touched.interestType && !interestTypeValid}
                    aria-describedby="interestTypeHelp"
                  >
                    <SelectValue placeholder="Select your interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {INTEREST_TYPE_OPTIONS.filter((opt) => opt.value !== "").map(
                      (option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {touched.interestType && !interestTypeValid && (
                  <p role="alert" className="mt-1 text-xs text-red-600 text-center">
                    Please select what best describes your interest
                  </p>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full rounded-2xl h-12 text-sm sm:text-base relative overflow-hidden ${
                  isValid && !loading ? "shimmer-button" : ""
                }`}
                aria-live="polite"
              >
                {loading ? "Joining..." : "Join the list"}
              </Button>
              <p className="mt-3 text-xs text-bridge-text-muted text-center">
                No spam. We never sell your data.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
