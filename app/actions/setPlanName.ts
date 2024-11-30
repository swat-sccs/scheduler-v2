"use server";

import prisma from "@/lib/prisma";

export async function setPlanName(planName: string, id: string) {
  const newPlan = await prisma.coursePlan.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: planName,
    },
  });
}
