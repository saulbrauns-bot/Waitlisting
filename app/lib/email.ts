import { Resend } from 'resend';
import { getEnv } from './requireEnv';
import { randomBytes } from 'crypto';
import WaitlistConfirmationEmail from '@/app/emails/WaitlistConfirmationEmail';

/**
 * Email service for sending transactional emails via Resend
 *
 * Setup instructions:
 * 1. Sign up at https://resend.com
 * 2. Get your API key from the dashboard
 * 3. Add RESEND_API_KEY to your .env.local file
 * 4. Verify your domain (or use onboarding@resend.dev for testing)
 */

// Initialize Resend client
let resend: Resend | null = null;

try {
  const resendApiKey = getEnv('RESEND_API_KEY');
  resend = new Resend(resendApiKey);
} catch (error) {
  console.warn('Resend API key not configured. Email sending will be disabled.');
}

/**
 * Generate correlation ID for request tracing
 */
function generateCorrelationId(): string {
  return randomBytes(8).toString('hex');
}

/**
 * Send waitlist confirmation email
 *
 * @param to - Recipient email address
 * @param name - User's name (optional, will extract first name for greeting)
 * @param confirmationToken - Secure confirmation token for single-use verification
 * @param recordId - Database record ID for logging
 * @returns Promise with email send result
 */
export async function sendWaitlistConfirmation(
  to: string,
  name?: string,
  confirmationToken?: string,
  recordId?: string
): Promise<{ success: boolean; error?: string; correlationId: string }> {
  // Extract first name from full name for personalized greeting
  const firstName = name ? name.split(' ')[0] : undefined;
  const correlationId = generateCorrelationId();

  console.log('[waitlist_email_send_start]', {
    correlationId,
    email: to,
    recordId,
    timestamp: new Date().toISOString(),
  });

  // If Resend is not configured, log and return success (dev mode)
  if (!resend) {
    console.log('[waitlist_email_send_skip]', {
      correlationId,
      email: to,
      recordId,
      reason: 'resend_not_configured',
    });
    return { success: true, correlationId };
  }

  try {
    const confirmUrl = confirmationToken
      ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/confirm?token=${confirmationToken}`
      : undefined;

    // Use environment variables for email configuration
    // Development: onboarding@resend.dev (no domain verification needed)
    // Production: Verify your domain in Resend dashboard first
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const replyTo = process.env.RESEND_REPLY_TO || 'saulbrauns@gmail.com';

    const { data, error } = await resend.emails.send({
      from: `Bridge <${fromEmail}>`,
      replyTo: replyTo,
      to: [to],
      subject: "Thanks for your interest in Bridge",
      react: WaitlistConfirmationEmail({ firstName, confirmUrl }),
    });

    if (error) {
      console.error('[waitlist_email_send_error]', {
        correlationId,
        email: to,
        recordId,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      return { success: false, error: error.message, correlationId };
    }

    console.log('[waitlist_email_send_ok]', {
      correlationId,
      email: to,
      recordId,
      messageId: data?.id,
      timestamp: new Date().toISOString(),
    });
    return { success: true, correlationId };
  } catch (error) {
    console.error('[waitlist_email_send_error]', {
      correlationId,
      email: to,
      recordId,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      correlationId,
    };
  }
}

/**
 * Validate email configuration
 * Useful for health checks and debugging
 */
export function isEmailConfigured(): boolean {
  return resend !== null;
}
