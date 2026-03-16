"use server";

import { subobjectSchema } from "@/components/objects-creation/subobjects-add-form/schema";
import prisma from "@/lib/prisma";

export async function addSubobjectAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = subobjectSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    throw new Error("Ошибки валидации");
  }

  try {
    const subobject = await prisma.subObjectBase.create({
      data: {
        name: validatedFields.data.name,
      },
    });

    return subobject;
  } catch (e) {
    console.error("Error adding subobject ", e);
    throw "Нельзя добавить объект"; // TODO: add error handling
  }
}
