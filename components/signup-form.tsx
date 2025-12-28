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
import { PIKLogo } from "./logo";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <div className="flex flex-row justify-center">
        <PIKLogo />
      </div>
      <CardHeader>
        <CardTitle>Регистрация пользователя</CardTitle>
        <CardDescription>
          Внимание. После регистрации пользователя необходимо дождаться
          одобрения со стороны администратора.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">
                Имя <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Иван"
                required
              />
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
                required
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
                type="email"
                name="email"
                placeholder="mail@yandex.ru"
                required
              />
              <FieldDescription>
                Почтовый ящик используется для восстановления пароля.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>
                Должность <span className="text-red-500">*</span>
              </FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите должность" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Инженер</SelectItem>
                  <SelectItem value="design">Подрядчик</SelectItem>
                  <SelectItem value="worker">Рабочий</SelectItem>
                  <SelectItem value="office">Офис</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input id="password" type="password" name="password" required />
              <FieldDescription>
                Пароль должен состоять не менее из 8 символов.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Подтвердите пароль
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Регистрация</Button>
                <FieldDescription className="px-6 text-center">
                  Уже есть аккаунт? <Link href="#">Войдите</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
