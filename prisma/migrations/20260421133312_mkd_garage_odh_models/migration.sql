/*
  Warnings:

  - You are about to drop the column `address` on the `Garage` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `MKD` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `ODH` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Garage" DROP COLUMN "address",
ADD COLUMN     "cleaningFrequencySummer" TEXT,
ADD COLUMN     "cleaningFrequencyWinter" TEXT,
ADD COLUMN     "cleaningStaffCountSummer" INTEGER,
ADD COLUMN     "cleaningStaffCountWinter" INTEGER,
ADD COLUMN     "drivewaysRampArea" DOUBLE PRECISION,
ADD COLUMN     "elevatorHallStaircaseArea" DOUBLE PRECISION,
ADD COLUMN     "elevatorsCount" INTEGER,
ADD COLUMN     "floorsCount" INTEGER,
ADD COLUMN     "parkingSpacesCleaningArea" DOUBLE PRECISION,
ADD COLUMN     "parkingSpacesCount" INTEGER,
ADD COLUMN     "technicalRoomsArea" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "MKD" DROP COLUMN "address",
ADD COLUMN     "buildingFootprintArea" DOUBLE PRECISION,
ADD COLUMN     "cleaningFrequency" TEXT,
ADD COLUMN     "cleaningStaffCount" INTEGER,
ADD COLUMN     "commonAreaFloor1" DOUBLE PRECISION,
ADD COLUMN     "commonAreaFloor2Plus" DOUBLE PRECISION,
ADD COLUMN     "commonAreaStorage" DOUBLE PRECISION,
ADD COLUMN     "elevatorsCount" INTEGER,
ADD COLUMN     "floorsCount" INTEGER,
ADD COLUMN     "garbageChamberArea" DOUBLE PRECISION,
ADD COLUMN     "garbageChamberCount" INTEGER,
ADD COLUMN     "odsArea" DOUBLE PRECISION,
ADD COLUMN     "sectionsCount" INTEGER,
ADD COLUMN     "technicalRoomsArea" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ODH" DROP COLUMN "address",
ADD COLUMN     "cleaningStaffCountSummer" INTEGER,
ADD COLUMN     "cleaningStaffCountWinter" INTEGER,
ADD COLUMN     "equipmentCountSummer" INTEGER,
ADD COLUMN     "equipmentCountWinter" INTEGER,
ADD COLUMN     "greeningArea" DOUBLE PRECISION,
ADD COLUMN     "manualCleaningArea" DOUBLE PRECISION,
ADD COLUMN     "mechanizedCleaningArea" DOUBLE PRECISION,
ADD COLUMN     "totalArea" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "MKDTerritory" (
    "id" TEXT NOT NULL,
    "mkdId" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION,
    "manualCleaningArea" DOUBLE PRECISION,
    "greeningArea" DOUBLE PRECISION,
    "mechanizedCleaningArea" DOUBLE PRECISION,
    "cleaningStaffCountSummer" INTEGER,
    "equipmentCountSummer" INTEGER,
    "cleaningStaffCountWinter" INTEGER,
    "equipmentCountWinter" INTEGER,

    CONSTRAINT "MKDTerritory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parking" (
    "id" TEXT NOT NULL,
    "mkdId" TEXT NOT NULL,
    "parkingSpacesCount" INTEGER,
    "floorsCount" INTEGER,
    "elevatorHallStaircaseArea" DOUBLE PRECISION,
    "parkingSpacesCleaningArea" DOUBLE PRECISION,
    "drivewaysRampArea" DOUBLE PRECISION,
    "technicalRoomsArea" DOUBLE PRECISION,
    "cleaningStaffCountSummer" INTEGER,
    "cleaningStaffCountWinter" INTEGER,
    "cleaningFrequencySummer" TEXT,
    "cleaningFrequencyWinter" TEXT,

    CONSTRAINT "Parking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GarageTerritory" (
    "id" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION,
    "manualCleaningArea" DOUBLE PRECISION,
    "greeningArea" DOUBLE PRECISION,
    "mechanizedCleaningArea" DOUBLE PRECISION,
    "cleaningStaffCountSummer" INTEGER,
    "equipmentCountSummer" INTEGER,
    "cleaningStaffCountWinter" INTEGER,
    "equipmentCountWinter" INTEGER,

    CONSTRAINT "GarageTerritory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MKDTerritory_mkdId_key" ON "MKDTerritory"("mkdId");

-- CreateIndex
CREATE UNIQUE INDEX "Parking_mkdId_key" ON "Parking"("mkdId");

-- CreateIndex
CREATE UNIQUE INDEX "GarageTerritory_garageId_key" ON "GarageTerritory"("garageId");

-- AddForeignKey
ALTER TABLE "MKDTerritory" ADD CONSTRAINT "MKDTerritory_mkdId_fkey" FOREIGN KEY ("mkdId") REFERENCES "MKD"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parking" ADD CONSTRAINT "Parking_mkdId_fkey" FOREIGN KEY ("mkdId") REFERENCES "MKD"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarageTerritory" ADD CONSTRAINT "GarageTerritory_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
