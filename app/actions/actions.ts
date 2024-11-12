"use server";

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
