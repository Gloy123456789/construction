import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getContent, getMedia } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { Seo } from "@/components/Seo";
import { CtaBand } from "@/components/CtaBand";
import { TrustSection } from "@/components/TrustSection";
import { siteConfig, serviceSlugs } from "@/content/config";
import { track } from "@/lib/analytics";

export function HomePage() {
  const locale = useLocale();

  return (
    <>
      <Seo kind="home" locale={locale} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getMedia("media.home.hero")}
            alt={getContent("media.home.hero.alt", locale)}
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-brand-900/78" />
        </div>
        <div className="container-page relative flex min-h-[78vh] items-end pb-14 pt-28 sm:min-h-[84vh] sm:pb-20">
          <div className="max-w-xl text-white fade-up sm:max-w-2xl">
            <p className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {getContent("hero.brand", locale)}
            </p>
            <h1 className="mt-4 text-[1.85rem] font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {getContent("hero.headline", locale)}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
              {getContent("hero.sub", locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={pathFor(locale, "contact")}
                onClick={() => track("click_quote", { source: "hero" })}
                className="btn-accent"
              >
                {getContent("hero.ctaQuote", locale)}
              </Link>
              <Link
                to={pathFor(locale, "portfolio")}
                onClick={() => track("view_portfolio", { source: "hero" })}
                className="btn-ghost"
              >
                {getContent("hero.ctaPortfolio", locale)}
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/75">
              {getContent("hero.trustLine", locale)}
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="section-y">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-brand-800 sm:text-4xl">
              {getContent("services.title", locale)}
            </h2>
            <p className="mt-3 text-muted">{getContent("services.sub", locale)}</p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {serviceSlugs.map((slug) => (
              <Link
                key={slug}
                to={pathFor(locale, slug)}
                className="group block no-underline"
              >
                <div className="overflow-hidden">
                  <img
                    src={getMedia(`media.services.${slug}`)}
                    alt={getContent(`media.services.${slug}.alt`, locale)}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-brand-800">
                  {getContent(`services.items.${slug}.title`, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {getContent(`services.items.${slug}.body`, locale)}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                  {getContent("common.learnMore", locale)}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-brand-800 sm:text-4xl">
                {getContent("portfolio.teaser.title", locale)}
              </h2>
              <p className="mt-3 text-muted">{getContent("portfolio.sub", locale)}</p>
            </div>
            <Link
              to={pathFor(locale, "portfolio")}
              onClick={() => track("view_portfolio", { source: "home_teaser" })}
              className="inline-flex min-h-11 items-center font-semibold text-brand-700"
            >
              {getContent("portfolio.teaser.cta", locale)}
            </Link>
          </div>
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {(["01", "02", "03"] as const).map((id, index) => (
              <figure
                key={id}
                className={`mb-4 break-inside-avoid ${index === 1 ? "sm:mt-8" : ""}`}
              >
                <img
                  src={getMedia(`media.portfolio.${id}`)}
                  alt={getContent(`media.portfolio.${id}.alt`, locale)}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-3">
                  <p className="font-semibold text-ink">
                    {getContent(`portfolio.items.${id}.title`, locale)}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {getContent(`portfolio.items.${id}.summary`, locale)}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      {/* Keep phone reachable from home for conversion; not in hero budget */}
      <div className="sr-only">
        <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay}</a>
      </div>
    </>
  );
}
