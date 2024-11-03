import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../lib/prisma";
import { auth } from "../../../lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      //@ts-ignore
      uuid: session?.user?.id,
    },
  });
  let courses: any;
  if (user) {
    courses = await prisma.coursePlan.findMany({
      where: {
        User: {
          //@ts-ignore
          id: user.id,
        },
      },
      include: {
        courses: true,
      },
    });
  } else {
    courses = null;
  }
  //console.log(plans);
  return NextResponse.json(courses, { status: 200 });
}
