# Construction — Agent Plan

Short standard instructions for agents working in this repo.

## Bootstrap (once)

- [ ] Keep `README.md` and this `plan.md` as the entry docs
- [ ] Ensure GitHub remote exists and `main` is pushed (required for Cursor Cloud)
- [ ] Verify the remote actually exists: `git ls-remote --symref origin HEAD` resolves `refs/heads/main`
- [ ] Add `.gitignore` for `node_modules/`, `dist/`, `.env`, `functions/lib/`, `.firebase/`
- [ ] Finish Cloud environment setup via onboard URL (agent cannot create environments via API)
- [ ] Create Cloud environment: New environment → select this repo → skip agent-led setup → Save (no build verify)

After bootstrap, **stop**. The only tracked files should be `README.md` and `plan.md`
(plus `.gitignore`). Do **not** scaffold, install, build, run, or test anything yet —
wait for the plan phase and for the plan to be written and approved.

## Plan phase (before any build)

- [ ] Write the site plan: sections, Thai-first copy outline, media list, contact flow
- [ ] Confirm brief details (contact info, packages, brand direction)
- [ ] Get the plan reviewed and approved before starting the build phase

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
