/*
  Warnings:

  - You are about to drop the column `courseId` on the `sectionAttribute` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sectionAttribute" DROP CONSTRAINT "sectionAttribute_courseId_fkey";

-- AlterTable
ALTER TABLE "sectionAttribute" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "_CourseTosectionAttribute" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseTosectionAttribute_AB_unique" ON "_CourseTosectionAttribute"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseTosectionAttribute_B_index" ON "_CourseTosectionAttribute"("B");

-- AddForeignKey
ALTER TABLE "_CourseTosectionAttribute" ADD CONSTRAINT "_CourseTosectionAttribute_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseTosectionAttribute" ADD CONSTRAINT "_CourseTosectionAttribute_B_fkey" FOREIGN KEY ("B") REFERENCES "sectionAttribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
