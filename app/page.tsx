"use client";

import { CourseBig } from "@/components/course-big";
export default function Home() {
  return (
    <div className="grid gap-4 max-h-8/12 overflow-scroll w-7/12">
      <CourseBig color="bg-red-500" />
      <CourseBig color="bg-yellow-500" />
      <CourseBig color="bg-green-500" />
    </div>
  );
}
