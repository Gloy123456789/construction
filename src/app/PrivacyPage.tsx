import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { Seo } from "@/components/Seo";

export function PrivacyPage() {
  const locale = useLocale();

  return (
    <>
      <Seo
        kind="privacy"
        locale={locale}
        crumbs={[
          { name: getContent("nav.home", locale), path: pathFor(locale) },
          {
            name: getContent("footer.privacy", locale),
            path: pathFor(locale, "privacy"),
          },
        ]}
      />
      <section className="section-y">
        <div className="container-page max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-brand-800 sm:text-4xl">
            {getContent("privacy.title", locale)}
          </h1>
          <p className="mt-3 text-sm text-muted">
            {getContent("privacy.updated", locale)}
          </p>
          <p className="mt-6 leading-relaxed text-ink">
            {getContent("privacy.intro", locale)}
          </p>
          <div className="mt-10 space-y-8">
            {(["1", "2", "3", "4"] as const).map((id) => (
              <section key={id}>
                <h2 className="text-xl font-semibold text-brand-800">
                  {getContent(`privacy.sections.${id}.title`, locale)}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  {getContent(`privacy.sections.${id}.body`, locale)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
