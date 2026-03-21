"use server";

import { subobjectSchema } from "@/components/objects-creation/subobjects-add-form/schema";
import prisma from "@/lib/prisma";
import { prismaKnownError } from "@/lib/server-utils";

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
        type: validatedFields.data.type,
        geometry: JSON.stringify(validatedFields.data.geometry),
        residentialComplexId: validatedFields.data.complexId,
      },
    });

    return subobject;
  } catch (e) {
    console.error("Error adding subobject ", e);
    prismaKnownError(e);

    throw "Нельзя добавить объект"; // TODO: add error handling
  }
}

export async function fetchSubobjectsAction(complexId: string) {
  try {
    const subobjects = await prisma.subObjectBase.findMany({
      where: {
        residentialComplexId: complexId,
      },
    });

    return subobjects;
  } catch (e) {
    console.error("Error fetching subobjects ", e);
    prismaKnownError(e);

    throw "У комплекса нет объектов"; // TODO: add error handling
  }
}
