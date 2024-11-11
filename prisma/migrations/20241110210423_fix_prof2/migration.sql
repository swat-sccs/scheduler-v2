/*
  Warnings:

  - A unique constraint covering the columns `[bannerId]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Faculty_bannerId_key" ON "Faculty"("bannerId");
