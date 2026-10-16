"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

/**
 * Turns `?created=1`, `?deleted=<title>` and `?photos=<n>` in the address
 * into a toast, then removes them so a reload doesn't repeat it.
 */
export function Notice() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const created = params.get("created");
    const deleted = params.get("deleted");
    const photos = params.get("photos");
    if (!created && !deleted && !photos) return;
    if (created) toast.success("Created. It's on the site now.");
    if (deleted) toast.success(`Deleted “${deleted}”.`);
    if (photos) {
      const n = Number(photos);
      toast.success(n === 1 ? "Photo added." : `${n} photos added.`);
    }
    router.replace(window.location.pathname, { scroll: false });
  }, [params, router]);

  return null;
}
