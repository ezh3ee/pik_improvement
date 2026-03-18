import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import DbError from "@/app/(protected)/db-error";
import { UserProvider } from "@/app/providers/user-context";
import { Breadcrumbs } from "@/components/breadcrumbs/breadcrumbs";
import { AppSidebar } from "@/components/nav/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { mapSession } from "@/lib/auth/map-session";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session;

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (e) {
    console.error(e);
    return <DbError />;
  }

  if (!session) redirect("/login");
  if (!session.user.active) redirect("/pending");

  const user = mapSession(session.user);

  return (
    <UserProvider user={user}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumbs />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
