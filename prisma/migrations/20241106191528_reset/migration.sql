/*
  Warnings:

  - The `beginTime` column on the `MeetingTime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endTime` column on the `MeetingTime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MeetingTime" DROP COLUMN "beginTime",
ADD COLUMN     "beginTime" TIME(2),
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIME(2);
