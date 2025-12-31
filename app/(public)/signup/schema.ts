import { z } from "zod";

export const SignupSchema = z.object({
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .refine((s) => !s.includes(" "), "Пароль не может содержать пробелов")
    .nonempty("Пароль не может быть пустым"),
  username: z
    .string()
    .min(3, "Имя пользователя должно быть не менее 3 символов")
    .refine(
      (s) => !s.includes(" "),
      "Имя пользователя не может содержать пробелов"
    )
    .nonempty("Имя пользователя не может быть пустым")
    .regex(
      /^[^А-Яа-яЁё\u0400-\u04FF]*$/,
      "Допускается использование только латинских букв, цифр и символов подчеркивания"
    ),
  email: z
    .email({ error: "Введите email в правильном формате" })
    .nonempty("Email не может быть пустым"),
  positionId: z.string().nonempty("Выберите должность"),
  name: z.string().nonempty("Имя не может быть пустым"),
  surname: z.string().nonempty("Фамилия не может быть пустой"),
  patronymic: z.string().optional(),
});
