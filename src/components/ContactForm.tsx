import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { submitContact } from "@/lib/firebase";
import type { ServiceSlug } from "@/content/config";
import { serviceSlugs, siteConfig } from "@/content/config";
import { track } from "@/lib/analytics";

type Props = {
  defaultServiceType?: ServiceSlug | "general";
};

type FormValues = {
  name: string;
  phone: string;
  email?: string;
  message: string;
  serviceType: string;
  budget?: string;
  projectLocation?: string;
  website?: string;
};

export function ContactForm({ defaultServiceType = "general" }: Props) {
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const hasLine = Boolean(siteConfig.lineUrl);

  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(1, getContent("contact.form.errors.nameRequired", locale))
      .max(120),
    phone: z
      .string()
      .trim()
      .min(1, getContent("contact.form.errors.phoneRequired", locale))
      .max(40)
      .refine(
        (v) => /^[\d+\-\s()]{8,}$/.test(v),
        getContent("contact.form.errors.phoneInvalid", locale),
      ),
    email: z
      .string()
      .trim()
      .max(200)
      .optional()
      .or(z.literal(""))
      .refine(
        (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        getContent("contact.form.errors.emailInvalid", locale),
      ),
    message: z
      .string()
      .trim()
      .min(1, getContent("contact.form.errors.messageRequired", locale))
      .max(4000),
    serviceType: z.string().max(40),
    budget: z.string().trim().max(120).optional().or(z.literal("")),
    projectLocation: z.string().trim().max(200).optional().or(z.literal("")),
    website: z.string().max(100).optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      serviceType: defaultServiceType,
      budget: "",
      projectLocation: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(
    async (values) => {
      setStatus("submitting");
      try {
        const result = await submitContact({
          name: values.name,
          phone: values.phone,
          email: values.email || undefined,
          message: values.message,
          serviceType: values.serviceType,
          budget: values.budget || undefined,
          projectLocation: values.projectLocation || undefined,
          locale,
          pagePath: window.location.pathname,
          sourcePage: window.location.pathname,
          website: values.website,
          attachmentRefs: [],
        });
        if (!result.ok) throw new Error("failed");
        track("submit_quote", {
          serviceType: values.serviceType,
          locale,
        });
        setStatus("success");
        reset({
          name: "",
          phone: "",
          email: "",
          message: "",
          serviceType: defaultServiceType,
          budget: "",
          projectLocation: "",
          website: "",
        });
      } catch {
        setStatus("error");
      }
    },
    (errs) => {
      const first = Object.keys(errs)[0] as keyof FormValues | undefined;
      if (first) setFocus(first);
    },
  );

  const fieldClass =
    "min-h-11 w-full rounded-sm border border-brand-100 bg-white px-3 text-base text-ink placeholder:text-muted/70";

  return (
    <div>
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            {getContent("contact.form.name.label", locale)}
          </label>
          <input
            id="name"
            className={fieldClass}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1 text-sm text-red-700" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            {getContent("contact.form.phone.label", locale)}
          </label>
          <input
            id="phone"
            type="tel"
            className={fieldClass}
            autoComplete="tel"
            placeholder={getContent("contact.form.phone.placeholder", locale)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="phone-error" className="mt-1 text-sm text-red-700" role="alert">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            {getContent("contact.form.email.label", locale)}
          </label>
          <input
            id="email"
            type="email"
            className={fieldClass}
            autoComplete="email"
            placeholder={getContent("contact.form.email.placeholder", locale)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" className="mt-1 text-sm text-red-700" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="serviceType" className="mb-1.5 block text-sm font-medium">
            {getContent("contact.form.service.label", locale)}
          </label>
          <select id="serviceType" className={fieldClass} {...register("serviceType")}>
            <option value="general">
              {getContent("contact.form.service.options.general", locale)}
            </option>
            {serviceSlugs.map((slug) => (
              <option key={slug} value={slug}>
                {getContent(`contact.form.service.options.${slug}`, locale)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
              {getContent("contact.form.budget.label", locale)}
            </label>
            <input
              id="budget"
              className={fieldClass}
              placeholder={getContent("contact.form.budget.placeholder", locale)}
              {...register("budget")}
            />
          </div>
          <div>
            <label
              htmlFor="projectLocation"
              className="mb-1.5 block text-sm font-medium"
            >
              {getContent("contact.form.location.label", locale)}
            </label>
            <input
              id="projectLocation"
              className={fieldClass}
              placeholder={getContent("contact.form.location.placeholder", locale)}
              {...register("projectLocation")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
            {getContent("contact.form.message.label", locale)}
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full rounded-sm border border-brand-100 bg-white px-3 py-2 text-base text-ink placeholder:text-muted/70"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          {errors.message ? (
            <p id="message-error" className="mt-1 text-sm text-red-700" role="alert">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        <p className="text-xs text-muted">
          {getContent("contact.form.attachmentNote", locale)}
        </p>

        {/* Honeypot */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">
            {getContent("contact.form.honeypotLabel", locale)}
          </label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-accent w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting"
            ? getContent("contact.form.submitting", locale)
            : getContent("contact.form.submit", locale)}
        </button>

        <div aria-live="polite" className="min-h-6 text-sm">
          {status === "success" ? (
            <p className="text-brand-700">{getContent("contact.form.success", locale)}</p>
          ) : null}
          {status === "error" ? (
            <p className="text-red-700">{getContent("contact.form.error", locale)}</p>
          ) : null}
        </div>
      </form>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-brand-100 pt-6">
        <a
          href={`tel:${siteConfig.phoneTel}`}
          onClick={() => track("click_call", { source: "contact_form" })}
          className="btn-primary"
        >
          {getContent("common.call", locale)}
        </a>
        {hasLine ? (
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("click_line", { source: "contact_form" })}
            className="btn-line"
          >
            {getContent("common.line", locale)}
          </a>
        ) : null}
      </div>
    </div>
  );
}
