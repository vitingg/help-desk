/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Service` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ServiceCategoryType" AS ENUM ('BASE', 'ADDITIONAL');

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_categoryId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "serviceId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "type" "ServiceCategoryType" NOT NULL,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("serviceId","categoryId")
);

-- AddForeignKey
ALTER TABLE "ServiceCategory" ADD CONSTRAINT "ServiceCategory_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceCategory" ADD CONSTRAINT "ServiceCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
