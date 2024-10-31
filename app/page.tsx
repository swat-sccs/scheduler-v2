import * as React from "react";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import Search from "@/components/Search";
import { FullCourseList } from "@/components/FullCourseList";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  var homePageProps: any = {};

  homePageProps["fullCourseList"] = (
    <Suspense
      fallback={
        <Skeleton className="rounded-lg w-8/12 h-full align-top justify-start" />
      }
    >
      <FullCourseList query={query} />
    </Suspense>
  );

  return <Home {...homePageProps} />; // return with no events
}

async function Home(props: any) {
  return (
    <>
      <div className="grid grid-cols-1 h-[630px] p-4 -mt-10">
        <Search />
        <div className="mt-10"></div>
        {props.fullCourseList}
      </div>
    </>
  );
}
