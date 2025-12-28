-- AlterTable
ALTER TABLE "user" ADD COLUMN     "positionId" TEXT;

-- CreateTable
CREATE TABLE "UserPosition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserPosition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "UserPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
