import { z } from 'zod';

/**
 * Shared validation schema for waitlist signups
 * Used on both client and server for consistent validation
 */
export const waitlistSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name must be 100 characters or less')
    .transform((val) => val.trim().replace(/\s+/g, ' ')),
  lastName: z
    .string()
    .max(100, 'Last name must be 100 characters or less')
    .transform((val) => val.trim().replace(/\s+/g, ' '))
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .or(z.literal('')),
  source: z.enum(['email', 'friend', 'other'], {
    message: 'Please let us know how you heard about us',
  }),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
