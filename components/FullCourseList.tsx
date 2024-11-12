"use client";
import { Course, Prisma } from "@prisma/client";

import prisma from "../lib/prisma";
import { useEffect, useState } from "react";

import CourseCard from "./CourseCard";
import React from "react";
import { getCourses, getInitialCourses } from "../app/actions/getCourses";
import { useInView } from "react-intersection-observer";

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

  const [courses, setCourses] = useState<Course[]>(init);
  const { ref, inView } = useInView();
  const { ref: myref, inView: myinView } = useInView();

  const loadMoreUsers = async () => {
    if (inView) {
      setCursor((cursor) => cursor + NUMBER_OF_USERS_TO_FETCH);
      setTake((take) => take + NUMBER_OF_USERS_TO_FETCH);
    }

    const apiCourses = await getCourses(take, cursor, query, term, dotw, stime);
    setCourses(apiCourses);
  };
  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);
  useEffect(() => {
    loadMoreUsers();
  }, [query]);
  useEffect(() => {
    loadMoreUsers();
  }, [term]);
  useEffect(() => {
    loadMoreUsers();
  }, [dotw]);
  useEffect(() => {
    loadMoreUsers();
  }, [stime]);
  //const courseList: Course[] = await getCourses(query, term, dotw, stime);
  return (
    <>
      <div ref={myref}></div>
      <div className="grid gap-4 ">
        {courses?.map((course: any) => (
          <div key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
        <div ref={ref}>.</div>
      </div>
    </>
  );
}
