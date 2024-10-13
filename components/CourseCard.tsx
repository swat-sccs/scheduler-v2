"use client";
import { Card, CardBody } from "@nextui-org/react";
import { tv } from "tailwind-variants";

export const card = tv({
  slots: {
    base: "bg-light_foreground min-h-40 max-h-96 w-full rounded-sm scroll-none",
    avatar:
      "w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto drop-shadow-lg",
    wrapper: "flex-1 pt-6 md:p-8 text-center md:text-left space-y-4",
    description: "text-md font-medium ",
    infoWrapper: "font-medium",
    name: "text-sm text-sky-500 dark:text-sky-400",
    role: "font-bold  text-primary ",
    sideColor: "w-2 h-full bg-red-500",
  },
});

const {
  base,
  avatar,
  wrapper,
  description,
  infoWrapper,
  name,
  role,
  sideColor,
} = card();

export default function CourseCard(props: any) {
  return (
    <>
      <Card key={props.course.id} className={base()} shadow="sm">
        <div
          className={`absolute top-0 left-0 h-full w-3 bg-red-500 rounded-full`}
        />
        <CardBody className="ml-4 overflow-clip ">
          <div className="grid grid-cols-1  grid-rows-2">
            <div className="flex justify-between w-11/12">
              <span>
                <p className={role()}>
                  {props.course.subject +
                    " " +
                    props.course.courseNumber +
                    " - " +
                    props.course.courseTitle}
                </p>
              </span>
              <span className="text-center">
                <div className="text-xs">
                  {props.course.creditHours} credit(s)
                </div>
                <div className="text-xs ">
                  {props.course.courseReferenceNumber.replace(
                    props.course.year,
                    ""
                  )}
                </div>
              </span>
            </div>

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
            <div className="grid-rows-2 grid-cols-1 ">
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
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
