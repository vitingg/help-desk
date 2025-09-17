/*
  Warnings:

  - You are about to alter the column `basePrice` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "basePrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
