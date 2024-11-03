// api/test.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { auth } from "@/lib/auth";
import { getPlanCookie } from "@/app/actions";

export async function GET(request: NextRequest) {
  let planCookie: any = await getPlanCookie();
  const session = await auth();

  let courses = await prisma.coursePlan.findMany({
    where: {
      AND: {
        User: {
          //@ts-ignore
          uuid: session?.user.id,
        },
        //id: parseInt(planCookie),
      },
    },
    include: {
      courses: true,
    },
  });
  return NextResponse.json(courses, { status: 200 });
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const course = data.course;
  const plan = data.plan;
  const session = await auth();

  let courses = await prisma.coursePlan.update({
    where: {
      id: parseInt(plan),
    },
    data: {
      courses: {
        disconnect: {
          id: course.id,
        },
      },
    },
  });

  return NextResponse.json(courses, { status: 200 });
}
