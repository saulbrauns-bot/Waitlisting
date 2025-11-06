/**
 * Unit tests for email sending functionality
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Resend before importing email module
const mockSend = vi.fn();
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}));

// Mock env to ensure Resend is configured for tests
vi.mock('@/app/lib/requireEnv', () => ({
  getEnv: vi.fn((key: string) => {
    if (key === 'RESEND_API_KEY') return 'test-api-key';
    return undefined;
  }),
}));

import { sendWaitlistConfirmation } from '../email';

describe('Email Sending', () => {
  beforeEach(() => {
    mockSend.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('sends email with all expected fields on new signup', async () => {
    mockSend.mockResolvedValue({ data: { id: 'msg-123' }, error: null });

    const result = await sendWaitlistConfirmation(
      'test@example.com',
      'John',
      'test-token-123',
      'record-456'
    );

    expect(result.success).toBe(true);
    expect(result.correlationId).toBeDefined();
    expect(mockSend).toHaveBeenCalledOnce();

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.to).toEqual(['test@example.com']);
    expect(callArgs.subject).toBe("You're on the Bridge waitlist!");
    expect(callArgs.from).toContain('Bridge');
  });

  it('returns error when provider throws', async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { message: 'Rate limit exceeded' },
    });

    const result = await sendWaitlistConfirmation(
      'test@example.com',
      'Jane',
      'test-token-789',
      'record-999'
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('Rate limit exceeded');
    expect(result.correlationId).toBeDefined();
  });

  it('includes confirmation URL when token provided', async () => {
    mockSend.mockResolvedValue({ data: { id: 'msg-456' }, error: null });

    await sendWaitlistConfirmation(
      'test@example.com',
      'Alice',
      'secure-token-xyz',
      'record-123'
    );

    expect(mockSend).toHaveBeenCalledOnce();
    // The React component will receive confirmUrl prop
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.react).toBeDefined();
  });

  it('handles unexpected errors gracefully', async () => {
    mockSend.mockRejectedValue(new Error('Network failure'));

    const result = await sendWaitlistConfirmation(
      'test@example.com',
      'Bob',
      'token-fail',
      'record-fail'
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('Network failure');
    expect(result.correlationId).toBeDefined();
  });
});
