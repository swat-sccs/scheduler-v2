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
  }
  const profs = await prisma.faculty.findUnique({
    select: { Rating: { select: { overallRating: true } } },
    //include: { Rating: true },
    where: { id: facultyID },
  });

  let count: any = { one: 0, two: 0, three: 0, four: 0, five: 0 };

  if (profs) {
    if (profs?.Rating?.length > 0) {
      for (const rating of profs.Rating) {
        //@ts-ignore
        if (rating.overallRating == 1) {
          count.one += 1;
        }
        if (rating.overallRating == 2) {
          count.two += 1;
        }
        if (rating.overallRating == 3) {
          count.three += 1;
        }
        if (rating.overallRating == 4) {
          count.four += 1;
        }
        if (rating.overallRating == 5) {
          count.five += 1;
        }
      }

      let avg = parseInt(
        (
          (count.one * 1 +
            count.two * 2 +
            count.three * 3 +
            count.four * 4 +
            count.five * 5) /
          profs.Rating.length
        ).toFixed(1)
      );

      const newAvg = await prisma.faculty.update({
        data: {
          avgRating: avg,
        },
        where: {
          id: facultyID,
        },
      });
      return NextResponse.json(newAvg, { status: 200 });
    }
  }

  //console.log(plans);
  return NextResponse.json("Submission Failed, no user", { status: 500 });
}
