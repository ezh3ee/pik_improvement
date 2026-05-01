"use server";

import { fullSubObjectSchema } from "@/components/objects-management/subobjects/schema";
import { Prisma, SubObjectType } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { prismaKnownError } from "@/lib/server-utils";

const subObjectInclude = {
  mkdDetails: true,
  garageDetails: true,
  odhDetails: true,
} satisfies Prisma.SubObjectBaseInclude;

export type SubObjectFull = Prisma.SubObjectBaseGetPayload<{
  include: typeof subObjectInclude;
}>;

export async function addSubobjectAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = fullSubObjectSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.issues[0].message);
  }

  const {
    type,
    name,
    geometry,
    complexId,
    buildAddress,
    postAddress,
    payer,
    ...rest
  } = validatedFields.data;

  try {
    const subobject = await prisma.subObjectBase.create({
      data: {
        name,
        type,
        geometry:
          typeof geometry === "string" ? geometry : JSON.stringify(geometry),
        complexId,
        buildAddress,
        postAddress,
        payer,

        ...(type === "MKD" && {
          mkdDetails: {
            create: { ...rest, parking: undefined, territory: undefined },
          },
        }),
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
  const validatedFields = fullSubObjectSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.issues[0].message);
  }

  const {
    type,
    name,
    geometry,
    buildAddress,
    postAddress,
    payer,
    complexId,
    ...rest
  } = validatedFields.data;

  try {
    const subobject = await prisma.$transaction(async (tx) => {
      const current = await tx.subObjectBase.findUniqueOrThrow({
        where: { id },
        select: { type: true },
      });

      if (type !== current.type) {
        await Promise.all([
          tx.mKD.deleteMany({ where: { subObjectBaseId: id } }),
          tx.garage.deleteMany({ where: { subObjectBaseId: id } }),
          tx.oDH.deleteMany({ where: { subObjectBaseId: id } }),
        ]);
      }

      await prisma.subObjectBase.update({
        where: {
          id: id,
        },
        data: {
          name,
          type,
          geometry:
            typeof geometry === "string" ? geometry : JSON.stringify(geometry),
          buildAddress,
          postAddress,
          payer,
        },
      });

      if (type === SubObjectType.MKD) {
        await tx.mKD.upsert({
          where: {
            subObjectBaseId: id,
          },
          create: {
            ...rest,
            subObjectBaseId: id,
            parking: undefined,
            territory: undefined,
          },
          update: { ...rest, parking: undefined, territory: undefined },
        });
      }

      return await tx.subObjectBase.findUniqueOrThrow({
        where: { id },
      });
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

export async function deleteSubobjectAction(id: string) {
  try {
    return await prisma.subObjectBase.delete({
      where: { id },
    });
  } catch (e) {
    console.error("Error deleting subobject ", e);
    prismaKnownError(e);

    throw "Нельзя удалить объект"; // TODO: add error handling
  }
}
