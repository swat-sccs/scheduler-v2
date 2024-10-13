import * as React from "react";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import Search from "@/components/Search";
import { FullCourseList } from "@/components/FullCourseList";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  var homePageProps: any = {};

  homePageProps["fullCourseList"] = (
    <Suspense fallback={<Skeleton className="rounded-lg w-7/12" />}>
      <FullCourseList query={query} />
    </Suspense>
  );

  return <Home {...homePageProps} />; // return with no events
}
async function Home(props: any) {
  return (
    <>
      <div className=" h-[550px] grid grid-cols-1 gap-4 -mt-10">
        <Search />
        {props.fullCourseList}
      </div>
    </>
  );
}
