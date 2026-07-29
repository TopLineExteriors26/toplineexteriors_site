"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SERVICE_TYPE_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/cn";

type EstimateFormProps = {
  showServiceChips?: boolean;
  projectPlaceholder?: string;
  submitLabel?: string;
};

type FormErrors = Partial<Record<"name" | "phone" | "email" | "address", string>>;

const PHONE_PATTERN = /^[\d\s()+-]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EstimateForm({
  showServiceChips = false,
  projectPlaceholder = "Tell us about your project…",
  submitLabel = "Request My Free Estimate",
}: EstimateFormProps) {
  const [service, setService] = useState<string>("roofing");
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

  const inputClasses =
    "w-full rounded-input border border-line bg-paper px-4 py-3.5 font-body text-sm text-text placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <div className="rounded-card border border-line p-6 shadow-card sm:p-10">
      {showServiceChips && (
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

      <form onSubmit={handleSubmit} noValidate>
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
      </form>
    </div>
  );
}
