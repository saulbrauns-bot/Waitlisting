"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/app/constants/landing-content";
import Icon from "@/app/components/ui/Icon";

interface FAQSectionProps {
  backgroundColor?: string;
}

/**
 * FAQ Section with accordion-style Q&A
 */
export default function FAQSection({ backgroundColor }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-24 md:py-32"
      style={backgroundColor ? { backgroundColor } : { backgroundColor: "var(--color-bridge-background)" }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-bridge-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-bridge-text-muted text-lg">
            Everything you need to know about Bridge
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-bridge-border rounded-xl overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-bridge-blue-light focus:ring-inset"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-bridge-text pr-8">
                  {item.question}
                </span>
                <svg
                  className={`h-5 w-5 text-bridge-blue flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-bridge-text-muted leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-bridge-text-muted mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:hello@bridge.dating"
            className="inline-flex items-center gap-2 text-bridge-blue hover:text-bridge-blue-dark font-medium transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email us at hello@bridge.dating
          </a>
        </div>
      </div>
    </section>
  );
}
