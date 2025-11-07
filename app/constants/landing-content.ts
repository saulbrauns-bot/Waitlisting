/**
 * Landing page content constants
 * Centralized data for sections, features, and copy
 */

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface NavLink {
  href: string;
  label: string;
}

// Navigation links
export const NAV_LINKS: NavLink[] = [
  { href: "#why", label: "Why Bridge" },
  { href: "#waitlist", label: "Join Waitlist" },
];

// Why Bridge features
export const WHY_BRIDGE_FEATURES: FeatureItem[] = [
  {
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Built For Busy People",
    desc: "Designed for people with full lives to meet others who get it.",
  },
  {
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    title: "Curated,\nNot Crowded",
    desc: "Every match is chosen with care, powered by AI and refined through real human insight.",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Five Minutes A Day",
    desc: "Because meaningful connection shouldn't feel like another job.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "We Match Better Together",
    desc: "A connected community where friends and users help each other match.",
  },
];

// Section titles and descriptions
export const SECTIONS = {
  WHY: {
    id: "why",
    title: "Why Bridge",
    description: "Dating designed for people who value their time",
  },
  WAITLIST: {
    id: "waitlist",
    title: "Join the waitlist",
    description: "Be among the first to experience thoughtful online dating in NYC.",
  },
} as const;

// Footer content
export const FOOTER = {
  brandName: "Bridge",
  copyright: "© 2025 Bridge. Intentional Dating for Busy People.",
} as const;

// FAQ Section
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "When does Bridge launch?",
    answer: "Bridge opens to early members on March 1, 2025. Waitlist members will receive early access invites based on their signup order.",
  },
  {
    question: "How much does Bridge cost?",
    answer: "After your free year, Bridge is $19/month. Early members keep their 1 year free benefit—that's $228 in value.",
  },
  {
    question: "How does matching work?",
    answer: "Every Sunday at 9 AM, you'll receive one thoughtfully curated match based on compatibility, preferences, and community validation. You have 3 days to connect before the next match.",
  },
  {
    question: "Who is Bridge for?",
    answer: "Bridge is designed for busy NYC professionals aged 22-30 in finance, consulting, medicine, law, and tech who value intentional dating over endless swiping.",
  },
  {
    question: "What makes Bridge different?",
    answer: "Unlike other apps, Bridge delivers one quality match per week—not endless profiles. We combine algorithmic matching with community insight for better compatibility.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Your first year is completely free. After that, you can cancel anytime with no penalty. We're confident you'll love the Bridge experience.",
  },
];

// Early Member Perks
export interface PerkItem {
  icon: string;
  title: string;
  description: string;
}

export const EARLY_MEMBER_PERKS: PerkItem[] = [
  {
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "1 Year Free",
    description: "Full access to Bridge for 12 months at no cost.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Priority Matching",
    description: "Be first in line to receive curated matches every week.",
  },
  {
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    title: "Early Member Badge",
    description: "Stand out with an exclusive badge on your profile.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Exclusive Events",
    description: "Invites to quarterly mixers and community gatherings.",
  },
];
