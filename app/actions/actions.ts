"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function setPlanCookie(plan: string) {
  (await cookies()).set("plan", plan);
}

export async function getPlanCookie() {
  const cookieStore = await cookies();
  const plan = cookieStore.get("plan");

  const out = plan ? plan.value : undefined;

  return out;
}

export async function setSelectedCookie(selected: any) {
  (await cookies()).set("selectedCourses", selected);
}

export async function getSelectedCoursesCookie() {
  const cookieStore = await cookies();
  const plan = cookieStore.get("selectedCourses");

  const out = plan ? plan.value : undefined;

  return out;
}
