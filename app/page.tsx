"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { useState } from "react";
import { motion } from "motion/react";

export default function HomePage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "New York City",
    industry: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
  };

  const handleBlur = (field: string) => {
    const errors: Record<string, string> = {};

    if (field === "email" && formData.email) {
      if (!validateEmail(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (field === "phoneNumber" && formData.phoneNumber) {
      if (!validatePhone(formData.phoneNumber)) {
        errors.phoneNumber = "Please enter a valid phone number";
      }
    }

    if (field === "firstName" && !formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (field === "lastName" && !formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    setFormErrors({ ...formErrors, ...errors });
  };

  const isFormValid = () => {
    return (
      formData.email &&
      validateEmail(formData.email) &&
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.phoneNumber &&
      validatePhone(formData.phoneNumber)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // For now, just show success (backend integration later)
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <BackgroundBeams className="absolute inset-0" />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 via-transparent to-transparent"></div>

        <div className="relative z-10 px-6 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Dating for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent font-extrabold">
                  busy professionals
                </span>
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 h-3 bg-gradient-to-r from-sky-500/30 via-cyan-500/30 to-sky-600/30 blur-sm"
                />
              </span>
            </h1>
            <p className="mt-8 text-xl text-slate-300 sm:text-2xl font-light">
              One curated match at a time. <span className="text-sky-400 font-medium">No swiping.</span> <span className="text-sky-400 font-medium">No noise.</span>
            </p>
            <div className="mt-12 flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-cyan-600 text-white hover:from-sky-600 hover:to-cyan-700 px-10 py-7 text-lg shadow-2xl shadow-sky-500/50 transition-all hover:shadow-sky-500/70 hover:scale-105 border-0"
                onClick={() => {
                  document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Join the waitlist
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
              How it works
            </h2>
            <p className="text-center text-slate-600 max-w-2xl mx-auto mb-8 text-lg">
              Three simple steps to meaningful connections
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                num: 1,
                title: "Join the community",
                desc: "Sign up and complete your profile. Share what matters to you and what you're looking for in a partner.",
                delay: 0.1,
              },
              {
                num: 2,
                title: "Get matched",
                desc: "Receive one thoughtfully curated match at a time based on real compatibility and community validation.",
                delay: 0.2,
              },
              {
                num: 3,
                title: "Connect meaningfully",
                desc: "No endless swiping. Just quality conversations with intention and a 3-day window to connect.",
                delay: 0.3,
              },
            ].map((item) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <Card className="group border-slate-200 bg-white transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-sky-400 hover:-translate-y-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-2xl font-bold text-white shadow-lg shadow-sky-500/30 transition-all group-hover:shadow-xl group-hover:shadow-cyan-500/50 group-hover:scale-110">
                      {item.num}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bridge Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-6 py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-500/10 via-cyan-500/5 to-transparent"></div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Why Bridge
            </h2>
            <p className="text-center text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
              Dating designed for people who value their time
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Time-respectful",
                desc: "One curated match at a time, not endless scrolling. Dating that fits your schedule.",
                delay: 0.1,
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Community-validated",
                desc: "Compatibility backed by real human insight, not just algorithms.",
                delay: 0.2,
              },
              {
                icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "Built for professionals",
                desc: "Designed for busy people who value intention over volume.",
                delay: 0.3,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-sky-400/50 hover:shadow-2xl hover:shadow-sky-500/20 hover:-translate-y-2"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 shadow-lg shadow-sky-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-cyan-500/50">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 px-6 py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center gap-4"
        >
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-6 py-2.5 text-base font-semibold backdrop-blur-sm">
            500+ NYC Professionals
          </Badge>
          <p className="text-2xl font-bold text-white sm:text-3xl">
            Join the early list for thoughtful dating
          </p>
          <p className="text-sky-50 text-lg max-w-2xl">
            Be among the first to experience a new way of connecting in NYC
          </p>
        </motion.div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist-form" className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Join the waitlist
            </h2>
            <p className="mt-4 text-center text-slate-600 text-lg">
              Be among the first to experience thoughtful dating in NYC.
            </p>
          </motion.div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    onBlur={() => handleBlur("firstName")}
                    className={`${formErrors.firstName ? "border-red-500" : ""}`}
                    required
                  />
                  {formErrors.firstName && (
                    <p className="text-sm text-red-600">{formErrors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    onBlur={() => handleBlur("lastName")}
                    className={`${formErrors.lastName ? "border-red-500" : ""}`}
                    required
                  />
                  {formErrors.lastName && (
                    <p className="text-sm text-red-600">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={`${formErrors.email ? "border-red-500" : ""}`}
                  required
                />
                {formErrors.email && (
                  <p className="text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  Phone number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  onBlur={() => handleBlur("phoneNumber")}
                  className={`${formErrors.phoneNumber ? "border-red-500" : ""}`}
                  placeholder="(555) 123-4567"
                  required
                />
                {formErrors.phoneNumber && (
                  <p className="text-sm text-red-600">{formErrors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleInputChange("city", value)}
                >
                  <SelectTrigger id="city" className="w-full">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New York City">New York City</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="Boston">Boston</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => handleInputChange("industry", value)}
                >
                  <SelectTrigger id="industry" className="w-full">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-sky-500 to-cyan-600 text-white hover:from-sky-600 hover:to-cyan-700 shadow-2xl shadow-sky-500/50 transition-all hover:shadow-cyan-500/60 hover:scale-105 text-lg py-7"
                  disabled={!isFormValid()}
                >
                  Join the waitlist →
                </Button>
              </motion.div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-sky-600 border border-sky-400 p-10 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white mb-6 shadow-xl"
              >
                <svg
                  className="h-10 w-10 text-sky-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h3 className="relative text-2xl font-bold text-white">You're on the list!</h3>
              <p className="relative mt-3 text-sky-50 text-lg">
                We'll email you when we open in NYC.
              </p>
              <Badge variant="secondary" className="relative mt-6 bg-white/20 text-white border-white/30 px-5 py-2 backdrop-blur-sm font-semibold">
                Welcome to Bridge
              </Badge>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-cyan-500 bg-clip-text text-transparent">
              Bridge
            </div>
            <p className="text-sm text-slate-400 text-center">
              © 2025 Bridge. Dating for busy professionals.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
