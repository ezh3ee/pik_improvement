"use client";

import { signOut } from "@/app/(protected)/action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

export function LogoutButton() {
  const [isLoading, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      onClick={async (e) => {
        e.preventDefault();
        startTransition(() => signOut());
      }}
    >
      <LogOut />
      {isLoading ? (
        <div className="pl-7">
          <Spinner className="size-5" />
        </div>
      ) : (
        "Выйти из аккаунта"
      )}
    </DropdownMenuItem>
  );
}
