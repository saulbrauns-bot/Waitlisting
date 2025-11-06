/**
 * Unit tests for confirmation endpoint
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../confirm/route';

// Mock Supabase admin
const mockSelect = vi.fn();
const mockUpdate = vi.fn();
const mockEq = vi.fn();
const mockSingle = vi.fn();

vi.mock('@/app/lib/supabase-admin', () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      select: mockSelect,
      update: mockUpdate,
    })),
  },
}));

// Mock token utilities
vi.mock('@/app/lib/token', () => ({
  hashToken: vi.fn((token: string) => `hashed_${token}`),
  isTokenExpired: vi.fn((expiresAt: string) => {
    const expiry = new Date(expiresAt);
    return expiry < new Date();
  }),
}));

describe('Confirmation Endpoint', () => {
  beforeEach(() => {
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ single: mockSingle });
    mockUpdate.mockReturnValue({ eq: mockEq });
    vi.clearAllMocks();
  });

  it('confirms valid token and sets confirmed_at', async () => {
    mockSingle.mockResolvedValue({
      data: {
        id: 'record-123',
        email: 'test@example.com',
        first_name: 'John',
        confirmed_at: null,
        token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      error: null,
    });

    mockEq.mockResolvedValue({ error: null });

    const request = new NextRequest(
      new URL('http://localhost:3000/api/confirm?token=valid-token-123')
    );

    const response = await GET(request);

    expect(response.status).toBe(302); // Redirect
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        confirmed_at: expect.any(String),
        token_hash: null,
      })
    );
  });

  it('rejects already confirmed token', async () => {
    mockSingle.mockResolvedValue({
      data: {
        id: 'record-456',
        email: 'test@example.com',
        first_name: 'Jane',
        confirmed_at: '2025-01-01T00:00:00Z',
        token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      error: null,
    });

    const request = new NextRequest(
      new URL('http://localhost:3000/api/confirm?token=used-token')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('TOKEN_ALREADY_USED');
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('rejects expired token', async () => {
    mockSingle.mockResolvedValue({
      data: {
        id: 'record-789',
        email: 'test@example.com',
        first_name: 'Bob',
        confirmed_at: null,
        token_expires_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      error: null,
    });

    const request = new NextRequest(
      new URL('http://localhost:3000/api/confirm?token=expired-token')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('TOKEN_EXPIRED');
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('rejects invalid/not-found token', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: { message: 'Not found' },
    });

    const request = new NextRequest(
      new URL('http://localhost:3000/api/confirm?token=invalid-token')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('TOKEN_INVALID');
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('rejects missing token parameter', async () => {
    const request = new NextRequest(
      new URL('http://localhost:3000/api/confirm')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('TOKEN_MISSING');
  });
});
