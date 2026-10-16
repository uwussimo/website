import { startTransition } from "react";

// shared class names for dashboard forms
export const inputClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-foreground/35 focus:border-foreground/40 focus:ring-[3px] focus:ring-foreground/5 aria-[invalid=true]:border-destructive";

export const labelClass =
  "mb-1.5 block text-[13px] font-semibold tracking-[-0.01em]";

export const helpClass = "mt-1.5 text-[13px] leading-snug text-foreground/55";

export const primaryButton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-[15px] font-semibold tracking-[-0.02em] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50";

export const quietButton =
  "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-[14px] font-medium tracking-[-0.02em] text-foreground transition-colors hover:bg-surface-strong disabled:opacity-50";

export const dangerButton =
  "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-destructive px-4 text-[14px] font-semibold tracking-[-0.02em] text-white transition-opacity hover:opacity-85 disabled:opacity-50";

export const iconButton =
  "inline-flex size-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-surface-strong hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent";

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
