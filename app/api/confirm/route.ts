import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { hashToken, isTokenExpired } from '@/app/lib/token';

/**
 * Confirmation endpoint for single-use email verification
 *
 * GET /api/confirm?token=<token>
 *
 * Success: Sets confirmed_at, clears token, redirects to success page
 * Failure: Returns error (expired, invalid, already used)
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { ok: false, message: 'TOKEN_MISSING' },
        { status: 400 }
      );
    }

    // Hash the token to look up in database
    const tokenHash = hashToken(token);

    // Find the signup with this token hash
    const { data: signup, error: fetchError } = await supabaseAdmin
      .from('waitlist_signups')
      .select('id, email, first_name, confirmed_at, token_expires_at')
      .eq('token_hash', tokenHash)
      .single();

    if (fetchError || !signup) {
      console.error('[confirm_token_not_found]', { tokenHash, error: fetchError });
      return NextResponse.json(
        { ok: false, message: 'TOKEN_INVALID' },
        { status: 400 }
      );
    }

    // Check if already confirmed
    if (signup.confirmed_at) {
      console.log('[confirm_already_confirmed]', {
        recordId: signup.id,
        email: signup.email,
        confirmedAt: signup.confirmed_at,
      });
      return NextResponse.json(
        { ok: false, message: 'TOKEN_ALREADY_USED' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (!signup.token_expires_at || isTokenExpired(signup.token_expires_at)) {
      console.error('[confirm_token_expired]', {
        recordId: signup.id,
        email: signup.email,
        expiresAt: signup.token_expires_at,
      });
      return NextResponse.json(
        { ok: false, message: 'TOKEN_EXPIRED' },
        { status: 400 }
      );
    }

    // Mark as confirmed and clear token
    const { error: updateError } = await supabaseAdmin
      .from('waitlist_signups')
      .update({
        confirmed_at: new Date().toISOString(),
        token_hash: null, // Clear token to prevent reuse
      })
      .eq('id', signup.id);

    if (updateError) {
      console.error('[confirm_update_failed]', {
        recordId: signup.id,
        error: updateError,
      });
      return NextResponse.json(
        { ok: false, message: 'CONFIRMATION_FAILED' },
        { status: 500 }
      );
    }

    console.log('[confirm_success]', {
      recordId: signup.id,
      email: signup.email,
      timestamp: new Date().toISOString(),
    });

    // Redirect to confirmation success page
    return NextResponse.redirect(
      new URL('/confirmation', request.url),
      { status: 302 }
    );
  } catch (error) {
    console.error('[confirm_unexpected_error]', { error });
    return NextResponse.json(
      { ok: false, message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
