/*
  Warnings:

  - Added the required column `year` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `CoursePlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `MeetingTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `MeetingsFaculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `sectionAttribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "year" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CoursePlan" ADD COLUMN     "year" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "year" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MeetingTime" ADD COLUMN     "year" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MeetingsFaculty" ADD COLUMN     "year" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sectionAttribute" ADD COLUMN     "year" TEXT NOT NULL;
