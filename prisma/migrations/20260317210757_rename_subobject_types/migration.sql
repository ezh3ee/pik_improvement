/*
  Warnings:

  - The values [APARTMENT,BOULEVARD] on the enum `SubObjectType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Apartment` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubObjectType_new" AS ENUM ('MKD', 'ODH', 'GARAGE');
ALTER TABLE "SubObjectBase" ALTER COLUMN "type" TYPE "SubObjectType_new" USING ("type"::text::"SubObjectType_new");
ALTER TYPE "SubObjectType" RENAME TO "SubObjectType_old";
ALTER TYPE "SubObjectType_new" RENAME TO "SubObjectType";
DROP TYPE "public"."SubObjectType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_subObjectBaseId_fkey";

-- DropTable
DROP TABLE "Apartment";

-- CreateTable
CREATE TABLE "MKD" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "subObjectBaseId" TEXT NOT NULL,

    CONSTRAINT "MKD_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MKD_subObjectBaseId_key" ON "MKD"("subObjectBaseId");

-- AddForeignKey
ALTER TABLE "MKD" ADD CONSTRAINT "MKD_subObjectBaseId_fkey" FOREIGN KEY ("subObjectBaseId") REFERENCES "SubObjectBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
