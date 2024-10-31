/*
  Warnings:

  - You are about to drop the column `coursePlanId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_coursePlanId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "coursePlanId";

-- CreateTable
CREATE TABLE "_CourseToCoursePlan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToCoursePlan_AB_unique" ON "_CourseToCoursePlan"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToCoursePlan_B_index" ON "_CourseToCoursePlan"("B");

-- AddForeignKey
ALTER TABLE "_CourseToCoursePlan" ADD CONSTRAINT "_CourseToCoursePlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToCoursePlan" ADD CONSTRAINT "_CourseToCoursePlan_B_fkey" FOREIGN KEY ("B") REFERENCES "CoursePlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
