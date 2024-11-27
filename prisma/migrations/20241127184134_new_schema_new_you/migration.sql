/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - Made the column `uid` on table `Faculty` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Faculty" ALTER COLUMN "uid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_uid_key" ON "Faculty"("uid");
