-- CreateTable
CREATE TABLE "WorkHours" (
    "id" SERIAL NOT NULL,
    "workTime" TEXT[],
    "techId" INTEGER NOT NULL,

    CONSTRAINT "WorkHours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkHours" ADD CONSTRAINT "WorkHours_techId_fkey" FOREIGN KEY ("techId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
