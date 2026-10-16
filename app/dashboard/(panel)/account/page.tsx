import { requireAdmin } from "@/lib/auth";
import { PasswordForm } from "./password-form";

export default async function AccountPage() {
  const admin = await requireAdmin();
  return (
    <div className="mx-auto max-w-[520px]">
      <h1 className="text-[28px] font-semibold tracking-[-0.03em]">Account</h1>
      <p className="mt-1 text-foreground/60">
        Signed in as {admin.email}. Changing the password signs out every other
        device.
      </p>
      <PasswordForm />
    </div>
  );
}
