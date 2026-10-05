import { startTransition } from "react";

// shared class names for dashboard forms
export const inputClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-[15px] text-foreground outline-none transition-colors focus:border-foreground/50";

export const labelClass = "mb-1.5 block text-[13px] font-semibold";

export const helpClass = "mt-1.5 text-[13px] text-foreground/60";

export const primaryButton =
  "rounded-full bg-primary px-5 py-2.5 text-[14px] font-bold leading-none text-primary-foreground transition-opacity hover:opacity-80 disabled:opacity-50";

export const quietButton =
  "rounded-full border border-border px-4 py-2 text-[13px] font-semibold leading-none text-foreground transition-colors hover:bg-secondary disabled:opacity-50";

/**
 * Submits a form through its action without react's automatic reset, so a
 * failed save keeps everything that was typed.
 */
export const submitWithoutReset =
  (action: (formData: FormData) => void) =>
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  };
