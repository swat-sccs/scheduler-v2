import * as React from "react";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import { cookies } from "next/headers";
import Search from "../components/Search";
import { FullCourseList } from "../components/FullCourseList";
import CreatePlan from "../components/CreatePlan";
import {
  getInitialCourses,
  getPlanCourses1,
  getTerms,
  getUniqueStartEndTimes,
  getUniqueCodes,
} from "../app/actions/getCourses";
import { redirect } from "next/navigation";
import { CoursePlan } from "@prisma/client";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    term?: string;
    dotw?: Array<string>;
    stime?: Array<string>;
  }>;
}) {
  const cookieStore = await cookies();
  const planID = await cookieStore.get("plan");
  const pagePref = cookieStore.get("pagePref");

  if (pagePref && pagePref.value != "/") {
    redirect(pagePref.value);

  }

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const term = searchParams?.term || "";
  const dotw = searchParams?.dotw || [];
  const stime = searchParams?.stime || [];
  const homePageProps: any = {};
  const initalCourses = await getInitialCourses(query, term, dotw, stime);
  const planCourses: CoursePlan[] = await getPlanCourses1();

  homePageProps["fullCourseList"] = (
    <Suspense
      fallback={
        <div className="grid gap-3">
          <Skeleton className="rounded-md w-[98%] h-48 align-top justify-start" />
          <Skeleton className="rounded-md w-[98%] h-48 align-top justify-start" />
          <Skeleton className="rounded-md w-[98%] h-48 align-top justify-start" />
        </div>
      }
    >
      <FullCourseList
        init={initalCourses}
        dotw={dotw}
        query={query}
        stime={stime}
        term={term}
      />
    </Suspense>
  );

  homePageProps["createPlan"] = (
    <Suspense
      fallback={
        <Skeleton className="rounded-lg w-8/12 h-fit align-top justify-start" />
      }
    >
      <CreatePlan initialPlan={planCourses} />
    </Suspense>
  );

  return <Home {...homePageProps} />; // return with no events
}
async function Home(props: any) {
  const terms = await getTerms();
  const uniqueTimes = await getUniqueStartEndTimes();
  const codes = await getUniqueCodes();

  return (
    <>
      <div className="grid grid-cols-10 p-3 lg:p-4 h-full">
        <div className="col-span-10 lg:col-span-7">
          <div className="flex flex-col gap-3 h-full">
            <Search codes={codes} terms={terms} times={uniqueTimes} />
            <div className="h-[70vh] overflow-y-scroll overflow-x-clip scrollbar-thin scrollbar-thumb-accent-500 scrollbar-track-transparent">
              {props.fullCourseList}
            </div>
          </div>
        </div>
        <div className="col-span-10 lg:col-span-3 lg:ml-[5vw]">
          {props.createPlan}
        </div>
      </div>
    </>
  );
}
