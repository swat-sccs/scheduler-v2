// api/test.ts

import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const courses = await prisma.course.findMany({
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
      courseTitle: "asc",
    },
  });

  return NextResponse.json(courses, { status: 200 });
}

// To handle a POST request to /api
/*
export async function POST(request: NextRequest) {
 
  return NextResponse.json(output, { status: 200 });
}
*/
