import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';
import { NextRequest } from 'next/server';

// Mock Supabase admin client
const mockInsert = vi.fn();
const mockSelect = vi.fn();
const mockEq = vi.fn();
const mockSingle = vi.fn();

vi.mock('@/app/lib/supabase-admin', () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      insert: mockInsert,
      select: mockSelect,
    })),
  },
}));

describe('POST /api/waitlist', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock chain
    mockInsert.mockReturnValue({
      select: mockSelect,
    });

    mockSelect.mockReturnValue({
      single: mockSingle,
      eq: mockEq,
    });

    mockEq.mockReturnValue({
      eq: mockEq,
      single: mockSingle,
    });
  });

  const createMockRequest = (body: unknown) => {
    return new NextRequest('http://localhost:3000/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Test Agent',
        'X-Forwarded-For': '192.168.1.1',
      },
      body: JSON.stringify(body),
    });
  };

  it('should successfully insert a valid waitlist signup', async () => {
    const mockId = 'test-uuid-123';
    mockSingle.mockResolvedValueOnce({
      data: { id: mockId },
      error: null,
    });

    const request = createMockRequest({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(212) 555-1234',
      source: 'email',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      ok: true,
      id: mockId,
    });

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '+12125551234',
        location: 'NYC',
        source: 'email',
        consent: true,
      })
    );
  });

  it('should handle duplicate email+phone combination', async () => {
    const mockExistingId = 'existing-uuid-456';

    // First call: insert fails with unique violation
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: '23505', message: 'duplicate key value violates unique constraint' },
    });

    // Second call: select returns existing record
    mockSingle.mockResolvedValueOnce({
      data: { id: mockExistingId },
      error: null,
    });

    const request = createMockRequest({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '2125551234',
      source: 'friend',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      ok: true,
      duplicate: true,
      id: mockExistingId,
    });
  });

  it('should return validation errors for invalid input', async () => {
    const request = createMockRequest({
      firstName: '',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '',
      source: '',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.fieldErrors).toBeDefined();
    expect(data.fieldErrors.firstName).toContain('required');
    expect(data.fieldErrors.email).toContain('Invalid email');
    expect(data.fieldErrors.source).toBeDefined();
  });

  it('should return validation error for invalid source value', async () => {
    const request = createMockRequest({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '2125551234',
      source: 'invalid_source',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.fieldErrors.source).toBeDefined();
  });

  it('should normalize phone numbers correctly', async () => {
    const mockId = 'test-uuid-789';
    mockSingle.mockResolvedValueOnce({
      data: { id: mockId },
      error: null,
    });

    const request = createMockRequest({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '212-555-9999',
      source: 'other',
    });

    await POST(request);

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: '+12125559999',
      })
    );
  });

  it('should trim and normalize whitespace in names', async () => {
    const mockId = 'test-uuid-999';
    mockSingle.mockResolvedValueOnce({
      data: { id: mockId },
      error: null,
    });

    const request = createMockRequest({
      firstName: '  John   Robert  ',
      lastName: '  Doe   Smith  ',
      email: ' TEST@EXAMPLE.COM ',
      phone: '2125551234',
      source: 'email',
    });

    await POST(request);

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        first_name: 'John Robert',
        last_name: 'Doe Smith',
        email: 'test@example.com',
      })
    );
  });

  it('should return 500 for database errors other than duplicates', async () => {
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: 'XX000', message: 'database error' },
    });

    const request = createMockRequest({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '2125551234',
      source: 'friend',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      ok: false,
      message: 'DB_INSERT_FAILED',
    });
  });

  it('should include user agent and IP in the insert payload', async () => {
    const mockId = 'test-uuid-ip';
    mockSingle.mockResolvedValueOnce({
      data: { id: mockId },
      error: null,
    });

    const request = createMockRequest({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '2125551234',
      source: 'email',
    });

    await POST(request);

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_agent: 'Test Agent',
        ip: '192.168.1.1',
      })
    );
  });
});
