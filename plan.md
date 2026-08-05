# Construction — Agent Plan

Short standard instructions for agents working in this repo.

**Client:** บริษัท แบล็ค การก่อสร้าง จำกัด / BLACK CONSTRUCTION CO., LTD.  
**Agency:** Chokdee Online (landing build)

## Bootstrap (once)

- [x] Keep `README.md` and this `plan.md` as the entry docs
- [x] Ensure GitHub remote exists and `main` is pushed (required for Cursor Cloud)
- [x] Verify the remote actually exists: `git ls-remote --symref origin HEAD` resolves `refs/heads/main`
- [x] Add `.gitignore` for `node_modules/`, `dist/`, `.env`, `functions/lib/`, `.firebase/`
- [x] Finish Cloud environment setup via onboard URL (agent cannot create environments via API)
- [x] Create Cloud environment: New environment → select this repo → skip agent-led setup → Save (no build verify)

After bootstrap, **stop**. The only tracked files should be `README.md` and `plan.md`
(plus `.gitignore`). Do **not** scaffold, install, build, run, or test anything yet —
wait for the plan phase and for the plan to be written and approved.

## Plan phase (before any build)

- [x] Write the site plan: sections, Thai-first copy outline, media list, contact flow
- [x] Confirm brief details (partial — see gaps below)
- [ ] Get the plan reviewed and approved before starting the build phase

### Brief (from client questionnaire + branding assets)

| Item | Decision |
|------|----------|
| Legal name (TH) | บริษัท แบล็ค การก่อสร้าง จำกัด |
| Legal name (EN) | BLACK CONSTRUCTION CO., LTD. |
| Display brand | แบล็ค การก่อสร้าง / Black Construction |
| Phone | `086-886-9282` → `tel:+66868869282` |
| Address | 3/6 ซอยคู้บอน 44 แขวงบางชัน เขตคลองสามวา กรุงเทพมหานคร 10510 |
| Service area | กรุงเทพฯ และต่างจังหวัด |
| Target clients | บ้านพักอาศัย · โรงงาน · อาคารสำนักงาน · โรงพยาบาล |
| Services to promote | **Chokdee recommendation** — segment by those 4 project types (see below) |
| Brand color | สีน้ำเงิน (official stamp + uniform); not the red logo variant |
| Logo | Circular/oval seal: diamond–plumb-bob mark + TH/EN company name (blue ink) |
| Photos | Client will send later — plan placeholders for v1 |
| Inspiration sites | None |

### Site concept

Single-page bilingual landing for **Black Construction**. Goal: conversion — Call, LINE, form. Design: Apple Minimal / Chokdee Online — clean, professional, trustworthy — with **navy / medium blue** accents from the company seal (avoid purple gradients, cream+terracotta cliché, or red brand variant).

Hero composition (first viewport only): brand, one headline, one support line, one CTA group (Call + LINE + scroll-to-form), one full-bleed site photo. No cards, stats, or overlays in the hero.

### Services (Chokdee picks — aligned to target clients)

Promote **four project types** as the primary offer (not generic renovate packages):

1. **บ้านพักอาศัย** — ก่อสร้าง / ต่อเติม / รีโนเวทบ้าน  
2. **โรงงาน** — อาคารโรงงานและพื้นที่อุตสาหกรรม  
3. **อาคารสำนักงาน** — สำนักงานและอาคารพาณิชย์  
4. **โรงพยาบาล** — อาคารสถานพยาบาลและงานสถาบัน

Supporting trust section: short **process** (สำรวจหน้างาน → เสนอแผน/ราคา → ก่อสร้างควบคุมคุณภาพ → ส่งมอบ) + service-area line (กทม. และต่างจังหวัด).

### Sections (v1)

| # | Section | Purpose | Notes |
|---|---------|---------|--------|
| 1 | Sticky header | Brand + logo mark + anchor nav (md+) + lang + Call/LINE | Contact before scroll past hero |
| 2 | Hero | Brand-first full-bleed | Brand must survive “nav removed” test |
| 3 | Services | Four project types above | One job: choose audience / project type |
| 4 | Process / why us | Trust + how work starts | Bangkok + provinces callout here or footer |
| 5 | Projects / gallery | Real site photos when provided | Placeholders OK until client sends |
| 6 | Contact | Form + phone + LINE | `MobileContactBar` `md:hidden` |
| 7 | Footer | Legal name, address, phone, reg. note optional | Semantic `footer` / `address` |

### Thai-first copy outline (`copy.th.json` → mirror `copy.en.json`)

Stable keys:

- `seo.title` / `seo.description` / `seo.ogTitle` / `seo.ogDescription`
- `nav.*` · `hero.brand` / `headline` / `sub` / `ctaCall` / `ctaLine` / `ctaForm`
- `services.title` / `sub` / `items.residential|factory|office|hospital.title|body`
- `process.title` / `sub` / `steps.{1-4}.title|body`
- `projects.*` + media alts · `contact.*` (labels, placeholders, errors th+en) · `mobileBar.*` · `footer.*`

Draft Thai direction:

- Brand: แบล็ค การก่อสร้าง  
- Headline: ก่อสร้างครบวงจร — บ้าน โรงงาน สำนักงาน และสถานพยาบาล  
- Sub: รับงานกรุงเทพฯ และต่างจังหวัด · คุยแผนงานได้ทางโทรหรือ LINE  

### Media list (`media.json`)

| Key | Asset | Notes |
|-----|--------|--------|
| `media.global.logo` | `/assets/logo-blue.svg` (or png) | Blue seal / plumb-bob mark |
| `media.global.favicon` | `/assets/favicon.ico` | From logo |
| `media.global.og` | `/assets/og.jpg` | 1200×630 |
| `media.hero.image` | `/assets/hero.jpg` | Full-bleed site photo — **awaiting client** |
| `media.projects.01` … | `/assets/projects/…` | Worksite photos — **awaiting client** |
| `media.brand.uniform` (optional) | shirt/back photo | Trust / about — only if client approves use |

Alts/captions in copy files only. Until photos arrive: compressed placeholder site imagery (clearly temporary), never fake logos.

### Contact flow

- Client: `react-hook-form` + `zod`; errors from copy (th + en)
- Callable → `asia-southeast1`; Firestore first; Resend from `info@chokdee.online`; `escapeHtml`
- Fields (business consultation): name, email (required), phone (optional but encouraged), message / project type
- States: idle → submitting → success | error
- Always show `tel:+66868869282` + LINE deep link near form and in `MobileContactBar`
- Config in `config.ts`: phone, LINE URL, public email, address, site URL, Firebase `VITE_*`

### Design tokens (draft)

- Primary blue from seal/uniform (navy–medium blue, not purple)
- Neutrals: cool gray / off-white (not pure black/white blocks)
- Expressive sans for UI; avoid Inter/Roboto/Arial defaults
- Motion: fade-in on scroll (2–3 intentional), no heavy parallax

### SEO / AEO baseline

- `<html lang="th">` + `/th` · `/en`
- Title/description/OG; `robots.txt`; `sitemap.xml`
- JSON-LD `GeneralContractor` / `LocalBusiness` with name, phone, address, areaServed
- Semantic landmarks throughout

### Remaining gaps before build

- [ ] LINE Official / personal ID or deep-link URL
- [ ] Public contact email (if different from form routing)
- [ ] Client project/team photos (or approve placeholders)
- [ ] Domain + Firebase project confirm (`landing-chokdee` default)
- [ ] Explicit plan approval + build-phase request

**Do not scaffold until this plan is approved and the gaps above are filled or explicitly deferred.**

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
- [ ] Apply blue brand tokens + logo seal; four service segments as above

## Working rules

- [ ] Read this plan before large changes; check off items as they land
- [ ] Do not invent alternate stacks (no Next.js / CRA / other CSS frameworks unless the brief requires it)
- [ ] Keep v1 scope tight: conversion landing first; CMS/booking/ads are separate quotes
- [ ] Prefer `/push-to-github` (or equivalent) to sync work; deploy only when asked
