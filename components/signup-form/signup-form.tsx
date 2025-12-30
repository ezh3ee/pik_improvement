"use client";
import { signupAction, SignupFormState } from "@/app/(public)/signup/action";
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
import Link from "next/link";
import { useActionState } from "react";
import { PIKLogo } from "../logo";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const initialSignupState: SignupFormState = {
    message: null,
    errors: {},
    success: false,
  };
  const [signupState, signupSubmit, isPending] = useActionState(
    signupAction,
    initialSignupState
  );

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
        <form action={signupSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">
                Имя <span className="text-red-500">*</span>
              </FieldLabel>
              <Input id="name" type="text" name="name" placeholder="Иван" />
            </Field>
            <Field>
              <FieldLabel htmlFor="surname">
                Фамилия <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="surname"
                type="text"
                name="surname"
                placeholder="Иванов"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="patronymic">Отчество</FieldLabel>
              <Input
                id="patronymic"
                type="text"
                name="patronymic"
                placeholder="Иванович"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">
                Email <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="email"
                type="text"
                name="email"
                placeholder="mail@yandex.ru"
              />
              <FieldDescription>
                Почтовый ящик используется для восстановления пароля.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>
                Должность <span className="text-red-500">*</span>
              </FieldLabel>
              <Select name="position">
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
            </Field>
            <Field>
              <FieldLabel htmlFor="username">
                Имя пользователя <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="ivan_ivanov"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">
                Пароль <span className="text-red-500">*</span>
              </FieldLabel>
              <Input id="password" type="password" name="password" />
              <FieldDescription>
                Пароль должен состоять не менее из 8 символов.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Подтвердите пароль <span className="text-red-500">*</span>
              </FieldLabel>
              <Input id="confirm-password" type="password" />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Регистрация</Button>
                <FieldDescription className="px-6 text-center">
                  Уже есть аккаунт? <Link href="/login">Войдите</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
