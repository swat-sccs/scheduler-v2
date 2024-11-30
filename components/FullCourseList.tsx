"use client";
import { Course, Prisma } from "@prisma/client";

import { useCallback, useEffect, useState } from "react";

import CourseCard from "./CourseCard";
import React from "react";
import { getCourses, getCourseIds } from "../app/actions/getCourses";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import CourseCardAdded from "./CourseCardAdded";
import {
  getSelectedCoursesCookie,
  setSelectedCookie,
} from "app/actions/actions";

const NUMBER_OF_USERS_TO_FETCH = 10;

export function FullCourseList({
  init,
  query,
  term,
  dotw,
  stime,
}: {
  init: Course[];
  query: string;
  term: string;
  dotw: Array<string>;
  stime: Array<string>;
}) {
  const router = useRouter();

  const [cursor, setCursor] = useState(1);
  const [take, setTake] = useState(20);
  const [isDone, setIsDone] = useState(false);

  const [selectedCourses, setSelectedCourses]: any = useState([]);

  const [courses, setCourses] = useState<Course[]>(init);
  const { ref, inView } = useInView();

  const loadMoreCourses = useCallback(async () => {
    // NOTE: if this isn't done every time we get a double take and a
    // race condition desync, breaking isDone. Maybe we'll have better
    // logic in the future.

    setCursor((cursor) => cursor + NUMBER_OF_USERS_TO_FETCH);
    setTake((take) => take + NUMBER_OF_USERS_TO_FETCH);

    const apiCourses = await getCourses(take, query, term, dotw, stime);
    if (
      inView &&
      (apiCourses.length == 0 || apiCourses.length == courses.length)
    ) {
      console.log("setting isDone true");
      setIsDone(true);
    } else {
      setIsDone(false);
    }
    setCourses(apiCourses);

    // Prevent an infinite loop. TODO: better solution.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, term, dotw, stime, inView]);

  async function loadCourseIds() {
    console.log("LOADING IDS...");
    //const coursesInPlan = await getCourseIds();
    // let daCookie: any = await getSelectedCoursesCookie();

    //setSelectedCourses(daCookie.split(","));
    const ids = await getCourseIds();
    setSelectedCourses(ids);
    //console.log(daCookie.split(","));
    //setSelectedCourses(daCookie.split(","));
  }

  useEffect(() => {
    if (inView) {
      loadMoreCourses();
      loadCourseIds();
    }
  }, [inView, loadMoreCourses]);

  useEffect(() => {
    console.log("hello world");
    setIsDone(false);
    loadMoreCourses();
    loadCourseIds();
  }, [query, term, dotw, stime, loadMoreCourses, getCourseIds]);

  return (
    <>
      <div className="flex flex-col gap-3">
        {courses?.map((course: any) =>
          selectedCourses?.includes(course.id) ? (
            <div key={course.id}>
              <CourseCardAdded
                course={course}
                onClick={() => loadCourseIds()}
              />
            </div>
          ) : (
            <div key={course.id} onClick={() => loadCourseIds()}>
              <CourseCard course={course} />
            </div>
          )
        )}
        <div ref={ref}>
          {isDone ? (
            <></>
          ) : (
            <Skeleton className="rounded-md w-[98%] h-48 align-top justify-start" />
          )}
        </div>
      </div>
    </>
  );
}
