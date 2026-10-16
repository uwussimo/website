"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import type { Field, Row } from "@/lib/admin/resources";
import type { FormState } from "../actions";
import { FieldRow, type FieldContext } from "./fields";
import { primaryButton, submitWithoutReset } from "./ui";

export function RecordForm({
  fields,
  record,
  action,
  siteHref,
  context,
  saveLabel,
}: {
  fields: Field[];
  record: Row | null;
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  siteHref: string | null;
  context?: FieldContext;
  /** what the save button says */
  saveLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });
  // "unsaved" means something changed after the last successful save
  const [changedAt, setChangedAt] = useState(0);
  const dirty = changedAt > (state.savedAt ?? 0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  // live values, so a slug can follow the name as it's typed
  const [values, setValues] = useState<Record<string, unknown>>(() =>
    record ? { ...record } : { published: true },
  );
  const lastSaved = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (state.savedAt && state.savedAt !== lastSaved.current) {
      lastSaved.current = state.savedAt;
      toast.success("Saved. The site is updated.");
    }
    if (state.error) {
      toast.error(state.error);
      document.querySelector<HTMLElement>(`[name="${state.field}"]`)?.focus();
    }
  }, [state]);

  // leaving with unsaved changes asks first
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const sections = [...new Set(fields.map((f) => f.section))];
  const advancedOnly = (section: string) =>
    fields.filter((f) => f.section === section).every((f) => f.advanced);

  return (
    <form
      onSubmit={submitWithoutReset(formAction)}
      onChange={() => setChangedAt(Date.now())}
      onKeyDown={(e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "s") {
          e.preventDefault();
          e.currentTarget.requestSubmit();
        }
      }}
      className="mt-8 space-y-6"
    >
      {sections.map((section) => {
        const hidden = advancedOnly(section) && !showAdvanced;
        return (
          <section
            key={section}
            hidden={hidden}
            className="rounded-2xl border border-border p-5 sm:p-6"
          >
            <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground/45">
              {section}
            </h2>
            <div className="space-y-5">
              {fields
                .filter((f) => f.section === section)
                .map((field) => (
                  <FieldRow
                    key={field.name}
                    field={field}
                    value={values[field.name]}
                    values={values}
                    invalid={state.field === field.name}
                    error={
                      state.field === field.name
                        ? (state.error ?? undefined)
                        : undefined
                    }
                    onChange={(name, value) => {
                      setValues((v) => ({ ...v, [name]: value }));
                      setChangedAt(Date.now());
                    }}
                    context={context}
                  />
                ))}
            </div>
          </section>
        );
      })}
      {!showAdvanced && fields.some((f) => f.advanced) && (
        <button
          type="button"
          onClick={() => setShowAdvanced(true)}
          className="text-[14px] font-medium text-foreground/55 hover:text-foreground"
        >
          More options ↓
        </button>
      )}

      {/* the save bar stays in reach however long the form is */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[720px] items-center justify-between gap-4 px-5 py-3 md:pl-[280px] md:pr-10 lg:px-5">
          <p className="text-[13px] text-foreground/55">
            {pending
              ? "Saving…"
              : dirty
                ? "Unsaved changes"
                : record
                  ? "All changes saved"
                  : "Not saved yet"}
          </p>
          <div className="flex items-center gap-3">
            {siteHref && (
              <a
                href={siteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1 text-[14px] font-medium text-foreground/70 hover:text-foreground sm:inline-flex"
              >
                View on site
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
              </a>
            )}
            <button type="submit" disabled={pending} className={primaryButton}>
              {pending
                ? "Saving…"
                : (saveLabel ?? (record ? "Save changes" : "Create"))}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
