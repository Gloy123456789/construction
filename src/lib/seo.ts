import { siteConfig, type Locale, type ServiceSlug } from "@/content/config";
import { getContent, getMedia } from "@/lib/content";
import { pathFor } from "@/lib/i18n";

export type PageKind =
  | "home"
  | ServiceSlug
  | "portfolio"
  | "about"
  | "contact"
  | "privacy"
  | "notFound";

export function pagePath(locale: Locale, kind: PageKind): string {
  if (kind === "home") return pathFor(locale);
  if (kind === "notFound") return pathFor(locale, "404");
  return pathFor(locale, kind);
}

function absoluteAsset(pathOrUrl: string): string {
  if (!pathOrUrl) return siteConfig.siteUrl;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${siteConfig.siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function seoFor(kind: PageKind, locale: Locale) {
  const key = kind === "notFound" ? "home" : kind;
  const title = getContent(`seo.${key}.title`, locale);
  const description = getContent(`seo.${key}.description`, locale);
  const path = pagePath(locale, kind === "notFound" ? "home" : kind);
  const url = `${siteConfig.siteUrl}${path}`;
  const image = absoluteAsset(getMedia("media.global.og"));
  return { title, description, url, image, path };
}

export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "GeneralContractor", "HomeAndConstructionBusiness"],
    name: locale === "th" ? siteConfig.legalNameTh : siteConfig.legalNameEn,
    alternateName: [siteConfig.brandTh, siteConfig.brandEn],
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneTel,
    email: siteConfig.publicEmail || undefined,
    image: absoluteAsset(getMedia("media.global.logo")),
    address: {
      "@type": "PostalAddress",
      streetAddress: "3/6 Soi Kubon 44",
      addressLocality: "Khlong Sam Wa",
      addressRegion: "Bangkok",
      postalCode: "10510",
      addressCountry: "TH",
    },
    areaServed: [
      { "@type": "City", name: "Bangkok" },
      { "@type": "AdministrativeArea", name: "Greater Bangkok" },
      { "@type": "Country", name: "Thailand" },
    ],
    priceRange: "$$",
  };
}

export function serviceJsonLd(slug: ServiceSlug, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: getContent(`services.items.${slug}.title`, locale),
    description: getContent(`services.items.${slug}.body`, locale),
    provider: localBusinessJsonLd(locale),
    areaServed: localBusinessJsonLd(locale).areaServed,
    url: `${siteConfig.siteUrl}${pagePath(locale, slug)}`,
  };
}

export function breadcrumbJsonLd(
  _locale: Locale,
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteConfig.siteUrl}${c.path}`,
    })),
  };
}
