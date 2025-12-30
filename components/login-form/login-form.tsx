"use client";
import { signinAction, signinFormState } from "@/app/(public)/login/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn, dataObjectToFormData } from "@/lib/utils";
import Link from "next/link";
import { useActionState, useTransition } from "react";
import { PIKLogo } from "../logo";
import "./login-form.scss";

import { SigninSchema } from "@/app/(public)/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { AnimatePresence, motion } from "motion/react";

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

  const MotionFieldError = motion.create(FieldError);

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
                    <div className="min-h-[1px] overflow-hidden">
                      <AnimatePresence mode="wait">
                        {fieldState.invalid && (
                          <MotionFieldError
                            errors={[fieldState.error]}
                            key="field-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              display: "none",
                              visibility: "hidden",
                            }}
                            transition={{
                              type: "tween",
                              duration: 0.2,
                              stiffness: 100,
                              damping: 20,
                              ease: "backOut",
                            }}
                            className="overflow-hidden"
                          />
                        )}
                      </AnimatePresence>
                    </div>

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
                    <Input
                      id="password"
                      type="password"
                      placeholder="Пароль"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />

                    <div className="min-h-[1px] overflow-hidden">
                      <AnimatePresence mode="wait">
                        {fieldState.invalid && (
                          <MotionFieldError
                            errors={[fieldState.error]}
                            key="field-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              display: "none",
                              visibility: "hidden",
                            }}
                            transition={{
                              type: "tween",
                              duration: 0.2,
                              stiffness: 100,
                              damping: 20,
                              ease: "backOut",
                            }}
                            className="overflow-hidden"
                          />
                        )}
                      </AnimatePresence>
                    </div>

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
