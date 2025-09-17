-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_techId_fkey";

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "techId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_techId_fkey" FOREIGN KEY ("techId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
