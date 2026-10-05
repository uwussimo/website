import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function Login() {
  if (await getAdmin()) redirect("/dashboard");

  return (
    <main className="mx-auto flex min-h-screen max-w-[380px] flex-col justify-center px-6">
      <p className="font-serif text-[22px] leading-none">✦ usufdev</p>
      <h1 className="heading-serif mb-8 mt-4">
        <em>dashboard</em>
      </h1>
      <LoginForm />
    </main>
  );
}
