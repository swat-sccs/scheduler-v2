/*
  Warnings:

  - Made the column `courseId` on table `sectionAttribute` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "sectionAttribute" DROP CONSTRAINT "sectionAttribute_courseId_fkey";

-- AlterTable
ALTER TABLE "sectionAttribute" ALTER COLUMN "courseId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "sectionAttribute" ADD CONSTRAINT "sectionAttribute_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
