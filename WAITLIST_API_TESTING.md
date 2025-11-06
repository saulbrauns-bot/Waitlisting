# Waitlist API Testing Guide

## Setup

1. **Configure Environment Variables**

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

2. **Apply Database Migration**

Using Supabase CLI:
```bash
supabase db push
```

Or manually run the SQL in `supabase/migrations/20250511000000_waitlist.sql` in your Supabase SQL Editor.

3. **Start Development Server**

```bash
pnpm dev
```

Server runs on http://localhost:3000

## Manual Testing with curl

### Test 1: Normal Insert (Success)

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "(212) 555-1234",
    "source": "landing"
  }'
```

**Expected Response (200):**
```json
{
  "ok": true,
  "id": "some-uuid-here"
}
```

### Test 2: Duplicate Insert

Run the same curl command again:

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "(212) 555-1234",
    "source": "landing"
  }'
```

**Expected Response (200):**
```json
{
  "ok": true,
  "duplicate": true,
  "id": "same-uuid-as-before"
}
```

### Test 3: Validation Errors

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "",
    "lastName": "Doe",
    "email": "invalid-email",
    "phone": ""
  }'
```

**Expected Response (400):**
```json
{
  "ok": false,
  "fieldErrors": {
    "firstName": "First name is required",
    "email": "Invalid email address",
    "phone": "Phone number is required"
  }
}
```

### Test 4: Rate Limiting

Run the same request 6 times quickly (within 60 seconds):

```bash
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/waitlist \
    -H "Content-Type: application/json" \
    -d "{
      \"firstName\": \"Test$i\",
      \"lastName\": \"User\",
      \"email\": \"test$i@example.com\",
      \"phone\": \"212555000$i\"
    }"
  echo "\n"
done
```

**Expected:** First 5 requests succeed, 6th request returns (429):
```json
{
  "ok": false,
  "message": "RATE_LIMIT_EXCEEDED"
}
```

## Running Unit Tests

```bash
pnpm test app/api/waitlist
```

## Verifying Data in Supabase

1. Go to your Supabase project dashboard
2. Navigate to Table Editor
3. Select `waitlist_signups` table
4. You should see your test entries with:
   - Normalized phone numbers (E.164 format: +12125551234)
   - Email in lowercase
   - Location set to "NYC"
   - IP and user agent captured
   - Timestamp in created_at

## Phone Number Normalization Examples

The API normalizes various phone formats to E.164:

| Input | Output |
|-------|--------|
| `(212) 555-1234` | `+12125551234` |
| `212-555-1234` | `+12125551234` |
| `2125551234` | `+12125551234` |
| `+1 212 555 1234` | `+12125551234` |
| `1-212-555-1234` | `+12125551234` |

## Security Notes

- Service role key bypasses RLS - never expose to client
- Rate limiting is basic in-memory (for production, use Redis or similar)
- IP addresses are captured for analytics and abuse prevention
- All inputs are validated and sanitized
- Phone numbers are normalized to E.164 format for consistency
