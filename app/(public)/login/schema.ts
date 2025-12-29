import * as z from "zod";

export const SigninSchema = z.object({
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
  username: z
    .string()
    .min(3, "Имя пользователя должно быть не менее 3 символов"),
});
