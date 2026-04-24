"use server";

import { subobjectSchema } from "@/components/objects-management/subobjects/schema";
import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { prismaKnownError } from "@/lib/server-utils";

const subObjectInclude = {
  apartmentDetails: true,
  garageDetails: true,
  odhDetails: true,
} satisfies Prisma.SubObjectBaseInclude;

export type SubObjectFull = Prisma.SubObjectBaseGetPayload<{
  include: typeof subObjectInclude;
}>;

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
        geometry:
          typeof validatedFields.data.geometry === "string"
            ? validatedFields.data.geometry
            : JSON.stringify(validatedFields.data.geometry),
        complexId: validatedFields.data.complexId,
        buildAddress: validatedFields.data.buildAddress,
        postAddress: validatedFields.data.postAddress,
        payer: validatedFields.data.payer,
      },
    });

    return subobject;
  } catch (e) {
    console.error("Error adding subobject ", e);
    prismaKnownError(e);

    throw "Нельзя добавить объект"; // TODO: add error handling
  }
}

export async function editSubobjectAction(id: string, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = subobjectSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    throw new Error("Ошибки валидации");
  }

  try {
    const subobject = await prisma.subObjectBase.update({
      where: {
        id: id,
      },
      data: {
        name: validatedFields.data.name,
        type: validatedFields.data.type,
        geometry:
          typeof validatedFields.data.geometry === "string"
            ? validatedFields.data.geometry
            : JSON.stringify(validatedFields.data.geometry),
      },
    });
    return subobject;
  } catch (e) {
    console.error("Error editing subobject ", e);
    prismaKnownError(e);

    throw "Нельзя редактировать объект";
  }
}

export async function fetchSubobjectsAction(complexId: string) {
  try {
    const subobjects = await prisma.subObjectBase.findMany({
      where: {
        complexId: complexId,
      },
      include: subObjectInclude,
    });

    return subobjects;
  } catch (e) {
    console.error("Error fetching subobjects ", e);
    prismaKnownError(e);

    throw "У комплекса нет объектов"; // TODO: add error handling
  }
}

export async function fetchSubobject(id: string) {
  try {
    const subobject = await prisma.subObjectBase.findFirst({
      where: {
        id: id,
      },
      include: subObjectInclude,
    });

    return subobject;
  } catch (e) {
    console.error("Error fetching subobject ", e);
    prismaKnownError(e);

    throw "Объект не найден"; // TODO: add error handling
  }
}
