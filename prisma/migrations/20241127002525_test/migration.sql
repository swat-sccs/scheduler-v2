/*
  Warnings:

  - Made the column `profUid` on table `Rating` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Faculty" ALTER COLUMN "uid" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "profUid" SET NOT NULL;
