-- 001-create-profiles.sql
-- Creates a profiles table that links to Supabase Auth users
-- Run this in the Supabase SQL editor or via psql using your DATABASE connection string

-- Recommended schema for `public.profiles`.
-- This matches the registration payload sent by the client:
--  { email, password, data: { full_name } }
-- NOTE: Do NOT store passwords in this table. Passwords are managed by Supabase Auth in the auth schema.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  name text,
  avatar_url text,
  website text,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Keep a trigger to update `updated_at` on row updates
create or replace function public.trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_timestamp on public.profiles;
create trigger set_timestamp
  before update on public.profiles
  for each row execute procedure public.trigger_set_timestamp();

-- ==========================
-- Helpful ALTER / backfill snippets for live databases
-- Run the following in Supabase SQL editor one-at-a-time as needed.
-- 1) Add missing columns safely (won't error if they already exist):
-- ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS email text;
-- ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS full_name text;
-- ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS name text;

-- 2) Backfill `email` from auth.users for existing profiles (if auth.users contains the email):
-- UPDATE public.profiles p
-- SET email = u.email
-- FROM auth.users u
-- WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');

-- 3) Optionally populate `name` from `full_name` where missing:
-- UPDATE public.profiles SET name = full_name WHERE name IS NULL AND full_name IS NOT NULL;

-- 4) After verifying rows are populated, you can add a NOT NULL constraint and unique index on email:
-- ALTER TABLE public.profiles ALTER COLUMN email SET NOT NULL;
-- CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

-- ==========================
-- Remember: do not store password values in this table. The client sends `password` only to Supabase Auth.
