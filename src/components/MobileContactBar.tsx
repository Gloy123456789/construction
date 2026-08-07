import { Phone } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { siteConfig } from "@/content/config";

export function MobileContactBar() {
  const locale = useLocale();
  const hasLine = Boolean(siteConfig.lineUrl);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white/95 p-2 backdrop-blur md:hidden">
      <div className={`grid gap-2 ${hasLine ? "grid-cols-2" : "grid-cols-1"}`}>
        <a
          href={`tel:${siteConfig.phoneTel}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-600 text-base font-semibold text-white no-underline"
        >
          <Phone className="size-4" aria-hidden />
          {getContent("mobileBar.call", locale)}
        </a>
        {hasLine ? (
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-line text-base font-semibold text-white no-underline"
          >
            {getContent("mobileBar.line", locale)}
          </a>
        ) : null}
      </div>
    </div>
  );
}
