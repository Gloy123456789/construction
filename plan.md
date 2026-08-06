# Black Construction — แผนพัฒนาเว็บไซต์

แผนนี้พร้อมสำหรับเริ่มพัฒนาหลังอนุมัติ — **ยังไม่เริ่มเขียนโค้ด** จนกว่าจะมีการอนุมัติแผนและสั่ง build phase อย่างชัดเจน

| | |
|---|---|
| **ลูกค้า** | บริษัท แบล็ค การก่อสร้าง จำกัด / BLACK CONSTRUCTION CO., LTD. |
| **แบรนด์แสดงผล** | แบล็ค การก่อสร้าง / Black Construction |
| **เอเจนซี** | Chokdee Online |
| **รูปแบบ** | Multi-page bilingual (`/th` · `/en`) — หน้าแรก + 4 เสาบริการ + Portfolio + About + Contact |
| **สแต็ก** | Vite 6 + React 18 + TypeScript + Tailwind CSS 4 + Firebase Hosting / Callable Functions |
| **สถานะ** | Plan phase — รออนุมัติ + ข้อมูลที่ยังขาด |

---

## 1. เป้าหมายของเว็บไซต์

### เป้าหมายหลัก (ตามที่ลูกค้าระบุ)
1. **สร้างภาพลักษณ์ที่ดูน่าเชื่อถือ** — professional และไว้วางใจได้
2. **ดีไซน์สะอาดและทันสมัย** — โทนสีน้ำเงินตามสีเสื้อยูนิฟอร์มที่แนบมา (กรมท่า/indigo)
3. **ใช้งานง่ายทั้งคอมพิวเตอร์และมือถือ** — responsive · mobile-first
4. **เมนูเรียบง่าย แต่แสดงบริการได้ชัดเจน** — nav สั้น · 4 เสาบริการเห็นชัด
5. **กระตุ้นให้ติดต่อผ่านโทรศัพท์หรือ LINE** — CTA เด่น เข้าถึงได้ทันที
6. **แสดงผลงานด้วยภาพถ่ายและวิดีโอคุณภาพสูง** — Portfolio รองรับทั้งรูป วิดีโอ และความคิดเห็นลูกค้า
7. **สร้างความเชื่อมั่นด้วยประสบการณ์และความเชี่ยวชาญหลายด้าน** — Real Estate · Marketing · Construction · Consulting

### Conversion goal (แปลงเป็นการติดต่อ)
ทำให้ผู้เข้าชม **ติดต่อบริษัทได้ทันที** ผ่านโทรศัพท์ · LINE · อีเมล · ฟอร์ม — โดยไม่ต้องเลื่อนผ่าน hero ก็เห็นช่องทางติดต่อ

### Success metrics (v1)
- Call / LINE / form ใช้งานได้จริงบนมือถือ
- ฟอร์มบันทึก Firestore และส่งอีเมล (เมื่อตั้งค่า Resend แล้ว)
- โหลดสมเหตุสมผลบนมือถือ (รูป/วิดีโอบีบอัด · JS น้อย)
- Layout ตรวจที่ 375px · 768px · 1280px+
- ภาพลักษณ์สื่อความน่าเชื่อถือทันทีในหน้าจอแรก (แบรนด์ + โทนน้ำเงิน + ภาพรวมบริการ)

---

## 1.1 โอกาสในการช่วยให้ธุรกิจเติบโต

### เป้าหมายที่ 1 — ช่วยให้ลูกค้าใหม่ค้นพบธุรกิจ

ลูกค้าค้นผ่าน Google · Google Maps · ChatGPT · Google AI และผู้ช่วย AI อื่น ๆ เว็บต้องตอบ **5 คำถามแกน** ด้วยข้อความตรงไปตรงมา

| คำถาม | ตอบที่ไหน | รูปแบบที่ AI/Google อ่านได้ |
|-------|-----------|---------------------------|
| **คุณคือใคร** | หน้าแรก · About · JSON-LD | ชื่อนิติบุคคลเต็ม TH/EN · ที่อยู่ · โทร |
| **ให้บริการอะไร** | หน้าแรก (ภาพรวม) + 4 หน้าเสาบริการ | หัวข้อ + ขอบเขตงานเป็นข้อความ · JSON-LD `Service` |
| **ช่วยใคร** | บล็อก "เหมาะกับใคร" ในทุกหน้าบริการ + About | ระบุกลุ่มลูกค้าตรง ๆ |
| **ทำไมควรเลือกแบล็ค การก่อสร้าง** | About · Portfolio · Why-us บนหน้าแรก | เหตุผลที่พิสูจน์ได้ · ไม่ใช้ claim ลอย |
| **ให้บริการพื้นที่ใด** | หน้าแรก · ทุกหน้าบริการ · Contact · footer | **กรุงเทพฯ · ปริมณฑล · ต่างจังหวัด** + `areaServed` |

**กลไกที่ต้องมี:** หน้าเฉพาะต่อบริการ (§4) · JSON-LD ต่อหน้า (§10) · sitemap ครบทุก URL · internal link · เนื้อหาข้อความจริง

### เป้าหมายที่ 2 — เปลี่ยนผู้เข้าชมให้เป็นลูกค้า

| คำถามของผู้เข้าชม | ตอบด้วย | ตำแหน่ง |
|-------------------|---------|---------|
| บริษัทนี้ช่วยฉันได้ไหม | Headline + ภาพรวม 4 เสา + ลิงก์เข้าหน้าบริการ | หน้าแรก Hero · Services hub |
| ทำไมฉันควรเชื่อถือ | About · Portfolio (รูป/วิดีโอ/รีวิว) · ข้อมูลนิติบุคคล | About · Portfolio · Footer |
| บริการไหนเหมาะกับฉัน | 4 เสาแยกชัด + หน้าเฉพาะ | Real Estate · Marketing · Construction · Consulting |
| ติดต่อได้อย่างไร | โทร · LINE · อีเมล · ฟอร์ม | Header · MobileContactBar · Contact |

**เกณฑ์วัด:** ผู้ใช้มือถือใหม่ตอบได้ทั้ง 4 ข้อโดยเลื่อนไม่เกิน ~2 หน้าจอ (บนหน้าแรก) และกดติดต่อได้จากทุกหน้า

---

## 2. กลุ่มลูกค้าเป้าหมาย

| กลุ่ม | เสาบริการที่เกี่ยว | ความต้องการหลัก |
|------|-------------------|-----------------|
| เจ้าของบ้าน / ผู้รีโนเวท / ผู้ต้องการบิ้วอิน | Real Estate · Construction | ต่อเติม ก่อสร้าง บิ้วอิน |
| ผู้พัฒนา/เจ้าของอสังหา | Real Estate · Consulting · Construction | พัฒนาโครงการ · วางแผนขาย |
| เจ้าของธุรกิจที่ต้องการการตลาด | Marketing · Consulting | Digital · Branding · Social · Photo/Video · Ads |
| โรงงาน · สำนักงาน · สถานพยาบาล (จาก brief เดิม) | Real Estate · Construction · Consulting | อาคารใช้งาน / โครงการสถาบัน |
| ผู้ต้องการที่ปรึกษาโครงการ | Consulting | กลยุทธ์ · การตลาด · พัฒนาโครงการ · วางแผนขาย |

**พื้นที่บริการ:** กรุงเทพมหานคร · ปริมณฑล · ต่างจังหวัดทั่วไทย

> Brief เดิม (บ้าน · โรงงาน · สำนักงาน · โรงพยาบาล) ยังใช้เป็น **กลุ่มงานภายใน Real Estate / Construction** ไม่ทิ้ง — แต่โครงนำทางระดับบนเป็น 4 เสาตามที่แนะนำ

---

## 3. จุดเด่นของบริษัท (ใช้บนเว็บ)

1. **ความเชี่ยวชาญหลายด้าน** — Real Estate · Marketing · Construction · Consulting ในแบรนด์เดียว  
2. **ฐานงานก่อสร้าง/ต่อเติม/บิ้วอิน** — จุดเริ่มและความแข็งของแบรนด์  
3. **พื้นที่กว้าง** — กรุงเทพฯ · ปริมณฑล · ต่างจังหวัด  
4. **ผลงานจริง** — ภาพ วิดีโอ ความคิดเห็นลูกค้า ครอบคลุมทั้งสี่ด้าน  
5. **ติดต่อง่าย** — โทร `086-886-9282` + LINE (รอ URL) + อีเมล + ฟอร์ม  
6. **แบรนด์ชัด** — โลโก้ตราประทับสีน้ำเงิน · ชุดยูนิฟอร์ม  
7. **นิติบุคคลจดทะเบียน** — บริษัท แบล็ค การก่อสร้าง จำกัด · คู้บอน 44 คลองสามวา  

**โทนพิเศษ — หน้า Construction (ล็อกแล้ว):**  
ใช้ถ้อยคำตรงนี้เท่านั้น — *นำเสนอบริการออกแบบและก่อสร้างโดยอาศัยความร่วมมือกับพันธมิตรที่มีความเชี่ยวชาญ* — ไม่โอเวอร์เคลมว่าทำทุกอย่างเองทั้งหมด

> จุดเด่นที่ยังไม่มีหลักฐาน (ปีประสบการณ์ตัวเลข · จำนวนโครงการ · ใบอนุญาต) **ไม่ใส่** จนกว่าลูกค้าจะยืนยัน

---

## 3.1 จุดเด่นเว็บไซต์ปัจจุบันที่ต้องคงไว้ (baseline)

| จุดเด่นที่คงไว้ | แปลงเป็นข้อกำหนดในงานนี้ | ตรวจที่ |
|-----------------|--------------------------|---------|
| **ดีไซน์ทันสมัย** | Apple Minimal · โทนน้ำเงินยูนิฟอร์ม · ฟอนต์ expressive | §13 |
| **ใช้งานง่าย** | เมนูสั้น 8 รายการ · หนึ่งหน้าหนึ่งหน้าที่ · ไม่ clutter | §4–§6 |
| **รองรับมือถือ** | mobile-first · แตะ ≥44px · ทดสอบ 375/768/1280+ | §9 |
| **ดูเป็นมืออาชีพ** | แบรนด์เด่นจอแรก · ผลงานจริง · ไม่มี claim เกินจริง | §6 |
| **ช่องทางติดต่อชัดเจน** | โทร + LINE ใน header · `MobileContactBar` · หน้า Contact | §6 |

### ต่อยอด: สะท้อนธุรกิจที่ขยายขึ้น

1. **จากงานก่อสร้างอย่างเดียว → สี่เสาบริการ** — Real Estate · Marketing · Construction · Consulting  
2. **จาก single-page → multi-page discovery** — หน้าเฉพาะต่อบริการ + Portfolio + About + Contact  
3. **จากพื้นที่จำกัด → กทม. + ปริมณฑล + ต่างจังหวัด**  
4. **จากรูปนิ่ง → ภาพ + วิดีโอ + รีวิวลูกค้า**  
5. **จากไทยอย่างเดียว → ไทย + อังกฤษ**  
6. **จากติดต่อพื้นฐาน → Contact ครบช่องทาง + ฟอร์มเลือกประเภทบริการ**

---

## 4. Sitemap — เส้นทาง URL (มี prefix ภาษา)

**ภาษาเริ่มต้น:** `th`  
**กฎสวิตช์ภาษา:** สลับ `/th/...` ↔ `/en/...` ต้อง **คง path ให้คู่กัน** (เช่น `/th/portfolio` ↔ `/en/portfolio`) · ไม่เด้งกลับหน้าแรก · `hreflang` + `x-default` ชี้ชุดเดียวกัน

| Route | หน้าที่ |
|-------|---------|
| `/th` · `/en` | **ฮับ** — แบรนด์ + ภาพรวม 4 บริการ + CTA |
| `/th/real-estate` · `/en/real-estate` | อสังหาริมทรัพย์ |
| `/th/marketing` · `/en/marketing` | การตลาด |
| `/th/construction` · `/en/construction` | ก่อสร้าง (**ถ้อยคำพันธมิตร — ล็อกไว้ด้านล่าง**) |
| `/th/consulting` · `/en/consulting` | ที่ปรึกษา |
| `/th/portfolio` · `/en/portfolio` | ผลงาน |
| `/th/about` · `/en/about` | เกี่ยวกับเรา |
| `/th/contact` · `/en/contact` | ติดต่อ |

```
/                    → redirect → /th
├── /th              → ฮับ
├── /th/real-estate
├── /th/marketing
├── /th/construction
├── /th/consulting
├── /th/portfolio
├── /th/about
├── /th/contact
└── /en/<same-paths> → คู่ภาษาเดียวกัน

สาธารณะ: /robots.txt · /sitemap.xml · /assets/...
```

### บทบาทหน้า (สรุป)

| หน้า | บทบาทเนื้อหา |
|------|----------------|
| ฮับ | แนะนำแบล็ค การก่อสร้าง — ต่อเติม · ก่อสร้าง · บิ้วอิน · ความเชี่ยวชาญหลายด้าน · ลิงก์ 4 บริการ · CTA |
| Real Estate | รับต่อเติม · ก่อสร้าง · บิ้วอิน |
| Marketing | Digital Marketing · Branding · Social Media · Photography · Video · Advertising |
| Construction | ออกแบบและก่อสร้าง — ใช้ถ้อยคำล็อกด้านล่างเท่านั้น |
| Consulting | กลยุทธ์ธุรกิจ · การตลาด · การพัฒนาโครงการ · การวางแผนขาย · ที่ปรึกษาโครงการ |
| Portfolio | ผลงานทั้งสี่ด้าน — ภาพ · วิดีโอ · ความคิดเห็นลูกค้า |
| About | ที่มา · ทีมงาน · แนวคิดการทำงาน · จุดที่ทำให้แตกต่าง |
| Contact | โทรศัพท์ · LINE · อีเมล · แบบฟอร์มติดต่อ |

### ถ้อยคำ Construction (ล็อกไว้ — ใช้ตรงนี้)

> **TH:** นำเสนอบริการออกแบบและก่อสร้างโดยอาศัยความร่วมมือกับพันธมิตรที่มีความเชี่ยวชาญ  
> **EN (ร่างคู่):** We present design-and-build services through collaboration with specialized partners.

คีย์ copy: `construction.partnerStatement` — **ห้ามเปลี่ยนถ้อยคำไทยโดยไม่ผ่านลูกค้า** · หน้า Construction และบล็อกพันธมิตรต้องใช้ประโยคนี้เป็นแกน · ไม่โอเวอร์เคลมว่าทำทุกอย่างเอง

### เหตุผลที่แยกแต่ละบริการเป็นหน้าเฉพาะ

| เหตุผล | สิ่งที่ทำในงานนี้ |
|--------|------------------|
| ผู้เข้าชมหาข้อมูลง่ายขึ้น | เมนู/ฮับ/ผลการค้นหา → หน้าเดียวของบริการนั้น |
| อธิบายคุณค่าได้เต็มที่ | Template บริการมาตรฐาน · ไม่แย่งพื้นที่กับเสาอื่น |
| Google เข้าใจความเชี่ยวชาญดีขึ้น | 1 URL = 1 เสา · meta ไม่ซ้ำ · JSON-LD `Service` |
| AI แนะนำแม่นขึ้น | หน้าตอบคำถามเดียวชัด เป็นข้อความจริง |
| ยังสะอาดใช้ง่าย | Template + layout เดียวกัน · เมนูสั้น · `/th`·`/en` เป็นฮับ |

**เกณฑ์คุมความสะอาด:** หนึ่งบล็อกหนึ่งหน้าที่ · ไม่ filler · CTA โทร/LINE แบบเดียวทั้งไซต์

**นอกขอบเขต v1:** หน้าโปรเจกต์รายชิ้น · บล็อก · CMS · จองนัด · แอดมิน

### Template หน้าบริการ (ใช้ซ้ำกับ 4 เสา)

| ลำดับ | บล็อก | ตอบคำถาม |
|-------|-------|----------|
| 1 | Service hero + CTA โทร/LINE | บริการนี้ใช่ไหม |
| 2 | ขอบเขตงาน / ข้อเสนอ | ครอบคลุมอะไร |
| 3 | เหมาะกับใคร | ช่วยฉันได้ไหม |
| 4 | จุดเด่น / วิธีทำงาน (Construction: ใช้ถ้อยคำพันธมิตรที่ล็อก) | ทำไมเลือกเรา |
| 5 | ผลงานตัวอย่าง (ลิงก์/กรองจาก Portfolio) | ทำได้จริงไหม |
| 6 | พื้นที่บริการ | รับงานที่ฉันอยู่ไหม |
| 7 | CTA → Contact (preselect เสาบริการ) | ติดต่อยังไง |
| 8 | Related services + กลับฮับ | internal linking |

---

## 5. โครงสร้างแต่ละหน้า

ทุกหน้าหุ้มด้วย `SiteLayout` (Header + Footer + MobileContactBar) · สตริงจาก copy files

### 5.1 ฮับ (`/th` · `/en`)

```
Header
Hero          — แบรนด์ · หนึ่ง headline (ต่อเติม/ก่อสร้าง/บิ้วอิน + ความเชี่ยวชาญหลายด้าน)
                · หนึ่ง sub · CTA โทร/LINE/ไป Contact · full-bleed
Services hub  — 4 การ์ดลิงก์: Real Estate · Marketing · Construction · Consulting
Why us        — สั้น ๆ (ความน่าเชื่อถือ · พื้นที่บริการ · หลายด้าน)
Portfolio teaser — ตัวอย่างผลงาน 3–6 ชิ้น + ลิงก์ไป Portfolio
CTA band      — ไป Contact
Footer
```

**บทบาท:** แบรนด์ + ภาพรวม 4 บริการ + CTA — ไม่พยายามอธิบายทุกเสาจนเต็มหน้า

### 5.2 Real Estate (`/th/real-estate` · `/en/real-estate`)
- เน้น: ต่อเติม · ก่อสร้าง · บิ้วอิน  
- กลุ่มงานรอง (จาก brief): บ้าน · โรงงาน · สำนักงาน · สถานพยาบาล เป็นตัวอย่างประเภทงานภายในหน้านี้ได้  

### 5.3 Marketing (`/th/marketing` · `/en/marketing`)
- Digital Marketing · Branding · Social Media · Photography · Video · Advertising  
- แสดงเป็นรายการบริการย่อยที่สแกนง่าย (ไม่ใช่ 6 หน้าแยกใน v1)

### 5.4 Construction (`/th/construction` · `/en/construction`)
- ใช้ถ้อยคำล็อก: *นำเสนอบริการออกแบบและก่อสร้างโดยอาศัยความร่วมมือกับพันธมิตรที่มีความเชี่ยวชาญ*  
- ไม่ใช้คำว่า "ครบวงจรทุกอย่างเอง"  

### 5.5 Consulting (`/th/consulting` · `/en/consulting`)
- กลยุทธ์ธุรกิจ · การตลาด · การพัฒนาโครงการ · การวางแผนขาย · ที่ปรึกษาโครงการ  

### 5.6 Portfolio (`/th/portfolio` · `/en/portfolio`)
- ตัวกรองตาม 4 เสา  
- สื่อ: ภาพ · วิดีโอ (poster + ไม่ auto-play เสียง) · ความคิดเห็นลูกค้า  
- Lazy-load  

### 5.7 About (`/th/about` · `/en/about`)
- ที่มา · ทีมงาน · แนวคิดการทำงาน · จุดที่ทำให้แตกต่าง  
- ใส่เฉพาะข้อเท็จจริงที่ยืนยันแล้ว  

### 5.8 Contact (`/th/contact` · `/en/contact`)
- โทร · LINE · อีเมล · ที่อยู่  
- แบบฟอร์ม: ชื่อ · อีเมล (required) · โทร (optional แต่แนะนำ) · ประเภทบริการ (4 เสา) · ข้อความ  
- `react-hook-form` + `zod` · callable · Firestore · Resend  

`App.tsx` / page files = composition เท่านั้น

---

## 6. รายละเอียด Section ร่วม + Acceptance

### 6.1 Header
- Logo · nav: หน้าแรก · Real Estate · Marketing · Construction · Consulting · Portfolio · About · Contact  
- Call · LINE (#06C755) · language switcher (**คง path คู่กัน**)  
- Sticky · มือถือ: เมนูย่อ (drawer/แผงเรียบง่าย ไม่ clutter)

**Acceptance:** โทร/LINE ใช้ได้ · สลับภาษาคง path คู่ · ติดต่อเห็นก่อนเลื่อนพ้น hero · เมนูไม่เกินความจำเป็น · default locale = `th`

### 6.2 Hero (ฮับ)
- Brand-first · 1 headline · 1 sub · 1 CTA group · full-bleed · ไม่มี cards/stats/overlays  

**ร่าง TH:**  
- Brand: แบล็ค การก่อสร้าง  
- Headline: ต่อเติม ก่อสร้าง บิ้วอิน — ความเชี่ยวชาญหลายด้านในที่เดียว  
- Sub: กรุงเทพฯ ปริมณฑล และต่างจังหวัด · คุยแผนงานได้ทางโทรหรือ LINE  

### 6.3 Services hub (ฮับ)
- 4 ลิงก์ไปเสาบริการ · หัวข้อ + ประโยครองสั้นต่อเสา  

### 6.4–6.5 Portfolio / teaser
- สื่อจาก `media.json` · alt จาก copy · วิดีโอมี poster · `preload="none"`  

### 6.6 Contact (+ หน้า Contact)
- สถานะ idle / submitting / success / error  
- Fallback โทร + LINE (+ อีเมลเมื่อมี) ใกล้ฟอร์มเสมอ  

### 6.7 Footer
- ชื่อนิติบุคคล · ที่อยู่ · โทร · ลิงก์ทุกหน้า · lang (คง path คู่)  

### 6.8 MobileContactBar
- `md:hidden` · Call + LINE · แตะ ≥44px · padding-bottom บน main  

### 6.9 หน้าบริการ (4 เสา)
- Template §4 · Construction ใช้ถ้อยคำพันธมิตรที่ล็อก  
- Preselect ประเภทบริการตอนไป Contact  

---

## 7. ข้อมูลและรูปภาพที่ต้องใช้

### 7.1 Config (`src/content/config.ts`)

| คีย์ | ค่า | สถานะ |
|------|-----|--------|
| `phoneDisplay` / `phoneTel` | 086-886-9282 / +66868869282 | ✅ |
| `address` | 3/6 ซอยคู้บอน 44 แขวงบางชัน เขตคลองสามวา กทม. 10510 | ✅ |
| `legalNameTh` / `legalNameEn` | ตาม brief | ✅ |
| `lineUrl` | — | ❌ |
| `publicEmail` | — | ❌ |
| `siteUrl` · Firebase `VITE_*` | — | ❌ |

### 7.2 Copy
ทุกสตริง UI/SEO/form/alt/aria ใน `copy.th.json` → mirror `copy.en.json`  
รวมคีย์ต่อหน้า: `home.*` · `realEstate.*` · `marketing.*` · `construction.*` · `consulting.*` · `portfolio.*` · `about.*` · `contact.*`

### 7.3 Media (`media.json`)

| คีย์ | หมายเหตุ | สถานะ |
|------|----------|--------|
| `media.global.logo` / `favicon` / `og` | โลโก้น้ำเงิน | ❌ รอไฟล์ |
| `media.home.hero` | ภาพหน้าแรก | ❌ |
| `media.portfolio.*` (รูป+วิดีโอ+poster) | ครอบคลุม 4 เสา | ❌ |
| `media.about.team.*` | ทีมงาน | ❌ |
| `media.brand.uniform` | รูปเสื้อยูนิฟอร์ม | ⚪ รอยืนยันใช้ |

### 7.4 Brief อ้างอิง

| รายการ | ค่า |
|--------|-----|
| สีแบรนด์ | น้ำเงินยูนิฟอร์ม (ไม่ใช้แดง) |
| โลโก้ | ตราเพชร/ลูกดิ่ง + ชื่อ TH/EN |
| เสาบริการ | Real Estate · Marketing · Construction · Consulting |
| Construction tone | **ล็อก:** นำเสนอบริการออกแบบและก่อสร้างโดยอาศัยความร่วมมือกับพันธมิตรที่มีความเชี่ยวชาญ |

---

## 8. รายการ React Components ที่ต้องสร้าง

### App / routing
| Component | ไฟล์ | หน้าที่ |
|-----------|------|---------|
| `App` | `src/app/App.tsx` | Routes ทุกหน้า × locale |
| `HomePage` | `src/app/HomePage.tsx` | หน้าแรก |
| `ServicePage` | `src/app/ServicePage.tsx` | Template 4 เสา (รับ slug) |
| `PortfolioPage` | `src/app/PortfolioPage.tsx` | ผลงาน + ตัวกรอง |
| `AboutPage` | `src/app/AboutPage.tsx` | เกี่ยวกับเรา |
| `ContactPage` | `src/app/ContactPage.tsx` | ติดต่อ |
| `NotFound` | `src/app/NotFound.tsx` | 404 |
| `SiteLayout` | `src/components/SiteLayout.tsx` | Header + Footer + MobileContactBar |
| `Seo` | `src/components/Seo.tsx` | meta · OG · canonical · hreflang · JSON-LD |

### UI ร่วม
| Component | ไฟล์ |
|-----------|------|
| `Header` | `src/components/Header.tsx` |
| `Hero` | `src/components/Hero.tsx` |
| `ServicesHub` | `src/components/ServicesHub.tsx` |
| `WhyUs` | `src/components/WhyUs.tsx` |
| `PortfolioGrid` | `src/components/PortfolioGrid.tsx` |
| `TestimonialList` | `src/components/TestimonialList.tsx` |
| `ContactForm` | `src/components/ContactForm.tsx` |
| `ContactSection` | `src/components/ContactSection.tsx` |
| `Footer` | `src/components/Footer.tsx` |
| `MobileContactBar` | `src/components/MobileContactBar.tsx` |
| `CtaBand` | `src/components/CtaBand.tsx` |

### ชิ้นส่วนหน้าบริการ
| Component | ไฟล์ |
|-----------|------|
| `ServiceHero` | `src/components/service/ServiceHero.tsx` |
| `ServiceScope` | `src/components/service/ServiceScope.tsx` |
| `ServiceAudience` | `src/components/service/ServiceAudience.tsx` |
| `ServicePartnerNote` | `src/components/service/ServicePartnerNote.tsx` | *ใช้หนักใน Construction* |
| `ServiceAreas` | `src/components/service/ServiceAreas.tsx` |
| `RelatedServices` | `src/components/service/RelatedServices.tsx` |

### Lib / content
| Module | ไฟล์ |
|--------|------|
| Firebase | `src/lib/firebase.ts` |
| i18n / content / media helpers | `src/lib/i18n.ts` · `content.ts` |
| SEO helpers | `src/lib/seo.ts` |
| Service registry | `src/content/services.ts` (`real-estate` · `marketing` · `construction` · `consulting`) |
| Config / copy / media | `src/content/config.ts` · `copy.th.json` · `copy.en.json` · `media.json` |
| Styles | `src/styles/index.css` |
| Cloud Function | `functions/src/index.ts` |

**ไม่อยู่ใน v1:** Next.js · CMS · booking · admin

---

## 9. แนวทาง Responsive

| Breakpoint | พฤติกรรม |
|------------|----------|
| **≤767** | Hero เต็มจอ · Services hub 1 คอลัมน์ · Portfolio 1–2 คอลัมน์ · เมนูย่อ · `MobileContactBar` |
| **768–1279** | Sticky header + nav · hub 2×2 · ซ่อน mobile bar |
| **≥1280** | กริดกว้างขึ้น · ระยะหายใจมากขึ้น · hero ยัง composition เดียว |

กฎมือถือบังคับ: แตะ ≥44px · `text-base` ในช่องกรอก · ติดต่อก่อนเลื่อนพ้น hero · flex/grid · padding-bottom สำหรับ bar

---

## 10. SEO / AEO Checklist

### พื้นฐานทุกหน้า
- [ ] `lang` + `/th`·`/en` + `hreflang` (+ `x-default`)
- [ ] Title · description **ไม่ซ้ำ** ทุกหน้า (8 หน้า × 2 ภาษา = 16 ชุด)
- [ ] Canonical · Open Graph ต่อหน้า
- [ ] Landmarks + breadcrumb บนหน้าบริการ/Portfolio/About/Contact
- [ ] Alt/caption จาก copy · ไม่ hardcode สตริง SEO

### Discovery
- [ ] 1 เสาบริการ = 1 URL · slug อ่านออก (`/th/real-estate` ฯลฯ)
- [ ] เนื้อหาข้อความจริงพอ index ได้
- [ ] Internal link: หน้าแรก ↔ บริการ ↔ Portfolio ↔ Contact
- [ ] `sitemap.xml` ครบ · `robots.txt` ไม่บล็อก
- [ ] Firebase SPA rewrite ครอบทุก path (กัน 404 ตอนเปิด URL ตรง)

### Structured data
- [ ] `LocalBusiness` / `GeneralContractor` — name · telephone · address · areaServed · url · image
- [ ] `Service` ต่อหน้าเสาบริการ
- [ ] `BreadcrumbList` · (ถ้ามี) `sameAs` · Google Business Profile
- [ ] คำตอบแกนอยู่ใน HTML ไม่ใช่รูปอย่างเดียว

### ประสิทธิภาพ
- [ ] บีบอัดสื่อ · lazy แกลเลอรี · hero ไม่ lazy

---

## 11. แผนการ Deploy ด้วย Firebase Hosting

```
firebase.json   # hosting → dist/ · functions · SPA rewrite → /index.html
.firebaserc     # ยืนยัน project
.env.example    # VITE_FIREBASE_* — ไม่ commit .env
functions/      # callable asia-southeast1 + Resend
```

```bash
npm install
cd functions && npm install && cd ..
npm run build
firebase deploy   # ต้อง Blaze สำหรับ Functions
```

1. Hosting · Functions · Firestore  
2. Secrets เฉพาะเครื่อง/CI  
3. Deploy  
4. โดเมนกำหนดเองเมื่อมี  
5. Smoke: ทั้ง 8 หน้า × 2 ภาษาแบบพิมพ์ URL ตรง · โทร · LINE · ฟอร์ม  
6. Search Console + Rich Results  

**Deploy เฉพาะเมื่อสั่ง**

---

## 12. Acceptance Criteria สรุปรวม

| ส่วน | ผ่านเมื่อ |
|------|-----------|
| **ฮับ `/th`·`/en`** | แบรนด์ + ภาพรวม 4 บริการ + CTA · hero ไม่ clutter |
| **Real Estate** | อธิบายต่อเติม · ก่อสร้าง · บิ้วอิน · CTA ติดต่อ |
| **Marketing** | ครบ 6 หัวข้อย่อย · สแกนง่าย |
| **Construction** | ใช้ถ้อยคำพันธมิตรที่ล็อกตรงตัว · ไม่โอเวอร์เคลม |
| **Consulting** | ครบหัวข้อกลยุทธ์/การตลาด/พัฒนาโครงการ/วางแผนขาย/ที่ปรึกษา |
| **Portfolio** | กรอง 4 เสา · ภาพ+วิดีโอ+รีวิว · lazy |
| **About** | ที่มา · ทีม · แนวคิด · จุดต่าง — ข้อเท็จจริงเท่านั้น |
| **Contact** | โทร · LINE · อีเมล · ฟอร์ม (RHF+zod · 4 สถานะ · callable) |
| **i18n routes** | default `th` · สวิตช์ภาษาคง path คู่ทุกหน้า · `/` → `/th` |
| **Header / Mobile bar** | ติดต่อชัดทุกหน้า · sticky / `md:hidden` |
| **Discovery** | 16 ชุด meta ไม่ซ้ำ · JSON-LD · sitemap · SPA rewrite |
| **Conversion** | ตอบ 4 คำถามผู้เข้าชมได้เร็ว · กดติดต่อได้ทุกหน้า |
| **Baseline** | ทันสมัย · ใช้ง่าย · มือถือ · มืออาชีพ · ติดต่อชัด (§3.1) |
| **i18n** | th ต้นทาง · en คีย์เดียวกัน |
| **Deploy** | build ผ่าน · Hosting เสิร์ฟได้ · form บน production ทดสอบได้ |

---

## 13. Design direction (ย่อ)

- Apple Minimal / Chokdee Online — สะอาด ทันสมัย น่าเชื่อถือ  
- **สีหลัก = สีเสื้อยูนิฟอร์ม** (~`#2E2E6B`–`#39397A` · sample จริงตอน build) · LINE `#06C755`  
- Tokens ใน `@theme inline`  
- หลีกเลี่ยง: ม่วงไล่เฉด · cream+terracotta · broadsheet · glow · pill หนา · เงาหลายชั้น · แดง  
- ฟอนต์ expressive — ไม่ใช้ Inter/Roboto/Arial/system เป็นค่าเริ่ม  
- Motion: fade-in 2–3 จุด · ไม่ parallax หนัก  

---

## 14. Content key map (ร่าง)

```
nav.* · home.* · realEstate.* · marketing.* · construction.* · consulting.*
portfolio.* · about.* · contact.* · mobileBar.* · footer.*
seo.{home|realEstate|marketing|construction|consulting|portfolio|about|contact}.*
media.*.alt · testimonials.*.quote|name|role
```

---

## 15. ข้อมูลที่ยังต้องการจากลูกค้า

- [ ] **LINE** URL/ID  
- [ ] **อีเมลสาธารณะ**  
- [ ] **โลโก้ไฟล์สะอาด** (น้ำเงิน)  
- [ ] **รูป/วิดีโอ Portfolio** แยกตาม 4 เสา + **ความคิดเห็นลูกค้า** (ข้อความ + ชื่อ/บทบาทที่อนุญาต)  
- [ ] **รูปทีม / ที่มา** สำหรับ About  
- [ ] **ขอบเขตงานจริง 4–6 ข้อต่อเสา** (โดยเฉพาะ Marketing / Consulting / รายละเอียดบริการย่อยภายใต้ถ้อยคำพันธมิตร Construction)  
- [ ] จังหวัดที่รับงานบ่อย · Google Business Profile / โซเชียล  
- [ ] URL เว็บเดิม (ถ้ามี) · โดเมน · Firebase project  
- [ ] ยืนยันโทนน้ำเงินจากเสื้อ + อนุมัติใช้รูปยูนิฟอร์ม  
- [ ] **อนุมัติแผนนี้** + สั่ง build phase  

---

## 16. เกตเฟสงาน

### Bootstrap — เสร็จแล้ว
- [x] `README.md` · `plan.md` · `.gitignore` · remote `main` · Cloud env

### Plan — อยู่ตรงนี้
- [x] แผนพัฒนาครบหมวด  
- [ ] อนุมัติแผน + เติมช่องว่างหมวด 15

### Build — ห้ามเริ่มจนกว่าจะได้รับอนุมัติและสั่งชัดเจน
- [ ] Scaffold ตามสแต็ก Chokdee  
- [ ] Implement ตามแผน  
- [ ] ไม่ commit secrets  

### Deploy — เมื่อสั่งเท่านั้น
- [ ] ตามหมวด 11  

---

## Working rules

- อ่านแผนนี้ก่อนงานใหญ่ · ติ๊ก acceptance เมื่อผ่าน  
- ไม่เปลี่ยนสแต็ก (ห้าม Next.js / CRA / CSS framework อื่น เว้น brief บังคับ)  
- v1 = conversion + discovery multi-page · CMS/booking/ads แยกใบเสนอราคา  
- Copy ใน language files · media ใน `media.json`  
- Deploy เฉพาะเมื่อถูกขอ  
