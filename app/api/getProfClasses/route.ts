import { Faculty } from "./../../../node_modules/.prisma/client/index.d";
import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = await new URL(request.url);
  const profID = parseInt((await searchParams.get("prof")) || "1");

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

  return NextResponse.json(courses, { status: 200 });
}
