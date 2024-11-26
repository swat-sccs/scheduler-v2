"use server";

import { cookies } from "next/headers";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { getPlanCookie } from "./actions";
import { Faculty } from "@prisma/client";

export async function getProfs() {
  let profs: Faculty[] = [];
  let AllProfs = await prisma.faculty.findMany({
    orderBy: {
      displayName: "desc",
    },
  });

  console.log(AllProfs.length);

  return AllProfs;
}

export async function getYears() {
  let years: any = [];
  let AllCourses = await prisma.course.findMany();

  for (let i = 0; i < AllCourses.length; i++) {
    if (!years.includes(AllCourses[i].year)) {
      years.push(AllCourses[i].year);
    }
  }

  return years;
}
