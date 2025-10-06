-- 002-add-profiles-columns.sql
-- Safe migration to add profile columns expected by the registration flow
-- Run this in the Supabase SQL editor or via psql using your DATABASE connection string.
-- It will:
--  1. Add columns (if missing): email, full_name, name
--  2. Backfill email from auth.users where possible
--  3. Populate name from full_name if missing
--  4. Create a unique index on email only when it is safe (no duplicates)
--  5. Optionally set email NOT NULL only when there are no NULLs

BEGIN;

-- 1) Add missing columns safely
ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS email text;

ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS full_name text;

ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS name text;

-- 2) Backfill `email` from auth.users when the profile id matches an auth user id
-- (auth.users.email holds the canonical email managed by Supabase Auth)
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
  AND (p.email IS NULL OR p.email = '');

-- 3) Populate `name` from `full_name` where missing
UPDATE public.profiles
SET name = full_name
WHERE name IS NULL AND full_name IS NOT NULL;

-- 4) Create unique index on email only if there are no duplicate non-null emails
-- This avoids migration failure when duplicates exist. If duplicates exist, you should
-- resolve them manually before creating the unique index.
DO $$
DECLARE
  dup_count int;
BEGIN
  SELECT count(*) INTO dup_count
  FROM (
    SELECT email FROM public.profiles WHERE email IS NOT NULL GROUP BY email HAVING count(*) > 1
  ) t;

  IF dup_count = 0 THEN
    -- safe to create unique index
    EXECUTE 'CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email)';
  ELSE
    RAISE NOTICE 'profiles has % duplicate email values; skipping unique index creation. Resolve duplicates first.', dup_count;
  END IF;
END$$;

-- 5) Set email NOT NULL only if all rows have an email
DO $$
DECLARE
  null_count int;
BEGIN
  SELECT count(*) INTO null_count FROM public.profiles WHERE email IS NULL;
  IF null_count = 0 THEN
    EXECUTE 'ALTER TABLE public.profiles ALTER COLUMN email SET NOT NULL';
  ELSE
    RAISE NOTICE 'profiles.email contains % NULL rows; skipping SET NOT NULL. Backfill emails first.', null_count;
  END IF;
END$$;

COMMIT;

-- Helpful queries to inspect duplicates / problems prior to running this migration:
-- 1) Check for duplicate emails in profiles:
--    SELECT email, count(*) FROM public.profiles WHERE email IS NOT NULL GROUP BY email HAVING count(*)>1;
-- 2) Check how many profiles lack email:
--    SELECT count(*) FROM public.profiles WHERE email IS NULL;
-- 3) If duplicates exist, you can inspect the conflicting rows:
--    SELECT * FROM public.profiles WHERE email = 'duplicate@example.com' ORDER BY created_at;

-- Run the above checks before creating the unique index and making email NOT NULL if you want control
-- over how duplicates should be resolved (merge accounts, pick latest, or use auth.users mapping).
