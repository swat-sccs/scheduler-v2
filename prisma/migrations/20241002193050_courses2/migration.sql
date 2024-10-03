/*
  Warnings:

  - You are about to drop the column `facultyId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `facultyMeetId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_facultyMeetId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "facultyId",
DROP COLUMN "facultyMeetId";

-- CreateTable
CREATE TABLE "_CourseToFaculty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToMeetingsFaculty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToFaculty_AB_unique" ON "_CourseToFaculty"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToFaculty_B_index" ON "_CourseToFaculty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToMeetingsFaculty_AB_unique" ON "_CourseToMeetingsFaculty"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToMeetingsFaculty_B_index" ON "_CourseToMeetingsFaculty"("B");

-- AddForeignKey
ALTER TABLE "_CourseToFaculty" ADD CONSTRAINT "_CourseToFaculty_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToFaculty" ADD CONSTRAINT "_CourseToFaculty_B_fkey" FOREIGN KEY ("B") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToMeetingsFaculty" ADD CONSTRAINT "_CourseToMeetingsFaculty_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToMeetingsFaculty" ADD CONSTRAINT "_CourseToMeetingsFaculty_B_fkey" FOREIGN KEY ("B") REFERENCES "MeetingsFaculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
