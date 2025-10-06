# React Vite App

A small Vite + React app that was created by converting an existing static `index.html` into a component-based React application. The project preserves the original site's structure and assets while making it easier to extend with React components.

## Status
- Basic site layout, components, and styles are implemented. A few interactive features were ported (slideshow, typed text, contact form UI). Some original inline scripts and backend integrations (search suggestions, chat backend) are intentionally left as follow-ups.

# React Vite App

A compact Vite + React app which converts an existing static site into a component-based frontend. The project preserves the original assets and layout while providing React components that are easier to extend.

## Status
- Core pages, components and styling are implemented. Basic auth wiring to Supabase (Auth + Postgres) is available but optional.

## Requirements
- Node.js (LTS recommended)
- npm (bundled with Node) or another package manager

## Quick start
Clone, install dependencies, and run the dev server:

```powershell
git clone https://github.com/FouadBechar/ReactViteApp.git
cd ReactViteApp
npm install
npm run dev   # start Vite dev server (http://localhost:5173)
```

Build for production and preview:

```powershell
npm run build
npm run preview
```

## Environment variables
- This project uses Vite env vars. Do not commit secrets to the repo.
- Copy `.env.local.example` to `.env.local` and fill in your values locally (the `.env.local` file is ignored by git):

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=replace_with_your_anon_key
# Optional:
VITE_RECAPTCHA_SITE_KEY=replace_with_recaptcha_site_key
```

## Supabase (optional)
The app can use Supabase Auth and a Postgres `profiles` table for registration and profiles.

1. Create a Supabase project at https://app.supabase.com and copy the Project URL and anon/public key into `.env.local`.
2. Apply the SQL migrations in the `db/` folder using the Supabase SQL editor or psql (order matters):

```text
# Recommended order:
# 1) db/001-create-profiles.sql
# 2) db/002-add-profiles-columns.sql (safe migration to add/backfill missing columns)
```

Run a single migration in the Supabase SQL editor:

1. Dashboard → SQL → New query → paste the SQL → Run
2. Or with psql:

```powershell
# psql "postgresql://user:pass@host:port/dbname" -f db/001-create-profiles.sql
```

Notes:
- Do not store passwords in `public.profiles`. Supabase Auth manages credentials in the `auth` schema.
- If signup fails with a 500 and an error_id, check Supabase Dashboard → Authentication → Logs for the error details (it will point to missing columns, triggers, or permission issues).

## Scripts
- `npm run dev` — Run the Vite dev server
- `npm run build` — Build production bundle
- `npm run preview` — Preview the production build locally
- `npm run generate-sitemap` — Generate `public/sitemap.xml` from `public/pages.json`

## Deployment
- Vercel is supported (there is a `vercel.json` for redirects). Connect the repository and set the build command to `npm run build`.

## Security & secrets (important)
- `.env.local` is ignored by git. Keep real keys (Supabase anon/service-role keys, reCAPTCHA secrets) out of source control.
- If you accidentally committed secrets, rotate those keys immediately and consider removing them from git history (BFG or git-filter-repo). I can provide a safe cleanup guide.

## Troubleshooting
- 500 on signup with message "Database error saving new user": check Supabase Auth logs for the returned `error_id` — the logs contain the underlying Postgres error and point to missing columns or trigger problems.
- Asset resolution warnings from Vite: verify the import path or put runtime assets into `public/`.
- Secure cookies won't work on `http://localhost`; use `https` in production to enable `Secure` cookies.

## Contributing
- Create a branch from `main`, add tests or a changelog entry where appropriate, and open a pull request. For large API or DB changes, open an issue first.

## License
- MIT (replace if you prefer a different license)

## Maintainer
- Fouad — https://github.com/FouadBechar/ReactViteApp

If you'd like, I can add screenshots, a demo GIF, CI instructions, or an automated checklist for migrations and key rotation.

