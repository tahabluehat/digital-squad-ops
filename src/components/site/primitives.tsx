import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("ds-container", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("ds-measure", className)}>
      {eyebrow ? (
        <p
          className="ds-eyebrow"
          style={inverse ? { color: "var(--ds-inverse-link)" } : undefined}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="ds-heading mt-3"
        style={inverse ? { color: "var(--ds-inverse-text)" } : undefined}
      >
        {title}
      </h2>
      {description ? (
        <p
          className="ds-lead mt-4"
          style={inverse ? { color: "var(--ds-inverse-secondary)" } : undefined}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--ds-radius-control)] px-6 text-[0.9375rem] font-semibold transition-colors duration-[var(--ds-duration-normal)] ease-[var(--ds-ease)] disabled:cursor-not-allowed disabled:opacity-60";

export const buttonStyles = {
  primary: cn(base, "ds-btn-primary"),
  secondary: cn(base, "ds-btn-secondary"),
  inversePrimary: cn(base, "ds-btn-inverse-primary"),
  inverseSecondary: cn(base, "ds-btn-inverse-secondary"),
};
