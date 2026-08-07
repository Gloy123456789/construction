import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import type { ServiceSlug } from "@/content/config";
import { serviceSlugs } from "@/content/config";

export function RelatedServices({ current }: { current: ServiceSlug }) {
  const locale = useLocale();
  const others = serviceSlugs.filter((s) => s !== current);

  return (
    <section className="section-y border-t border-brand-100">
      <div className="container-page">
        <h2 className="text-2xl font-semibold text-brand-800">
          {getContent("common.relatedServices", locale)}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {others.map((slug) => (
            <Link
              key={slug}
              to={pathFor(locale, slug)}
              className="border-t border-brand-100 pt-5 no-underline hover:text-brand-700"
            >
              <h3 className="font-semibold text-brand-700">
                {getContent(`services.items.${slug}.title`, locale)}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {getContent(`services.items.${slug}.body`, locale)}
              </p>
            </Link>
          ))}
        </div>
        <Link
          to={pathFor(locale)}
          className="mt-6 inline-flex min-h-11 items-center font-semibold text-brand-700"
        >
          {getContent("common.backHome", locale)}
        </Link>
      </div>
    </section>
  );
}
