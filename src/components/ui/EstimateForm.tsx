"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOME_REDESIGN_SERVICE_TYPE_OPTIONS, SERVICE_TYPE_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/cn";

type EstimateFormProps = {
  showServiceChips?: boolean;
  projectPlaceholder?: string;
  submitLabel?: string;
  /** "redesign" renders the 2026-08-04 homepage redesign's visual language and field set. */
  variant?: "default" | "redesign";
};

type FormErrors = Partial<Record<"name" | "phone" | "email" | "address", string>>;

const PHONE_PATTERN = /^[\d\s()+-]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EstimateForm({
  showServiceChips = false,
  projectPlaceholder = "Tell us about your project…",
  submitLabel = "Request My Free Estimate",
  variant = "default",
}: EstimateFormProps) {
  const isRedesign = variant === "redesign";
  const serviceTypeOptions = isRedesign
    ? HOME_REDESIGN_SERVICE_TYPE_OPTIONS
    : SERVICE_TYPE_OPTIONS;
  const [service, setService] = useState<string>(serviceTypeOptions[0].key);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const nextErrors: FormErrors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!phone || !PHONE_PATTERN.test(phone))
      nextErrors.phone = "Please enter a valid phone number.";
    if (!email || !EMAIL_PATTERN.test(email))
      nextErrors.email = "Please enter a valid email address.";
    if (!address) nextErrors.address = "Please enter the property address.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      service: showServiceChips ? service : "roofing",
      name,
      phone,
      email,
      address,
      message,
    };

    // TODO: wire to lead backend
    console.log("Estimate form submission:", payload);

    setSubmitted(true);
    e.currentTarget.reset();
  }

  const inputClasses = isRedesign
    ? "w-full rounded-xl border border-sand-200 bg-sand-50 p-[15px] text-[15px] text-graphite-900 placeholder:text-placeholder focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
    : "w-full rounded-input border border-line bg-paper px-4 py-3.5 font-body text-sm text-text placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

  const errorClasses = isRedesign
    ? "mt-1.5 text-[13px] text-brand-700"
    : "mt-1.5 font-body text-xs text-accent";

  if (isRedesign && submitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-[22px] bg-sand-100 p-[34px] text-center">
        <div className="grid size-12 place-items-center rounded-full bg-brand-500">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 12.5 9.5 17 19 6.5"
              stroke="#fff"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p role="status" className="text-lg font-bold text-graphite-900">
          We&rsquo;ve got it — expect a call within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        isRedesign
          ? "rounded-[22px] border border-sand-200 bg-white p-[34px] shadow-panel"
          : "rounded-card border border-line border-l-[3px] border-l-accent p-6 sm:p-10"
      }
    >
      {isRedesign && (
        <div className="mb-4 flex items-center gap-3">
          <Image
            src="/logo-full.png"
            alt=""
            width={1448}
            height={1086}
            className="h-[38px] w-auto"
          />
          <span className="h-7 w-px bg-sand-200" aria-hidden="true" />
          <span className="text-sm font-bold uppercase tracking-[0.1em] text-sand-500">
            Free estimate
          </span>
        </div>
      )}

      {showServiceChips && !isRedesign && (
        <>
          <div className="mb-3 font-body text-[13px] font-semibold text-muted">
            WHICH SERVICE DO YOU NEED?
          </div>
          <div className="mb-7 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Service type">
            {SERVICE_TYPE_OPTIONS.map((opt) => {
              const isActive = service === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setService(opt.key)}
                  className={cn(
                    "rounded-pill px-5 py-2.5 font-body text-[13px] font-semibold",
                    isActive
                      ? "border border-accent bg-accent text-white"
                      : "border border-line bg-transparent text-text"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className={isRedesign ? "flex flex-col gap-4" : undefined}
      >
        {isRedesign ? (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="First name"
                  className={inputClasses}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className={errorClasses}>
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  className={inputClasses}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className={errorClasses}>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="sr-only">
                Property address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Street address in PA or NJ"
                className={inputClasses}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "address-error" : undefined}
              />
              {errors.address && (
                <p id="address-error" className={errorClasses}>
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                className={inputClasses}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className={errorClasses}>
                  {errors.email}
                </p>
              )}
            </div>

            {showServiceChips && (
              <div className="flex gap-2.5" role="radiogroup" aria-label="Service type">
                {HOME_REDESIGN_SERVICE_TYPE_OPTIONS.map((opt) => {
                  const isActive = service === opt.key;
                  return (
                    <div key={opt.key} className="flex-1">
                      <input
                        type="radio"
                        id={`service-type-${opt.key}`}
                        name="serviceType"
                        value={opt.key}
                        checked={isActive}
                        onChange={() => setService(opt.key)}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`service-type-${opt.key}`}
                        className={cn(
                          "block cursor-pointer rounded-full border py-3 text-center text-sm font-bold peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/15",
                          isActive
                            ? "border-brand-500 bg-brand-50 text-brand-700"
                            : "border-sand-200 text-sand-600"
                        )}
                      >
                        {opt.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}

            <div>
              <label htmlFor="message" className="sr-only">
                Project description
              </label>
              <textarea
                id="message"
                name="message"
                placeholder={projectPlaceholder}
                rows={4}
                className={cn(inputClasses, "h-[84px] resize-y")}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-500 py-[19px] text-[17px] font-bold text-white shadow-home-cta transition-colors hover:bg-brand-600"
            >
              {submitLabel}
            </button>

            <p className="text-center text-[13px] text-sand-500">
              We reply in about 2 hours, 7 days a week. No spam.
            </p>
          </>
        ) : (
          <>
            <div className="mb-[18px] grid grid-cols-1 gap-[18px] md:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  className={inputClasses}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 font-body text-xs text-accent">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  className={inputClasses}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1.5 font-body text-xs text-accent">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className={inputClasses}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 font-body text-xs text-accent">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="address" className="sr-only">
                  Property address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Property address"
                  className={inputClasses}
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? "address-error" : undefined}
                />
                {errors.address && (
                  <p id="address-error" className="mt-1.5 font-body text-xs text-accent">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>

            <label htmlFor="message" className="sr-only">
              Project description
            </label>
            <textarea
              id="message"
              name="message"
              placeholder={projectPlaceholder}
              rows={4}
              className={cn(inputClasses, "mb-[22px] resize-y")}
            />

            <button
              type="submit"
              className="w-full rounded-pill bg-accent px-4 py-[18px] font-body text-[15px] font-bold text-white transition-[filter] duration-150 ease-out hover:brightness-95"
            >
              {submitLabel}
            </button>

            <p className="mt-4 text-center font-body text-xs leading-[1.6] text-muted">
              By submitting this form, you agree to be contacted about your
              project. We respect your privacy — see our{" "}
              <Link href="/privacy" className="font-semibold text-accent underline">
                Privacy Policy
              </Link>
              .
            </p>

            {submitted && (
              <p role="status" className="mt-4 text-center font-body text-sm font-semibold text-accent">
                Thanks! We&rsquo;ll be in touch shortly to schedule your free estimate.
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
}
