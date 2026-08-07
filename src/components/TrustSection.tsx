import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { siteConfig } from "@/content/config";

export function TrustSection() {
  const locale = useLocale();
  const stats = siteConfig.trustStats;

  const metricItems = [
    stats.yearsExperience
      ? { label: getContent("trust.stats.years", locale), value: stats.yearsExperience }
      : null,
    stats.completedProjects
      ? {
          label: getContent("trust.stats.projects", locale),
          value: stats.completedProjects,
        }
      : null,
    stats.teamSize
      ? { label: getContent("trust.stats.team", locale), value: stats.teamSize }
      : {
          label: getContent("trust.stats.team", locale),
          value: locale === "th" ? "ทีมประสานงานชัดเจน" : "Clear project team",
        },
    {
      label: getContent("trust.stats.warranty", locale),
      value: locale === "th" ? stats.warrantyTh : stats.warrantyEn,
    },
    {
      label: getContent("trust.stats.area", locale),
      value: locale === "th" ? siteConfig.serviceAreaTh : siteConfig.serviceAreaEn,
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-800 sm:text-4xl">
            {getContent("trust.title", locale)}
          </h2>
          <p className="mt-3 text-muted">{getContent("trust.sub", locale)}</p>
        </div>

        <dl className="mt-10 grid gap-6 border-y border-brand-100 py-8 sm:grid-cols-2 lg:grid-cols-5">
          {metricItems.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold tracking-wide text-muted uppercase">
                {item.label}
              </dt>
              <dd className="mt-2 text-base font-semibold text-brand-800">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {(["1", "2", "3"] as const).map((id) => (
            <div key={id} className="border-l-2 border-brand-600 pl-4">
              <h3 className="text-lg font-semibold text-ink">
                {getContent(`trust.items.${id}.title`, locale)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {getContent(`trust.items.${id}.body`, locale)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
