# Construction — Agent Plan

Short standard instructions for agents working in this repo.

## Bootstrap (once)

- [x] Keep `README.md` and this `plan.md` as the entry docs
- [x] Ensure GitHub remote exists and `main` is pushed (required for Cursor Cloud)
- [x] Verify the remote actually exists: `git ls-remote --symref origin HEAD` resolves `refs/heads/main`
- [x] Add `.gitignore` for `node_modules/`, `dist/`, `.env`, `functions/lib/`, `.firebase/`
- [ ] Finish Cloud environment setup via onboard URL (agent cannot create environments via API)
- [ ] Create Cloud environment: New environment → select this repo → skip agent-led setup → Save (no build verify)

After bootstrap, **stop**. The only tracked files should be `README.md` and `plan.md`
(plus `.gitignore`). Do **not** scaffold, install, build, run, or test anything yet —
wait for the plan phase and for the plan to be written and approved.

## Plan phase (before any build)

- [x] Write the site plan: sections, Thai-first copy outline, media list, contact flow
- [ ] Confirm brief details (contact info, packages, brand direction)
- [ ] Get the plan reviewed and approved before starting the build phase

### Site concept (draft — needs brief confirmation)

Single-page bilingual landing for a Thai **construction / contractor** business (Chokdee client). Goal: conversion — Call, LINE, and form inquiry. Design: Apple Minimal / Chokdee Online (clean, professional, trustworthy). Not luxury-property glamourage.

**Assumptions until brief confirms:** general residential + commercial build/renovate contractor in Thailand; primary CTAs are phone + LINE; form is consultation-style (name, email required, phone optional, message).

### Sections (v1)

| # | Section | Purpose | Notes |
|---|---------|---------|--------|
| 1 | Sticky header | Brand + anchor nav (md+) + lang switcher + Call/LINE | Contact reachable without scrolling past hero |
| 2 | Hero | Brand-first full-bleed: brand, one headline, one support line, one CTA group | No cards, no stats, no overlays |
| 3 | Services | What we build/renovate (3–4 items) | One job: pick a service |
| 4 | Why us / process | Trust + how engagement works | Short steps, not a feature dump |
| 5 | Projects / gallery | Real work photos | Lazy-load; alt in copy files |
| 6 | Contact | Form + phone + LINE fallbacks | `MobileContactBar` on `md:hidden` |
| 7 | Footer | Legal/contact/address landmarks | Semantic `footer` / `address` |

### Thai-first copy outline (`copy.th.json` → mirror `copy.en.json`)

Stable keys (draft):

- `seo.title` / `seo.description` / `seo.ogTitle` / `seo.ogDescription`
- `nav.*` (home, services, projects, contact, lang)
- `hero.brand` / `hero.headline` / `hero.sub` / `hero.ctaCall` / `hero.ctaLine` / `hero.ctaForm`
- `services.title` / `services.sub` / `services.items.{id}.title` / `.body`
- `process.title` / `process.sub` / `process.steps.{n}.title` / `.body`
- `projects.title` / `projects.sub` / `projects.items.{id}.caption` + media alts
- `contact.title` / `contact.sub` / `contact.form.*` (labels, placeholders, errors th+en) / success / error
- `mobileBar.call` / `mobileBar.line`
- `footer.*`

Placeholder Thai direction (replace with client voice):

- Hero brand: ชื่อธุรกิจ (TBD)
- Headline: สร้างและรีโนเวทอย่างมืออาชีพ — คุยแผนงานได้วันนี้
- Sub: รับเหมาก่อสร้าง / ต่อเติม / รีโนเวท บ้านและอาคาร — ประเมินฟรีทางโทรหรือ LINE

### Media list (`media.json`)

| Key | Asset | Notes |
|-----|--------|--------|
| `media.global.favicon` | `/assets/favicon.ico` | TBD |
| `media.global.og` | `/assets/og.jpg` | 1200×630 |
| `media.hero.image` | `/assets/hero.jpg` | Full-bleed site/project photo |
| `media.projects.01` … `0n` | `/assets/projects/…` | Real project shots |
| `media.services.*` (optional) | only if needed | Prefer photos over icons |

Alts/captions live in copy files, not `media.json`.

### Contact flow

- Client: `react-hook-form` + `zod`; Thai + English errors from copy
- Callable: `httpsCallable(functions, "submitContact")` (name TBD at scaffold) → region `asia-southeast1`
- Fields (consultation): name, email (required), phone (optional), message
- States: idle → submitting → success | error
- Fallbacks beside form: `tel:+66…`, LINE deep link
- Server: validate, Firestore first, Resend from `info@chokdee.online`, `escapeHtml`
- Config (not copy): phone, email, LINE URL, site URL, Firebase `VITE_*` in `config.ts` / `.env.example`

### SEO / AEO baseline

- `<html lang="th">` + `/th` `/en` routes or locale switcher
- Title, description, OG; `robots.txt`, `sitemap.xml`
- JSON-LD `LocalBusiness` (or `GeneralContractor`) when address/phone confirmed
- Semantic landmarks throughout

### Brief gaps — confirm before build

- [ ] Legal / display business name (Thai + English)
- [ ] Phone (`+66…`), LINE URL/ID, email, address / service area
- [ ] Service list (e.g. บ้านใหม่ / รีโนเวท / ต่อเติม / อาคารพาณิชย์) and any packages/pricing
- [ ] Brand direction: logo, colors, fonts (default = Apple Minimal / Chokdee)
- [ ] Hero + project photos (or stock placeholders for v1)
- [ ] Domain / Firebase project (`landing-chokdee` unless overridden)
- [ ] Form field rules (email vs phone required)

**Approve this plan (and fill brief gaps) before any scaffold/build.**

## Build (only after the plan is approved and an explicit build phase begins)

> Gate: do not start this section until the plan above is done **and** a build phase
> is explicitly requested. Nothing here should run during bootstrap or planning.

- [ ] Scaffold Vite + React + TypeScript + Tailwind 4 (`@tailwindcss/vite`)
- [ ] Commit `.env.example` only — never commit secrets
- [ ] Follow standard layout: `src/app`, `src/components`, `src/content`, `src/lib`, `src/styles`, `functions/`
- [ ] Bilingual from day one: Thai first in `copy.th.json`, mirror keys in `copy.en.json`
- [ ] All media URLs in `media.json`; contact/config in `config.ts`
- [ ] Mobile-first conversion: Call + LINE + contact form; sticky mobile contact bar
- [ ] SEO baseline: title/description/OG, `robots.txt`, `sitemap.xml`, semantic landmarks

## Working rules

- [ ] Read this plan before large changes; check off items as they land
- [ ] Do not invent alternate stacks (no Next.js / CRA / other CSS frameworks unless the brief requires it)
- [ ] Keep v1 scope tight: conversion landing first; CMS/booking/ads are separate quotes
- [ ] Prefer `/push-to-github` (or equivalent) to sync work; deploy only when asked
