import { Course, CoursePlan } from "@prisma/client";
import prisma from "../lib/prisma";
import PlanCard from "./PlanCard";

async function getPlans(planId: any) {
  const courses = await prisma.course.findMany({
    where: {
      id: planId,
    },
  });
  /*
  const plans = await prisma.coursePlan.findMany({
    where: {
      User: {
        //@ts-ignore
        uuid: session?.user?.id,
      },
    },
    include: {
      courses: true,
    },
  });*/
  return courses;
}

export async function PlanCardList(planId: any) {
  const courses: Course[] = await getPlans(planId);

  return (
    <>
      <div className="grid gap-4 ">
        {courses?.map((course: any) => (
          <div key={course.id}>
            <PlanCard course={course} />
          </div>
        ))}
      </div>
    </>
  );
}
