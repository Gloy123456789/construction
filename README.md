# Black Construction

เว็บไซต์แนะนำตัว / แปลงลูกค้า สำหรับ **บริษัท แบล็ค การก่อสร้าง จำกัด** (BLACK CONSTRUCTION CO., LTD.) โดย Chokdee Online

## สถานะ

**Build phase** — scaffold + หน้าหลัก + ฟอร์ม + SEO พร้อมแล้ว  
แผน IA: [plan.md](./plan.md) · แผนเทคนิค: [TECHNICAL_PLAN.md](./TECHNICAL_PLAN.md)

## พัฒนาท้องถิ่น

```bash
npm install
cd functions && npm install && cd ..
cp .env.example .env   # ใส่ค่า Firebase เมื่อพร้อม
npm run dev
```

Build: `npm run build` · Deploy (เมื่อสั่ง): `firebase deploy`

## เส้นทาง URL

ภาษาเริ่มต้น: `th` · สวิตช์ภาษาคง path คู่กัน

| Route | หน้าที่ |
|-------|---------|
| `/th` · `/en` | ฮับ |
| `/th/construction` · `/en/construction` | ก่อสร้าง (ถ้อยคำพันธมิตร) |
| `/th/marketing` · `/en/marketing` | การตลาด |
| `/th/consulting` · `/en/consulting` | ที่ปรึกษา |
| `/th/portfolio` · `/en/portfolio` | ผลงาน |
| `/th/about` · `/en/about` | เกี่ยวกับเรา |
| `/th/contact` · `/en/contact` | ติดต่อ |

**Construction (ล็อก):** *นำเสนอบริการออกแบบและก่อสร้างโดยอาศัยความร่วมมือกับพันธมิตรที่มีความเชี่ยวชาญ*

## สแตก (ห้ามเปลี่ยน)

Vite 6 · React 18 · TypeScript · Tailwind 4 · react-router-dom · lucide-react · RHF+zod · Firebase Hosting + Callable (`asia-southeast1`) + Resend

## เนื้อหา

- Copy: `src/content/copy.th.json` / `copy.en.json`
- Media URLs: `src/content/media.json`
- Config: `src/content/config.ts`

## ติดต่อด่วน

- โทร: 086-886-9282 (`+66868869282`)
- ที่อยู่: 3/6 ซอยคู้บอน 44 แขวงบางชัน เขตคลองสามวา กรุงเทพมหานคร 10510
- พื้นที่บริการ: กรุงเทพฯ · ปริมณฑล · ต่างจังหวัด
- LINE URL / อีเมลสาธารณะ — รอจากลูกค้า (ซ่อน CTA จนกว่าจะใส่ใน `config.ts`)
