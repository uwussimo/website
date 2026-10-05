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
          email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>
      {state.error && (
        <p role="alert" className="text-[14px] text-destructive">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "signing in…" : "sign in"}
      </button>
    </form>
  );
}
