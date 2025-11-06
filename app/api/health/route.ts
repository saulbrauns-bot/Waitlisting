import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'bridge-waitlist',
    version: process.env.APP_VERSION ?? 'dev',
    supabaseUrlDefined: !!process.env.SUPABASE_URL,
  });
}
