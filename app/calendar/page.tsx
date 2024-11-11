// a plugin!

import CreatePlan from "../../components/CreatePlan";
import Calendar from "../../components/Calendar";
import prisma from "../../lib/prisma";
import { getPlanCookie } from "../actions";
import { generateColorFromName } from "../../components/primitives";
export default async function CalendarPage() {
  async function getEvents() {
    const output: any = [];
    const planCookie: any = await getPlanCookie();

    let courses;

    if (planCookie) {
      const plan = await prisma.coursePlan.findUnique({
        where: {
          id: parseInt(planCookie),
        },
        include: {
          courses: true,
        },
      });

      courses = plan?.courses;
    }

    if (courses) {
      for (let i = 0; i < courses.length; i++) {
        const color = generateColorFromName(courses[i].subject);

        const num: string = courses[i].courseReferenceNumber;
        const meetingTimes = await prisma.meetingTime.findFirst({
          where: {
            courseReferenceNumber: num,
          },
        });

        output.push({
          classNames: "font-sans",
          textColor: "white",
          title: courses[i]?.courseTitle,
          daColor: color,
          subject: courses[i]?.subject,
          color: "rgba(0,0,0,0)",

          borderWidth: "0px",
          daysOfWeek: [
            meetingTimes?.sunday && "0",
            meetingTimes?.monday && "1",
            meetingTimes?.tuesday && "2",
            meetingTimes?.wednesday && "3",
            meetingTimes?.thursday && "4",
            meetingTimes?.friday && "5",
            meetingTimes?.saturday && "6",
          ],

          startTime:
            meetingTimes?.beginTime.slice(0, 2) +
            ":" +
            meetingTimes?.beginTime.slice(2),
          endTime:
            meetingTimes?.endTime.slice(0, 2) +
            ":" +
            meetingTimes?.endTime.slice(2),
        });
      }
    }

    return output;
  }

  async function getUniqueStartEndTimes() {
    const maxstart = await prisma.meetingTime.findFirst({
      where: {
        beginTime: { not: "" },
      },
      orderBy: {
        beginTime: "desc",
      },
    });
    const maxend = await prisma.meetingTime.findFirst({
      where: {
        endTime: { not: "" },
      },
      orderBy: {
        beginTime: "desc",
      },
    });

    /*
    let times = {
      minTime:
        maxstart?.beginTime.slice(0, 2) + ":" + maxstart?.beginTime.slice(2),
      maxTime:
        maxstart?.endTime.slice(0, 2) + ":" + maxstart?.beginTime.slice(2),
    };*/
    console.log(maxstart);

    return maxstart;
  }

  const events = await getEvents();

  //let times = await getUniqueStartEndTimes();
  return (
    <div className="grid grid-cols-3 p-4 -mt-20 w-screen absolute start-0 px-32 gap-20">
      <div className=" col-start-1 h-[70vh] w-[57vw] col-span-2 font-sans font-normal">
        <Calendar events={events} />
      </div>
      <div className="col-start-3 h-[62vh] ">
        <CreatePlan />
      </div>
    </div>
  );
}
