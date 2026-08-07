import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { pathFor } from "@/lib/i18n";
import { siteConfig } from "@/content/config";
import { track } from "@/lib/analytics";

export function MobileContactBar() {
  const locale = useLocale();
  const hasLine = Boolean(siteConfig.lineUrl);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white/95 p-2 backdrop-blur md:hidden">
      <div
        className={`grid gap-2 ${hasLine ? "grid-cols-3" : "grid-cols-2"}`}
      >
        <a
          href={`tel:${siteConfig.phoneTel}`}
          onClick={() => track("click_call", { source: "mobile_bar" })}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm bg-brand-600 px-2 text-sm font-semibold text-white no-underline"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          {getContent("mobileBar.call", locale)}
        </a>
        {hasLine ? (
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("click_line", { source: "mobile_bar" })}
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-line px-2 text-sm font-semibold text-white no-underline"
          >
            {getContent("mobileBar.line", locale)}
          </a>
        ) : null}
        <Link
          to={pathFor(locale, "contact")}
          onClick={() => track("click_quote", { source: "mobile_bar" })}
          className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-2 text-sm font-semibold text-white no-underline"
        >
          {getContent("nav.quote", locale)}
        </Link>
      </div>
    </div>
  );
}
