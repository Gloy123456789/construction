import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getContent, getMedia } from "@/lib/content";
import { pathFor, switchLocalePath, otherLocale } from "@/lib/i18n";
import { siteConfig } from "@/content/config";
import { track } from "@/lib/analytics";

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

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/90 bg-white/95 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-white"
      >
        {getContent("a11y.skipToContent", locale)}
      </a>
      <div className="container-page flex h-14 items-center justify-between gap-3 sm:h-16">
        <Link
          to={pathFor(locale)}
          className="flex min-h-10 items-center gap-2.5 no-underline"
          onClick={() => setOpen(false)}
        >
          <img
            src={getMedia("media.global.logo")}
            alt={getContent("media.global.logo.alt", locale)}
            className="h-9 w-9 object-contain"
            width={36}
            height={36}
          />
          <span className="max-w-[11rem] text-[0.95rem] font-semibold leading-tight tracking-tight text-brand-700 sm:max-w-none sm:text-base">
            {locale === "th" ? siteConfig.brandTh : siteConfig.brandEn}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {navItems.map(([key, segment]) => (
            <NavLink
              key={key}
              to={pathFor(locale, segment)}
              end={segment === ""}
              className={({ isActive }) =>
                [
                  "rounded-sm px-2.5 py-2 text-[0.8rem] font-medium no-underline transition-colors xl:px-3 xl:text-sm",
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

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to={switchLocalePath(location.pathname, nextLocale)}
            className="inline-flex min-h-10 items-center rounded-sm px-2 text-xs font-semibold text-brand-700 no-underline sm:px-3 sm:text-sm"
            aria-label={getContent("a11y.langSwitch", locale)}
          >
            {nextLocale.toUpperCase()}
          </Link>
          <Link
            to={pathFor(locale, "contact")}
            onClick={() => track("click_quote", { source: "header" })}
            className="btn-accent hidden text-xs sm:inline-flex sm:text-sm"
          >
            {getContent("nav.quote", locale)}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm border border-brand-100 text-brand-700 lg:hidden"
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
        <div id="mobile-nav" className="border-t border-brand-100 bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-0.5 py-3" aria-label="Mobile">
            {navItems.map(([key, segment]) => (
              <NavLink
                key={key}
                to={pathFor(locale, segment)}
                end={segment === ""}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-sm px-3 py-3 text-base font-medium no-underline",
                    isActive ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-surface",
                  ].join(" ")
                }
              >
                {getContent(`nav.${key}`, locale)}
              </NavLink>
            ))}
            <Link
              to={pathFor(locale, "contact")}
              onClick={() => {
                track("click_quote", { source: "mobile_nav" });
                setOpen(false);
              }}
              className="btn-accent mt-2 w-full"
            >
              {getContent("nav.quote", locale)}
            </Link>
            <Link
              to={switchLocalePath(location.pathname, nextLocale)}
              onClick={() => setOpen(false)}
              className="rounded-sm px-3 py-3 text-base font-semibold text-brand-700 no-underline"
            >
              {getContent("a11y.langSwitch", locale)} ({nextLocale.toUpperCase()})
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
