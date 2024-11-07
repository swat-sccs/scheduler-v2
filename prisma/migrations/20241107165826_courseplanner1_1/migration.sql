/*
  Warnings:

  - Made the column `beginTime` on table `MeetingTime` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `MeetingTime` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MeetingTime" ALTER COLUMN "beginTime" SET NOT NULL,
ALTER COLUMN "endTime" SET NOT NULL;
