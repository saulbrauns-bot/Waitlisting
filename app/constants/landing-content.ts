/**
 * Landing page content constants
 * Centralized data for sections, features, and copy
 */

export interface StepItem {
  num: number;
  title: string;
  desc: string;
}

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
  { href: "#how", label: "How it works" },
  { href: "#why", label: "Why Bridge" },
  { href: "#waitlist", label: "Join waitlist" },
];

// How it works steps
export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    num: 1,
    title: "Join the community",
    desc: "Sign up and complete your profile. Share what matters to you and what you're looking for in a partner.",
  },
  {
    num: 2,
    title: "Get matched",
    desc: "Receive one thoughtfully curated match at a time based on real compatibility and community validation.",
  },
  {
    num: 3,
    title: "Connect meaningfully",
    desc: "No endless swiping. Just quality conversations with intention and a 3-day window to connect.",
  },
];

// Why Bridge features
export const WHY_BRIDGE_FEATURES: FeatureItem[] = [
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Time-respectful",
    desc: "One curated match at a time — not endless scrolling.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Community-validated",
    desc: "Compatibility informed by real human insight.",
  },
  {
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Built for professionals",
    desc: "Designed for people who value intention over volume.",
  },
];

// Section titles and descriptions
export const SECTIONS = {
  HOW: {
    id: "how",
    title: "How it works",
    description: "Three simple steps to meaningful connections",
  },
  WHY: {
    id: "why",
    title: "Why Bridge",
    description: "Dating designed for people who value their time",
  },
  WAITLIST: {
    id: "waitlist",
    title: "Join the waitlist",
    description: "Be among the first to experience thoughtful dating in NYC.",
  },
} as const;

// Footer content
export const FOOTER = {
  brandName: "Bridge",
  copyright: "© 2025 Bridge. Dating for busy professionals.",
} as const;
