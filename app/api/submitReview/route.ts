import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../lib/prisma";
import { auth } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const facultyID = parseInt(await data.facultyID);
  const courseID = parseInt(await data.courseID);

  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      uuid: session?.user?.id,
    },
  });
  const theClass = await prisma.course.findUnique({
    where: {
      id: parseInt(data.courseID),
    },
  });
  const profs = await prisma.faculty.findUnique({
    select: {
      displayName: true,
      bannerId: true,
      uid: true,
    },

    where: {
      id: parseInt(data.facultyID),
    },
  });
  if (user?.id && theClass && profs) {
    /*
    const newReview = await prisma.rating.create({
      data: {
        userId: user?.id,
        overallRating: data.overallRating,
        difficulty: data.difficulty,
        takeAgain: data.takeAgain,
        forCredit: data.forCredit,
        grade: data.grade,
        review: data.review,
        courseSubject: theClass.subject,
        courseNumber: theClass.courseNumber,
        courseName: theClass.courseTitle,
        termTaken: data.termTaken,
        yearTaken: parseInt(data.yearTaken),
        profDisplayName: profs.displayName,
        profBannerId: profs.bannerId,
        profUid: profs.uid,
      },
      
    });

    if (newReview) {
      const ratings = await prisma.rating.findMany({
        where: {
          profUid: {
            equals: profs.uid,
          },
        },
      });
      let count: any = { one: 0, two: 0, three: 0, four: 0, five: 0 };

      if (ratings) {
        if (ratings?.length > 0) {
          for (const rating of ratings) {
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
              ratings.length
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
    }
      */
  }

  //console.log(plans);
  return NextResponse.json("Submission Failed, no user", { status: 500 });
}
