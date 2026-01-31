import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/auth";
import { AlertCircleIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Pending() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user?.active) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Alert>
          <AlertCircleIcon />
          <AlertTitle>
            Уважаемый(я) {session?.user?.name}
            {session?.user?.patronymic && " "}
            {session?.user?.patronymic},
          </AlertTitle>
          <AlertDescription>
            <p className="text-sm text-gray-700">
              Ваш аккаут еще не активирован. Если процесс активации занимает
              дольше 3-х рабочих дней, пожалуйста:
            </p>
            <ul className="list-inside list-disc text-sm gap-2 flex flex-col">
              <li>
                Убедитесь, что Вы являетесь действующим сотрудником компании ООО
                &quot;ПИК КОМФОРТ&quot;
              </li>
              <li>
                Напишите в поддержку по адресу{" "}
                <a href="#">pic-comfort-system@yandex.ru</a>
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
