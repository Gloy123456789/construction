# Black Construction — แผนพัฒนาเว็บไซต์

แผนนี้พร้อมสำหรับเริ่มพัฒนาหลังอนุมัติ — **ยังไม่เริ่มเขียนโค้ด** จนกว่าจะมีการอนุมัติแผนและสั่ง build phase อย่างชัดเจน

| | |
|---|---|
| **ลูกค้า** | บริษัท แบล็ค การก่อสร้าง จำกัด / BLACK CONSTRUCTION CO., LTD. |
| **แบรนด์แสดงผล** | แบล็ค การก่อสร้าง / Black Construction |
| **เอเจนซี** | Chokdee Online |
| **รูปแบบ** | Single-page landing (thin bilingual routes `/th` · `/en`) |
| **สแต็ก** | Vite 6 + React 18 + TypeScript + Tailwind CSS 4 + Firebase Hosting / Callable Functions |
| **สถานะ** | Plan phase — รออนุมัติ + ข้อมูลที่ยังขาด |

---

## 1. เป้าหมายของเว็บไซต์

### เป้าหมายหลัก (ตามที่ลูกค้าระบุ)
1. **สร้างภาพลักษณ์ที่ดูน่าเชื่อถือ** — professional และไว้วางใจได้
2. **ดีไซน์สะอาดและทันสมัย** — โทนสีน้ำเงินตามสีเสื้อยูนิฟอร์มที่แนบมา (กรมท่า/indigo)
3. **ใช้งานง่ายทั้งคอมพิวเตอร์และมือถือ** — responsive · mobile-first
4. **เมนูเรียบง่าย แต่แสดงบริการได้ชัดเจน** — nav สั้น · services เห็นชัด
5. **กระตุ้นให้ติดต่อผ่านโทรศัพท์หรือ LINE** — CTA เด่น เข้าถึงได้ทันที
6. **แสดงผลงานด้วยภาพถ่ายและวิดีโอคุณภาพสูง** — gallery รองรับทั้งรูปและวิดีโอ
7. **สร้างความเชื่อมั่นด้วยประสบการณ์และความเชี่ยวชาญหลายด้าน** — เน้นงานหลายประเภท (บ้าน · โรงงาน · สำนักงาน · โรงพยาบาล)

### Conversion goal (แปลงเป็นการติดต่อ)
ทำให้ผู้เข้าชม **ติดต่อบริษัทได้ทันที** ผ่านโทรศัพท์ · LINE · ฟอร์มสอบถาม — โดยไม่ต้องเลื่อนผ่าน hero ก็เห็นช่องทางติดต่อ

### Success metrics (v1)
- Call / LINE / form ใช้งานได้จริงบนมือถือ
- ฟอร์มบันทึก Firestore และส่งอีเมล (เมื่อตั้งค่า Resend แล้ว)
- โหลดสมเหตุสมผลบนมือถือ (รูป/วิดีโอบีบอัด · JS น้อย)
- Layout ตรวจที่ 375px · 768px · 1280px+
- ภาพลักษณ์สื่อความน่าเชื่อถือทันทีในหน้าจอแรก (แบรนด์ + โทนน้ำเงิน + ผลงาน)

---

## 1.1 โอกาสในการช่วยให้ธุรกิจเติบโต

สองเป้าหมายนี้กำหนดโครงสร้างเว็บ (ทำไมต้องมีหน้าเฉพาะต่อบริการ — ดู §4)

### เป้าหมายที่ 1 — ช่วยให้ลูกค้าใหม่ค้นพบธุรกิจ

ลูกค้าค้นผ่าน Google · Google Maps · ChatGPT · Google AI และผู้ช่วย AI อื่น ๆ เว็บต้องตอบ **5 คำถามแกน** ด้วยข้อความตรงไปตรงมา (ไม่ใช่ภาพหรือสโลแกนอย่างเดียว) เพราะเครื่องมือ AI อ่านข้อความและ structured data

| คำถาม | ตอบที่ไหน | รูปแบบที่ AI/Google อ่านได้ |
|-------|-----------|---------------------------|
| **คุณคือใคร** | Hero · About สั้นใน footer/process · JSON-LD | ชื่อนิติบุคคลเต็ม TH/EN · ที่อยู่ · โทร |
| **ให้บริการอะไร** | Services (หน้าแรก) + 4 หน้าเฉพาะบริการ | หัวข้อ + ขอบเขตงานเป็นข้อความ · JSON-LD `Service` |
| **ช่วยใคร** | บล็อก "เหมาะกับใคร" ในทุกหน้าบริการ | ระบุกลุ่มลูกค้าตรง ๆ (เจ้าของบ้าน · โรงงาน · องค์กร · สถานพยาบาล) |
| **ทำไมควรเลือกแบล็ค การก่อสร้าง** | Why us / process · ผลงาน | เหตุผลที่พิสูจน์ได้ · ไม่ใช้ claim ลอย |
| **ให้บริการพื้นที่ใด** | Hero · ทุกหน้าบริการ · footer | **กรุงเทพฯ · ปริมณฑล · ต่างจังหวัด** + `areaServed` ใน JSON-LD |

**กลไกที่ต้องมี:** หน้าเฉพาะต่อบริการ (§4) · JSON-LD ต่อหน้า (§10) · sitemap ครบทุก URL · internal link ระหว่างบริการ · เนื้อหาข้อความจริงในแต่ละหน้า (ไม่ใช่หน้าเปล่าที่มีแต่รูป)

### เป้าหมายที่ 2 — เปลี่ยนผู้เข้าชมให้เป็นลูกค้า

ผู้เข้าชมต้องได้คำตอบ **ภายในไม่กี่วินาที**

| คำถามของผู้เข้าชม | ตอบด้วย | ตำแหน่ง |
|-------------------|---------|---------|
| บริษัทนี้ช่วยฉันได้ไหม | Headline ระบุประเภทงาน + "เหมาะกับใคร" | Hero (§6.2) · Services (§6.3) |
| ทำไมฉันควรเชื่อถือ | ผลงานภาพ/วิดีโอจริง · ขั้นตอนชัด · ข้อมูลนิติบุคคล | Process (§6.4) · Projects (§6.5) · Footer (§6.7) |
| บริการไหนเหมาะกับฉัน | 4 กลุ่มงานแยกชัด + ลิงก์เข้าหน้าเฉพาะ | Services (§6.3) → หน้าบริการ (§4) |
| ติดต่อได้อย่างไร | โทร · LINE · ฟอร์ม เห็นตลอด | Header · MobileContactBar · Contact (§6.6) |

**เกณฑ์วัด:** ผู้ใช้มือถือใหม่ตอบได้ทั้ง 4 ข้อโดยเลื่อนไม่เกิน ~2 หน้าจอ และกดติดต่อได้จากทุกจุดของหน้า

---

## 2. กลุ่มลูกค้าเป้าหมาย

| กลุ่ม | ความต้องการหลัก | ข้อความที่เน้น |
|------|-----------------|---------------|
| เจ้าของบ้าน / ผู้รีโนเวท | ก่อสร้างบ้าน ต่อเติม รีโนเวท | คุยแผนงานง่าย · ประเมินทางโทร/LINE |
| เจ้าของโรงงาน / ผู้ประกอบการ | อาคารโรงงาน พื้นที่อุตสาหกรรม | รับงาน กทม. ปริมณฑล และต่างจังหวัด |
| ผู้บริหารออฟฟิศ / อาคารพาณิชย์ | สำนักงาน อาคารใช้งาน | มาตรฐานงาน · ขั้นตอนชัด |
| ผู้เกี่ยวข้องสถานพยาบาล | อาคารโรงพยาบาล / สถานพยาบาล | ความน่าเชื่อถือ · ประสบการณ์งานสถาบัน |

**พื้นที่บริการ:** กรุงเทพมหานคร · ปริมณฑล · ต่างจังหวัดทั่วไทย

---

## 3. จุดเด่นของบริษัท (ใช้บนเว็บ)

สรุปจาก brief + เอกสาร/แบรนด์ที่มี — ใช้เป็น trust signals ไม่แต่งข้อเท็จจริงเกินหลักฐาน

1. **ความเชี่ยวชาญหลายด้าน** — รับงานบ้านพักอาศัย · โรงงาน · อาคารสำนักงาน · โรงพยาบาล (สื่อว่ามีประสบการณ์หลากประเภทงาน)  
2. **พื้นที่กว้าง** — กรุงเทพฯ · ปริมณฑล · ต่างจังหวัด  
3. **ผลงานจริง** — ภาพถ่ายและวิดีโอคุณภาพสูงจากหน้างาน  
4. **ติดต่อง่าย** — โทร `086-886-9282` + LINE (รอ URL) + ฟอร์มออนไลน์  
5. **แบรนด์ชัด** — โลโก้ตราประทับสีน้ำเงิน · ชุดยูนิฟอร์มบริษัท  
6. **นิติบุคคลจดทะเบียน** — บริษัท แบล็ค การก่อสร้าง จำกัด · ที่อยู่สำนักงานใหญ่ คู้บอน 44 คลองสามวา  

> จุดเด่นที่ยังไม่มีหลักฐาน (เช่น ปีประสบการณ์แบบตัวเลข · จำนวนโครงการ · ใบอนุญาตเฉพาะทาง) **ไม่ใส่บนเว็บ** จนกว่าลูกค้าจะยืนยัน

---

## 3.1 จุดเด่นเว็บไซต์ปัจจุบันที่ต้องคงไว้ (baseline)

ห้ามถอยหลังจากมาตรฐานเดิม — ทุกข้อถือเป็น **acceptance ระดับโปรเจกต์** ที่ต้องผ่านก่อนส่งมอบ

| จุดเด่นที่คงไว้ | แปลงเป็นข้อกำหนดในงานนี้ | ตรวจที่ |
|-----------------|--------------------------|---------|
| **ดีไซน์ทันสมัย** | Apple Minimal · โทนน้ำเงินยูนิฟอร์ม · ฟอนต์ expressive · เลี่ยงลุค AI-default | §13 · §6.2 |
| **ใช้งานง่าย** | เมนูสั้น · anchor ชัด · หนึ่ง section หนึ่งหน้าที่ · ไม่มี clutter | §6.1 · §6.3 |
| **รองรับมือถือ** | mobile-first · แตะ ≥44px · `text-base` ในช่องกรอก · ทดสอบ 375/768/1280+ | §9 |
| **ดูเป็นมืออาชีพ** | แบรนด์เด่นในจอแรก · ผลงานจริง · ข้อมูลนิติบุคคลถูกต้อง · ไม่มี claim เกินจริง | §6.2 · §6.7 |
| **ช่องทางติดต่อชัดเจน** | โทร + LINE ใน header · `MobileContactBar` · ฟอร์ม + fallback | §6.1 · §6.6 · §6.8 |

### ต่อยอด: สะท้อนธุรกิจที่ขยายขึ้น

สิ่งที่ **เพิ่มจากของเดิม** เพื่อสื่อว่าบริษัทโตและรับงานกว้างขึ้น

1. **จากงานเดียว → สี่กลุ่มงาน** — บ้าน · โรงงาน · สำนักงาน · โรงพยาบาล เป็นโครงหลักของ section บริการ (§6.3)
2. **จากพื้นที่จำกัด → กทม. + ปริมณฑล + ต่างจังหวัด** — ประกาศพื้นที่บริการชัดใน hero · ทุกหน้าบริการ · footer
3. **จากรูปนิ่ง → ภาพถ่าย + วิดีโอคุณภาพสูง** — แกลเลอรีรองรับวิดีโอพร้อม poster (§6.5)
4. **จากไทยอย่างเดียว → ไทย + อังกฤษ** — รองรับลูกค้าองค์กร/ต่างชาติ (`/th` · `/en`)
5. **จากติดต่อพื้นฐาน → ฟอร์มมีประเภทงาน** — คัดกรอง lead ตามกลุ่มงานตั้งแต่ต้น (§6.6)

> ถ้ามีเว็บไซต์เดิมอยู่จริง ขอ URL เพื่อตรวจสิ่งที่ต้องคงไว้ (โครงเมนู · ถ้อยคำที่ลูกค้าคุ้น · ผลงานเดิม · SEO/ลิงก์ที่ควร redirect)

---

## 4. Sitemap

โครงสร้าง: หน้าแรก (conversion) + **หน้าเฉพาะต่อบริการ** (discovery) — ยังไม่ใช้ CMS ใน v1

```
/                                  → redirect → /th
├── /th                            → หน้าแรก (landing ภาษาไทย)
│   └── /th/services/
│       ├── residential            → บ้านพักอาศัย
│       ├── factory                → โรงงาน
│       ├── office                 → อาคารสำนักงาน
│       └── hospital               → โรงพยาบาล / สถานพยาบาล
└── /en                            → หน้าแรก (ภาษาอังกฤษ · คีย์เดียวกับ th)
    └── /en/services/{same 4 slugs}

Anchor IDs (ในหน้าแรก):
#top | #services | #process | #projects | #contact

ไฟล์สาธารณะ:
/robots.txt   /sitemap.xml   /assets/...
```

### เหตุผลที่แยกแต่ละบริการเป็นหน้าเฉพาะ

| เหตุผล | สิ่งที่ทำในงานนี้ |
|--------|------------------|
| **ผู้เข้าชมหาข้อมูลที่ต้องการได้ง่ายขึ้น** | ลิงก์ตรงจากหน้าแรก / เมนู / ผลการค้นหา → หน้าเดียวของบริการนั้น ไม่ต้องเลื่อนหาในหน้ายาว |
| **แต่ละบริการอธิบายคุณค่าและจุดเด่นได้เต็มที่** | ใช้ template 8 บล็อก (§4) ต่อบริการ — ขอบเขตงาน · เหมาะกับใคร · ผลงานที่เกี่ยว · พื้นที่ · CTA ไม่ต้องแย่งพื้นที่กับบริการอื่น |
| **Google เข้าใจความเชี่ยวชาญของธุรกิจได้ดีขึ้น** | 1 URL = 1 บริการ · title/description ไม่ซ้ำ · JSON-LD `Service` · sitemap + internal link |
| **ระบบ AI แนะนำแต่ละบริการได้แม่นยำขึ้น** | หน้าตอบคำถามเดียวชัด ๆ เป็นข้อความจริง (ใคร · ทำอะไร · ช่วยใคร · ที่ไหน · ทำไมเลือกเรา) ไม่ฝังข้อมูลทั้งหมดในหน้าเดียว |
| **เว็บไซต์ยังคงดูสะอาดและใช้งานง่าย** | Template + layout เดียวกันทั้ง 4 หน้า · เมนูสั้น · หน้าแรกยังเป็น hub แปลงลูกค้า · ไม่แตกเป็น CMS/บล็อกใน v1 |

**เกณฑ์คุมความสะอาด:** หน้าบริการต้องไม่กลายเป็นหน้ายาวแน่น — หนึ่งบล็อกหนึ่งหน้าที่ · ไม่มีสถิติ/pill/การ์ดเกินจำเป็น · CTA โทร/LINE คงแบบเดียวกับหน้าแรก · ถ้าเนื้อหายังไม่พอจริง ใช้ bullet สั้น ๆ ไม่เติม filler

---

**นอกขอบเขต v1:** หน้าแยกต่อโปรเจกต์รายชิ้น · บล็อก · CMS · ระบบจองนัด · แอดมิน

### หน้าเฉพาะบริการ — โครงมาตรฐาน (ใช้ template เดียว 4 หน้า)

| ลำดับ | บล็อก | ตอบคำถาม |
|-------|-------|----------|
| 1 | Hero ย่อยของบริการ (หัวข้อ + ประโยครอง + CTA โทร/LINE) | บริการนี้ใช่สิ่งที่ฉันต้องการไหม |
| 2 | ขอบเขตงาน (bullet ที่ทำจริง) | ครอบคลุมอะไรบ้าง |
| 3 | เหมาะกับใคร | ช่วยฉันได้ไหม |
| 4 | ขั้นตอนทำงาน (ย่อจากหน้าแรก) | เริ่มยังไง |
| 5 | ผลงานที่เกี่ยวข้อง (กรองตามประเภท) | ทำได้จริงไหม |
| 6 | พื้นที่ให้บริการ (กทม. · ปริมณฑล · ต่างจังหวัด) | รับงานที่ฉันอยู่ไหม |
| 7 | CTA + ฟอร์ม (preselect ประเภทงาน) | ติดต่อยังไง |
| 8 | ลิงก์ไปบริการอื่น + กลับหน้าแรก | (internal linking สำหรับ SEO) |

---

## 5. โครงสร้างแต่ละหน้า

ทั้ง `/th` และ `/en` ใช้โครงเดียวกัน — สลับเฉพาะสตริงจาก `copy.th.json` / `copy.en.json`

```
┌─────────────────────────────────────┐
│ Header (sticky)                     │
│  Logo · Nav anchors · Lang · Call/LINE │
├─────────────────────────────────────┤
│ Hero (full-bleed)                   │
│  Brand · Headline · Sub · CTA group │
├─────────────────────────────────────┤
│ Services (#services)                │
│  4 project types                    │
├─────────────────────────────────────┤
│ Process / Why us (#process)         │
│  4 steps + service area             │
├─────────────────────────────────────┤
│ Projects (#projects)                │
│  Gallery (lazy-load)                │
├─────────────────────────────────────┤
│ Contact (#contact)                  │
│  Form + phone + LINE fallbacks      │
├─────────────────────────────────────┤
│ Footer                              │
│  Legal · address · phone · links    │
└─────────────────────────────────────┘
     MobileContactBar (fixed, md:hidden)
```

`App.tsx` = composition เท่านั้น — ไม่ฝัง copy ยาวใน JSX

---

## 6. รายละเอียดแต่ละ Section

### 6.1 Header
- **หน้าที่:** นำทาง + ติดต่อเร็ว + สลับภาษา  
- **องค์ประกอบ:** โลโก้/ชื่อแบรนด์ · anchor (บริการ · ขั้นตอน · ผลงาน · ติดต่อ) บน `md+` · ปุ่ม Call · ปุ่ม LINE (#06C755) · language switcher  
- **พฤติกรรม:** sticky · บนมือถือย่อ nav เป็นลิงก์สำคัญหรือพึ่ง anchor + mobile bar  

**Acceptance**
- [ ] Call เปิด `tel:+66868869282`
- [ ] LINE เปิด deep link ที่ยืนยันแล้ว
- [ ] สลับ `/th` ↔ `/en` คงตำแหน่งหน้า/แองเคอร์
- [ ] มองเห็นช่องทางติดต่อโดยไม่ต้องเลื่อนผ่าน hero

### 6.2 Hero
- **หน้าที่:** หนึ่ง composition — แบรนด์เด่น + หนึ่งหัวข้อ + หนึ่งประโยครอง + หนึ่งกลุ่ม CTA + ภาพเต็มจอ  
- **ห้าม:** การ์ด · สถิติ · badge ลอย · pill cluster · overlay sticker  
- **CTA:** โทร · LINE · เลื่อนไปฟอร์ม  

**ร่างข้อความ (TH — ปรับตอนเขียน copy จริง)**
- Brand: แบล็ค การก่อสร้าง  
- Headline: ก่อสร้างครบวงจร — บ้าน โรงงาน สำนักงาน และสถานพยาบาล  
- Sub: รับงานกรุงเทพฯ ปริมณฑล และต่างจังหวัด · คุยแผนงานได้ทางโทรหรือ LINE  

**Acceptance**
- [ ] ลบ nav แล้วยังรู้ว่าเป็นแบรนด์ Black Construction
- [ ] ภาพ full-bleed ไม่ใช่การ์ด inset
- [ ] CTA ทั้งสามทำงานบนมือถือ

### 6.3 Services (`#services`)
- **หน้าที่หนึ่งอย่าง:** ให้เลือกว่าสนใจงานประเภทไหน  
- **รายการ (Chokdee เลือกตามกลุ่มลูกค้า):**
  1. บ้านพักอาศัย — ก่อสร้าง / ต่อเติม / รีโนเวท  
  2. โรงงาน — อาคารและพื้นที่อุตสาหกรรม  
  3. อาคารสำนักงาน — สำนักงานและอาคารพาณิชย์  
  4. โรงพยาบาล — อาคารสถานพยาบาล / งานสถาบัน  
- **เลย์เอาต์:** กริด mobile-first · ไม่ใช้การ์ดถ้าไม่จำเป็นต่อการเข้าใจ (อนุญาตพื้นผิวเบาเมื่อช่วยสแกน)  
- แต่ละรายการมี CTA รอง → ไป `#contact` (optional preselect ประเภทงาน)

**Acceptance**
- [ ] มีครบ 4 ประเภท · หัวข้อ + ประโยครองสั้นต่อรายการ
- [ ] สตริงมาจาก copy files ทั้ง th/en
- [ ] ลิงก์ไปฟอร์มใช้งานได้

### 6.4 Process / Why us (`#process`)
- **หน้าที่:** ความน่าเชื่อถือ + วิธีเริ่มงาน  
- **ขั้นตอน:** สำรวจหน้างาน → เสนอแผน/ราคา → ก่อสร้างควบคุมคุณภาพ → ส่งมอบ  
- **เสริม:** บรรทัดพื้นที่บริการ (กทม. · ปริมณฑล · ต่างจังหวัด) · ที่อยู่สำนักงาน (สั้น)

**Acceptance**
- [ ] 4 ขั้นตอนชัด อ่านบนมือถือไม่แน่น
- [ ] ไม่ใส่ตัวเลข/รางวัลที่ยังไม่ยืนยัน

### 6.5 Projects (`#projects`)
- **หน้าที่:** แสดงผลงานจริงด้วย **ภาพถ่ายและวิดีโอคุณภาพสูง** เพื่อสร้างความเชื่อมั่น  
- **สื่อ:** รองรับทั้งรูปและวิดีโอ — วิดีโอใช้ poster + `preload="none"` · ไม่ auto-play เสียง · ควบคุมได้  
- **พฤติกรรม:** lazy-load · alt/caption th+en จาก copy  
- **จนกว่าจะได้สื่อจริง:** placeholder ที่ระบุชัดว่าชั่วคราว — ไม่ปลอมโลโก้/ผลงาน

**Acceptance**
- [ ] URL รูป/วิดีโอ/poster อยู่ใน `media.json` เท่านั้น
- [ ] alt/caption ไม่ hardcode ในคอมโพเนนต์
- [ ] วิดีโอมี poster · ไม่ auto-play เสียง · โหลดแบบประหยัด (`preload="none"`)
- [ ] แกลเลอรีไม่ทำให้ LCP ของ hero พัง (lazy หลัง hero)

### 6.6 Contact (`#contact`)
- **หน้าที่:** ส่งข้อความ + สำรองโทร/LINE  
- **ฟอร์ม (consultation):** ชื่อ · อีเมล (required) · โทร (optional แต่แนะนำ) · ข้อความ · ประเภทงาน (optional select 4 ประเภท)  
- **สแต็ก:** `react-hook-form` + `zod` · error th+en จาก copy · `httpsCallable` → `asia-southeast1`  
- **สถานะ:** idle · submitting (spinner) · success · error  
- **ข้างฟอร์ม:** โทร + LINE เสมอ  
- **เซิร์ฟเวอร์:** validate · Firestore ก่อน · Resend จาก `info@chokdee.online` · `escapeHtml`

**Acceptance**
- [ ] validation แสดงไทยและอังกฤษตาม locale
- [ ] success/error ชัด · ไม่รีเซ็ตโดยไม่ตั้งใจหลัง error
- [ ] ปุ่มส่ง disabled ตอน submitting
- [ ] โทร/LINE อยู่ใกล้ฟอร์มและใน mobile bar

### 6.7 Footer
- ชื่อนิติบุคคล · ที่อยู่เต็ม · โทร · ลิงก์สำคัญ · เครดิต Chokdee (ถ้านโยบายเอเจนซีต้องการ) · lang  

**Acceptance**
- [ ] ใช้ landmark `footer` / `address`
- [ ] ข้อมูลติดต่อตรง brief

### 6.8 MobileContactBar
- Fixed ล่างจอ · `md:hidden` · Call + LINE · ไม่บังเนื้อหาสำคัญ (padding-bottom บน `main`)

**Acceptance**
- [ ] เห็นบน ≤767px · หายบน md+
- [ ] ความสูงแตะ ≥ ~44px

---

## 7. ข้อมูลและรูปภาพที่ต้องใช้

### 7.1 Config (`src/content/config.ts` — ไม่ใส่ใน copy)

| คีย์ | ค่าปัจจุบัน | สถานะ |
|------|------------|--------|
| `phoneDisplay` | 086-886-9282 | ✅ |
| `phoneTel` | +66868869282 | ✅ |
| `address` | 3/6 ซอยคู้บอน 44 แขวงบางชัน เขตคลองสามวา กรุงเทพมหานคร 10510 | ✅ |
| `legalNameTh` / `legalNameEn` | ตามตาราง brief | ✅ |
| `lineUrl` | — | ❌ รอลูกค้า |
| `publicEmail` | — | ❌ รอลูกค้า (ถ้ามี) |
| `siteUrl` | — | ❌ รอโดเมน |
| `firebase` | `VITE_FIREBASE_*` | ❌ ตอน scaffold / `.env.example` |

### 7.2 Copy (`copy.th.json` → mirror `copy.en.json`)

ทุกสตริง UI · SEO · form · alt · aria — คีย์เสถียร เช่น `hero.headline`, `services.items.hospital.body`, `contact.form.email.error`

### 7.3 Media (`media.json`)

| คีย์ | ไฟล์เป้าหมาย | แหล่ง | สถานะ |
|------|-------------|------|--------|
| `media.global.logo` | `/assets/logo-blue.svg` (หรือ png) | ตราประทับน้ำเงิน | ❌ รอไฟล์โลโก้เวกเตอร์/PNG สะอาด |
| `media.global.favicon` | `/assets/favicon.ico` | จากโลโก้ | ❌ |
| `media.global.og` | `/assets/og.jpg` (1200×630) | ออกแบบตอน build | ❌ |
| `media.hero.image` | `/assets/hero.jpg` | รูปหน้างานคุณภาพสูง | ❌ รอลูกค้า |
| `media.projects.01`…`0n` | `/assets/projects/…` | รูปงานจริง | ❌ รอลูกค้า (แนะนำ ≥4) |
| `media.projects.video.01` | `/assets/projects/video-01.mp4` | วิดีโอผลงาน | ❌ รอลูกค้า (ถ้ามี) |
| `media.projects.video.01.poster` | `/assets/projects/video-01.jpg` | poster ของวิดีโอ | ❌ |
| `media.brand.uniform` | `/assets/brand/uniform.jpg` | รูปหลังเสื้อยูนิฟอร์ม (อ้างอิงโทนสี + trust) | ✅ มีรูปแล้ว (รอยืนยันใช้บนเว็บ) |

**กฎ:** ไม่ hardcode path ใน JSX · alt/caption อยู่ใน copy เท่านั้น · วิดีโอต้องมี poster key คู่กัน

### 7.4 Brief อ้างอิง (ล็อกแล้ว)

| รายการ | ค่า |
|--------|-----|
| สีแบรนด์ | สีน้ำเงิน (ไม่ใช้เวอร์ชันแดง) |
| โลโก้ | ตราวงรี/วงกลม · เพชร/ลูกดิ่ง + ชื่อ TH/EN |
| Inspiration site | ไม่มี |
| รูปทีม/หน้างาน | รอส่ง |

---

## 8. รายการ React Components ที่ต้องสร้าง

หนึ่งไฟล์ต่อหนึ่งส่วน/ชิ้น — named export · path alias `@` → `./src`

### App / routing / shell
| Component | ไฟล์ | หน้าที่ |
|-----------|------|---------|
| `App` | `src/app/App.tsx` | Composition + routing (`/th`, `/en`, `/{locale}/services/{slug}`) |
| `HomePage` | `src/app/HomePage.tsx` | ประกอบ section หน้าแรก |
| `ServicePage` | `src/app/ServicePage.tsx` | Template หน้าเฉพาะบริการ (ใช้ซ้ำ 4 slug) |
| `NotFound` | `src/app/NotFound.tsx` | 404 พร้อมลิงก์กลับ + ติดต่อ |
| `SiteLayout` | `src/components/SiteLayout.tsx` | Header + main + Footer + MobileContactBar |
| `Seo` | `src/components/Seo.tsx` | title · meta · OG · canonical · hreflang · JSON-LD ต่อหน้า |
| Locale helpers | `src/lib/i18n.ts` | `getContent` · locale · สร้างลิงก์ข้ามภาษา |

### Sections / UI (หน้าแรก)
| Component | ไฟล์ | หน้าที่ |
|-----------|------|---------|
| `Header` | `src/components/Header.tsx` | Sticky nav · lang · Call/LINE · เมนูบริการ |
| `Hero` | `src/components/Hero.tsx` | Full-bleed hero composition |
| `Services` | `src/components/Services.tsx` | 4 ประเภทงาน + ลิงก์เข้าหน้าเฉพาะ |
| `Process` | `src/components/Process.tsx` | ขั้นตอนทำงาน |
| `Projects` | `src/components/Projects.tsx` | แกลเลอรีรูป + วิดีโอ (รับ prop กรองประเภท) |
| `ContactForm` | `src/components/ContactForm.tsx` | ฟอร์ม + สถานะ (รับ `defaultServiceType`) |
| `ContactSection` | `src/components/ContactSection.tsx` | หัวข้อ + ฟอร์ม + fallbacks |
| `Footer` | `src/components/Footer.tsx` | ส่วนท้าย + ลิงก์ทุกบริการ |
| `MobileContactBar` | `src/components/MobileContactBar.tsx` | Fixed Call + LINE |

### ชิ้นส่วนของหน้าบริการ
| Component | ไฟล์ | หน้าที่ |
|-----------|------|---------|
| `ServiceHero` | `src/components/service/ServiceHero.tsx` | หัวข้อบริการ + CTA |
| `ServiceScope` | `src/components/service/ServiceScope.tsx` | ขอบเขตงานที่ทำจริง |
| `ServiceAudience` | `src/components/service/ServiceAudience.tsx` | "เหมาะกับใคร" |
| `ServiceAreas` | `src/components/service/ServiceAreas.tsx` | กทม. · ปริมณฑล · ต่างจังหวัด |
| `RelatedServices` | `src/components/service/RelatedServices.tsx` | ลิงก์ไปบริการอื่น (internal linking) |

### Lib / content (ไม่ใช่ UI แต่ต้องมี)
| Module | ไฟล์ |
|--------|------|
| Firebase client | `src/lib/firebase.ts` |
| Content helpers | `src/lib/content.ts` (`getContent` / `getMedia`) |
| SEO/JSON-LD helpers | `src/lib/seo.ts` (สร้าง schema ต่อหน้า) |
| Service registry | `src/content/services.ts` (slug ↔ คีย์ copy ↔ media ↔ ประเภทฟอร์ม) |
| Config | `src/content/config.ts` |
| Copy / media | `src/content/copy.th.json`, `copy.en.json`, `media.json` |
| Styles | `src/styles/index.css` (`@theme` tokens สีน้ำเงิน) |
| Cloud Function | `functions/src/index.ts` (callable contact) |

**ไม่อยู่ใน v1:** Next.js pages · CMS components · booking calendar · admin UI

---

## 9. แนวทาง Responsive

| Breakpoint | พฤติกรรม |
|------------|----------|
| **≤375–767 (mobile first)** | Hero เต็มจอแนวตั้ง · Services 1 คอลัมน์ · Process แนวตั้ง · Gallery 1–2 คอลัมน์ · `MobileContactBar` แสดง · nav ย่อ |
| **768–1279 (md)** | Sticky header + anchor nav · Services 2×2 · ซ่อน mobile bar · ฟอร์มและ fallback คู่กัน |
| **≥1280 (lg+)** | กริดกว้างขึ้น · hero คุมสัดส่วนภาพ · ระยะหายใจมากขึ้น แต่ยัง composition เดียวใน viewport แรก |

### กฎมือถือ (บังคับ)
- ปุ่ม/อินพุตสูงขั้นต่ำ ~44px · `text-base` บนช่องกรอก (กัน iOS zoom)
- ติดต่อได้จาก header หรือ sticky bar โดยไม่เลื่อนพ้น hero
- ทดสอบจริงที่ 375 · 768 · 1280+
- เลย์เอาต์ flex/grid · เลี่ยง absolute นอกที่จำเป็น
- `padding-bottom` พอสำหรับ mobile bar

---

## 10. SEO / AEO Checklist

### พื้นฐานทุกหน้า
- [ ] `<html lang="th">` และจัดการ locale `/th` · `/en` + `hreflang` (รวม `x-default`)
- [ ] Title · meta description **ไม่ซ้ำกันทุกหน้า** (หน้าแรก + 4 บริการ × 2 ภาษา = 10 ชุด) จาก copy
- [ ] Canonical ต่อหน้า
- [ ] Open Graph: title · description · image · url · locale
- [ ] Landmarks: `header` · `main` · `section` · `footer` · `address` · breadcrumb บนหน้าบริการ
- [ ] Alt/caption ภาษาไทยและอังกฤษจาก copy
- [ ] ไม่ hardcode สตริง SEO ในคอมโพเนนต์

### หน้าเฉพาะบริการ (discovery)
- [ ] 1 หน้า = 1 บริการ = 1 คำค้นหลัก · slug อ่านออก (`/th/services/factory`)
- [ ] เนื้อหาข้อความจริงพอให้ index ได้ (ไม่ใช่หน้าที่มีแต่รูป)
- [ ] มีบล็อกตอบ 5 คำถามแกน (§1.1) ครบในทุกหน้า
- [ ] Internal link: หน้าแรก → บริการ · บริการ → บริการอื่น · บริการ → ติดต่อ
- [ ] `sitemap.xml` ครบทุก URL ทั้งสองภาษา · `robots.txt` ไม่บล็อก

### Structured data (สำคัญกับผู้ช่วย AI)
- [ ] JSON-LD `GeneralContractor` / `LocalBusiness` — `name` · `telephone` · `address` · `areaServed` (กทม. · ปริมณฑล · ต่างจังหวัด) · `url` · `image`
- [ ] JSON-LD `Service` ต่อหน้าบริการ — `serviceType` · `provider` · `areaServed` · `audience`
- [ ] `BreadcrumbList` บนหน้าบริการ
- [ ] (ถ้าลูกค้าให้ข้อมูล) `openingHours` · Google Business Profile · `sameAs` โซเชียล
- [ ] คำตอบสั้น ๆ แบบอ่านรู้เรื่องทันที (ใครคือเรา · ทำอะไร · ที่ไหน) อยู่ใน HTML ไม่ใช่รูปภาพ

### ประสิทธิภาพ
- [ ] รูป/วิดีโอบีบอัดก่อน deploy · lazy-load แกลเลอรี · hero ไม่ lazy
- [ ] หน้าโหลดสมเหตุสมผลบนมือถือ 4G

---

## 11. แผนการ Deploy ด้วย Firebase Hosting

### โครงไฟล์ที่ต้องมีตอน build phase
```
firebase.json          # hosting → dist/ · functions · SPA rewrite → /index.html
.firebaserc            # default project (ยืนยัน: landing-chokdee หรือโปรเจกต์ลูกค้า)
.env.example           # VITE_FIREBASE_* เท่านั้น — ไม่ commit .env
functions/             # callable asia-southeast1 + Resend
```

**สำคัญกับหน้าเฉพาะบริการ:** ตั้ง rewrite ให้ทุก route (`/th/services/*`, `/en/services/*`) เสิร์ฟ `index.html` มิฉะนั้นเปิด URL ตรงจะ 404 · ตรวจว่า Google เข้าถึงแต่ละ URL ได้จริงหลัง deploy

### ขั้นตอน deploy (หลัง build ผ่าน)
```bash
npm install
cd functions && npm install && cd ..
npm run build          # tsc -b && vite build → dist/
firebase deploy        # Hosting + Functions (ต้อง Blaze สำหรับ Functions)
```

### ลำดับงาน deploy
1. สร้าง/ยืนยัน Firebase project · เปิด Hosting · Functions · Firestore  
2. ใส่ secrets บนเครื่อง/CI เท่านั้น (`VITE_*` · Resend · service account ตามมาตรฐาน Chokdee)  
3. Deploy functions ก่อนหรือพร้อม hosting  
4. ชี้โดเมนกำหนดเอง (เมื่อมี) · ตรวจ HTTPS  
5. Smoke test: เปิด `/th` · `/en` · **ทั้ง 4 หน้าบริการทั้งสองภาษาแบบพิมพ์ URL ตรง** · โทร · LINE · ส่งฟอร์มจริง  
6. ส่ง `sitemap.xml` เข้า Google Search Console · ตรวจ Rich Results ของ JSON-LD  

### Pre-launch checklist
- [ ] Mobile 375 / 768 / 1280+
- [ ] Call · LINE · form ครบ
- [ ] Form → Firestore + email
- [ ] `.env` ไม่ติด git · `.env.example` อัปเดต
- [ ] Meta · OG · sitemap · robots · JSON-LD ผ่าน Rich Results Test
- [ ] ทุก URL หน้าบริการเปิดตรงได้ (ไม่ 404) · title/description ไม่ซ้ำ
- [ ] โหลดมือถือสมเหตุสมผล
- [ ] Copy th+en พิสูจน์อักษร · ข้อมูลติดต่อตรง brief
- [ ] สตริงใน copy · media ใน `media.json`

**Deploy เฉพาะเมื่อมีการสั่ง** — ไม่ deploy ระหว่างวางแผน

---

## 12. Acceptance Criteria สรุปรวมต่อส่วน

| ส่วน | ผ่านเมื่อ |
|------|-----------|
| **Header** | Sticky · Call/LINE/lang ใช้ได้ · ติดต่อเห็นก่อนเลื่อนพ้น hero |
| **Hero** | Brand-first · 1 headline · 1 sub · 1 CTA group · full-bleed · ไม่มี clutter |
| **Services** | 4 ประเภทครบ · th+en · ลิงก์ไปติดต่อ |
| **Process** | 4 ขั้น + พื้นที่บริการ · ไม่มี claim ที่ไม่ยืนยัน |
| **Projects** | สื่อจาก `media.json` · lazy · alt จาก copy |
| **Contact** | RHF+zod · สถานะ 4 แบบ · callable · fallback โทร/LINE |
| **Footer** | ชื่อนิติบุคคล · ที่อยู่ · โทร ถูกต้อง |
| **Mobile bar** | `md:hidden` · Call+LINE · แตะง่าย |
| **หน้าบริการ** | 4 slug × 2 ภาษา เข้าถึงได้ · ตอบ 5 คำถามแกน · ฟอร์ม preselect ประเภทงาน · internal link ครบ · **layout สะอาด (template เดียว · ไม่ clutter)** |
| **Discovery (เป้า 1)** | title/description ไม่ซ้ำทุกหน้า · JSON-LD `LocalBusiness` + `Service` · sitemap ครบ · พื้นที่บริการระบุชัด |
| **Conversion (เป้า 2)** | ผู้ใช้มือถือใหม่ตอบได้ 4 คำถาม (§1.1) ในราว 2 หน้าจอ · กดติดต่อได้ทุกจุด |
| **i18n** | th ต้นทาง · en คีย์เดียวกัน · ไม่มีสตริง hardcode |
| **SEO** | ติ๊กครบหมวด 10 |
| **Baseline เดิม** | ทันสมัย · ใช้ง่าย · มือถือ · มืออาชีพ · ติดต่อชัด — ครบตาม §3.1 ไม่ถอยหลังจากเว็บเดิม |
| **ต่อยอด** | 4 กลุ่มงาน · พื้นที่บริการกว้าง · ภาพ+วิดีโอ · th/en · ฟอร์มมีประเภทงาน |
| **Deploy** | `npm run build` ผ่าน · Firebase Hosting เสิร์ฟ `dist/` · form บน production ทดสอบได้ |

---

## 13. Design direction (ย่อ)

- สไตล์: Apple Minimal / Chokdee Online — สะอาด ทันสมัย น่าเชื่อถือ  
- **สีหลัก = สีเสื้อยูนิฟอร์มที่แนบมา** — โทนน้ำเงินกรมท่า/indigo เข้ม (~`#2E2E6B`–`#39397A` · sample ค่าจริงจากรูปเสื้อตอน build) · ปุ่ม LINE `#06C755`  
- ตั้ง theme tokens สีน้ำเงินใน `@theme inline` (`src/styles/index.css`)  
- หลีกเลี่ยง: ม่วงไล่เฉด · cream+terracotta · broadsheet · glow · pill หนา · เงาหลายชั้น · แดง (ไม่ใช้เวอร์ชันโลโก้แดง)  
- ฟอนต์: expressive มีจุดประสงค์ — ไม่ใช้ Inter/Roboto/Arial/system เป็นค่าเริ่ม  
- Motion: fade-in ตอนเลื่อน 2–3 จุด · ไม่ parallax หนัก  

---

## 14. Content key map (ร่าง)

```
seo.* · nav.* · hero.* · services.title|sub|items.{residential,factory,office,hospital}.*
process.title|sub|steps.{1-4}.* · projects.*|projects.items.*.caption · contact.* · mobileBar.* · footer.*
media.*.alt · media.projects.video.*.caption (ใน copy เท่านั้น)
```

---

## 15. ข้อมูลที่ยังต้องการจากลูกค้า

- [ ] **LINE** Official/personal URL หรือ ID  
- [ ] **อีเมลสาธารณะ** (ถ้ามี แสดงบนเว็บ)  
- [ ] **โลโก้ไฟล์สะอาด** (SVG/PNG พื้นโปร่ง · เวอร์ชันน้ำเงิน)  
- [ ] **รูป hero + ผลงาน คุณภาพสูง** (≥1 hero, ≥4 โครงการแนะนำ) หรืออนุมัติใช้ placeholder ชั่วคราว  
- [ ] **วิดีโอผลงาน** (ถ้ามี — .mp4 + poster) หรือยืนยันว่า v1 ใช้ภาพนิ่งอย่างเดียว  
- [ ] ยืนยันโทนสีน้ำเงินฐานจากรูปเสื้อ (อนุมัติค่าที่ sample) และอนุมัติใช้รูปเสื้อยูนิฟอร์มบนเว็บหรือไม่  
- [ ] **URL เว็บไซต์ปัจจุบัน** (ถ้ามี) — เพื่อตรวจสิ่งที่ต้องคงไว้ · ผลงานเดิม · ลิงก์/SEO ที่ควร redirect  
- [ ] **ขอบเขตงานจริงของแต่ละบริการ** (บ้าน · โรงงาน · สำนักงาน · โรงพยาบาล) — 4–6 bullet ต่อบริการ เพื่อให้แต่ละหน้ามีเนื้อหาพอ index ได้  
- [ ] **จังหวัด/พื้นที่ที่รับงานบ่อย** — ใช้เขียน `areaServed` และหัวข้อค้นหาเชิงพื้นที่  
- [ ] **Google Business Profile** (ถ้ามี) — เชื่อมกับ Google Maps · เวลาทำการ · โซเชียลสำหรับ `sameAs`  
- [ ] **โดเมน** + ยืนยัน Firebase project  
- [ ] **อนุมัติแผนนี้** + สั่งเริ่ม build phase  

---

## 16. เกตเฟสงาน

### Bootstrap — เสร็จแล้ว
- [x] `README.md` · `plan.md` · `.gitignore` · remote `main` · Cloud env setup

### Plan — อยู่ตรงนี้
- [x] แผนพัฒนาครบหมวดด้านบน  
- [ ] อนุมัติแผน + เติมช่องว่างหมวด 15 (หรือเลื่อนอย่างชัดเจน)

### Build — ห้ามเริ่มจนกว่าจะได้รับอนุมัติและสั่งชัดเจน
- [ ] Scaffold ตามสแต็กมาตรฐาน Chokdee  
- [ ] Implement ตามหมวด 5–12  
- [ ] ไม่ commit secrets  

### Deploy — เมื่อสั่งเท่านั้น
- [ ] ตามหมวด 11  

---

## Working rules

- อ่านแผนนี้ก่อนงานใหญ่ · ติ๊ก acceptance เมื่อผ่าน  
- ไม่เปลี่ยนสแต็ก (ห้าม Next.js / CRA / CSS framework อื่น เว้น brief บังคับ)  
- v1 = conversion landing · CMS/booking/ads แยกใบเสนอราคา  
- Copy ทั้งหมดใน language files · media ทั้งหมดใน `media.json`  
- Deploy เฉพาะเมื่อถูกขอ  
