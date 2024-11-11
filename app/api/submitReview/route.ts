import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../lib/prisma";
import { auth } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const facultyID = parseInt(await data.facultyID);
  const courseID = parseInt(await data.courseID);

  const session = await auth();

  //@ts-ignore
  const user = await prisma.user.findUnique({
    where: {
      //@ts-ignore
      uuid: session?.user?.id,
    },
  });
  if (user?.id) {
    const newReview = await prisma.rating.create({
      data: {
        userId: user?.id,
        courseID: courseID,
        facultyID: facultyID,
        overallRating: data.overallRating,
        difficulty: data.difficulty,
        takeAgain: data.takeAgain,
        forCredit: data.forCredit,
        grade: data.grade,
        review: data.review,
      },
    });
    return NextResponse.json(newReview, { status: 200 });
  }

  //console.log(plans);
  return NextResponse.json("Submission Failed, no user", { status: 500 });
}
