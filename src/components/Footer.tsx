import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { siteConfig, serviceSlugs } from "@/content/config";

export function Footer() {
  const locale = useLocale();

  return (
    <footer className="border-t border-brand-100 bg-surface">
      <div className="container-page section-y grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-brand-700">
            {locale === "th" ? siteConfig.brandTh : siteConfig.brandEn}
          </p>
          <p className="mt-2 text-sm text-muted">
            {locale === "th" ? siteConfig.legalNameTh : siteConfig.legalNameEn}
          </p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-muted">
            {locale === "th" ? siteConfig.addressTh : siteConfig.addressEn}
            <br />
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="font-medium text-brand-700"
            >
              {siteConfig.phoneDisplay}
            </a>
            {siteConfig.publicEmail ? (
              <>
                <br />
                <a
                  href={`mailto:${siteConfig.publicEmail}`}
                  className="font-medium text-brand-700"
                >
                  {siteConfig.publicEmail}
                </a>
              </>
            ) : null}
          </address>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">
            {getContent("footer.servicesTitle", locale)}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  to={pathFor(locale, slug)}
                  className="text-muted no-underline hover:text-brand-700"
                >
                  {getContent(`services.items.${slug}.title`, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">
            {getContent("footer.navTitle", locale)}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {(["portfolio", "about", "contact"] as const).map((slug) => (
              <li key={slug}>
                <Link
                  to={pathFor(locale, slug)}
                  className="text-muted no-underline hover:text-brand-700"
                >
                  {getContent(`nav.${slug}`, locale)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            {locale === "th"
              ? siteConfig.serviceAreaTh
              : siteConfig.serviceAreaEn}
          </p>
        </div>
      </div>
      <div className="border-t border-brand-100">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            {locale === "th" ? siteConfig.legalNameTh : siteConfig.legalNameEn}
          </p>
          <p>{getContent("footer.rights", locale)}</p>
        </div>
      </div>
    </footer>
  );
}
