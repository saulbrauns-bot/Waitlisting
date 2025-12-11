import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { checkRateLimit } from '@/app/lib/rate-limiting';
import { normalizePhone } from '@/app/lib/phone-utils';
import { getIpAddress } from '@/app/lib/request-utils';
import { waitlistSchema, type WaitlistInput } from '@/app/lib/validation-schemas';
import { sendWaitlistConfirmation } from '@/app/lib/email';
import { generateConfirmationToken } from '@/app/lib/token';
import { randomBytes } from 'crypto';

/**
 * Validate request body against waitlist schema
 * @returns Parsed data or error response
 */
function validateRequest(body: unknown) {
  const validationResult = waitlistSchema.safeParse(body);

  if (!validationResult.success) {
    const fieldErrors: Record<string, string> = {};
    validationResult.error.issues.forEach((err) => {
      if (err.path.length > 0) {
        fieldErrors[err.path[0] as string] = err.message;
      }
    });

    return {
      success: false as const,
      response: NextResponse.json(
        { ok: false, fieldErrors },
        { status: 400 }
      ),
    };
  }

  return {
    success: true as const,
    data: validationResult.data,
  };
}

/**
 * Build database insert payload from validated data
 */
function buildInsertPayload(
  data: WaitlistInput,
  normalizedPhone: string,
  userAgent: string | null,
  ip: string
) {
  return {
    name: data.name,
    email: data.email,
    student_email: data.studentEmail || null,
    phone: normalizedPhone || null,
    location: data.location || null,
    interest_type: data.interestType,
    source: null, // kept for backwards compatibility
    user_agent: userAgent,
    ip: ip !== 'unknown' ? ip : null,
    consent: true,
  };
}

/**
 * Handle duplicate entry by fetching existing record
 */
async function handleDuplicateEntry(
  email: string,
  correlationId: string
) {
  const { data: existingRecord, error } = await supabaseAdmin
    .from('waitlist_signups')
    .select('id, confirmed_at')
    .eq('email', email)
    .single();

  console.log('[waitlist_duplicate_entry]', {
    correlationId,
    email,
    recordId: existingRecord?.id,
    confirmed: !!existingRecord?.confirmed_at,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      ok: true,
      duplicate: true,
      id: existingRecord?.id || null,
    },
    { status: 200 }
  );
}

/**
 * Insert new waitlist entry into database
 */
async function insertWaitlistEntry(payload: ReturnType<typeof buildInsertPayload>) {
  const { data: insertedData, error: insertError } = await supabaseAdmin
    .from('waitlist_signups')
    .insert(payload)
    .select('id, email, name')
    .single();

  return { insertedData, insertError };
}

export async function POST(request: NextRequest) {
  try {
    // Generate correlation ID for tracing
    const correlationId = randomBytes(8).toString('hex');

    // Rate limiting
    const ip = getIpAddress(request) || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, message: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      );
    }

    // Parse and validate input
    const body = await request.json();
    const validationResult = validateRequest(body);

    if (!validationResult.success) {
      return validationResult.response;
    }

    const data = validationResult.data;

    // Normalize phone number (only if provided)
    const normalizedPhone = data.phone && data.phone.trim() !== ''
      ? normalizePhone(data.phone)
      : '';

    // Extract user agent
    const userAgent = request.headers.get('user-agent') || null;

    // Build insert payload
    const insertPayload = buildInsertPayload(data, normalizedPhone, userAgent, ip);

    // Attempt insert
    const { insertedData, insertError } = await insertWaitlistEntry(insertPayload);

    // Check for duplicate (unique constraint violation)
    if (insertError) {
      // PostgreSQL unique violation error code: 23505
      if (insertError.code === '23505') {
        return handleDuplicateEntry(data.email, correlationId);
      }

      // Other database errors
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { ok: false, message: 'DB_INSERT_FAILED' },
        { status: 500 }
      );
    }

    if (!insertedData) {
      console.error('Inserted data is null');
      return NextResponse.json(
        { ok: false, message: 'DB_INSERT_FAILED' },
        { status: 500 }
      );
    }

    // Generate confirmation token
    const tokenPair = generateConfirmationToken();

    // Update record with token and send timestamp
    const { error: updateError } = await supabaseAdmin
      .from('waitlist_signups')
      .update({
        token_hash: tokenPair.hash,
        confirmation_sent_at: new Date().toISOString(),
        token_expires_at: tokenPair.expiresAt.toISOString(),
      })
      .eq('id', insertedData.id);

    if (updateError) {
      console.error('[waitlist_token_update_error]', {
        correlationId,
        recordId: insertedData.id,
        error: updateError,
        timestamp: new Date().toISOString(),
      });
      // Continue anyway - email will just not have confirmation link
    }

    // Send confirmation email (async, don't block response)
    sendWaitlistConfirmation(
      data.email,
      data.name,
      tokenPair.token,
      insertedData.id
    ).catch((error) => {
      console.error('[waitlist_email_send_failed]', {
        correlationId,
        recordId: insertedData.id,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
    });

    return NextResponse.json(
      {
        ok: true,
        id: insertedData.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in waitlist handler:', error);
    return NextResponse.json(
      { ok: false, message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
