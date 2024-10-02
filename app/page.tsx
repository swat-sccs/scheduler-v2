"use client";

import { Input } from "@nextui-org/react";
import SearchIcon from "@mui/icons-material/Search";

import { CourseBig } from "@/components/course-big";

export default function Home() {
  return (
    <div className=" h-[550px] grid grid-cols-1 gap-4 -mt-10">
      <Input
        classNames={{
          base: "max-w-full sm:max-w-[10rem] h-12 mt-0",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon />}
        type="search"
      />

      <div className="grid gap-4  overflow-scroll w-7/12">
        <CourseBig color="bg-red-500" />
        <CourseBig color="bg-yellow-500" />
        <CourseBig color="bg-green-500" />
        <CourseBig color="bg-green-500" />
      </div>
    </div>
  );
}
