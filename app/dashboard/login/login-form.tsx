"use client";

import { useActionState } from "react";
import { login } from "../actions";
import {
  inputClass,
  labelClass,
  primaryButton,
  submitWithoutReset,
} from "../_components/ui";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, { error: null });

  return (
    <form onSubmit={submitWithoutReset(action)} className="space-y-5">
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          autoFocus
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? true : undefined}
          className={inputClass}
        />
        {state.error && (
          <p
            role="alert"
            className="mt-1.5 text-[13px] font-medium text-destructive"
          >
            {state.error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className={`${primaryButton} w-full`}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
