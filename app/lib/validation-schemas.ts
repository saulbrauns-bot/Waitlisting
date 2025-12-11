import { z } from 'zod';

/**
 * Shared validation schema for waitlist signups
 * Used on both client and server for consistent validation
 */
export const waitlistSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(200, 'Name must be 200 characters or less')
    .transform((val) => val.trim().replace(/\s+/g, ' ')),
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.trim().toLowerCase()),
  studentEmail: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.trim().toLowerCase())
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(200, 'Location must be 200 characters or less')
    .transform((val) => val.trim())
    .optional()
    .or(z.literal('')),
  interestType: z.enum(['user', 'investor', 'partner', 'follower'], {
    message: 'Please select what best describes your interest',
  }),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
