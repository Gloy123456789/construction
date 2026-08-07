# Deployment notes — Black Construction

## Architecture decision (not Next.js App Hosting)

This repository is a **Vite 6 + React 18 SPA** (not Next.js).

| Option | Fit |
|--------|-----|
| **Firebase Hosting** (current) | Correct — static `dist/` + SPA rewrite |
| Firebase App Hosting | Built for Next.js/SSR frameworks — **not used** |

Do **not** migrate to Next.js unless explicitly requested. Keep GitHub remote and Firebase project as configured.

## Production targets

- GitHub: `https://github.com/Gloy123456789/construction` (`main`)
- Firebase project: `chokdee-online-project`
- Hosting site: `black-construction`
- Custom domain (canonical): https://blackconstruction.com
- Fallback URL: https://black-construction.web.app

## Custom domain setup (`blackconstruction.com`)

Firebase Console → Hosting → site **black-construction** → **Add custom domain**:

https://console.firebase.google.com/project/chokdee-online-project/hosting/sites/black-construction

1. Add `blackconstruction.com` (and optionally `www.blackconstruction.com`)
2. Verify ownership with the TXT record Firebase shows
3. Point DNS to Firebase:
   - **Apex** `blackconstruction.com` → A records Firebase provides
   - **www** (optional) → CNAME to Firebase host
4. Wait for SSL status **Connected**

App canonical URL is already set to `https://blackconstruction.com` (`VITE_SITE_URL`, sitemap, robots).

## Automatic deploy (GitHub → Firebase Hosting)

Workflow: `.github/workflows/firebase-hosting.yml`

1. Create a Google Cloud service account with Firebase Hosting Admin on `chokdee-online-project`
2. Add GitHub secret `FIREBASE_SERVICE_ACCOUNT_CHOKDEE_ONLINE_PROJECT` (full JSON)
3. Add Vite Firebase config as GitHub Actions secrets/vars (see `.env.example`)
4. Push to `main` → Actions builds → Hosting live channel

Until that secret is configured, deploy manually:

```bash
npm run build
npx firebase-tools@latest deploy --only hosting:black-construction --project chokdee-online-project
```

## Cloud Functions (contact form)

Callable `submitContact` lives in `functions/`. Deploy separately when ready:

```bash
cd functions && npm install && npm run build && cd ..
npx firebase-tools@latest deploy --only functions --project chokdee-online-project
```

Set secrets: `RESEND_API_KEY`, `CONTACT_NOTIFY_TO`.  
Never put Admin SDK keys in the browser or commit them to Git.
