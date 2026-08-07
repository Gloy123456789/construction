import { useMemo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";
import { getContent, getMedia } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { Seo } from "@/components/Seo";
import type { ServiceSlug } from "@/content/config";
import { serviceSlugs } from "@/content/config";

const itemIds = ["01", "02", "03", "04", "05", "06"] as const;
type Filter = "all" | ServiceSlug;

export function PortfolioPage() {
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(() => {
    return itemIds.filter((id) => {
      if (filter === "all") return true;
      return getContent(`portfolio.items.${id}.pillar`, locale) === filter;
    });
  }, [filter, locale]);

  const testimonials = (["1", "2"] as const).filter(
    (id) =>
      filter === "all" ||
      getContent(`testimonials.${id}.pillar`, locale) === filter,
  );

  return (
    <>
      <Seo
        kind="portfolio"
        locale={locale}
        crumbs={[
          { name: getContent("nav.home", locale), path: pathFor(locale) },
          {
            name: getContent("nav.portfolio", locale),
            path: pathFor(locale, "portfolio"),
          },
        ]}
      />

      <section className="section-y">
        <div className="container-page">
          <h1 className="text-4xl font-semibold tracking-tight text-brand-800">
            {getContent("portfolio.title", locale)}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            {getContent("portfolio.sub", locale)}
          </p>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="group"
            aria-label={getContent("portfolio.filter.all", locale)}
          >
            {(["all", ...serviceSlugs] as Filter[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={[
                  "min-h-11 rounded-md px-4 text-sm font-semibold",
                  filter === key
                    ? "bg-brand-600 text-white"
                    : "bg-surface text-brand-700 hover:bg-brand-100",
                ].join(" ")}
                aria-pressed={filter === key}
              >
                {getContent(`portfolio.filter.${key}`, locale)}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {items.map((id) => (
              <article
                key={id}
                className="overflow-hidden rounded-lg border border-brand-100 bg-white"
              >
                <img
                  src={getMedia(`media.portfolio.${id}`)}
                  alt={getContent(`media.portfolio.${id}.alt`, locale)}
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <div className="space-y-2 p-5">
                  <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">
                    {getContent(
                      `services.items.${getContent(`portfolio.items.${id}.pillar`, locale)}.title`,
                      locale,
                    )}
                  </p>
                  <h2 className="text-xl font-semibold text-ink">
                    {getContent(`portfolio.items.${id}.title`, locale)}
                  </h2>
                  <p className="text-sm text-muted">
                    <strong className="text-ink">
                      {getContent("portfolio.challengeLabel", locale)}:{" "}
                    </strong>
                    {getContent(`portfolio.items.${id}.challenge`, locale)}
                  </p>
                  <p className="text-sm text-muted">
                    <strong className="text-ink">
                      {getContent("portfolio.workLabel", locale)}:{" "}
                    </strong>
                    {getContent(`portfolio.items.${id}.work`, locale)}
                  </p>
                  <p className="text-sm text-muted">
                    <strong className="text-ink">
                      {getContent("portfolio.resultLabel", locale)}:{" "}
                    </strong>
                    {getContent(`portfolio.items.${id}.result`, locale)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <h2 className="text-3xl font-semibold text-brand-800">
            {getContent("portfolio.reviewsTitle", locale)}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {testimonials.map((id) => (
              <blockquote
                key={id}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <p className="text-lg leading-relaxed text-ink">
                  “{getContent(`testimonials.${id}.quote`, locale)}”
                </p>
                <footer className="mt-4 text-sm text-muted">
                  <cite className="not-italic font-semibold text-brand-700">
                    {getContent(`testimonials.${id}.name`, locale)}
                  </cite>
                  {" · "}
                  {getContent(`testimonials.${id}.role`, locale)}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
