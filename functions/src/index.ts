import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { setGlobalOptions } from "firebase-functions/v2";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { Resend } from "resend";

initializeApp();
setGlobalOptions({ region: "asia-southeast1" });

const resendApiKey = defineSecret("RESEND_API_KEY");
const notifyTo = defineSecret("CONTACT_NOTIFY_TO");

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

type ContactInput = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  serviceType?: string;
  budget?: string;
  projectLocation?: string;
  locale?: string;
  pagePath?: string;
  sourcePage?: string;
  website?: string;
  attachmentRefs?: unknown;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanAttachmentRefs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim().slice(0, 500))
    .filter(Boolean)
    .slice(0, 8);
}

export const submitContact = onCall(
  { secrets: [resendApiKey, notifyTo], cors: true },
  async (request) => {
    const data = (request.data ?? {}) as ContactInput;

    // Honeypot — bots fill this; pretend success
    if (clean(data.website, 100)) {
      return { ok: true };
    }

    const name = clean(data.name, 120);
    const email = clean(data.email, 200);
    const phone = clean(data.phone, 40);
    const message = clean(data.message, 4000);
    const serviceType = clean(data.serviceType, 40) || "general";
    const budget = clean(data.budget, 120);
    const projectLocation = clean(data.projectLocation, 200);
    const locale = clean(data.locale, 8) || "th";
    const pagePath = clean(data.pagePath, 200);
    const sourcePage = clean(data.sourcePage, 200) || pagePath;
    const attachmentRefs = cleanAttachmentRefs(data.attachmentRefs);

    if (!name) {
      throw new HttpsError("invalid-argument", "กรุณากรอกชื่อ");
    }
    if (!phone || !/^[\d+\-\s()]{8,}$/.test(phone)) {
      throw new HttpsError("invalid-argument", "กรุณากรอกเบอร์โทรให้ถูกต้อง");
    }
    if (email && !isEmail(email)) {
      throw new HttpsError("invalid-argument", "รูปแบบอีเมลไม่ถูกต้อง");
    }
    if (!message) {
      throw new HttpsError("invalid-argument", "กรุณากรอกข้อความ");
    }

    const db = getFirestore();
    const ip =
      request.rawRequest.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
      request.rawRequest.ip ||
      "unknown";

    const since = Date.now() - RATE_WINDOW_MS;
    const recent = await db
      .collection("contactSubmissions")
      .where("ip", "==", ip)
      .where("createdAtMs", ">", since)
      .limit(RATE_MAX + 1)
      .get();

    if (recent.size >= RATE_MAX) {
      throw new HttpsError("resource-exhausted", "ส่งบ่อยเกินไป กรุณาลองใหม่ภายหลัง");
    }

    const createdAt = new Date();
    const doc = {
      name,
      telephone: phone,
      phone,
      email: email || null,
      message,
      serviceType,
      budget: budget || null,
      projectLocation: projectLocation || null,
      attachmentRefs,
      locale,
      pagePath: pagePath || null,
      sourcePage: sourcePage || null,
      ip,
      createdAtMs: createdAt.getTime(),
      createdAt: createdAt.toISOString(),
      source: "black-construction",
    };

    const ref = await db.collection("contactSubmissions").add(doc);

    const to = notifyTo.value() || "info@chokdee.online";
    const key = resendApiKey.value();
    if (key) {
      const resend = new Resend(key);
      const subject = `[Black Construction] Quote — ${serviceType} — ${name}`;
      const html = `
        <h2>New quotation / contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || "-")}</p>
        <p><strong>Service:</strong> ${escapeHtml(serviceType)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget || "-")}</p>
        <p><strong>Location:</strong> ${escapeHtml(projectLocation || "-")}</p>
        <p><strong>Locale:</strong> ${escapeHtml(locale)}</p>
        <p><strong>Source page:</strong> ${escapeHtml(sourcePage || "-")}</p>
        <p><strong>Attachments:</strong> ${escapeHtml(attachmentRefs.join(", ") || "-")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        <p><small>Doc ID: ${escapeHtml(ref.id)}</small></p>
      `;
      await resend.emails.send({
        from: "Chokdee Online <info@chokdee.online>",
        to: [to],
        replyTo: email || undefined,
        subject,
        html,
      });
    }

    return { ok: true };
  },
);
