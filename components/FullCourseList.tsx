import { Course } from "@prisma/client";
import prisma from "../lib/prisma";
import CourseCard from "./CourseCard";
import { getPlanCookie } from "../app/actions";
async function getCourses(query: string, term: string) {
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
            year: term,
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

export async function FullCourseList({
  query,
  term,
}: {
  query: string;
  term: string;
}) {
  const courseList: Course[] = await getCourses(query, term);

  return (
    <>
      <div className="grid gap-4 ">
        {courseList?.map((course: any) => (
          <div key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </>
  );
}
