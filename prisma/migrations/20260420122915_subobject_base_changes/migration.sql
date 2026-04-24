/*
  Warnings:

  - You are about to drop the column `residentialComplexId` on the `SubObjectBase` table. All the data in the column will be lost.
  - You are about to drop the `residential_complex` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buildAddress` to the `SubObjectBase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complexId` to the `SubObjectBase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payer` to the `SubObjectBase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postAddress` to the `SubObjectBase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubObjectBase" DROP CONSTRAINT "SubObjectBase_residentialComplexId_fkey";

-- DropIndex
DROP INDEX "SubObjectBase_residentialComplexId_idx";

-- AlterTable
ALTER TABLE "SubObjectBase" DROP COLUMN "residentialComplexId",
ADD COLUMN     "buildAddress" TEXT NOT NULL,
ADD COLUMN     "complexId" TEXT NOT NULL,
ADD COLUMN     "payer" TEXT NOT NULL,
ADD COLUMN     "postAddress" TEXT NOT NULL;

-- DropTable
DROP TABLE "residential_complex";

-- CreateTable
CREATE TABLE "Complex" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Complex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubObjectBase_complexId_idx" ON "SubObjectBase"("complexId");

-- AddForeignKey
ALTER TABLE "SubObjectBase" ADD CONSTRAINT "SubObjectBase_complexId_fkey" FOREIGN KEY ("complexId") REFERENCES "Complex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
