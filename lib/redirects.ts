import { auth } from "@/lib/auth";
import { START_DASHBOARD_URL } from "@/lib/redirect-urls";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function redirectToDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect(START_DASHBOARD_URL);
  }
}
