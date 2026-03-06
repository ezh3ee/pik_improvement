import { z } from "zod";

export const complexSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Название ЖК должно быть не менее 3-х символов")
    .nonempty("Название не может быть пустым"),
});
