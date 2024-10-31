"use server";

import { cookies } from "next/headers";

export async function setPlanCookie(plan: string) {
  //@ts-ignore
  (await cookies()).set("plan", plan);
}

export async function getPlanCookie() {
  const cookieStore = await cookies();
  //@ts-ignore
  const plan = await cookieStore.get("plan");

  const out = plan ? plan.value : undefined;

  return out;
}
