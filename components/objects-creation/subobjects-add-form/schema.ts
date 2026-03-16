import { z } from "zod";

export const subobjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Название объекта должно быть не менее 3-х символов")
    .nonempty("Название не может быть пустым"),
});
