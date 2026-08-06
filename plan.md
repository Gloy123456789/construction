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

## 2. กลุ่มลูกค้าเป้าหมาย

| กลุ่ม | ความต้องการหลัก | ข้อความที่เน้น |
|------|-----------------|---------------|
| เจ้าของบ้าน / ผู้รีโนเวท | ก่อสร้างบ้าน ต่อเติม รีโนเวท | คุยแผนงานง่าย · ประเมินทางโทร/LINE |
| เจ้าของโรงงาน / ผู้ประกอบการ | อาคารโรงงาน พื้นที่อุตสาหกรรม | รับงาน กทม. และต่างจังหวัด |
| ผู้บริหารออฟฟิศ / อาคารพาณิชย์ | สำนักงาน อาคารใช้งาน | มาตรฐานงาน · ขั้นตอนชัด |
| ผู้เกี่ยวข้องสถานพยาบาล | อาคารโรงพยาบาล / สถานพยาบาล | ความน่าเชื่อถือ · ประสบการณ์งานสถาบัน |

**พื้นที่บริการ:** กรุงเทพมหานคร และต่างจังหวัดทั่วไทย

---

## 3. จุดเด่นของบริษัท (ใช้บนเว็บ)

สรุปจาก brief + เอกสาร/แบรนด์ที่มี — ใช้เป็น trust signals ไม่แต่งข้อเท็จจริงเกินหลักฐาน

1. **ความเชี่ยวชาญหลายด้าน** — รับงานบ้านพักอาศัย · โรงงาน · อาคารสำนักงาน · โรงพยาบาล (สื่อว่ามีประสบการณ์หลากประเภทงาน)  
2. **พื้นที่กว้าง** — กรุงเทพฯ และต่างจังหวัด  
3. **ผลงานจริง** — ภาพถ่ายและวิดีโอคุณภาพสูงจากหน้างาน  
4. **ติดต่อง่าย** — โทร `086-886-9282` + LINE (รอ URL) + ฟอร์มออนไลน์  
5. **แบรนด์ชัด** — โลโก้ตราประทับสีน้ำเงิน · ชุดยูนิฟอร์มบริษัท  
6. **นิติบุคคลจดทะเบียน** — บริษัท แบล็ค การก่อสร้าง จำกัด · ที่อยู่สำนักงานใหญ่ คู้บอน 44 คลองสามวา  

> จุดเด่นที่ยังไม่มีหลักฐาน (เช่น ปีประสบการณ์แบบตัวเลข · จำนวนโครงการ · ใบอนุญาตเฉพาะทาง) **ไม่ใส่บนเว็บ** จนกว่าลูกค้าจะยืนยัน

---

## 4. Sitemap

โครงสร้างบางเบา — ไม่ทำ multi-page CMS ใน v1

```
/                     → redirect หรือ default locale = th
├── /th               → หน้าหลัก (landing ภาษาไทย)
└── /en               → หน้าหลัก (landing ภาษาอังกฤษ — คีย์เดียวกับ th)

Anchor IDs (ภายในหน้า):
#top | #services | #process | #projects | #contact

ไฟล์สาธารณะ:
/robots.txt
/sitemap.xml
/assets/...
```

**นอกขอบเขต v1:** หน้าแยกต่อโปรเจกต์ · บล็อก · CMS · ระบบจองนัด · แอดมิน

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
- Sub: รับงานกรุงเทพฯ และต่างจังหวัด · คุยแผนงานได้ทางโทรหรือ LINE  

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
- **เสริม:** บรรทัดพื้นที่บริการ (กทม. + ต่างจังหวัด) · ที่อยู่สำนักงาน (สั้น)

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

### App / shell
| Component | ไฟล์ | หน้าที่ |
|-----------|------|---------|
| `App` | `src/app/App.tsx` | Composition + routing locale |
| (optional) `LocaleProvider` / helpers | `src/lib/i18n.ts` หรือเทียบเท่า | `getContent` · locale |

### Sections / UI
| Component | ไฟล์ | หน้าที่ |
|-----------|------|---------|
| `Header` | `src/components/Header.tsx` | Sticky nav · lang · Call/LINE |
| `Hero` | `src/components/Hero.tsx` | Full-bleed hero composition |
| `Services` | `src/components/Services.tsx` | 4 ประเภทงาน |
| `Process` | `src/components/Process.tsx` | ขั้นตอนทำงาน |
| `Projects` | `src/components/Projects.tsx` | แกลเลอรี |
| `ContactForm` | `src/components/ContactForm.tsx` | ฟอร์ม + สถานะ |
| `ContactSection` | `src/components/ContactSection.tsx` | หัวข้อ + ฟอร์ม + fallbacks (หรือรวมใน ContactForm ตามความเหมาะสม — หนึ่งหน้าที่ต่อไฟล์) |
| `Footer` | `src/components/Footer.tsx` | ส่วนท้าย |
| `MobileContactBar` | `src/components/MobileContactBar.tsx` | Fixed Call + LINE |

### Lib / content (ไม่ใช่ UI แต่ต้องมี)
| Module | ไฟล์ |
|--------|------|
| Firebase client | `src/lib/firebase.ts` |
| Content helpers | `src/lib/content.ts` (หรือเทียบเท่า `getContent` / `getMedia`) |
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

## 10. SEO Checklist

- [ ] `<html lang="th">` และจัดการ locale `/th` · `/en` + `hreflang`
- [ ] Title · meta description ต่อ locale (จาก copy)
- [ ] Open Graph: title · description · image (`media.global.og`) · url · locale
- [ ] `public/robots.txt` · `public/sitemap.xml` (รวม `/th` และ `/en`)
- [ ] Landmarks: `header` · `main` · `section` · `footer` · `address`
- [ ] Alt รูปภาษาไทยและอังกฤษจาก copy
- [ ] JSON-LD `LocalBusiness` หรือ `GeneralContractor` (name · telephone · address · areaServed)
- [ ] URL สะอาด · ไม่มี duplicate content ระหว่าง locale โดยไม่มี canonical/hreflang
- [ ] รูปบีบอัดก่อน deploy · lazy-load แกลเลอรี
- [ ] ไม่ hardcode สตริง SEO ในคอมโพเนนต์

---

## 11. แผนการ Deploy ด้วย Firebase Hosting

### โครงไฟล์ที่ต้องมีตอน build phase
```
firebase.json          # hosting → dist/ · functions
.firebaserc            # default project (ยืนยัน: landing-chokdee หรือโปรเจกต์ลูกค้า)
.env.example           # VITE_FIREBASE_* เท่านั้น — ไม่ commit .env
functions/             # callable asia-southeast1 + Resend
```

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
5. Smoke test: เปิด `/th` · `/en` · โทร · LINE · ส่งฟอร์มจริง  

### Pre-launch checklist
- [ ] Mobile 375 / 768 / 1280+
- [ ] Call · LINE · form ครบ
- [ ] Form → Firestore + email
- [ ] `.env` ไม่ติด git · `.env.example` อัปเดต
- [ ] Meta · OG · sitemap · robots
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
| **i18n** | th ต้นทาง · en คีย์เดียวกัน · ไม่มีสตริง hardcode |
| **SEO** | ติ๊กครบหมวด 10 |
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
