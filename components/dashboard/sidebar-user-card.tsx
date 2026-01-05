"use client";
import { useUser } from "@/app/providers/user-context";
import { AppUser } from "@/lib/auth/types/app-user";

export function SidebarUserCard() {
  const user: AppUser = useUser();

  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate font-medium">{user.surname}</span>
        {user.patronymic && (
          <span className="truncate font-medium">{user.patronymic}</span>
        )}
        <span className="truncate text-xs">{user.role}</span>
      </div>
    </div>
  );
}
