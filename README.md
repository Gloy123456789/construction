# Black Construction

เว็บไซต์แนะนำตัว / แปลงลูกค้า สำหรับ **บริษัท แบล็ค การก่อสร้าง จำกัด** (BLACK CONSTRUCTION CO., LTD.) โดย Chokdee Online

## สถานะ

อยู่ขั้นวางแผน — ดูแผนพัฒนาฉบับเต็มใน [plan.md](./plan.md)

**ยังไม่เริ่ม scaffold หรือเขียนโค้ดแอป** จนกว่าแผนจะได้รับการอนุมัติและมีการสั่ง build phase

## เส้นทาง URL (prefix ภาษา)

ภาษาเริ่มต้น: `th` · สวิตช์ภาษาต้องคง path ให้คู่กัน

| Route | หน้าที่ |
|-------|---------|
| `/th` · `/en` | ฮับ — แบรนด์ + ภาพรวม 3 บริการ + CTA |
| `/th/construction` · `/en/construction` | ก่อสร้าง (ถ้อยคำพันธมิตร) |
| `/th/marketing` · `/en/marketing` | การตลาด |
| `/th/consulting` · `/en/consulting` | ที่ปรึกษา |
| `/th/portfolio` · `/en/portfolio` | ผลงาน |
| `/th/about` · `/en/about` | เกี่ยวกับเรา |
| `/th/contact` · `/en/contact` | ติดต่อ |

**Construction (ล็อก):** ขอบเขต — ออกแบบและก่อสร้าง · ต่อเติม · รีโนเวท · บิ้วอิน · พัฒนาอสังหา · ถ้อยคำแกน — *นำเสนอบริการออกแบบและก่อสร้างโดยอาศัยความร่วมมือกับพันธมิตรที่มีความเชี่ยวชาญ*

> ยุบ Real Estate เข้ากับ Construction แล้ว (เดิมทับซ้อนเรื่องงานก่อสร้าง)

## สแตกเทคนิค (ห้ามเปลี่ยน)

| ชั้น | ใช้สิ่งนี้ |
|------|-----------|
| Frontend | Vite 6 + React 18 + TypeScript |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Routing | `react-router-dom` (locale + หลายหน้า) |
| Icons | `lucide-react` |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers/zod` |
| Hosting | Firebase Hosting → `dist/` |
| Backend | Callable Functions `asia-southeast1` + Resend + Firestore |
| Maps | Google Maps iframe embed (เมื่อมีที่อยู่) |

## ติดต่อด่วน (จาก brief)

- โทร: 086-886-9282 (`+66868869282`)
- ที่อยู่: 3/6 ซอยคู้บอน 44 แขวงบางชัน เขตคลองสามวา กรุงเทพมหานคร 10510
- พื้นที่บริการ: กรุงเทพฯ · ปริมณฑล · ต่างจังหวัด
