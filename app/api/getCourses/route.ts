import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../lib/prisma";
import { auth } from "../../../lib/auth";

export async function GET(request: NextRequest) {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      courseTitle: true,
    },
    where: { year: "S2025" },
  });
  //console.log(plans);
  return NextResponse.json(courses, { status: 200 });
}
