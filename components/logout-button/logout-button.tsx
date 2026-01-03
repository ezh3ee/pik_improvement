"use client";

import { signOut } from "@/app/(protected)/action";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function LogoutButton() {
  const [isLoading, startTransition] = useTransition();

  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        startTransition(() => signOut());
      }}
    >
      {isLoading ? <Spinner className="size-8" /> : "Выйти из аккаунта"}
    </Button>
  );
}
