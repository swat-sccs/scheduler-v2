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
