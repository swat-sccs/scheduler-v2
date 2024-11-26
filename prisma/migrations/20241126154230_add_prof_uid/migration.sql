/*
  Warnings:

  - You are about to drop the column `facultyId` on the `Rating` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_facultyId_fkey";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "facultyId",
ADD COLUMN     "profUid" TEXT;
