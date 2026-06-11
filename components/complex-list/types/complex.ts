import { Prisma } from "@/lib/generated/prisma/client";

export type Complex = Prisma.ComplexGetPayload<{
  include: {
    subObjects: {
      include: {
        garageDetails: true;
        mkdDetails: true;
        odhDetails: true;
      };
    };
  };
}>;
