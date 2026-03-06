/*
  Warnings:

  - You are about to drop the `SubObject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `object` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SubObjectType" AS ENUM ('APARTMENT', 'BOULEVARD', 'GARAGE');

-- DropForeignKey
ALTER TABLE "SubObject" DROP CONSTRAINT "SubObject_objectId_fkey";

-- DropTable
DROP TABLE "SubObject";

-- DropTable
DROP TABLE "object";

-- CreateTable
CREATE TABLE "residential_complex" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "residential_complex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubObjectBase" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coordinates" DOUBLE PRECISION[],
    "geometry" JSONB NOT NULL,
    "type" "SubObjectType" NOT NULL,
    "residentialComplexId" TEXT NOT NULL,

    CONSTRAINT "SubObjectBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "subObjectBaseId" TEXT NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garage" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "subObjectBaseId" TEXT NOT NULL,

    CONSTRAINT "Garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ODH" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "subObjectBaseId" TEXT NOT NULL,

    CONSTRAINT "ODH_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubObjectBase_residentialComplexId_idx" ON "SubObjectBase"("residentialComplexId");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_subObjectBaseId_key" ON "Apartment"("subObjectBaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_subObjectBaseId_key" ON "Garage"("subObjectBaseId");

-- CreateIndex
CREATE UNIQUE INDEX "ODH_subObjectBaseId_key" ON "ODH"("subObjectBaseId");

-- AddForeignKey
ALTER TABLE "SubObjectBase" ADD CONSTRAINT "SubObjectBase_residentialComplexId_fkey" FOREIGN KEY ("residentialComplexId") REFERENCES "residential_complex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_subObjectBaseId_fkey" FOREIGN KEY ("subObjectBaseId") REFERENCES "SubObjectBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garage" ADD CONSTRAINT "Garage_subObjectBaseId_fkey" FOREIGN KEY ("subObjectBaseId") REFERENCES "SubObjectBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ODH" ADD CONSTRAINT "ODH_subObjectBaseId_fkey" FOREIGN KEY ("subObjectBaseId") REFERENCES "SubObjectBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
