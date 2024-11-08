"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { generateColorFromName } from "../components/primitives";
import { ScrollShadow } from "@nextui-org/react";

import { InstructorCard } from "./InstructorCard";
import AddIcon from "@mui/icons-material/Add";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

import axios from "axios";

export const card = tv({
  slots: {
    base: "bg-light_foreground min-h-32 max-h-62 w-[98%] rounded-sm scroll-none drop-shadow-lg transition-colors",
    role: "font-bold  text-primary ",
  },
});

const { base, role } = card();

async function updatePlan(course: any) {
  console.log("updating");
  await axios
    .post("/api/updatePlan", {
      course: course,
    })
    .then(function (response) {
      // Handle response
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function CourseCard(props: any) {
  console.log(props.course)
  let color = generateColorFromName(props.course.subject);

  const color_mappings: { [key: string]: string } = {
    "0": "#4CB944",
    "1": "#fb5607",
    "2": "#ff006e",
    "3": "#8338ec",
    "4": "#3a86ff",
  };

  const days = {
    "M": props.course.facultyMeet.meetingTimes.monday,
    "T": props.course.facultyMeet.meetingTimes.tuesday,
    "W": props.course.facultyMeet.meetingTimes.wednesday,
    "TH": props.course.facultyMeet.meetingTimes.thursday,
    "F": props.course.facultyMeet.meetingTimes.friday
  };

  const coloredDays = Object.entries(days).map((item, index) => {
    if (item[1]) {
      return (
        <div
          key={index}
          className="flex w-8 h-8 rounded-md justify-center items-center"
          style={{ backgroundColor: color_mappings[index] }}
        >
          <p className="font-bold text-white">{item[0]}</p>
        </div>
      );
    }
    return null;
  });

  const attributeCodes = props.course.sectionAttributes.map((item, index: number) => {
    if (item) {
      return <p key={index}>{item.code}</p>
    }

    return null;
  });

  return (
    <Card key={props.course.id} className={base()} shadow="sm" isHoverable>
      <div
        className="absolute top-0 left-0 h-full w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div className="pl-6">
        <CardHeader>
          <div className="flex items-center flex-row justify-between w-full">
            <div className="flex flex-col">
              <h1 className="font-bold text-3xl text-left">
                {props.course.courseTitle}
              </h1>
              <h2 className="flex text-left">
                {props.course.subject} {props.course.courseNumber} |{" "}
                {props.course.creditHours} credit(s) |
                {props.course.sectionAttributes.length > 0 && attributeCodes}
              </h2>
            </div>
            <div className="flex items-center ml-auto mr-8">
              <Image
                // src={"https://www.swarthmore.edu/sites/default/files/styles/headshot/public/assets/images/user_photos/cmurphy4.jpg.webp"}
                src={"https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg"}
                width={100}
                height={100}
                alt="Professor"
                className="object-cover rounded-md absolute top-6 right-6"
              />
            </div>
          </div>
        </CardHeader>

        <CardBody className="mt-0 mb-2">
          <div className="flex justify-between flex-row">
            <div className="gap-10">
              {props.course.facultyMeet.meetingTimes.room ? (<div className="bg-[#2C2C33] p-3 w-64 rounded-md">
                <p className="font-semibold text-lg text-white">
                  {props.course.facultyMeet.meetingTimes.buildingDescription}{" "}
                  {props.course.facultyMeet.meetingTimes.room}
                </p>
                <div className="text-base">
                  {props.course.facultyMeet.meetingTimes ? (
                    <div className="mt-2">
                      <p className="font-normal">
                        {" "}
                        {props.course.facultyMeet.meetingTimes.beginTime.slice(0, 2) +
                          ":" +
                          props.course.facultyMeet.meetingTimes.beginTime.slice(2)}{" "}
                        -{" "}
                        {props.course.facultyMeet.meetingTimes.endTime.slice(0, 2) +
                          ":" +
                          props.course.facultyMeet.meetingTimes.endTime.slice(2)}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>) : <div className="bg-[#2C2C33] p-4 w-64 rounded-md">
                <p className="font-semibold">Contact your Professor for additional details.</p>
              </div>}
              <div className="flex flex-row">
                <div className="flex flex-row gap-2 mt-5">
                  {coloredDays}
                </div>
              </div>
            </div>
            <div className="flex flex-col pr-3 pt-10">
              <div className="flex flex-row gap-5 justify-end">
                <div>
                  <p className="text-right font-medium">Instructor</p>
                  <p className="text-2xl font-bold">{props.course.instructor.displayName}</p>
                </div>
                <div className="flex bg-green-500 w-16 h-16 items-center justify-center rounded-md">
                  <p className="font-black text-3xl">?</p>
                </div>
              </div>
              {props.course.seatsAvailable >= 0 && <div className="flex flex-row items-end pt-4 gap-2">
                <p className="font-medium text-slate">No available seats left for this section</p>
                <ErrorRoundedIcon color="error" />
              </div>}
            </div>
          </div>
        </CardBody>
      </div>
    </Card>
  );
}
