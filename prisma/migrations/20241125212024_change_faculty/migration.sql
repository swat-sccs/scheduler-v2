/*
  Warnings:

  - You are about to drop the column `courseID` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `facultyID` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseName` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseNumber` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseSubject` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profBannerId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profDisplayName` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termTaken` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearTaken` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_courseID_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_facultyID_fkey";

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "uid" TEXT NOT NULL DEFAULT 'undefined';

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "courseID",
DROP COLUMN "facultyID",
ADD COLUMN     "courseName" TEXT NOT NULL,
ADD COLUMN     "courseNumber" TEXT NOT NULL,
ADD COLUMN     "courseSubject" TEXT NOT NULL,
ADD COLUMN     "facultyId" INTEGER,
ADD COLUMN     "profBannerId" TEXT NOT NULL,
ADD COLUMN     "profDisplayName" TEXT NOT NULL,
ADD COLUMN     "termTaken" INTEGER NOT NULL,
ADD COLUMN     "yearTaken" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_uid_key" ON "Faculty"("uid");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
