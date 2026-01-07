-- CreateTable
CREATE TABLE "object" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "object_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubObject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coordinates" DOUBLE PRECISION[],
    "objectId" TEXT NOT NULL,

    CONSTRAINT "SubObject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubObject" ADD CONSTRAINT "SubObject_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
