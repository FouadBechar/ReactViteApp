-- 003-profiles-auth-triggers.sql
-- Create triggers to populate and sync public.profiles from auth.users
-- Run this in the Supabase SQL editor (or via psql) to ensure profiles.full_name and email are set

-- Function: insert or upsert profile when a new auth.user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, created_at, updated_at)
  values (
    new.id,
    new.email,
    -- use raw_user_meta_data which exists in this Supabase version
    new.raw_user_meta_data->>'full_name',
    now(), now()
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if present, then create after-insert trigger
drop trigger if exists auth_user_insert on auth.users;
create trigger auth_user_insert
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function: update profile when auth.user is updated
create or replace function public.handle_update_user()
returns trigger as $$
begin
  update public.profiles
  set
    email = new.email,
    full_name = coalesce(new.raw_user_meta_data->>'full_name', public.profiles.full_name),
    updated_at = now()
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing update trigger if present, then create after-update trigger
drop trigger if exists auth_user_update on auth.users;
create trigger auth_user_update
  after update on auth.users
  for each row execute procedure public.handle_update_user();

-- Backfill: insert any users missing from public.profiles
insert into public.profiles (id, email, full_name, created_at, updated_at)
select u.id, u.email, u.raw_user_meta_data->>'full_name', now(), now()
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;

-- Backfill missing full_name for existing profiles
update public.profiles p
set full_name = u.raw_user_meta_data->>'full_name'
from auth.users u
where p.id = u.id and (p.full_name is null or p.full_name = '');

-- Notes:
-- 1) Run this in Supabase SQL editor. It will create triggers that keep profiles in sync with auth.users.
-- 2) After running, create a test user to confirm profiles are populated correctly.
-- 3) If your user metadata uses a different key (e.g. "name" or "fullName"), adjust the ->> key access accordingly.
