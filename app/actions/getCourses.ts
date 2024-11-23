"use server";

import { cookies } from "next/headers";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";
export async function setPlanCookie(plan: string) {
  (await cookies()).set("plan", plan);
}

export async function getInitialCourses() {
  return await prisma.course.findMany({
    relationLoadStrategy: "join", // or 'query'
    take: 10,

    include: {
      sectionAttributes: true,
      facultyMeet: {
        include: {
          meetingTimes: true,
        },
      },
      instructor: true,
    },
  });
}

export async function getCourses(
  take: any,
  cursor: any,
  query: any,
  term: any,
  dotw: any,
  stime: any
) {
  const startTime = stime.toString().split(",").filter(Number);
  return await prisma.course.findMany({
    relationLoadStrategy: "join", // or 'query'
    take: take,

    include: {
      sectionAttributes: true,
      facultyMeet: {
        include: {
          meetingTimes: true,
        },
      },
      instructor: true,
    },

    orderBy: [
      {
        _relevance: {
          fields: ["courseTitle", "subject", "courseNumber"],
          search: query.trim().split(" ").join(" & "),
          sort: "desc",
        },
      },
    ],
    where: {
      ...(term
        ? {
            year: term,
          }
        : {}),
      //year: term,

      ...(query
        ? {
            OR: [
              {
                courseTitle: {
                  search: query.trim().split(" ").join(" | "),
                  mode: "insensitive",
                },
              },
              {
                sectionAttributes: {
                  some: {
                    code: {
                      search: query.trim().split(" ").join(" | "),
                      mode: "insensitive",
                    },
                  },
                },
              },
              {
                subject: {
                  search: query.trim().split(" ").join(" | "),
                  mode: "insensitive",
                },
              },
              {
                courseNumber: {
                  search: query.trim().split(" ").join(" | "),
                  mode: "insensitive",
                },
              },
              {
                instructor: {
                  displayName: {
                    search: query.trim().split(" ").join(" | "),
                    mode: "insensitive",
                  },
                },
              },
            ],
          }
        : {}),

      ...(startTime.length > 0
        ? {
            facultyMeet: {
              meetingTimes: {
                beginTime: {
                  in: startTime,
                },
              },
            },
          }
        : {}),

      ...(dotw.length > 0
        ? {
            facultyMeet: {
              meetingTimes: {
                is: {
                  monday: dotw.includes("monday") ? true : Prisma.skip,
                  tuesday: dotw.includes("tuesday") ? true : Prisma.skip,
                  wednesday: dotw.includes("wednesday") ? true : Prisma.skip,
                  thursday: dotw.includes("thursday") ? true : Prisma.skip,
                  friday: dotw.includes("friday") ? true : Prisma.skip,
                  saturday: dotw.includes("saturday") ? true : Prisma.skip,
                  sunday: dotw.includes("sunday") ? true : Prisma.skip,
                },
              },
            },
          }
        : {}),
    },
  });
}
