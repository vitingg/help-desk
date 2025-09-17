/*
  Warnings:

  - You are about to drop the column `isActive` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "isActive";
