# React Vite App

A small Vite + React app that was created by converting an existing static `index.html` into a component-based React application. The project preserves the original site's structure and assets while making it easier to extend with React components.

## Status
- Basic site layout, components, and styles are implemented. A few interactive features were ported (slideshow, typed text, contact form UI). Some original inline scripts and backend integrations (search suggestions, chat backend) are intentionally left as follow-ups.

## Prerequisites
- Node.js (LTS recommended)
- npm (comes with Node) or your preferred package manager

## Quick start (PowerShell)

```powershell
cd '\ReactViteApp'
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build locally
```

## Useful scripts
- `dev` — run Vite dev server
- `build` — produce production `dist/` via Vite
- `preview` — preview the production build locally
- `generate-sitemap` — helper script that writes `public/sitemap.xml` from `public/pages.json`

## Deployment
- This project has a `vercel.json` redirect configured to provide a clean `/privacy/` URL and redirect the legacy `PrivacyPolicy.html` to `/privacy/`.
- To deploy to Vercel, connect the repository and deploy the `main` branch (the default build command is `npm run build`).

## Project structure (high level)
- `index.html` — app entry HTML
- `src/` — React source code
	- `main.jsx`, `App.jsx`
	- `components/` — React components (NavBar, Footer, Slideshow, TextDq, Contact, etc.)
	- `styles/global.css` — global styles
- `public/` — static assets and additional pages (including `privacy/index.html`)
- `scripts/generate-sitemap.js` — sitemap helper

## Notes & troubleshooting
- If you see a Vite build warning like:
	> "../m/image00987.webp referenced ... didn't resolve at build time"

	it's a runtime asset that will be resolved when the site is served. Inspect the referencing code if you want it pre-bundled.
- Cookies with the `Secure` attribute won't be set on `http://` during local dev; production environments on `https://` will set them.
- If you experience missing images or assets, ensure `public/` files are present and that any dynamic imports use correct relative paths.

## Contributing
- Create a branch from `main`, make changes, and open a pull request. For larger refactors (for example replacing imperative DOM queries with React refs), open an issue first so we can discuss scope and testing.

## Author & Contact
- Maintainer: Fouad
- Repo: https://github.com/FouadBechar/ReactViteApp

## License
- MIT (or replace with your preferred license)

If you want, I can update this README with screenshots, a short demo GIF, or automatic checklist items for common tasks (build, lint, test).

# React Vite App

This folder contains a Vite + React (JSX) conversion of the original `index.html` page. It focuses on rendering the same layout and content and provides components that can be extended further.

How to run (Windows PowerShell):

```powershell
npm install
npm run dev
```

Notes:
- Large inline scripts from the original site are not fully ported; key static content and styles were moved into React components and `global.css`.
- If you want the original interactivity (search suggestions, chat backend, typed animations, etc.), I can port those into React hooks and components in a follow-up.
