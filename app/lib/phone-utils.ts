import { parsePhoneNumber } from 'libphonenumber-js';

/**
 * Normalize phone number to E.164 format
 * Defaults to US (+1) if no country code provided
 *
 * @param phone - Raw phone number string
 * @returns Normalized phone number in E.164 format (e.g., +12125551234)
 */
export function normalizePhone(phone: string): string {
  try {
    // Try parsing with default region US
    const phoneNumber = parsePhoneNumber(phone, 'US');
    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.format('E.164');
    }
  } catch {
    // Fall back to manual normalization
  }

  // Fallback: strip everything except digits and plus
  const cleaned = phone.replace(/[^\d+]/g, '');

  // If starts with 1 and is 11 digits, add +
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }

  // If 10 digits, assume US
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }

  // Return as-is if already has +
  if (cleaned.startsWith('+')) {
    return cleaned;
  }

  return `+${cleaned}`;
}
