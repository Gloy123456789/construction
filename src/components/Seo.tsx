import { useEffect } from "react";
import type { Locale } from "@/content/config";
import {
  breadcrumbJsonLd,
  localBusinessJsonLd,
  pagePath,
  seoFor,
  serviceJsonLd,
  type PageKind,
} from "@/lib/seo";
import { otherLocale } from "@/lib/i18n";
import { siteConfig } from "@/content/config";
import { getContent } from "@/lib/content";

type Props = {
  kind: PageKind;
  locale: Locale;
  crumbs?: { name: string; path: string }[];
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function Seo({ kind, locale, crumbs }: Props) {
  useEffect(() => {
    const seo = seoFor(kind, locale);
    document.title = seo.title;
    document.documentElement.lang = locale;

    upsertMeta("name", "description", seo.description);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", seo.url);
    upsertMeta("property", "og:image", seo.image);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", locale === "th" ? "th_TH" : "en_US");
    upsertMeta(
      "property",
      "og:locale:alternate",
      locale === "th" ? "en_US" : "th_TH",
    );
    upsertMeta("name", "twitter:card", "summary_large_image");

    upsertLink("canonical", seo.url);
    const thUrl = `${siteConfig.siteUrl}${pagePath("th", kind === "notFound" ? "home" : kind)}`;
    const enUrl = `${siteConfig.siteUrl}${pagePath("en", kind === "notFound" ? "home" : kind)}`;
    upsertLink("alternate", thUrl, "th");
    upsertLink("alternate", enUrl, "en");
    upsertLink("alternate", thUrl, "x-default");

    // Keep alternate locale path available for language switcher consumers
    void otherLocale;
    void getContent;

    const graphs: unknown[] = [localBusinessJsonLd(locale)];
    if (
      kind === "construction" ||
      kind === "marketing" ||
      kind === "consulting"
    ) {
      graphs.push(serviceJsonLd(kind, locale));
    }
    if (crumbs?.length) {
      graphs.push(breadcrumbJsonLd(locale, crumbs));
    }
    upsertJsonLd("jsonld-primary", graphs.length === 1 ? graphs[0] : graphs);
  }, [kind, locale, crumbs]);

  return null;
}
