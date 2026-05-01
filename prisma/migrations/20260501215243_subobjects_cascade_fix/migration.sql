-- DropForeignKey
ALTER TABLE "Garage" DROP CONSTRAINT "Garage_subObjectBaseId_fkey";

-- DropForeignKey
ALTER TABLE "GarageTerritory" DROP CONSTRAINT "GarageTerritory_garageId_fkey";

-- DropForeignKey
ALTER TABLE "MKD" DROP CONSTRAINT "MKD_subObjectBaseId_fkey";

-- DropForeignKey
ALTER TABLE "ODH" DROP CONSTRAINT "ODH_subObjectBaseId_fkey";

-- DropForeignKey
ALTER TABLE "SubObjectBase" DROP CONSTRAINT "SubObjectBase_complexId_fkey";

-- AddForeignKey
ALTER TABLE "SubObjectBase" ADD CONSTRAINT "SubObjectBase_complexId_fkey" FOREIGN KEY ("complexId") REFERENCES "Complex"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MKD" ADD CONSTRAINT "MKD_subObjectBaseId_fkey" FOREIGN KEY ("subObjectBaseId") REFERENCES "SubObjectBase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garage" ADD CONSTRAINT "Garage_subObjectBaseId_fkey" FOREIGN KEY ("subObjectBaseId") REFERENCES "SubObjectBase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarageTerritory" ADD CONSTRAINT "GarageTerritory_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ODH" ADD CONSTRAINT "ODH_subObjectBaseId_fkey" FOREIGN KEY ("subObjectBaseId") REFERENCES "SubObjectBase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
