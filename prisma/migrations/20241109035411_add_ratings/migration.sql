-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "avgRating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "avgRating" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "courseID" INTEGER NOT NULL,
    "facultyID" INTEGER NOT NULL,
    "overallRating" INTEGER,
    "quality" INTEGER,
    "difficulty" INTEGER,
    "takeAgain" BOOLEAN,
    "review" TEXT,
    "grade" TEXT,
    "forCredit" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_facultyID_fkey" FOREIGN KEY ("facultyID") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
