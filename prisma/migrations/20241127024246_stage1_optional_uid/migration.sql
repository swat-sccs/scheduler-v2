-- DropIndex
DROP INDEX "Faculty_uid_key";

-- AlterTable
ALTER TABLE "Faculty" ALTER COLUMN "uid" DROP NOT NULL;
