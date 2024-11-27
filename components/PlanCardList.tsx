import { Course } from "@prisma/client";

import prisma from "../lib/prisma";

import PlanCard from "./PlanCard";

async function getPlanCourses(planID: any) {
  //let DOTW: Array<String> = dotw.split(",");

  return await prisma.course.findMany({
    where: {
      CoursePlan: {
        some: {
          id: parseInt(planID),
        },
      },
    },
    include: {
      CoursePlan: true,
    },
  });
}

export async function PlanCardList({ planID }: { planID: any }) {
  const courseList: Course[] = await getPlanCourses(planID);

  return (
    <>
      <div className="grid gap-4 ">
        {courseList?.map((course: any) => (
          <div key={course.id}>
            <PlanCard course={course} />
          </div>
        ))}
      </div>
    </>
  );
}
