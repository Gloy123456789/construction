import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getContent, getMedia } from "@/lib/content";
import { pathFor, switchLocalePath, otherLocale } from "@/lib/i18n";
import { siteConfig } from "@/content/config";

const navItems = [
  ["home", ""],
  ["construction", "construction"],
  ["marketing", "marketing"],
  ["consulting", "consulting"],
  ["portfolio", "portfolio"],
  ["about", "about"],
  ["contact", "contact"],
] as const;

export function Header() {
  const locale = useLocale();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const nextLocale = otherLocale(locale);
  const hasLine = Boolean(siteConfig.lineUrl);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/80 bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-white"
      >
        {getContent("a11y.skipToContent", locale)}
      </a>
      <div className="container-page flex min-h-16 items-center justify-between gap-4 py-3">
        <Link
          to={pathFor(locale)}
          className="flex min-h-11 items-center gap-3 no-underline"
          onClick={() => setOpen(false)}
        >
          <img
            src={getMedia("media.global.logo")}
            alt={getContent("media.global.logo.alt", locale)}
            className="h-10 w-10"
            width={40}
            height={40}
          />
          <span className="text-base font-semibold tracking-tight text-brand-700 sm:text-lg">
            {locale === "th" ? siteConfig.brandTh : siteConfig.brandEn}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {navItems.map(([key, segment]) => (
            <NavLink
              key={key}
              to={pathFor(locale, segment)}
              end={segment === ""}
              className={({ isActive }) =>
                [
                  "rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-muted hover:bg-surface hover:text-ink",
                ].join(" ")
              }
            >
              {getContent(`nav.${key}`, locale)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={switchLocalePath(location.pathname, nextLocale)}
            className="hidden min-h-11 items-center rounded-md px-3 text-sm font-semibold text-brand-700 no-underline sm:inline-flex"
            aria-label={getContent("a11y.langSwitch", locale)}
          >
            {nextLocale.toUpperCase()}
          </Link>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="hidden min-h-11 items-center gap-2 rounded-md bg-brand-600 px-4 text-sm font-semibold text-white no-underline md:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            {getContent("common.call", locale)}
          </a>
          {hasLine ? (
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-11 items-center rounded-md bg-line px-4 text-sm font-semibold text-white no-underline md:inline-flex"
            >
              {getContent("common.line", locale)}
            </a>
          ) : null}
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-brand-100 text-brand-700 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={
              open
                ? getContent("a11y.closeMenu", locale)
                : getContent("a11y.openMenu", locale)
            }
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-brand-100 bg-white lg:hidden"
        >
          <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile">
            {navItems.map(([key, segment]) => (
              <NavLink
                key={key}
                to={pathFor(locale, segment)}
                end={segment === ""}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-md px-3 py-3 text-base font-medium no-underline",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink hover:bg-surface",
                  ].join(" ")
                }
              >
                {getContent(`nav.${key}`, locale)}
              </NavLink>
            ))}
            <Link
              to={switchLocalePath(location.pathname, nextLocale)}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-semibold text-brand-700 no-underline"
            >
              {getContent("a11y.langSwitch", locale)} ({nextLocale.toUpperCase()})
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
