"use client";
import { signinAction, signinFormState } from "@/app/(public)/login/action";
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
import { cn, dataObjectToFormData } from "@/lib/utils";
import Link from "next/link";
import { useActionState, useState, useTransition } from "react";
import { PIKLogo } from "../logo";
import "./login-form.scss";

import { SigninSchema } from "@/app/(public)/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Eye, EyeOff } from "lucide-react";
import { InputFieldError } from "../errors/input-field";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const initialSigninState: signinFormState = {
    message: null,
    errors: {},
    success: false,
  };
  const [signinFormState, submitSignin] = useActionState(
    signinAction,
    initialSigninState
  );

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof SigninSchema>) {
    startTransition(() => {
      submitSignin(dataObjectToFormData(data));
    });
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-center">
            <PIKLogo />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* username */}
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="username">Имя пользователя</FieldLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Пользователь"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />

                    <InputFieldError fieldState={fieldState} />

                    {signinFormState.errors?.username && (
                      <p className="text-red-700">
                        {signinFormState.errors.username}
                      </p>
                    )}
                  </Field>
                )}
              />
              {/* password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
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
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Пароль"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      <Button
                        className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <InputFieldError fieldState={fieldState} />

                    {signinFormState.errors?.password && (
                      <p className="mt-2 text-sm text-red-500">
                        {signinFormState.errors.password}
                      </p>
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button
                  type="submit"
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending ? <Spinner className="size-8" /> : "Войти"}
                </Button>
                <FieldDescription className="text-center">
                  Нет аккаута? <Link href="/signup">Зарегистрируйтесь</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>

            {signinFormState.message && !signinFormState.success && (
              <p className="mt-2 text-sm text-red-500">
                {signinFormState.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
