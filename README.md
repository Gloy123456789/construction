# Black Construction

เว็บไซต์แนะนำตัว / แปลงลูกค้า สำหรับ **บริษัท แบล็ค การก่อสร้าง จำกัด** (BLACK CONSTRUCTION CO., LTD.) โดย Chokdee Online

## สถานะ

Production polish — Vite SPA บน Firebase Hosting  
แผน IA: [plan.md](./plan.md) · เทคนิค: [TECHNICAL_PLAN.md](./TECHNICAL_PLAN.md) · Deploy: [DEPLOYMENT.md](./DEPLOYMENT.md)

**สแตกจริง:** Vite 6 + React 18 + TypeScript + Tailwind 4 (ไม่ใช่ Next.js)

## พัฒนาท้องถิ่น

```bash
npm install
cd functions && npm install && cd ..
cp .env.example .env.local
npm run dev
```

- Build: `npm run build`
- Hosting: `npm run deploy:hosting` (ต้องมี Firebase auth)

## Production

- Live: https://blackconstruction.com
- GitHub `main` → GitHub Actions → Firebase Hosting (เมื่อตั้ง secret แล้ว — ดู `DEPLOYMENT.md`)

## เส้นทาง URL

| Route | หน้าที่ |
|-------|---------|
| `/th` · `/en` | ฮับ |
| `/th/construction` · `/en/construction` | ก่อสร้าง |
| `/th/marketing` · `/en/marketing` | การตลาด |
| `/th/consulting` · `/en/consulting` | ที่ปรึกษา |
| `/th/portfolio` · `/en/portfolio` | ผลงาน |
| `/th/about` · `/en/about` | เกี่ยวกับเรา |
| `/th/contact` · `/en/contact` | ติดต่อ / ขอใบเสนอราคา |
| `/th/privacy` · `/en/privacy` | นโยบายความเป็นส่วนตัว |

## เนื้อหา

- Copy: `src/content/copy.th.json` / `copy.en.json`
- Media: `src/content/media.json`
- Config / trust stats: `src/content/config.ts`

## ติดต่อด่วน

- โทร: 086-886-9282 (`+66868869282`)
- ที่อยู่: 3/6 ซอยคู้บอน 44 แขวงบางชัน เขตคลองสามวา กรุงเทพมหานคร 10510
- LINE / อีเมลสาธารณะ — ใส่ใน `config.ts` เมื่อได้จากลูกค้า
