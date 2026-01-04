import { User } from "@/lib/generated/prisma/client";

export function SidebarUserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </div>
  );
}
