export const siteConfig = {
  legalNameTh: "บริษัท แบล็ค การก่อสร้าง จำกัด",
  legalNameEn: "BLACK CONSTRUCTION CO., LTD.",
  brandTh: "แบล็ค การก่อสร้าง",
  brandEn: "Black Construction",
  phoneDisplay: "086-886-9282",
  phoneTel: "+66868869282",
  /** Set when client provides LINE URL; empty hides LINE CTAs where needed */
  lineUrl: "",
  publicEmail: "",
  addressTh:
    "3/6 ซอยคู้บอน 44 แขวงบางชัน เขตคลองสามวา กรุงเทพมหานคร 10510",
  addressEn:
    "3/6 Soi Kubon 44, Bang Chan, Khlong Sam Wa, Bangkok 10510, Thailand",
  serviceAreaTh: "กรุงเทพฯ · ปริมณฑล · ต่างจังหวัด",
  serviceAreaEn: "Bangkok · Greater Bangkok · Provinces across Thailand",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=3/6+Soi+Kubon+44,+Khlong+Sam+Wa,+Bangkok&output=embed",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://black-construction.web.app",
  firebaseRegion: "asia-southeast1" as const,
  contactCallable: "submitContact" as const,
  /**
   * Trust stats — edit here only.
   * Leave numeric strings empty until the client confirms figures;
   * empty values are hidden in the UI so we never invent claims.
   */
  trustStats: {
    yearsExperience: "",
    completedProjects: "",
    teamSize: "",
    warrantyTh: "รับประกันตามขอบเขตงานที่ตกลงร่วมกัน",
    warrantyEn: "Warranty per the agreed project scope",
  },
  /** Optional Storage path prefix for quote attachments (client upload later) */
  storageQuotePrefix: "quote-attachments",
};

export type Locale = "th" | "en";
export type ServiceSlug = "construction" | "marketing" | "consulting";

export const serviceSlugs: ServiceSlug[] = [
  "construction",
  "marketing",
  "consulting",
];

export const locales: Locale[] = ["th", "en"];
