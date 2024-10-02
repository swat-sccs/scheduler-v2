-- CreateTable
CREATE TABLE "CoursePlan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "CoursePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "courseReferenceNumber" INTEGER NOT NULL,
    "courseNumber" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "scheduleTypeDescription" TEXT NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "descriptionUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creditHours" INTEGER NOT NULL,
    "maximumEnrollment" INTEGER NOT NULL,
    "enrollment" INTEGER NOT NULL,
    "seatsAvailable" INTEGER NOT NULL,
    "facultyId" INTEGER NOT NULL,
    "facultyMeetId" INTEGER NOT NULL,
    "coursePlanId" INTEGER,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "bannerId" INTEGER NOT NULL,
    "courseReferenceNumber" INTEGER NOT NULL,
    "displayName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingsFaculty" (
    "id" SERIAL NOT NULL,
    "category" INTEGER NOT NULL,
    "courseReferenceNumber" INTEGER NOT NULL,
    "meetingTimeID" INTEGER NOT NULL,

    CONSTRAINT "MeetingsFaculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingTime" (
    "id" SERIAL NOT NULL,
    "beginTime" INTEGER NOT NULL,
    "building" TEXT NOT NULL,
    "buildingDescription" TEXT NOT NULL,
    "room" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "courseReferenceNumber" INTEGER NOT NULL,
    "endDate" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "startDate" TEXT NOT NULL,
    "hoursWeek" INTEGER NOT NULL,
    "meetingType" TEXT NOT NULL,
    "meetingTypeDescription" TEXT NOT NULL,
    "monday" BOOLEAN NOT NULL,
    "tuesday" BOOLEAN NOT NULL,
    "wednesday" BOOLEAN NOT NULL,
    "thursday" BOOLEAN NOT NULL,
    "friday" BOOLEAN NOT NULL,
    "saturday" BOOLEAN NOT NULL,
    "sunday" BOOLEAN NOT NULL,

    CONSTRAINT "MeetingTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectionAttribute" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseReferenceNumber" INTEGER NOT NULL,
    "courseId" INTEGER,

    CONSTRAINT "sectionAttribute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoursePlan" ADD CONSTRAINT "CoursePlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_facultyMeetId_fkey" FOREIGN KEY ("facultyMeetId") REFERENCES "MeetingsFaculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_coursePlanId_fkey" FOREIGN KEY ("coursePlanId") REFERENCES "CoursePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingsFaculty" ADD CONSTRAINT "MeetingsFaculty_meetingTimeID_fkey" FOREIGN KEY ("meetingTimeID") REFERENCES "MeetingTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sectionAttribute" ADD CONSTRAINT "sectionAttribute_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
