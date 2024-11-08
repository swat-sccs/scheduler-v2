/*
  Warnings:

  - You are about to drop the `_CourseTosectionAttribute` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CourseTosectionAttribute" DROP CONSTRAINT "_CourseTosectionAttribute_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseTosectionAttribute" DROP CONSTRAINT "_CourseTosectionAttribute_B_fkey";

-- AlterTable
ALTER TABLE "sectionAttribute" ADD COLUMN     "courseId" INTEGER;

-- DropTable
DROP TABLE "_CourseTosectionAttribute";

-- AddForeignKey
ALTER TABLE "sectionAttribute" ADD CONSTRAINT "sectionAttribute_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
