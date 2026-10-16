import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function Login() {
  if (await getAdmin()) redirect("/dashboard");

  return (
    <main className="mx-auto flex min-h-screen max-w-[400px] flex-col justify-center px-6">
      <p className="text-[16px] font-semibold tracking-[-0.03em]">✦ usufdev</p>
      <h1 className="mt-6 text-[28px] font-semibold tracking-[-0.03em]">
        Sign in to the dashboard
      </h1>
      <p className="mb-8 mt-1 text-foreground/60">
        Edit startups, essays and photos on usufdev.com.
      </p>
      <LoginForm />
    </main>
  );
}
