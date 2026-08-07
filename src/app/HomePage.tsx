import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getContent, getMedia } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { Seo } from "@/components/Seo";
import { CtaBand } from "@/components/CtaBand";
import { siteConfig, serviceSlugs } from "@/content/config";

export function HomePage() {
  const locale = useLocale();
  const hasLine = Boolean(siteConfig.lineUrl);

  return (
    <>
      <Seo kind="home" locale={locale} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getMedia("media.home.hero")}
            alt={getContent("media.home.hero.alt", locale)}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-800/75 to-brand-700/40" />
        </div>
        <div className="container-page relative flex min-h-[78vh] items-end pb-14 pt-28 sm:pb-20">
          <div className="max-w-2xl text-white fade-up">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand-100 uppercase">
              {getContent("hero.brand", locale)}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {getContent("hero.headline", locale)}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-50/95">
              {getContent("hero.sub", locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="inline-flex min-h-11 items-center rounded-md bg-white px-5 text-base font-semibold text-brand-700 no-underline"
              >
                {getContent("hero.ctaCall", locale)}
              </a>
              {hasLine ? (
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-md bg-line px-5 text-base font-semibold text-white no-underline"
                >
                  {getContent("hero.ctaLine", locale)}
                </a>
              ) : null}
              <Link
                to={pathFor(locale, "contact")}
                className="inline-flex min-h-11 items-center rounded-md border border-white/70 px-5 text-base font-semibold text-white no-underline"
              >
                {getContent("hero.ctaContact", locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-y">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-brand-800">
              {getContent("services.title", locale)}
            </h2>
            <p className="mt-3 text-muted">{getContent("services.sub", locale)}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {serviceSlugs.map((slug) => (
              <Link
                key={slug}
                to={pathFor(locale, slug)}
                className="group block rounded-lg border border-brand-100 bg-white p-6 no-underline transition-colors hover:border-brand-300"
              >
                <h3 className="text-xl font-semibold text-brand-700">
                  {getContent(`services.items.${slug}.title`, locale)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {getContent(`services.items.${slug}.body`, locale)}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  {getContent("common.learnMore", locale)}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-brand-800">
              {getContent("trust.title", locale)}
            </h2>
            <p className="mt-3 text-muted">{getContent("trust.sub", locale)}</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {(["1", "2", "3"] as const).map((id) => (
              <div key={id}>
                <h3 className="text-lg font-semibold text-ink">
                  {getContent(`trust.items.${id}.title`, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {getContent(`trust.items.${id}.body`, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-brand-800">
                {getContent("portfolio.teaser.title", locale)}
              </h2>
              <p className="mt-3 text-muted">
                {getContent("portfolio.sub", locale)}
              </p>
            </div>
            <Link
              to={pathFor(locale, "portfolio")}
              className="inline-flex min-h-11 items-center font-semibold text-brand-700"
            >
              {getContent("portfolio.teaser.cta", locale)}
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(["01", "02", "03"] as const).map((id) => (
              <figure key={id} className="overflow-hidden rounded-lg bg-surface">
                <img
                  src={getMedia(`media.portfolio.${id}`)}
                  alt={getContent(`media.portfolio.${id}.alt`, locale)}
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="p-4">
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
    </>
  );
}
