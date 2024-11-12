"use client";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import Image from "next/image";
import { tv } from "tailwind-variants";
import axios from "axios";

import { generateColorFromName } from "../components/primitives";
import { Error } from "@mui/icons-material";
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
  const color = generateColorFromName(props.course.subject);

  const color_mappings: { [key: string]: string } = {
    "0": "#4CB944",
    "1": "#fb5607",
    "2": "#ff006e",
    "3": "#8338ec",
    "4": "#3a86ff",
  };

  const days = {
    M: props.course.facultyMeet.meetingTimes.monday,
    T: props.course.facultyMeet.meetingTimes.tuesday,
    W: props.course.facultyMeet.meetingTimes.wednesday,
    TH: props.course.facultyMeet.meetingTimes.thursday,
    F: props.course.facultyMeet.meetingTimes.friday,
  };

  const coloredDays = Object.entries(days).map((item, index) => {
    if (item[1]) {
      return (
        <div
          key={index}
          className="flex w-6 h-6 md:w-8 md:h-8 rounded-md justify-center items-center"
          style={{ backgroundColor: color_mappings[index] }}
        >
          <p className="font-bold text-sm md:text-base text-white">{item[0]}</p>
        </div>
      );
    }

    return null;
  });

  const attributeCodes = props.course.sectionAttributes.map(
    (item: any, index: number) => {
      if (item) {
        return (
          <Chip key={index} size="sm" variant={"bordered"}>
            <p> {item.code}</p>
          </Chip>
        );
      }

      return null;
    }
  );

  return (
    <Card key={props.course.id} isHoverable className={base()} shadow="sm">
      <div
        className="absolute top-0 left-0 h-full w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <CardHeader className="pl-6" onClick={() => updatePlan(props.course)}>
        <div className="flex items-center flex-row justify-between w-full">
          <div className="flex flex-col">
            <h1 className="font-bold text-md md:text-2xl text-left">
              {props.course.courseTitle.replace("&amp;", "&")}
            </h1>
            <h2 className="flex text-sm md:text-lg text-left">
              {props.course.subject} {props.course.courseNumber} |{" "}
              {props.course.creditHours} credit(s)
              {props.course.sectionAttributes.length > 0 && (
                <div className="hidden md:flex max-w-48 md:max-w-64 items-center">&nbsp;|&nbsp;{attributeCodes}</div>
              )}
            </h2>
          </div>
          <div className="flex items-center pt-2">
            <div className="absolute top-4 right-4 h-20 w-20 md:h-24 md:w-24 overflow-clip rounded-md">
              <Image
                // src={"https://www.swarthmore.edu/sites/default/files/styles/headshot/public/assets/images/user_photos/cmurphy4.jpg.webp"}
                alt={props.course.instructor.displayName.replace("&#39;", "'")}
                fill
                className="object-cover overflow-clip"
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 15vw"
                loading={"lazy"}
                src={
                  "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg"
                }
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="pt-0 pl-6" onClick={() => updatePlan(props.course)}>
        <div className="flex justify-between flex-row">
          <div className="gap-4">
            {props.course.facultyMeet.meetingTimes.room ? (
              <div className="bg-[#2C2C33] py-1 px-2 md:py-2 md:px-3 w-auto max-w-64 rounded-md">
                <div className="font-semibold text-sm md:text-lg text-white">
                  {props.course.facultyMeet.meetingTimes.buildingDescription}{" "}
                  {props.course.facultyMeet.meetingTimes.room}
                </div>
                <div className="text-sm md:text-base">
                  {props.course.facultyMeet.meetingTimes ? (
                    <div className="mt-1">
                      <div className="font-normal">
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
                        {props.course.facultyMeet.meetingTimes.endTime.slice(
                          0,
                          2
                        ) +
                          ":" +
                          props.course.facultyMeet.meetingTimes.endTime.slice(
                            2
                          )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="bg-[#2C2C33] py-2 px-3 w-auto max-w-64 rounded-md">
                <p className="font-semibold">
                  Contact your Professor for additional details.
                </p>
              </div>
            )}
            <div className="flex flex-row">
              <div className="flex flex-row gap-2 mt-4">{coloredDays}</div>
            </div>
          </div>
          <div className="flex flex-col pr-3 pt-10">
            <div className="flex flex-row gap-5 justify-end">
              <div>
                <div className="text-right text-sm md:text-md">Instructor</div>
                <div className="text-right text-md md:text-xl font-bold">
                  {props.course.instructor.displayName.replace("&#39;", "'")}
                </div>
              </div>

              {props.course.instructor.avgRating == null ? null : (
                <div className="flex bg-green-500 w-16 h-16 items-center justify-center rounded-md">
                  <div className="font-black text-3xl">
                    {props.course.instructor.avgRating}
                  </div>
                </div>
              )}
            </div>
            {props.course.seatsAvailable == 0 ? (
              <div className="flex flex-row pt-2 gap-2 items-center">
                <div className="font-medium text-slate text-right">
                  No available seats left for this section
                </div>
                <Error color="error" />
              </div>
            ) : (
              <div className="flex flex-row ml-auto pt-1 md:pt-2 gap-2">
                <div className="text-sm md:text-md text-slate">
                  Seats Available: {props.course.seatsAvailable}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
