import { Complex } from "@/components/complex-list/types/complex";
import prisma from "@/lib/prisma";
import { FetchError, FetchedPaginatedResult } from "@/lib/types";

export async function fetchResidentialComplexesAction({
  page,
}: {
  page?: number;
}): Promise<FetchedPaginatedResult<Complex> | FetchError> {
  const take = 10;
  const skipCount = page ? (page - 1) * take : 0;

  try {
    const complexes: FetchedPaginatedResult<Complex> =
      await prisma.$transaction(async (tx) => {
        const complexesCount = await tx.complex.count();
        const complexes = await tx.complex.findMany({
          take,
          skip: skipCount,
          include: {
            subObjects: {
              include: {
                garageDetails: true,
                mkdDetails: true,
                odhDetails: true,
              },
            },
          },
        });

        // throw new Error("test Error");

        return {
          status: "success",
          totalPages: Math.ceil(complexesCount / take),
          currentPage: page || 1,
          data: complexes,
        };
      });

    return complexes;
  } catch (e) {
    console.error("Error fetching residential complexes ", e);

    return {
      status: "error",
      error: "Ошибка при загрузке списка ЖК ",
      data: [],
    };
  }
}
