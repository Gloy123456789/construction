import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { getContent, getMedia } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { Seo } from "@/components/Seo";

export function AboutPage() {
  const locale = useLocale();

  return (
    <>
      <Seo
        kind="about"
        locale={locale}
        crumbs={[
          { name: getContent("nav.home", locale), path: pathFor(locale) },
          {
            name: getContent("nav.about", locale),
            path: pathFor(locale, "about"),
          },
        ]}
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-brand-800">
              {getContent("about.story.title", locale)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {getContent("about.story.body", locale)}
            </p>
          </div>
          <img
            src={getMedia("media.about.team")}
            alt={getContent("media.about.team.alt", locale)}
            className="aspect-[4/3] w-full rounded-lg object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-semibold text-brand-800">
            {getContent("about.team.title", locale)}
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            {getContent("about.team.body", locale)}
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-semibold text-brand-800">
            {getContent("about.philosophy.title", locale)}
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            {getContent("about.philosophy.body", locale)}
          </p>
        </div>
      </section>

      <section className="section-y bg-brand-600 text-white">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">
              {getContent("about.cta.title", locale)}
            </h2>
            <p className="mt-3 text-brand-50">
              {getContent("about.cta.body", locale)}
            </p>
          </div>
          <Link
            to={pathFor(locale, "contact")}
            className="inline-flex min-h-11 items-center rounded-md bg-white px-5 font-semibold text-brand-700 no-underline"
          >
            {getContent("about.cta.button", locale)}
          </Link>
        </div>
      </section>
    </>
  );
}
