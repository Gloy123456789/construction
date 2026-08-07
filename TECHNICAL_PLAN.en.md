# Technical Plan — Black Construction

## Stack

- Vite 6 + React 18 + TypeScript
- Tailwind CSS 4 (`@tailwindcss/vite`)
- `react-router-dom` — locale prefixes `/th` · `/en`
- `react-hook-form` + `zod` + Firebase Callable (`submitContact`, `asia-southeast1`)
- Firebase Hosting → `dist/` · project `landing-chokdee`

## Key layout

```
src/
  app/           # pages + App router
  components/    # Header, Footer, ContactForm, MobileContactBar, …
  content/       # copy.th.json, copy.en.json, media.json, config.ts
  lib/           # content, i18n, seo, firebase helpers
  styles/        # theme tokens (brand navy)
functions/       # submitContact → Firestore + Resend
```

## Content / media

- All UI strings live in `copy.th.json` / `copy.en.json` (Thai is source of truth)
- All media URLs live in `media.json`
- Contact constants live in `config.ts` (phone · address · LINE · email)

## Contact form

1. Client validation with zod (bilingual errors)
2. Honeypot field `website`
3. Callable `submitContact` — server validation · IP rate limit · Firestore first · Resend email
4. Without `VITE_FIREBASE_*`, the client demo-succeeds for local work

## SEO

- Per-page meta / OG via `Seo`
- JSON-LD: LocalBusiness + Service + BreadcrumbList
- `public/robots.txt` · `public/sitemap.xml` (all pages × th/en)

## Commands

```bash
npm install
cd functions && npm install && cd ..
npm run dev
npm run build
firebase deploy   # only when explicitly requested
```

Required function secrets before deploy: `RESEND_API_KEY`, `CONTACT_NOTIFY_TO`
