# Waitlist Backend Validation Checklist

## Quick Start

Follow these steps in order to validate your waitlist backend:

### 1. Environment Setup
Ensure your `.env.local` file has all required variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

Required variables:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `APP_VERSION` (optional, defaults to "dev")

### 2. Start Development Server
```bash
pnpm dev
```

Server should start on `http://localhost:3000`

### 3. Health Check
```bash
curl -s http://localhost:3000/api/health | jq
```

Expected response:
```json
{
  "ok": true,
  "service": "bridge-waitlist",
  "version": "dev",
  "supabaseUrlDefined": true
}
```

### 4. Test Fresh Insert
```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada@example.com",
    "phone": "+15551234567",
    "source": "hero"
  }' | jq
```

Expected response:
```json
{
  "ok": true,
  "id": "some-uuid-here"
}
```

### 5. Test Duplicate Detection
Run the same command from step 4 again:

```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada@example.com",
    "phone": "+15551234567",
    "source": "hero"
  }' | jq
```

Expected response:
```json
{
  "ok": true,
  "duplicate": true,
  "id": "same-uuid-as-before"
}
```

### 6. Run Automated Smoke Tests
```bash
pnpm smoke:local
```

Expected output:
```
Bridge Waitlist Backend Smoke Test
==================================

✓ Health check passed: bridge-waitlist vdev

✓ Insert succeeded: ID <uuid>

✓ Duplicate detection working correctly

✓ All smoke tests passed
```

## RLS (Row Level Security) Verification

### Check RLS is Enabled

Connect to your Supabase SQL Editor or use `psql`:

```sql
-- Verify RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'waitlist_signups';

-- Should show rowsecurity = true
```

### Test Anon Role Cannot Insert

```sql
-- Set role to anon (simulates anonymous user)
SET ROLE anon;

-- This should FAIL with permission denied
INSERT INTO waitlist_signups (
  first_name,
  last_name,
  email,
  phone,
  location
) VALUES (
  'Test',
  'User',
  'test@example.com',
  '+15551234567',
  'NYC'
);

-- Expected error: new row violates row-level security policy
```

### Test Service Role Can Insert

```sql
-- Reset to service role
RESET ROLE;

-- This should SUCCEED
INSERT INTO waitlist_signups (
  first_name,
  last_name,
  email,
  phone,
  location
) VALUES (
  'Test',
  'User',
  'test2@example.com',
  '+15551234568',
  'NYC'
);

-- Clean up test data
DELETE FROM waitlist_signups WHERE email LIKE 'test%@example.com';
```

## Validation Test Cases

### Test Invalid Email
```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "invalid-email",
    "phone": "+15551234567"
  }' | jq
```

Expected response (400):
```json
{
  "ok": false,
  "fieldErrors": {
    "email": "Invalid email address"
  }
}
```

### Test Missing Required Fields
```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "",
    "lastName": "User",
    "email": "test@example.com",
    "phone": ""
  }' | jq
```

Expected response (400):
```json
{
  "ok": false,
  "fieldErrors": {
    "firstName": "First name is required",
    "phone": "Phone number is required"
  }
}
```

### Test Phone Normalization
```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test-phone@example.com",
    "phone": "(212) 555-1234"
  }' | jq
```

Phone should be normalized to E.164 format (`+12125551234`) in database.

Verify in Supabase SQL Editor:
```sql
SELECT email, phone FROM waitlist_signups
WHERE email = 'test-phone@example.com';

-- Clean up
DELETE FROM waitlist_signups WHERE email = 'test-phone@example.com';
```

## Unit Tests

Run the test suite:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

## Troubleshooting

### Health check fails
- Ensure dev server is running on port 3000
- Check that `.env.local` exists and has valid values
- Restart the dev server

### Insert fails with DB_INSERT_FAILED
- Verify Supabase credentials in `.env.local`
- Check that migration has been applied
- Verify service role key (not anon key)

### Duplicate not detected
- Check unique index exists on (email, phone)
- Verify both inserts use exact same email+phone

### RLS errors
- Ensure you're using service role key for backend
- Check RLS policies are correctly configured
- Verify migration was applied successfully

## curl Command Reference

```bash
# Health check
curl -s http://localhost:3000/api/health

# Fresh insert
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada@example.com",
    "phone": "+15551234567",
    "source": "hero"
  }'

# Duplicate insert (same payload as above)
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada@example.com",
    "phone": "+15551234567",
    "source": "hero"
  }'
```

## Success Criteria

- ✅ Health endpoint returns 200 with ok: true
- ✅ Fresh insert returns 200 with ok: true and id
- ✅ Duplicate insert returns 200 with duplicate: true
- ✅ Invalid data returns 400 with fieldErrors
- ✅ RLS prevents anon role from inserting
- ✅ Service role can insert successfully
- ✅ Phone numbers are normalized to E.164
- ✅ All unit tests pass
- ✅ Smoke tests pass
