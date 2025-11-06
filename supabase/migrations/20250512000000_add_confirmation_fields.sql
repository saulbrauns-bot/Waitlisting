-- Add confirmation fields to waitlist_signups table
-- Tokens are hashed with SHA-256 for security, expiry is 7 days

alter table public.waitlist_signups
  add column if not exists token_hash text,
  add column if not exists confirmation_sent_at timestamptz,
  add column if not exists confirmed_at timestamptz,
  add column if not exists token_expires_at timestamptz;

-- Create index for fast token lookups
create index if not exists waitlist_signups_token_hash_idx on public.waitlist_signups (token_hash)
  where token_hash is not null and confirmed_at is null;

-- Create index for finding unconfirmed signups
create index if not exists waitlist_signups_confirmed_at_idx on public.waitlist_signups (confirmed_at nulls first);

comment on column public.waitlist_signups.token_hash is 'SHA-256 hash of confirmation token for single-use verification';
comment on column public.waitlist_signups.confirmation_sent_at is 'Timestamp when confirmation email was last sent';
comment on column public.waitlist_signups.confirmed_at is 'Timestamp when email was confirmed (null = pending)';
comment on column public.waitlist_signups.token_expires_at is 'Expiration timestamp for confirmation token (7 days from send)';
