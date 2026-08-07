import { useParams } from "react-router-dom";
import type { Locale } from "@/content/config";
import { isLocale } from "@/lib/i18n";

export function useLocale(): Locale {
  const { locale } = useParams();
  return isLocale(locale) ? locale : "th";
}
