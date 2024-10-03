/*
  Warnings:

  - You are about to drop the `_CourseToFaculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToMeetingsFaculty` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `facultyId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyMeetId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CourseToFaculty" DROP CONSTRAINT "_CourseToFaculty_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToFaculty" DROP CONSTRAINT "_CourseToFaculty_B_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToMeetingsFaculty" DROP CONSTRAINT "_CourseToMeetingsFaculty_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToMeetingsFaculty" DROP CONSTRAINT "_CourseToMeetingsFaculty_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "facultyId" INTEGER NOT NULL,
ADD COLUMN     "facultyMeetId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CourseToFaculty";

-- DropTable
DROP TABLE "_CourseToMeetingsFaculty";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_facultyMeetId_fkey" FOREIGN KEY ("facultyMeetId") REFERENCES "MeetingsFaculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
