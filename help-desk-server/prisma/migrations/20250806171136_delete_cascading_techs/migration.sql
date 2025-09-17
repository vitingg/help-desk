-- DropForeignKey
ALTER TABLE "WorkHours" DROP CONSTRAINT "WorkHours_techId_fkey";

-- AddForeignKey
ALTER TABLE "WorkHours" ADD CONSTRAINT "WorkHours_techId_fkey" FOREIGN KEY ("techId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
