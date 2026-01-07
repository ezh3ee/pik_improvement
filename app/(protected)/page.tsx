"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTransition } from "react";
import { signOut } from "./action";

export default function Home() {
  const [isLoading, startTransition] = useTransition();

  return (
    <div>
      <h1>Тут админка</h1>
      <Button
        disabled={isLoading}
        onClick={async () => {
          startTransition(() => signOut());
        }}
      >
        {isLoading ? <Spinner className="size-8" /> : "Выйти из аккаунта"}
      </Button>
    </div>
  );
}
