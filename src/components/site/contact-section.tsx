import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Mail, Phone, Loader2 } from "lucide-react";
import { submitContact } from "@/lib/contact.functions";
import { Container, buttonStyles } from "@/components/site/primitives";
import { pageCopy, type Locale } from "@/lib/i18n";

export const INTEREST_EVENT = "ds:select-interest";

export const interestOptions = [
  "Build your product",
  "Extend your team",
  "Improve your platform",
  "Something else",
];

const formSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(10, "Please tell us a little about your project or team need."),
});

type FormData = z.infer<typeof formSchema>;

const labelClass = "block text-sm font-semibold text-[var(--ds-text)]";
const inputClass =
  "mt-2 block min-h-12 w-full rounded-[var(--ds-radius-control)] border border-[var(--ds-control-border)] bg-white px-4 py-3 text-base text-[var(--ds-text)] placeholder:text-[var(--ds-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-focus)]";

export function ContactSection({ locale = "en" }: { locale?: Locale }) {
  const copy = pageCopy[locale].contact;
  const sendMessage = useServerFn(submitContact);
  const [status, setStatus] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", interest: "", message: "" },
  });

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail) setValue("interest", detail);
    };
    window.addEventListener(INTEREST_EVENT, handler);
    return () => window.removeEventListener(INTEREST_EVENT, handler);
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    setStatus("Sending your message…");
    try {
      await sendMessage({ data });
      setStatus("Message sent. We'll be in touch shortly.");
      toast.success("Thanks — your message has been sent.");
      reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setStatus(`Message not sent. ${message}`);
      toast.error(message);
    }
  };

  return (
    <section
      id="contact"
      className="on-navy ds-section scroll-mt-24"
      style={{ backgroundColor: "var(--ds-inverse-surface)" }}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="ds-eyebrow" style={{ color: "var(--ds-inverse-link)" }}>
              {copy.eyebrow}
            </p>
            <h2 className="ds-heading mt-3" style={{ color: "var(--ds-inverse-text)" }}>
              {copy.title}
            </h2>
            <p
              className="ds-lead ds-measure mt-4"
              style={{ color: "var(--ds-inverse-secondary)" }}
            >
              {copy.body}
            </p>

            <ul className="mt-10 space-y-6" style={{ color: "var(--ds-inverse-secondary)" }}>
              <li className="flex items-start gap-4">
                <MapPin
                  className="mt-0.5 h-6 w-6 shrink-0"
                  style={{ color: "var(--ds-inverse-icon)" }}
                  aria-hidden="true"
                />
                <span className="leading-relaxed">Casablanca, Morocco</span>
              </li>
              <li className="flex items-start gap-4">
                <Mail
                  className="mt-0.5 h-6 w-6 shrink-0"
                  style={{ color: "var(--ds-inverse-icon)" }}
                  aria-hidden="true"
                />
                <a
                  href="mailto:contact@digitalsquad.ma"
                  className="underline underline-offset-4 transition-colors hover:text-[var(--ds-inverse-link)] focus-visible:text-[var(--ds-inverse-link)]"
                >
                  contact@digitalsquad.ma
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Phone
                  className="mt-0.5 h-6 w-6 shrink-0"
                  style={{ color: "var(--ds-inverse-icon)" }}
                  aria-hidden="true"
                />
                <a
                  href="tel:+212625291897"
                  className="underline underline-offset-4 transition-colors hover:text-[var(--ds-inverse-link)] focus-visible:text-[var(--ds-inverse-link)]"
                >
                  +212 625 29 18 97
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div
              className="rounded-[var(--ds-radius-card)] border bg-white p-6 sm:p-8"
              style={{ borderColor: "var(--ds-border)" }}
            >
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    {copy.name}
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm" style={{ color: "var(--ds-error)" }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    {copy.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm" style={{ color: "var(--ds-error)" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className={labelClass}>
                    {copy.company} <span className="font-normal text-[var(--ds-text-secondary)]">({copy.optional})</span>
                  </label>
                  <input
                    id="company"
                    autoComplete="organization"
                    className={inputClass}
                    {...register("company")}
                  />
                </div>

                <div>
                  <label htmlFor="interest" className={labelClass}>
                    {copy.interest}{" "}
                    <span className="font-normal text-[var(--ds-text-secondary)]">({copy.optional})</span>
                  </label>
                  <select id="interest" className={inputClass} {...register("interest")}>
                    <option value="">{copy.select}</option>
                    {interestOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    {copy.need}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={inputClass}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-2 text-sm"
                      style={{ color: "var(--ds-error)" }}
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
                  <button type="submit" disabled={isSubmitting} className={buttonStyles.primary}>
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                    {isSubmitting ? copy.sending : copy.send}
                  </button>
                  <p className="text-sm text-[var(--ds-text-secondary)]">
                    {copy.or}{" "}
                    <a
                      href="mailto:contact@digitalsquad.ma"
                      className="underline underline-offset-4"
                      style={{ color: "var(--ds-link)" }}
                    >
                      contact@digitalsquad.ma
                    </a>
                  </p>
                </div>

                <p aria-live="polite" role="status" className="sr-only sm:col-span-2">
                  {status}
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
