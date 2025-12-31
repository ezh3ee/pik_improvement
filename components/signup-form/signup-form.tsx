"use client";
import { signupAction, SignupFormState } from "@/app/(public)/signup/action";
import { SignupSchema } from "@/app/(public)/signup/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dataObjectToFormData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { InputFieldError } from "../errors/input-field";
import { PIKLogo } from "../logo";
import { Spinner } from "../ui/spinner";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const initialSignupState: SignupFormState = {
    message: null,
    errors: {},
    success: false,
  };
  const [signupFormState, signupSubmit] = useActionState(
    signupAction,
    initialSignupState
  );

  const [isPending, startTransition] = useTransition();

  const SignupSchemaRHF = SignupSchema.extend({
    confirmPassword: z
      .string()
      .min(8, "Пароль должен содержать не менее 8 символов")
      .refine((s) => !s.includes(" "), "Пароль не может содержать пробелов")
      .nonempty("Пароль не может быть пустым"),
  }).superRefine((val, ctx) => {
    console.log("superdefine is working ", val);
    if (val.password !== val.confirmPassword) {
      console.log("password and confirm password are not the same");
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is not the same as confirm password",
        path: ["confirmPassword"],
      });
    }
  });

  const form = useForm<z.infer<typeof SignupSchemaRHF>>({
    resolver: zodResolver(SignupSchemaRHF),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof SignupSchemaRHF>) {
    startTransition(() => {
      signupSubmit(dataObjectToFormData(data));
    });
  }

  return (
    <Card {...props}>
      <div className="flex flex-row justify-center">
        <PIKLogo />
      </div>
      <CardHeader>
        <CardTitle>Регистрация пользователя</CardTitle>
        <CardDescription>
          После регистрации пользователя необходимо дождаться одобрения со
          стороны администратора.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">
                    Имя <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Иван"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />

                  <InputFieldError fieldState={fieldState} />

                  {signupFormState.errors?.name && (
                    <p className="text-red-700">
                      {signupFormState.errors.name}
                    </p>
                  )}
                </Field>
              )}
            />

            {/* surname */}
            <Controller
              name="surname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="surname">
                    Фамилия <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="surname"
                    type="text"
                    placeholder="Иванов"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />

                  <InputFieldError fieldState={fieldState} />

                  {signupFormState.errors?.surname && (
                    <p className="text-red-700">
                      {signupFormState.errors.surname}
                    </p>
                  )}
                </Field>
              )}
            />

            {/* patronymic */}
            <Controller
              name="patronymic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="patronymic">Отчество</FieldLabel>
                  <Input
                    id="patronymic"
                    type="text"
                    placeholder="Иванович"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />

                  <InputFieldError fieldState={fieldState} />

                  {signupFormState.errors?.patronymic && (
                    <p className="text-red-700">
                      {signupFormState.errors.patronymic}
                    </p>
                  )}
                </Field>
              )}
            />

            {/* email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="email"
                    type="text"
                    placeholder="mail@yandex.ru"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />

                  <InputFieldError fieldState={fieldState} />

                  {signupFormState.errors?.email && (
                    <p className="text-red-700">
                      {signupFormState.errors.email}
                    </p>
                  )}
                </Field>
              )}
            />

            {/* position */}
            <Controller
              name="positionId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="position">
                    Должность <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите должность" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="64bc94f9-a913-40e4-9e57-2621dc702e19">
                        Инженер
                      </SelectItem>
                      <SelectItem value="design">Подрядчик</SelectItem>
                      <SelectItem value="worker">Рабочий</SelectItem>
                      <SelectItem value="office">Офис</SelectItem>
                    </SelectContent>
                  </Select>

                  <InputFieldError fieldState={fieldState} />

                  {signupFormState.errors?.position && (
                    <p className="text-red-700">
                      {signupFormState.errors.position}
                    </p>
                  )}
                </Field>
              )}
            />

            {/* username */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="username">
                    Имя пользователя <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="ivan_ivanov"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />

                  <InputFieldError fieldState={fieldState} />

                  {signupFormState.errors?.username && (
                    <p className="text-red-700">
                      {signupFormState.errors.username}
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
                  <FieldLabel htmlFor="password">
                    Пароль <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />

                  <InputFieldError fieldState={fieldState} />

                  {signupFormState.errors?.password && (
                    <p className="text-red-700">
                      {signupFormState.errors.password}
                    </p>
                  )}
                </Field>
              )}
            />

            {/* confirm-password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Подтвердите пароль <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Пароль"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />

                  <InputFieldError fieldState={fieldState} />
                </Field>
              )}
            />
            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending ? <Spinner className="size-8" /> : "Регистрация"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Уже есть аккаунт? <Link href="/login">Войдите</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>

          {signupFormState.message && !signupFormState.success && (
            <p className="mt-2 text-sm text-red-500">
              {signupFormState.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
