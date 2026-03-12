"use server";
import { complexSchema } from "@/components/objects-creation/residential-complex-add-form/schema";
import prisma from "@/lib/prisma";
import z from "zod";

export type complexState = {
  errors: {
    name?: string[];
  };
  message: string;
  success: boolean;
  complexId: string | null;
};

export async function addResidentialComplexAction(
  state: complexState,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = complexSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Ошибки при заполнении",
      success: false,
      complexId: null,
    };
  }

  try {
    const complex = await prisma.residentialComplex.create({
      data: {
        name: validatedFields.data.name,
      },
    });

    return {
      errors: {},
      message: "ЖК успешно добавлена",
      success: true,
      complexId: complex.id,
    };
  } catch (e) {
    console.error("Error adding residential complex ", e);
    throw "Нельзя добавить ЖК"; // TODO: add error handling
  }
}

export async function fetchResidentialComplexAction(id: string) {
  try {
    const complex = await prisma.residentialComplex.findUnique({
      where: {
        id,
      },
    });

    return complex;
  } catch (e) {
    console.error("Error fetching residential complex ", e);
    throw "Нельзя добавить ЖК"; // TODO: add error handling
  }
}
