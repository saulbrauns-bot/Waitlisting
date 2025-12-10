/**
 * Utilities for generating and managing referral links and invite messages
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bridge.app";
const WAITLIST_PATH = "";

interface ReferralLinkParams {
  refCode?: string;
}

/**
 * Generates a referral link with the provided reference code
 * Falls back to base waitlist URL if no code provided
 */
export function generateReferralLink({ refCode }: ReferralLinkParams): string {
  if (!refCode) {
    return `${BASE_URL}${WAITLIST_PATH}`;
  }
  return `${BASE_URL}${WAITLIST_PATH}?ref=${refCode}`;
}

/**
 * Generates a pre-filled SMS message with referral link
 */
export function generateSMSMessage(refCode?: string): string {
  const link = generateReferralLink({ refCode });
  return `I just joined Bridge — a new dating app designed for busy NYC professionals. Thought you might like it: ${link}`;
}

/**
 * Generates email share parameters
 */
export function generateEmailParams(refCode?: string): {
  subject: string;
  body: string;
} {
  const link = generateReferralLink({ refCode });
  return {
    subject: "Join Bridge with me",
    body: `Hey,

I just joined Bridge — a new dating app designed for busy professionals in NYC. Instead of endless swiping, you get one curated match at a time.

I thought you might like it:
${link}

Looking forward to seeing you on there!`,
  };
}

/**
 * Opens native SMS app with pre-filled message
 */
export function openSMSShare(refCode?: string): void {
  const message = encodeURIComponent(generateSMSMessage(refCode));
  window.location.href = `sms:?&body=${message}`;
}

/**
 * Opens email client with pre-filled subject and body
 */
export function openEmailShare(refCode?: string): void {
  const { subject, body } = generateEmailParams(refCode);
  const mailtoLink = `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

/**
 * Copies referral link to clipboard
 * Returns a promise that resolves when copy is complete
 */
export async function copyReferralLink(refCode?: string): Promise<void> {
  const link = generateReferralLink({ refCode });
  await navigator.clipboard.writeText(link);
}
