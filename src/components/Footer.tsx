import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { siteConfig, serviceSlugs } from "@/content/config";
import { track } from "@/lib/analytics";

export function Footer() {
  const locale = useLocale();

  return (
    <footer className="border-t border-brand-100 bg-brand-900 text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-lg font-semibold">
            {locale === "th" ? siteConfig.brandTh : siteConfig.brandEn}
          </p>
          <p className="mt-2 text-sm text-white/70">
            {locale === "th" ? siteConfig.legalNameTh : siteConfig.legalNameEn}
          </p>
          <address className="mt-5 not-italic text-sm leading-relaxed text-white/75">
            {locale === "th" ? siteConfig.addressTh : siteConfig.addressEn}
            <br />
            <a
              href={`tel:${siteConfig.phoneTel}`}
              onClick={() => track("click_call", { source: "footer" })}
              className="mt-2 inline-block font-medium text-white"
            >
              {siteConfig.phoneDisplay}
            </a>
            {siteConfig.publicEmail ? (
              <>
                <br />
                <a
                  href={`mailto:${siteConfig.publicEmail}`}
                  className="font-medium text-white"
                >
                  {siteConfig.publicEmail}
                </a>
              </>
            ) : null}
          </address>
          <p className="mt-4 text-sm text-white/65">
            {locale === "th"
              ? siteConfig.serviceAreaTh
              : siteConfig.serviceAreaEn}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-sm font-semibold text-white/90">
            {getContent("footer.servicesTitle", locale)}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  to={pathFor(locale, slug)}
                  className="text-white/70 no-underline hover:text-white"
                >
                  {getContent(`services.items.${slug}.title`, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-sm font-semibold text-white/90">
            {getContent("footer.navTitle", locale)}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {(["portfolio", "about", "contact"] as const).map((slug) => (
              <li key={slug}>
                <Link
                  to={pathFor(locale, slug)}
                  className="text-white/70 no-underline hover:text-white"
                >
                  {getContent(`nav.${slug}`, locale)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={pathFor(locale, "privacy")}
                className="text-white/70 no-underline hover:text-white"
              >
                {getContent("footer.privacy", locale)}
              </Link>
            </li>
          </ul>
          <Link
            to={pathFor(locale, "contact")}
            onClick={() => track("click_quote", { source: "footer" })}
            className="btn-accent mt-6"
          >
            {getContent("footer.quoteCta", locale)}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-white/55 sm:flex-row sm:justify-between">
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
