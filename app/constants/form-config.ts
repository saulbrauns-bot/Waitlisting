/**
 * Form configuration constants
 * Centralized configuration for form messages, placeholders, and options
 */

export const FORM_MESSAGES = {
  SUCCESS: {
    TITLE: "You're on the list!",
    DESCRIPTION: "We'll email you when we open in NYC.",
  },
  DESCRIPTION: "Be among the first to experience thoughtful dating in NYC",
  DISCLAIMER:
    "We'll only notify you when launching and to claim your benefits. No spam.",
  SUBMIT_BUTTON: "Claim your early member spot",
  SUBMIT_BUTTON_COMPACT: "Join waitlist",
} as const;

export const FORM_PLACEHOLDERS = {
  FIRST_NAME: "Emma",
  LAST_NAME: "Last name",
  EMAIL: "Personal email (Emma@gmail.com)",
  EMAIL_COMPACT: "Emma@gmail.com",
  PHONE: "Phone number",
} as const;

export const CITY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "New York City", label: "New York City" },
];

export const CITY_MESSAGE = "More cities coming soon";

export const REFERRAL_SOURCE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "", label: "Select an option" },
  { value: "email", label: "Email" },
  { value: "friend", label: "Friend" },
  { value: "other", label: "Other" },
];

export const REFERRAL_SOURCE_LABEL = "How did you hear about us?";
