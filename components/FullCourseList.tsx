import { Course } from "@prisma/client";

import prisma from "../lib/prisma";

import CourseCard from "./CourseCard";

async function getCourses(query: string) {
  return await prisma.course.findMany({
    include: {
      sectionAttributes: true,
      facultyMeet: {
        include: {
          meetingTimes: true,
        },
      },
      instructor: true,
    },

    orderBy: {
      courseTitle: "desc",
    },
    where: {
      ...(query
        ? {
            OR: [
              {
                courseTitle: {
                  search: query.replace(/[\s\n\t]/g, "_"),
                },
              },
              {
                subject: {
                  search: query.replace(/[\s\n\t]/g, "_"),
                },
              },
              {
                courseNumber: {
                  search: query.replace(/[\s\n\t]/g, "_"),
                },
              },
              {
                instructor: {
                  displayName: {
                    search: query.replace(/[\s\n\t]/g, "_"),
                  },
                },
              },
            ],
          }
        : {}),
    },
  });
}

export async function FullCourseList({ query }: { query: string }) {
  const courseList: Course[] = await getCourses(query);

  return (
    <>
      <div className="grid gap-6 overflow-scroll w-8/12">
        {courseList?.map((course: any) => (
          <div key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </>
  );
}
