"use server";
import { complexSchema } from "@/components/objects-management/complex/schema";
import prisma from "@/lib/prisma";

// export type complexState = {
//   errors: {
//     name?: string[];
//   };
//   message: string;
//   success: boolean;
//   complexId: string | null;
// };

export async function addResidentialComplexAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = complexSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    throw new Error("Ошибки валидации");
  }

  try {
    const complex = await prisma.complex.create({
      data: {
        name: validatedFields.data.name,
      },
    });

    return complex;
  } catch (e) {
    console.error("Error adding residential complex ", e);
    throw "Нельзя добавить ЖК"; // TODO: add error handling
  }
}

export async function updateResidentialComplexAction(
  id: string,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = complexSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    throw new Error("Ошибки валидации");
  }

  try {
    const complex = await prisma.complex.update({
      where: {
        id,
      },
      data: {
        name: validatedFields.data.name,
      },
    });

    return complex;
  } catch (e) {
    console.error("Error updating residential complex ", e);
    throw "Нельзя обновить ЖК";
  }
}

export async function fetchResidentialComplexAction(id: string) {
  try {
    const complex = await prisma.complex.findUnique({
      where: {
        id,
      },
    });

    return complex;
  } catch (e) {
    console.error("Error fetching residential complex ", e);
    throw "ЖК не найден"; // TODO: add error handling
  }
}
