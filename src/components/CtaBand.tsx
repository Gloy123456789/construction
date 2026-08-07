import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { siteConfig } from "@/content/config";

export function CtaBand() {
  const locale = useLocale();
  const hasLine = Boolean(siteConfig.lineUrl);

  return (
    <section className="bg-brand-600 text-white">
      <div className="container-page section-y flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {getContent("ctaBand.title", locale)}
          </h2>
          <p className="mt-3 text-brand-100">
            {getContent("ctaBand.body", locale)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 text-base font-semibold text-brand-700 no-underline"
          >
            <Phone className="size-4" aria-hidden />
            {getContent("common.call", locale)}
          </a>
          {hasLine ? (
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-md bg-line px-5 text-base font-semibold text-white no-underline"
            >
              {getContent("common.line", locale)}
            </a>
          ) : null}
          <Link
            to={pathFor(locale, "contact")}
            className="inline-flex min-h-11 items-center rounded-md border border-white/70 px-5 text-base font-semibold text-white no-underline"
          >
            {getContent("ctaBand.button", locale)}
          </Link>
        </div>
      </div>
    </section>
  );
}
