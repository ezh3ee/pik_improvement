import { SignupForm } from "@/components/signup-form/signup-form";
import { redirectToDashboard } from "@/lib/redirects";

export default async function Page() {
  await redirectToDashboard();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
