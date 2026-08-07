import type { Locale, ServiceSlug } from "@/content/config";
import { locales, serviceSlugs } from "@/content/config";

export function isLocale(value: string | undefined): value is Locale {
  return value === "th" || value === "en";
}

export function isServiceSlug(value: string | undefined): value is ServiceSlug {
  return !!value && (serviceSlugs as string[]).includes(value);
}

export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  return isLocale(seg) ? seg : "th";
}

/** Swap /th/... ↔ /en/... keeping the rest of the path. */
export function switchLocalePath(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}`;
}

export function pathFor(locale: Locale, ...segments: string[]): string {
  const rest = segments.filter(Boolean).join("/");
  return rest ? `/${locale}/${rest}` : `/${locale}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "th" ? "en" : "th";
}

export { locales, serviceSlugs };
