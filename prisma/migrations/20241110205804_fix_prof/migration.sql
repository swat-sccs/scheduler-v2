/*
  Warnings:

  - You are about to drop the column `courseReferenceNumber` on the `Faculty` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Faculty_courseReferenceNumber_key";

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "courseReferenceNumber";
