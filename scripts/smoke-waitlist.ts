#!/usr/bin/env tsx

/**
 * Smoke test for Bridge waitlist backend
 * Runs black-box tests against a running dev server
 *
 * Usage: pnpm smoke:local
 * Ensure dev server is running on http://localhost:3000
 */

const BASE_URL = 'http://localhost:3000';

interface HealthResponse {
  ok: boolean;
  service: string;
  version: string;
  supabaseUrlDefined: boolean;
}

interface WaitlistResponse {
  ok: boolean;
  id?: string;
  duplicate?: boolean;
  fieldErrors?: Record<string, string>;
  message?: string;
}

async function log(message: string, status: 'info' | 'success' | 'error' = 'info') {
  const symbols = {
    info: '→',
    success: '✓',
    error: '✗',
  };
  console.log(`${symbols[status]} ${message}`);
}

async function testHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/api/health`);
    const data: HealthResponse = await response.json();

    if (!response.ok) {
      await log(`Health check failed: HTTP ${response.status}`, 'error');
      return false;
    }

    if (!data.ok) {
      await log('Health check returned ok: false', 'error');
      return false;
    }

    if (!data.supabaseUrlDefined) {
      await log('SUPABASE_URL is not defined', 'error');
      return false;
    }

    await log(`Health check passed: ${data.service} v${data.version}`, 'success');
    return true;
  } catch (error) {
    await log(`Health check failed: ${error}`, 'error');
    return false;
  }
}

async function testWaitlistInsert(): Promise<string | null> {
  try {
    const payload = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: `ada.${Date.now()}@example.com`, // Unique email per run
      phone: '+15551234567',
      source: 'smoke-test',
    };

    await log('Testing waitlist insert with fresh payload...', 'info');

    const response = await fetch(`${BASE_URL}/api/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: WaitlistResponse = await response.json();

    if (!response.ok) {
      await log(`Insert failed: HTTP ${response.status}`, 'error');
      console.log('Response:', data);
      return null;
    }

    if (!data.ok) {
      await log('Insert returned ok: false', 'error');
      console.log('Response:', data);
      return null;
    }

    if (!data.id) {
      await log('Insert succeeded but no ID returned', 'error');
      return null;
    }

    await log(`Insert succeeded: ID ${data.id}`, 'success');
    return data.id;
  } catch (error) {
    await log(`Insert test failed: ${error}`, 'error');
    return null;
  }
}

async function testWaitlistDuplicate(): Promise<boolean> {
  try {
    const payload = {
      firstName: 'Charles',
      lastName: 'Babbage',
      email: 'charles.babbage@example.com',
      phone: '+15559876543',
      source: 'smoke-test',
    };

    await log('Testing duplicate detection...', 'info');

    // First insert
    const response1 = await fetch(`${BASE_URL}/api/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data1: WaitlistResponse = await response1.json();

    if (!data1.ok || !data1.id) {
      await log('First insert failed', 'error');
      return false;
    }

    const firstId = data1.id;

    // Second insert (duplicate)
    const response2 = await fetch(`${BASE_URL}/api/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data2: WaitlistResponse = await response2.json();

    if (!data2.ok) {
      await log('Duplicate insert returned ok: false', 'error');
      return false;
    }

    if (!data2.duplicate) {
      await log('Duplicate flag not set', 'error');
      return false;
    }

    if (data2.id !== firstId) {
      await log('Duplicate returned different ID', 'error');
      return false;
    }

    await log('Duplicate detection working correctly', 'success');
    return true;
  } catch (error) {
    await log(`Duplicate test failed: ${error}`, 'error');
    return false;
  }
}

async function testConfirmationEndpoint(): Promise<boolean> {
  try {
    await log('Testing confirmation endpoint...', 'info');

    // Test 1: Missing token
    const missingResponse = await fetch(`${BASE_URL}/api/confirm`);
    const missingData = await missingResponse.json();

    if (missingData.message !== 'TOKEN_MISSING') {
      await log('Missing token should return TOKEN_MISSING', 'error');
      return false;
    }
    await log('Missing token correctly rejected', 'success');

    // Test 2: Invalid token
    const invalidResponse = await fetch(`${BASE_URL}/api/confirm?token=invalid-token-xyz`);
    const invalidData = await invalidResponse.json();

    if (invalidData.message !== 'TOKEN_INVALID') {
      await log('Invalid token should return TOKEN_INVALID', 'error');
      return false;
    }
    await log('Invalid token correctly rejected', 'success');

    await log('Confirmation endpoint validation passed', 'success');
    await log('Note: Check server logs for [waitlist_email_send_start] to verify email flow', 'info');

    return true;
  } catch (error) {
    await log(`Confirmation endpoint test failed: ${error}`, 'error');
    return false;
  }
}

async function main() {
  console.log('');
  console.log('Bridge Waitlist Backend Smoke Test');
  console.log('==================================');
  console.log('');

  let exitCode = 0;

  // Step 1: Health check
  const healthOk = await testHealth();
  if (!healthOk) {
    await log('Aborting: health check failed', 'error');
    process.exit(1);
  }
  console.log('');

  // Step 2: Fresh insert
  const insertId = await testWaitlistInsert();
  if (!insertId) {
    await log('Insert test failed', 'error');
    exitCode = 1;
  }
  console.log('');

  // Step 3: Duplicate detection
  const duplicateOk = await testWaitlistDuplicate();
  if (!duplicateOk) {
    await log('Duplicate test failed', 'error');
    exitCode = 1;
  }
  console.log('');

  // Step 4: Confirmation endpoint validation
  const confirmOk = await testConfirmationEndpoint();
  if (!confirmOk) {
    await log('Confirmation endpoint test failed', 'error');
    exitCode = 1;
  }
  console.log('');

  // Summary
  if (exitCode === 0) {
    await log('All smoke tests passed', 'success');
  } else {
    await log('Some tests failed', 'error');
  }
  console.log('');

  process.exit(exitCode);
}

main();
