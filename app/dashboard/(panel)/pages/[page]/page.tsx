import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { getSettingsPage } from "@/lib/admin/settings-forms";
import type { Row } from "@/lib/admin/resources";
import { getAllPhotos, getSettings } from "@/lib/content";
import type { SettingGroup } from "@/lib/settings";
import { saveSettings } from "../../../actions";
import { Notice } from "../../../_components/notice";
import { RecordForm } from "../../../_components/record-form";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  await requireAdmin();
  const page = getSettingsPage((await params).page);
  if (!page) notFound();
  const [settings, photos] = await Promise.all([getSettings(), getAllPhotos()]);
  const values = settings[page.key as SettingGroup] as Record<string, unknown>;

  return (
    <div className="mx-auto max-w-[720px] pb-28">
      <Suspense>
        <Notice />
      </Suspense>
      <h1 className="text-[28px] font-semibold tracking-[-0.03em]">
        {page.label}
      </h1>
      <p className="mt-1 text-foreground/60">{page.description}</p>
      <RecordForm
        fields={page.fields}
        record={{ id: page.key, ...values } as Row}
        action={saveSettings.bind(null, page.key)}
        siteHref={page.siteHref}
        context={{ photos }}
        saveLabel="Save changes"
      />
    </div>
  );
}
