"use client";

import { useState } from "react";
import { dangerButton, quietButton } from "./ui";

/** Delete needs two clicks, with the consequence spelled out in between. */
export function DangerZone({
  name,
  singular,
  action,
}: {
  name: string;
  singular: string;
  action: () => Promise<void>;
}) {
  const [arming, setArming] = useState(false);

  return (
    <section className="mt-16 border-t border-border pt-8">
      {!arming ? (
        <button
          type="button"
          onClick={() => setArming(true)}
          className="text-[13px] font-medium text-foreground/50 hover:text-destructive"
        >
          Delete this {singular}…
        </button>
      ) : (
        <form
          action={action}
          className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5"
        >
          <p className="font-medium">Delete “{name}”?</p>
          <p className="mt-1 text-[14px] text-foreground/65">
            It disappears from the site right away, along with its photos. This
            can&apos;t be undone.
          </p>
          <div className="mt-4 flex gap-2">
            <button type="submit" className={dangerButton}>
              Yes, delete it
            </button>
            <button
              type="button"
              onClick={() => setArming(false)}
              className={quietButton}
            >
              Keep it
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
