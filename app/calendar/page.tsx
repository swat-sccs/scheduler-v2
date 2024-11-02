import { title } from "@/components/primitives";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import CreatePlan from "@/components/CreatePlan";
import moment from "moment";
import Calendar from "@/components/Calendar";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getPlanCookie } from "@/app/actions";
import { BorderColor } from "@mui/icons-material";

export default async function DocsPage() {
  async function getEvents() {
    const session = await auth();
    let output: any = [];
    let planCookie: any = await getPlanCookie();

    function generateColorFromName(name: string) {
      let hash = 0;

      for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i);
      }

      return courseColors[hash % courseColors.length];
    }
    const courseColors = [
      "#E8E288",
      "#7DCE82",
      "#3CDBD3",
      "#A491D3",
      "#1E2D2F",
      "#7CC6FE",
      "#5DFDCB",
      "#C3423F",

      "#9067C6",
      "#E6AF2E",
    ];
    let courses;
    if (planCookie) {
      let plan = await prisma.coursePlan.findUnique({
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
        let color = generateColorFromName(courses[i].subject);

        let num: string = courses[i].courseReferenceNumber;
        let meetingTimes = await prisma.meetingTime.findFirst({
          where: {
            courseReferenceNumber: num,
          },
        });
        output.push({
          classNames: "font-sans ",
          textColor: "white",
          title: courses[i]?.courseTitle,
          daColor: color,
          color: "rgba(0,0,0,0)",
          borderColor: "rgba(0,0,0,0)",
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
    console.log(output);
    return output;
  }

  let events = await getEvents();
  return (
    <div className="grid grid-cols-3 p-4 -mt-20 w-screen absolute start-0 px-32 gap-20">
      <div className=" col-start-1 h-[70vh] w-[57vw] col-span-2 font-sans font-normal">
        <Calendar events={events} />
      </div>
      <div className="">
        <CreatePlan />
      </div>
    </div>
  );
}
