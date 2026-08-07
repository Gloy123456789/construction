import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/lib/content";
import { submitContact } from "@/lib/firebase";
import type { ServiceSlug } from "@/content/config";
import { serviceSlugs } from "@/content/config";

type Props = {
  defaultServiceType?: ServiceSlug | "general";
};

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceType: string;
  website?: string;
};

export function ContactForm({ defaultServiceType = "general" }: Props) {
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  const schema = z.object({
    name: z.string().trim().min(1, getContent("contact.form.errors.nameRequired", locale)).max(120),
    email: z
      .string()
      .trim()
      .min(1, getContent("contact.form.errors.emailRequired", locale))
      .email(getContent("contact.form.errors.emailInvalid", locale))
      .max(200),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    message: z
      .string()
      .trim()
      .min(1, getContent("contact.form.errors.messageRequired", locale))
      .max(4000),
    serviceType: z.string().max(40),
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
      email: "",
      phone: "",
      message: "",
      serviceType: defaultServiceType,
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    try {
      const result = await submitContact({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        message: values.message,
        serviceType: values.serviceType,
        locale,
        pagePath: window.location.pathname,
        website: values.website,
      });
      if (!result.ok) throw new Error("failed");
      setStatus("success");
      reset({
        name: "",
        email: "",
        phone: "",
        message: "",
        serviceType: defaultServiceType,
        website: "",
      });
    } catch {
      setStatus("error");
    }
  }, (errs) => {
    const first = Object.keys(errs)[0] as keyof FormValues | undefined;
    if (first) setFocus(first);
  });

  const fieldClass =
    "min-h-11 w-full rounded-md border border-brand-100 bg-white px-3 text-base text-ink placeholder:text-muted/70";

  return (
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
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          {getContent("contact.form.email.label", locale)}
        </label>
        <input
          id="email"
          type="email"
          className={fieldClass}
          autoComplete="email"
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
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
          {getContent("contact.form.phone.label", locale)}
        </label>
        <input
          id="phone"
          type="tel"
          className={fieldClass}
          autoComplete="tel"
          {...register("phone")}
        />
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

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {getContent("contact.form.message.label", locale)}
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-md border border-brand-100 bg-white px-3 py-2 text-base text-ink placeholder:text-muted/70"
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

      {/* Honeypot — hidden from users, skipped by tab order */}
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
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand-600 px-5 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
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
  );
}
