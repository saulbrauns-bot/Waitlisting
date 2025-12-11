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
  { href: "#waitlist", label: "Get Started" },
];

// Why Bridge features
export const WHY_BRIDGE_FEATURES: FeatureItem[] = [
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
    title: "Express Your Interest",
    description: "Be among the first to experience intentional dating.",
  },
} as const;

// Footer content
export const FOOTER = {
  brandName: "Bridge",
  copyright: "© 2025 Bridge. The first community-driven dating experience.",
} as const;

// FAQ Section
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "When does Bridge launch?",
    answer: "Bridge is launching in phases starting with college campuses. Express your interest to be notified when we're available in your area.",
  },
  {
    question: "How does matching work?",
    answer: "You'll receive one thoughtfully curated match at a time based on compatibility, preferences, and community validation. Quality over quantity.",
  },
  {
    question: "Who is Bridge for?",
    answer: "Bridge is designed for busy people who value intentional dating over endless swiping. We're starting with college students and young professionals.",
  },
  {
    question: "What makes Bridge different?",
    answer: "Unlike other apps, Bridge delivers one quality match at a time—not endless profiles. We combine algorithmic matching with community insight for better compatibility.",
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
