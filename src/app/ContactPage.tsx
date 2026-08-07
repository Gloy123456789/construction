import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { Seo } from "@/components/Seo";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/content/config";

export function ContactPage() {
  const locale = useLocale();
  const hasLine = Boolean(siteConfig.lineUrl);
  const hasEmail = Boolean(siteConfig.publicEmail);

  return (
    <>
      <Seo
        kind="contact"
        locale={locale}
        crumbs={[
          { name: getContent("nav.home", locale), path: pathFor(locale) },
          {
            name: getContent("nav.contact", locale),
            path: pathFor(locale, "contact"),
          },
        ]}
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-brand-800">
              {getContent("contact.title", locale)}
            </h1>
            <p className="mt-4 text-muted">
              {getContent("contact.sub", locale)}
            </p>

            <div className="mt-8 space-y-5">
              <h2 className="text-lg font-semibold text-ink">
                {getContent("contact.channels.title", locale)}
              </h2>
              <div>
                <p className="text-sm font-medium text-muted">
                  {getContent("contact.channels.phone.label", locale)}
                </p>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="text-lg font-semibold text-brand-700"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              {hasLine ? (
                <div>
                  <p className="text-sm font-medium text-muted">
                    {getContent("contact.channels.line.label", locale)}
                  </p>
                  <a
                    href={siteConfig.lineUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-semibold text-line"
                  >
                    {getContent("contact.channels.line.value", locale)}
                  </a>
                </div>
              ) : null}
              {hasEmail ? (
                <div>
                  <p className="text-sm font-medium text-muted">
                    {getContent("contact.channels.email.label", locale)}
                  </p>
                  <a
                    href={`mailto:${siteConfig.publicEmail}`}
                    className="text-lg font-semibold text-brand-700"
                  >
                    {siteConfig.publicEmail}
                  </a>
                </div>
              ) : null}
              <address className="not-italic">
                <p className="text-sm font-medium text-muted">
                  {getContent("contact.channels.address.label", locale)}
                </p>
                <p className="mt-1 text-ink">
                  {locale === "th"
                    ? siteConfig.addressTh
                    : siteConfig.addressEn}
                </p>
              </address>
              <p className="text-sm text-muted">
                <span className="font-medium text-ink">
                  {getContent("contact.channels.serviceArea.label", locale)}:{" "}
                </span>
                {locale === "th"
                  ? siteConfig.serviceAreaTh
                  : siteConfig.serviceAreaEn}
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-brand-100">
              <iframe
                title={getContent("contact.channels.address.label", locale)}
                src={siteConfig.mapsEmbedUrl}
                className="aspect-[16/10] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="rounded-lg border border-brand-100 bg-white p-6 sm:p-8">
            <ContactForm />
            <div className="mt-6 flex flex-wrap gap-3 border-t border-brand-100 pt-6">
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="inline-flex min-h-11 items-center rounded-md bg-brand-600 px-4 font-semibold text-white no-underline"
              >
                {getContent("common.call", locale)}
              </a>
              {hasLine ? (
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-md bg-line px-4 font-semibold text-white no-underline"
                >
                  {getContent("common.line", locale)}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
