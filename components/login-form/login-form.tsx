"use client";
import { signinAction, SigninFormState } from "@/app/(public)/login/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useActionState } from "react";
import { PIKLogo } from "../logo";
import "./login-form.scss";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const initialSigninState: SigninFormState = {
    message: null,
    errors: {},
    success: false,
  };
  const [signupState, formAction, isPending] = useActionState(
    signinAction,
    initialSigninState
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-center">
            <PIKLogo />
          </div>

          {/* <CardTitle className="flex-col">Войдите в свой аккаунт</CardTitle> */}
          {/* <CardDescription>
            Enter your email below to login to your account
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Ипя пользователя</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Пользователь"
                  required
                />
                {signupState.errors?.username && (
                  <p className="text-red-700">{signupState.errors.username}</p>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Забыли пароль?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  required
                />
                {signupState.errors?.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {signupState.errors.password}
                  </p>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Spinner className="size-8" /> : "Войти"}
                </Button>
                <FieldDescription className="text-center">
                  Нет аккаута? <Link href="/signup">Зарегистрируйтесь</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
            {/* {Object.keys(signupState.errors).length > 0 && (
              <p className="mt-2 text-sm text-red-500">
                Ошибки при заполнении.
              </p>
            )} */}

            {/* {signupState.message && signupState.success && (
              <p className="mt-2 text-sm text-green-500">
                {signupState.message}
              </p>
            )} */}

            {signupState.message && !signupState.success && (
              <p className="mt-2 text-sm text-red-500">{signupState.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
