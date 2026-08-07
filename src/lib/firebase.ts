import { initializeApp, getApps } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { siteConfig } from "@/content/config";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export function getFirebaseApp() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0]!;
}

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceType?: string;
  locale: string;
  pagePath?: string;
  website?: string; // honeypot
};

export type ContactResult = {
  ok: boolean;
  message?: string;
};

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    // Local/demo fallback when Firebase env is not configured
    await new Promise((r) => setTimeout(r, 600));
    if (payload.website) return { ok: true };
    return { ok: true, message: "demo" };
  }
  const app = getFirebaseApp();
  const functions = getFunctions(app, siteConfig.firebaseRegion);
  const callable = httpsCallable<ContactPayload, ContactResult>(
    functions,
    siteConfig.contactCallable,
  );
  const result = await callable(payload);
  return result.data;
}
