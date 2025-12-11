/**
 * Utility for generating unique referral codes
 */

/**
 * Generates a referral code based on user data
 * Format: FIRSTNAME + random 4-digit number
 * Example: SARAH2847
 */
export function generateRefCode(name: string): string {
  // Extract first name from full name
  const firstName = name.split(' ')[0] || name;

  const cleanName = firstName
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 10); // Max 10 chars from name

  const randomDigits = Math.floor(1000 + Math.random() * 9000);

  return `${cleanName}${randomDigits}`;
}
