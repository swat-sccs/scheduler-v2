/*
  Warnings:

  - You are about to drop the column `createdAt` on the `CoursePlan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CoursePlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoursePlan" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "_CourseToCoursePlan" ADD CONSTRAINT "_CourseToCoursePlan_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CourseToCoursePlan_AB_unique";
