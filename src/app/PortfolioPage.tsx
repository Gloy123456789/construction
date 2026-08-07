import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getContent, getMedia } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { Seo } from "@/components/Seo";
import type { ServiceSlug } from "@/content/config";
import { serviceSlugs } from "@/content/config";
import { track } from "@/lib/analytics";

const itemIds = ["01", "02", "03", "04", "05", "06"] as const;
type Filter = "all" | ServiceSlug;
type ItemId = (typeof itemIds)[number];

export function PortfolioPage() {
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<ItemId | null>(null);

  useEffect(() => {
    track("view_portfolio", { source: "portfolio_page" });
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

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

  const activeBefore = active ? getMedia(`media.portfolio.${active}.before`) : "";
  const activeAfter = active ? getMedia(`media.portfolio.${active}.after`) : "";

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
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-brand-800 sm:text-4xl lg:text-5xl">
            {getContent("portfolio.title", locale)}
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
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
                  "min-h-11 rounded-sm px-4 text-sm font-semibold",
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

          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {items.map((id, index) => (
              <article
                key={id}
                className={`mb-5 break-inside-avoid ${index % 3 === 1 ? "sm:mt-6" : ""}`}
              >
                <button
                  type="button"
                  className="group w-full text-left"
                  onClick={() => setActive(id)}
                >
                  <img
                    src={getMedia(`media.portfolio.${id}`)}
                    alt={getContent(`media.portfolio.${id}.alt`, locale)}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <div className="mt-3 space-y-1.5">
                    <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">
                      {getContent(
                        `services.items.${getContent(`portfolio.items.${id}.pillar`, locale)}.title`,
                        locale,
                      )}
                    </p>
                    <h2 className="text-lg font-semibold text-ink group-hover:text-brand-700">
                      {getContent(`portfolio.items.${id}.title`, locale)}
                    </h2>
                    <p className="text-sm text-muted">
                      {getContent(`portfolio.items.${id}.summary`, locale)}
                    </p>
                    <span className="inline-flex min-h-10 items-center text-sm font-semibold text-brand-700">
                      {getContent("portfolio.openProject", locale)}
                    </span>
                  </div>
                </button>
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
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {testimonials.map((id) => (
              <blockquote key={id} className="border-l-2 border-brand-600 pl-5">
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

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-brand-900/70 p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-white sm:rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-brand-100 px-4 py-4 sm:px-6">
              <h2
                id="portfolio-modal-title"
                className="text-xl font-semibold text-brand-800"
              >
                {getContent(`portfolio.items.${active}.title`, locale)}
              </h2>
              <button
                type="button"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm border border-brand-100 text-brand-700"
                onClick={() => setActive(null)}
                aria-label={getContent("portfolio.closeModal", locale)}
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-5 px-4 py-5 sm:px-6">
              <img
                src={getMedia(`media.portfolio.${active}`)}
                alt={getContent(`media.portfolio.${active}.alt`, locale)}
                className="aspect-[16/10] w-full object-cover"
              />
              {(activeBefore || activeAfter) && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {activeBefore ? (
                    <figure>
                      <img
                        src={activeBefore}
                        alt={getContent(
                          `media.portfolio.${active}.beforeAlt`,
                          locale,
                        )}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <figcaption className="mt-2 text-xs font-semibold tracking-wide text-muted uppercase">
                        {getContent("portfolio.beforeLabel", locale)}
                      </figcaption>
                    </figure>
                  ) : null}
                  {activeAfter ? (
                    <figure>
                      <img
                        src={activeAfter}
                        alt={getContent(
                          `media.portfolio.${active}.afterAlt`,
                          locale,
                        )}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <figcaption className="mt-2 text-xs font-semibold tracking-wide text-muted uppercase">
                        {getContent("portfolio.afterLabel", locale)}
                      </figcaption>
                    </figure>
                  ) : null}
                </div>
              )}
              <div className="space-y-3 text-sm text-muted">
                <p>
                  <strong className="text-ink">
                    {getContent("portfolio.modalChallenge", locale)}:{" "}
                  </strong>
                  {getContent(`portfolio.items.${active}.challenge`, locale)}
                </p>
                <p>
                  <strong className="text-ink">
                    {getContent("portfolio.modalWork", locale)}:{" "}
                  </strong>
                  {getContent(`portfolio.items.${active}.work`, locale)}
                </p>
                <p>
                  <strong className="text-ink">
                    {getContent("portfolio.modalResult", locale)}:{" "}
                  </strong>
                  {getContent(`portfolio.items.${active}.result`, locale)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
