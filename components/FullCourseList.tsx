"use client";
import { Course, Prisma } from "@prisma/client";

import prisma from "../lib/prisma";
import { useEffect, useState } from "react";

import CourseCard from "./CourseCard";
import React from "react";
import { getCourses, getInitialCourses } from "../app/actions/getCourses";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@nextui-org/react";

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
  const [cursor, setCursor] = useState(1);
  const [take, setTake] = useState(20);
  const [isDone, setIsDone] = useState(false);

  const [courses, setCourses] = useState<Course[]>(init);
  const { ref, inView } = useInView();

  const loadMoreUsers = async () => {
    if (inView) {
      setCursor((cursor) => cursor + NUMBER_OF_USERS_TO_FETCH);
      setTake((take) => take + NUMBER_OF_USERS_TO_FETCH);
    }

    const apiCourses = await getCourses(take, cursor, query, term, dotw, stime);
    console.log("apiCourses");
    console.log(apiCourses);
    if (apiCourses.length == 0 || apiCourses.length == courses.length) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
    setCourses(apiCourses);
  };
  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);
  useEffect(() => {
    setIsDone(false);
    loadMoreUsers();
  }, [query, term, dotw, stime]);
  //const courseList: Course[] = await getCourses(query, term, dotw, stime);
  return (
    <>
      <div className="grid gap-3 ">
        {courses?.map((course: any) => (
          <div key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
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
