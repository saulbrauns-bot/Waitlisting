-- Enable citext extension for case-insensitive email storage
create extension if not exists citext;

-- Create waitlist_signups table
create table if not exists public.waitlist_signups (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email citext not null,
  phone text not null,
  location text not null check (location = 'NYC'),
  source text,
  user_agent text,
  ip inet,
  consent boolean not null default true
);

-- Create unique constraint to prevent duplicate email+phone combinations
create unique index waitlist_signups_email_phone_idx on public.waitlist_signups (email, phone);

-- Create helpful indexes for queries
create index waitlist_signups_created_at_idx on public.waitlist_signups (created_at desc);
create index waitlist_signups_email_idx on public.waitlist_signups (email);
create index waitlist_signups_phone_idx on public.waitlist_signups (phone);

-- Enable Row Level Security
alter table public.waitlist_signups enable row level security;

-- Create restrictive policy: only service role can insert
-- No anonymous or authenticated user can insert directly
create policy "Service role only insert"
  on public.waitlist_signups
  for insert
  to service_role
  with check (true);

-- Optional: allow service role to read for admin purposes
create policy "Service role select"
  on public.waitlist_signups
  for select
  to service_role
  using (true);
