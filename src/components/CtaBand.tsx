import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { siteConfig } from "@/content/config";
import { track } from "@/lib/analytics";

export function CtaBand() {
  const locale = useLocale();
  const hasLine = Boolean(siteConfig.lineUrl);

  return (
    <section className="bg-brand-800 text-white">
      <div className="container-page section-y flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {getContent("ctaBand.title", locale)}
          </h2>
          <p className="mt-3 text-white/80">{getContent("ctaBand.body", locale)}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to={pathFor(locale, "contact")}
            onClick={() => track("click_quote", { source: "cta_band" })}
            className="btn-accent"
          >
            {getContent("ctaBand.button", locale)}
          </Link>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            onClick={() => track("click_call", { source: "cta_band" })}
            className="btn-ghost"
          >
            {getContent("common.call", locale)}
          </a>
          {hasLine ? (
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("click_line", { source: "cta_band" })}
              className="btn-line"
            >
              {getContent("common.line", locale)}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
