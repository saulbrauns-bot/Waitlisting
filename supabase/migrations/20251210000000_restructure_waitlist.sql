-- Migration: Restructure waitlist_signups table for new interest-based signup
-- Note: Run data export before this migration if needed

-- Add new columns
ALTER TABLE public.waitlist_signups
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS interest_type text;

-- Migrate existing data: combine first_name and last_name into name
UPDATE public.waitlist_signups
SET name = TRIM(CONCAT(first_name, ' ', COALESCE(last_name, '')))
WHERE name IS NULL;

-- Make name NOT NULL after migration (with default for any edge cases)
ALTER TABLE public.waitlist_signups
  ALTER COLUMN name SET NOT NULL;

-- Remove the NYC-only location constraint
ALTER TABLE public.waitlist_signups
  DROP CONSTRAINT IF EXISTS waitlist_signups_location_check;

-- Make location nullable (was required before)
ALTER TABLE public.waitlist_signups
  ALTER COLUMN location DROP NOT NULL;

-- Make first_name nullable (keeping for backwards compatibility during transition)
ALTER TABLE public.waitlist_signups
  ALTER COLUMN first_name DROP NOT NULL;

-- Make last_name nullable
ALTER TABLE public.waitlist_signups
  ALTER COLUMN last_name DROP NOT NULL;

-- Make phone nullable
ALTER TABLE public.waitlist_signups
  ALTER COLUMN phone DROP NOT NULL;

-- Drop old unique constraint on (email, phone)
DROP INDEX IF EXISTS waitlist_signups_email_phone_idx;

-- Create new unique constraint on email only
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_signups_email_unique
  ON public.waitlist_signups (email);

-- Add check constraint for interest_type (if provided)
ALTER TABLE public.waitlist_signups
  ADD CONSTRAINT waitlist_signups_interest_type_check
  CHECK (interest_type IS NULL OR interest_type IN ('user', 'investor', 'partner', 'follower'));

-- Create index for interest_type queries
CREATE INDEX IF NOT EXISTS waitlist_signups_interest_type_idx
  ON public.waitlist_signups (interest_type);

-- Add comments for documentation
COMMENT ON COLUMN public.waitlist_signups.name IS 'Full name of the person signing up';
COMMENT ON COLUMN public.waitlist_signups.location IS 'Optional location (City, State) - free text';
COMMENT ON COLUMN public.waitlist_signups.interest_type IS 'Type of interest: user, investor, partner, or follower';
