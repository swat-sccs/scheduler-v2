/*
  Warnings:

  - A unique constraint covering the columns `[courseReferenceNumber]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseReferenceNumber]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseReferenceNumber]` on the table `MeetingTime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseReferenceNumber]` on the table `MeetingsFaculty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseReferenceNumber]` on the table `sectionAttribute` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_courseReferenceNumber_key" ON "Course"("courseReferenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_courseReferenceNumber_key" ON "Faculty"("courseReferenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "MeetingTime_courseReferenceNumber_key" ON "MeetingTime"("courseReferenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "MeetingsFaculty_courseReferenceNumber_key" ON "MeetingsFaculty"("courseReferenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "sectionAttribute_courseReferenceNumber_key" ON "sectionAttribute"("courseReferenceNumber");
