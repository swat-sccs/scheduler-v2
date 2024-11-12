import * as React from "react";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import Search from "../components/Search";
import { FullCourseList } from "../components/FullCourseList";
import CreatePlan from "../components/CreatePlan";
import prisma from "../lib/prisma";

async function getCourses() {
  const courses = await prisma.course.findMany();
  const output: any = [];

  for (let i = 0; i < courses.length; i++) {
    if (!output.includes(courses[i].year)) {
      output.push(courses[i].year);
    }
  }

  return output;
}

async function getUniqueStartEndTimes() {
  const meetingTimes = await prisma.meetingTime.findMany({
    where: {
      beginTime: { not: "" },
    },
    orderBy: {
      beginTime: "asc",
    },
  });
  const startTimes: any = [];
  const endTimes: any = [];

  for (let i = 0; i < meetingTimes.length; i++) {
    if (!startTimes.includes(meetingTimes[i].beginTime)) {
      startTimes.push(meetingTimes[i].beginTime);
    }
    if (!endTimes.includes(meetingTimes[i].endTime)) {
      endTimes.push(meetingTimes[i].endTime);
    }
  }

  const times = { startTimes: startTimes, endTimes: endTimes };

  return times;
}

async function getUniquCodes() {
  const codes = await prisma.sectionAttribute.findMany();
  const daCodes: any = [];

  for (let i = 0; i < codes.length; i++) {
    if (!daCodes.includes(codes[i].code)) {
      daCodes.push(codes[i].code);
    }
  }

  return daCodes;
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    term?: string;
    dotw?: Array<string>;
    stime?: Array<string>;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const term = searchParams?.term || "";
  const dotw = searchParams?.dotw || [];
  const stime = searchParams?.stime || [];
  const homePageProps: any = {};

  homePageProps["fullCourseList"] = (
    <Suspense
      fallback={
        <div className="grid gap-4 ">
          <Skeleton className="rounded-lg w-full h-48 align-top justify-start" />
          <Skeleton className="rounded-lg w-full h-48 align-top justify-start" />
          <Skeleton className="rounded-lg w-full h-48 align-top justify-start" />
        </div>
      }
    >
      <FullCourseList dotw={dotw} query={query} stime={stime} term={term} />
    </Suspense>
  );

  homePageProps["createPlan"] = (
    <Suspense
      fallback={
        <Skeleton className="rounded-lg w-8/12 h-full align-top justify-start" />
      }
    >
      <CreatePlan />
    </Suspense>
  );

  return <Home {...homePageProps} />; // return with no events
}
async function Home(props: any) {
  const terms = await getCourses();
  const uniqueTimes = await getUniqueStartEndTimes();
  const codes = await getUniquCodes();

  return (
    <>
      <div className="grid grid-cols-3 p-4 h-full">
        <div className="col-span-3 md:col-span-2 col-start-1">
          <div className="grid grid-rows-subgrid grid-cols-1 gap-5 h-full">
            <div className="row-start-1 mt-auto mb-auto">
              <Search codes={codes} terms={terms} times={uniqueTimes} />
            </div>
            <div className="row-start-2 h-[62vh] overflow-y-scroll overflow-x-clip scrollbar-thin scrollbar-thumb-accent-500 scrollbar-track-transparent">
              {props.fullCourseList}
            </div>
          </div>
        </div>
        <div className="col-span-3 md:col-start-3">
          <CreatePlan />
        </div>
      </div>
    </>
  );
}
