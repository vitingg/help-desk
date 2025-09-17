/*
  Warnings:

  - A unique constraint covering the columns `[techId]` on the table `WorkHours` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkHours_techId_key" ON "WorkHours"("techId");
