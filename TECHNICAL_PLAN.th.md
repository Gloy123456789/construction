# แผนเทคนิค — แบล็ค การก่อสร้าง

## สแตก

- Vite 6 + React 18 + TypeScript
- Tailwind CSS 4 (`@tailwindcss/vite`)
- `react-router-dom` — locale prefix `/th` · `/en`
- `react-hook-form` + `zod` + Firebase Callable (`submitContact`, `asia-southeast1`)
- Firebase Hosting → `dist/` · project `landing-chokdee`

## โครงสร้างสำคัญ

```
src/
  app/           # หน้า + App router
  components/    # Header, Footer, ContactForm, MobileContactBar, …
  content/       # copy.th.json, copy.en.json, media.json, config.ts
  lib/           # content, i18n, seo, firebase helpers
  styles/        # theme tokens (brand navy)
functions/       # submitContact → Firestore + Resend
```

## เนื้อหา / สื่อ

- ข้อความทั้งหมดอยู่ใน `copy.th.json` / `copy.en.json` (ไทยเป็นต้นทาง)
- URL สื่อทั้งหมดอยู่ใน `media.json`
- ค่าคงที่ติดต่ออยู่ใน `config.ts` (โทร · ที่อยู่ · LINE · อีเมล)

## ฟอร์มติดต่อ

1. Client validate ด้วย zod (ข้อความ error สองภาษา)
2. Honeypot field `website`
3. Callable `submitContact` — validate ฝั่งเซิร์ฟเวอร์ · rate limit ตาม IP · บันทึก Firestore ก่อน · ส่งอีเมลผ่าน Resend
4. ถ้าไม่มี `VITE_FIREBASE_*` ฝั่ง client จะ demo-success (สำหรับ local)

## SEO

- Meta / OG ต่อหน้าผ่าน `Seo`
- JSON-LD: LocalBusiness + Service + BreadcrumbList
- `public/robots.txt` · `public/sitemap.xml` (ทุกหน้า × th/en)

## คำสั่ง

```bash
npm install
cd functions && npm install && cd ..
npm run dev
npm run build
firebase deploy   # เมื่อสั่งเท่านั้น
```

Secrets ที่ต้องตั้งก่อน deploy functions: `RESEND_API_KEY`, `CONTACT_NOTIFY_TO`
