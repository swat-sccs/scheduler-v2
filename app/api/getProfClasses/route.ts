import { clsx } from "clsx";
import { Faculty } from "./../../../node_modules/.prisma/client/index.d";
import { NextResponse, NextRequest } from "next/server";
import { Course } from "@prisma/client";

import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = await new URL(request.url);
  const profID = parseInt((await searchParams.get("prof")) || "1");

  const outputCourses: Course[] = [];

  const courses = await prisma.course.findMany({
    include: {
      instructor: true,
    },
    where: {
      instructor: {
        id: profID,
      },
    },
  });

  for (let i = 0; i < courses.length; i++) {
    let push = true;
    for (const course of outputCourses) {
      if (
        course.courseNumber == courses[i].courseNumber &&
        course.subject == courses[i].subject &&
        !course.courseTitle.toLowerCase().includes("lab")
      ) {
        push = false;
      }
    }
    if (push) {
      outputCourses.push(courses[i]);
    }
  }

  return NextResponse.json(outputCourses, { status: 200 });
}
