"use server";

import { cookies } from "next/headers";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { getPlanCookie } from "./actions";

export async function getUniqueCodes() {
  const codes = await prisma.sectionAttribute.findMany();
  const daCodes: any = [];

  for (let i = 0; i < codes.length; i++) {
    if (!daCodes.includes(codes[i].code)) {
      daCodes.push(codes[i].code);
    }
  }

  return daCodes;
}

export async function getUniqueStartEndTimes() {
  const meetingTimes = await prisma.meetingTime.findMany({
    where: {
      beginTime: { not: "" },
    },
    orderBy: {
      beginTime: "asc",
    },
  });
  const startTimes: any = [];
  const endTimes: any = [];

  for (let i = 0; i < meetingTimes.length; i++) {
    if (!startTimes.includes(meetingTimes[i].beginTime)) {
      startTimes.push(meetingTimes[i].beginTime);
    }
    if (!endTimes.includes(meetingTimes[i].endTime)) {
      endTimes.push(meetingTimes[i].endTime);
    }
  }

  const times = { startTimes: startTimes, endTimes: endTimes };

  return times;
}

export async function getTerms() {
  const courses = await prisma.course.findMany();
  const output: any = [];

  for (let i = 0; i < courses.length; i++) {
    if (!output.includes(courses[i].year)) {
      output.push(courses[i].year);
    }
  }

  return output;
}

export async function setPlanCookie(plan: string) {
  //@ts-ignore
  (await cookies()).set("plan", plan);
}

export async function getPlanCourses1() {
  const planCookie: any = await getPlanCookie();
  const session = await auth();

  return await prisma.coursePlan.findMany({
    where: {
      AND: {
        User: {
          uuid: session?.user.id,
        },
        //id: parseInt(planCookie),
      },
    },
    include: {
      courses: true,
    },
  });
}

export async function getPlanCourses(planID: any) {
  //let DOTW: Array<String> = dotw.split(",");

  return await prisma.course.findMany({
    relationLoadStrategy: "join", // or 'query'
    where: {
      CoursePlan: {
        some: {
          id: parseInt(planID),
        },
      },
    },
    include: {
      CoursePlan: true,
    },
  });
}

export async function getInitialCoursePlans() {
  //let DOTW: Array<String> = dotw.split(",");

  return await prisma.coursePlan.findMany({
    relationLoadStrategy: "join", // or 'query'
    include: {
      courses: true,
    },
  });
}

export async function getInitialCourses(
  query: any,
  term: any,
  dotw: any,
  stime: any
) {
  const startTime = stime.toString().split(",").filter(Number);
  return await prisma.course.findMany({
    relationLoadStrategy: "join", // or 'query'
    take: 20,
    where: {
      ...(term
        ? {
            year: term,
          }
        : {}),
    },

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

    ...(query
      ? {
          orderBy: [
            {
              _relevance: {
                fields: ["courseTitle", "subject", "courseNumber"],
                search: query.trim().split(" ").join(" & "),
                sort: "desc",
              },
            },
          ],
        }
      : ""),
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
