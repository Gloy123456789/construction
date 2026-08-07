import copyTh from "@/content/copy.th.json";
import copyEn from "@/content/copy.en.json";
import media from "@/content/media.json";
import type { Locale } from "@/content/config";

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

const catalogs: Record<Locale, Json> = {
  th: copyTh as Json,
  en: copyEn as Json,
};

function getByPath(obj: Json, path: string): Json | undefined {
  return path.split(".").reduce<Json | undefined>((acc, key) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc) && key in acc) {
      return (acc as Record<string, Json>)[key];
    }
    return undefined;
  }, obj);
}

/** Read a string from locale copy files. Falls back to Thai, then the key. */
export function getContent(key: string, locale: Locale): string {
  const value = getByPath(catalogs[locale], key) ?? getByPath(catalogs.th, key);
  if (typeof value === "string") return value;
  if (import.meta.env.DEV) {
    console.warn(`Missing copy key: ${key} (${locale})`);
  }
  return key;
}

export function getMedia(key: string): string {
  const value = (media as Record<string, string>)[key];
  if (!value && import.meta.env.DEV) {
    console.warn(`Missing media key: ${key}`);
  }
  return value ?? "";
}

export function getObject<T = Record<string, unknown>>(
  key: string,
  locale: Locale,
): T | undefined {
  const value = getByPath(catalogs[locale], key) ?? getByPath(catalogs.th, key);
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as T;
  }
  return undefined;
}
