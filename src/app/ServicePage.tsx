import { Link, useParams } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { getContent, getMedia, getObject } from "@/lib/content";
import { isServiceSlug, pathFor } from "@/lib/i18n";
import { Seo } from "@/components/Seo";
import { ContactForm } from "@/components/ContactForm";
import { RelatedServices } from "@/components/service/RelatedServices";
import { NotFound } from "@/app/NotFound";
import { siteConfig } from "@/content/config";

export function ServicePage() {
  const locale = useLocale();
  const { slug } = useParams();
  if (!isServiceSlug(slug)) {
    return <NotFound />;
  }

  const scopeItems =
    getObject<Record<string, { title: string; body: string }>>(
      `${slug}.scope.items`,
      locale,
    ) ?? {};
  const hasLine = Boolean(siteConfig.lineUrl);

  const relatedProjects = (["01", "02", "03", "04", "05", "06"] as const).filter(
    (id) => getContent(`portfolio.items.${id}.pillar`, locale) === slug,
  );

  return (
    <>
      <Seo
        kind={slug}
        locale={locale}
        crumbs={[
          { name: getContent("nav.home", locale), path: pathFor(locale) },
          {
            name: getContent(`nav.${slug}`, locale),
            path: pathFor(locale, slug),
          },
        ]}
      />

      <section className="bg-brand-800 text-white">
        <div className="container-page section-y max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-100 uppercase">
            {getContent(`${slug}.hero.brand`, locale)}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {getContent(`${slug}.hero.headline`, locale)}
          </h1>
          <p className="mt-5 text-lg text-brand-50/95">
            {getContent(`${slug}.hero.sub`, locale)}
          </p>
          {slug === "construction" ? (
            <p className="mt-6 border-l-2 border-brand-200 pl-4 text-brand-50">
              {getContent("construction.partnerStatement", locale)}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="inline-flex min-h-11 items-center rounded-md bg-white px-5 font-semibold text-brand-700 no-underline"
            >
              {getContent(`${slug}.hero.ctaCall`, locale)}
            </a>
            {hasLine ? (
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-md bg-line px-5 font-semibold text-white no-underline"
              >
                {getContent(`${slug}.hero.ctaLine`, locale)}
              </a>
            ) : null}
            <a
              href="#service-contact"
              className="inline-flex min-h-11 items-center rounded-md border border-white/70 px-5 font-semibold text-white no-underline"
            >
              {getContent(`${slug}.hero.ctaContact`, locale)}
            </a>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-8 md:grid-cols-2">
          {(["1", "2"] as const).map((id) => (
            <div key={id} className="rounded-lg bg-surface p-6">
              <h2 className="text-lg font-semibold text-brand-800">
                {getContent(`${slug}.problems.${id}.pain`, locale)}
              </h2>
              <p className="mt-3 text-muted">
                {getContent(`${slug}.problems.${id}.help`, locale)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y border-t border-brand-100">
        <div className="container-page">
          <h2 className="text-3xl font-semibold text-brand-800">
            {getContent(`${slug}.scope.title`, locale)}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            {getContent(`${slug}.scope.sub`, locale)}
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(scopeItems).map(([key, item]) => (
              <div key={key} className="rounded-lg border border-brand-100 p-5">
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-3xl">
            <h3 className="text-xl font-semibold text-brand-800">
              {getContent(`${slug}.audience.title`, locale)}
            </h3>
            <p className="mt-3 text-muted">
              {getContent(`${slug}.audience.body`, locale)}
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold text-brand-800">
              {getContent("portfolio.title", locale)}
            </h2>
            <Link
              to={pathFor(locale, "portfolio")}
              className="text-sm font-semibold text-brand-700"
            >
              {getContent("common.learnMore", locale)}
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {relatedProjects.slice(0, 2).map((id) => (
              <article key={id} className="overflow-hidden rounded-lg bg-white">
                <img
                  src={getMedia(`media.portfolio.${id}`)}
                  alt={getContent(`media.portfolio.${id}.alt`, locale)}
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-ink">
                    {getContent(`portfolio.items.${id}.title`, locale)}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {getContent(`portfolio.items.${id}.result`, locale)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="service-contact" className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-brand-800">
              {getContent(`${slug}.cta.title`, locale)}
            </h2>
            <p className="mt-3 text-muted">
              {getContent(`${slug}.cta.body`, locale)}
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="block font-semibold text-brand-700"
              >
                {siteConfig.phoneDisplay}
              </a>
              {hasLine ? (
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-semibold text-line"
                >
                  LINE
                </a>
              ) : null}
              <p className="text-muted">
                {locale === "th"
                  ? siteConfig.serviceAreaTh
                  : siteConfig.serviceAreaEn}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-brand-100 bg-white p-6">
            <ContactForm defaultServiceType={slug} />
          </div>
        </div>
      </section>

      <RelatedServices current={slug} />
    </>
  );
}
