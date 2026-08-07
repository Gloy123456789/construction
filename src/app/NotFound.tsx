import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { Seo } from "@/components/Seo";

export function NotFound() {
  const locale = useLocale();
  return (
    <>
      <Seo kind="notFound" locale={locale} />
      <section className="section-y">
        <div className="container-page max-w-xl">
          <h1 className="text-4xl font-semibold text-brand-800">
            {getContent("notFound.title", locale)}
          </h1>
          <p className="mt-4 text-muted">{getContent("notFound.body", locale)}</p>
          <Link
            to={pathFor(locale)}
            className="mt-8 inline-flex min-h-11 items-center rounded-md bg-brand-600 px-5 font-semibold text-white no-underline"
          >
            {getContent("notFound.cta", locale)}
          </Link>
        </div>
      </section>
    </>
  );
}
