"use client";

import { useActionState } from "react";
import { updatePassword } from "../../actions";
import {
  inputClass,
  labelClass,
  primaryButton,
  submitWithoutReset,
} from "../../_components/ui";

const FIELDS = [
  {
    name: "current",
    label: "Current password",
    autoComplete: "current-password",
  },
  {
    name: "next",
    label: "New password",
    autoComplete: "new-password",
    help: "At least 12 characters.",
  },
  { name: "again", label: "New password again", autoComplete: "new-password" },
];

export function PasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, {
    error: null,
  });
  return (
    <form
      onSubmit={submitWithoutReset(action)}
      className="mt-8 space-y-5 rounded-2xl border border-border p-6"
    >
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className={labelClass}>
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type="password"
            autoComplete={f.autoComplete}
            required
            aria-invalid={state.field === f.name || undefined}
            className={inputClass}
          />
          {state.field === f.name ? (
            <p
              role="alert"
              className="mt-1.5 text-[13px] font-medium text-destructive"
            >
              {state.error}
            </p>
          ) : (
            f.help && (
              <p className="mt-1.5 text-[13px] text-foreground/55">{f.help}</p>
            )
          )}
        </div>
      ))}
      {state.error && !state.field && (
        <p role="alert" className="text-[13px] font-medium text-destructive">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Changing…" : "Change password"}
      </button>
    </form>
  );
}
