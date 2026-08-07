export type AnalyticsEvent =
  | "click_call"
  | "click_line"
  | "click_quote"
  | "submit_quote"
  | "view_portfolio";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Lightweight conversion tracking — no heavy analytics SDK required. */
export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  if (import.meta.env.DEV) {
    console.debug("[analytics]", event, payload);
  }
}
