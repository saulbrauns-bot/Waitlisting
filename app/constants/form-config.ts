/**
 * Form configuration constants
 * Centralized configuration for form messages, placeholders, and options
 */

export const FORM_MESSAGES = {
  SUCCESS: {
    TITLE: "You're on the list!",
    DESCRIPTION: "We'll keep you in the loop.",
  },
  DESCRIPTION: "Be among the first to know about Bridge",
  DISCLAIMER: "We'll only send you important updates. No spam.",
  SUBMIT_BUTTON: "Join the list",
  SUBMIT_BUTTON_COMPACT: "Join",
} as const;

export const FORM_PLACEHOLDERS = {
  NAME: "Your name",
  EMAIL: "you@example.com",
  EMAIL_COMPACT: "you@example.com",
  STUDENT_EMAIL: "you@university.edu",
  PHONE: "(555) 555-5555",
  LOCATION: "City, State",
} as const;

export const INTEREST_TYPE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "", label: "Select your interest" },
  { value: "user", label: "I'd want to use Bridge" },
  { value: "investor", label: "I'm interested in investing" },
  { value: "partner", label: "I want to partner/collaborate" },
  { value: "follower", label: "Just want to stay in the loop" },
];

export const INTEREST_TYPE_LABEL = "What best describes your interest?";
