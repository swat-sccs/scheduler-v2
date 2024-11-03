"use client";
import {
  Card,
  CardBody,
  Divider,
  Link,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { tv } from "tailwind-variants";
import { courseColors } from "@/components/primitives";

import { InstructorCard } from "./InstructorCard";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
export const card = tv({
  slots: {
    base: "bg-light_foreground min-h-32 max-h-32 w-[98%] rounded-sm scroll-none drop-shadow-lg transition-colors",
    role: "font-bold  text-primary ",
  },
});

const {
  base,

  role,
} = card();

function generateColorFromName(name: string) {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  return courseColors[hash % courseColors.length];
}

async function updatePlan(course: any) {
  console.log("updating");
  await axios
    .post("/api/updatePlan", {
      course: course,
    })
    .then(function (response) {
      //console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function CourseCard(props: any) {
  let color = generateColorFromName(props.course.subject);

  return (
    <Card key={props.course.id} className={base()} shadow="sm" isHoverable>
      <div
        className={`absolute top-0 left-0 h-full w-2 rounded-full`}
        style={{ backgroundColor: color }}
      />

      <CardBody
        className="ml-4 overflow-clip "
        onClick={() => updatePlan(props.course)}
      >
        {/* 3 cols 2 rows*/}
        <div className="grid grid-cols-7  grid-rows-3">
          <div className="col-span-4 row-start-1 col-start-1">
            <p className={role()}>
              {props.course.subject +
                " " +
                props.course.courseNumber +
                " - " +
                props.course.courseTitle}
            </p>
          </div>
          <div className="row-start-1 row-span-3 col-start-6 mb-5">
            <Divider orientation="vertical" />
          </div>
          <div className="row-start-1  col-start-6 col-span-2 text-center">
            {props.course.instructor ? (
              <Popover showArrow placement="right">
                <PopoverTrigger>
                  <User
                    avatarProps={{
                      size: "sm",

                      isBordered: true,
                      className:
                        "base: bg-gradient-to-br from-[#333C44] to-[#9FADBC]",
                    }}
                    name={props.course.instructor.displayName}
                  />
                </PopoverTrigger>
                <PopoverContent className="p-1 bg-gradient-to-br from-white/[0.2] backdrop-blur-5 shadow-sm">
                  <InstructorCard
                    instructor={props.course.instructor.displayName}
                  />
                </PopoverContent>
              </Popover>
            ) : null}
          </div>

          <div className="row-start-3 text-center col-start-6 col-span-2">
            <div className="">{props.course.creditHours} credit(s)</div>
          </div>
          <div className="text-xs ">
            {/*props.course.courseReferenceNumber.replace(
                  props.course.year,
                  ""
                )*/}
          </div>

          <div className="row-start-2 col-start-6 col-span-2 text-center">
            {/* <PersonIcon /> */}
            {props.course.enrollment}/{props.course.maximumEnrollment}
          </div>

          <div className="row-start-2 col-start-1  ">
            <div className={role()}>Attributes</div>
            {props.course.sectionAttributes.map((attribute: any) => (
              <div key={attribute.courseReferenceNumber} className="text-xs ">
                {attribute.code}
              </div>
            ))}
          </div>

          {/*
            <div className="flex w-11/12">
              <div>
                <p className={role()}>Availability</p>
                <div className="text-xs">
                  {props.course.enrollment}/{props.course.maximumEnrollment}
                </div>
              </div>
              <div>
                <p className={role()}>Attributes</p>
                {props.course.sectionAttributes.map((attribute: any) => (
                  <div
                    key={attribute.courseReferenceNumber}
                    className="text-xs "
                  >
                    {attribute.code}
                  </div>
                ))}
              </div>

              {props.course.facultyMeet.meetingTimes ? (
                <div>
                  <p className={role()}>Days</p>
                  <div className="text-xs mt-2">
                    {props.course.facultyMeet.meetingTimes.monday ? "M" : null}{" "}
                    {props.course.facultyMeet.meetingTimes.tuesday ? "T" : null}{" "}
                    {props.course.facultyMeet.meetingTimes.wednesday
                      ? "W"
                      : null}{" "}
                    {props.course.facultyMeet.meetingTimes.thursday
                      ? "TH"
                      : null}{" "}
                    {props.course.facultyMeet.meetingTimes.friday ? "F" : null}{" "}
                    {props.course.facultyMeet.meetingTimes.saturday
                      ? "Sat"
                      : null}{" "}
                    {props.course.facultyMeet.meetingTimes.sunday
                      ? "Sun"
                      : null}
                  </div>
                </div>
              ) : null}

              {props.course.facultyMeet.meetingTimes ? (
                <div className="mt-2">
                  <p className={role()}>Time</p>
                  <div className="text-xs ">
                    {" "}
                    {props.course.facultyMeet.meetingTimes.beginTime.slice(
                      0,
                      2
                    ) +
                      ":" +
                      props.course.facultyMeet.meetingTimes.beginTime.slice(
                        2
                      )}{" "}
                    -{" "}
                    {props.course.facultyMeet.meetingTimes.endTime.slice(0, 2) +
                      ":" +
                      props.course.facultyMeet.meetingTimes.endTime.slice(2)}
                  </div>
                </div>
              ) : null}
            </div>
            {props.course.instructor ? (
              <div>
                <p className={role()}>Instructor</p>
                <div className="text-xs">
                  {props.course.instructor.displayName}
                </div>
              </div>
            ) : null}
            {props.course.facultyMeet.meetingTimes ? (
              <div className="mt-2">
                <p className={role()}>Room</p>
                <p className="text-xs">
                  {props.course.facultyMeet.meetingTimes.buildingDescription}
                  {<br />}
                  {props.course.facultyMeet.meetingTimes.room}
                </p>
              </div>
            ) : null}

            */}
        </div>
      </CardBody>
    </Card>
  );
}
