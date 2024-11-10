"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Textarea,
  Select,
  SelectItem,
  Popover,
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Input,
} from "@nextui-org/react";
import useSWR from "swr";

export default function RatingPage() {
  const fetcher = (url: any) => fetch(url).then((r) => r.json());
  const {
    data: courses,
    isLoading,
    error,
  } = useSWR("/api/getCourses", fetcher, {});
  return (
    <Card className="">
      <CardHeader className="">
        <h1 className=" text-center ml-auto mr-auto col-span-3 row-start-1 row-span-1  text-2xl">
          Leave a Rating
        </h1>
      </CardHeader>
      <CardBody className="grid grid-cols-10 grid-rows-6 gap-10 px-10 justify-center items-center">
        <Autocomplete
          variant={"bordered"}
          labelPlacement="outside-left"
          label="Select a Class"
          placeholder="Search for a class"
          className="col-span-8 col-start-2 max-w-xs "
        >
          {courses?.map((course: any) => (
            <AutocompleteItem key={course.id}>
              {course.courseTitle}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <Textarea
          disableAutosize
          className="row-start-3 col-span-3 row-span-2"
          label="Review"
          placeholder="What did you think of this prof/class?"
        ></Textarea>
      </CardBody>
    </Card>
  );
}
