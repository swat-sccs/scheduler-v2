import { title } from "@/components/primitives";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import CreatePlan from "@/components/CreatePlan";
import moment from "moment";
import Calendar from "@/components/Calendar";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getPlanCookie } from "@/app/actions";

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
      "#FF8360",
      "#E8E288",
      "#7DCE82",
      "#3CDBD3",
      "#A491D3",
      "#1E2D2F",
      "#7CC6FE",
      "#5DFDCB",
      "#C3423F",
      "#05668D",
      "#037171",
      "#9067C6",
      "#E6AF2E",
    ];

    let plans = await prisma.coursePlan.findMany({
      where: {
        AND: {
          User: {
            //@ts-ignore
            uuid: session?.user.id,
          },
          //id: parseInt(planCookie),
        },
      },

      include: {
        courses: true,
      },
    });
    /*FIX ME
    let courses1 = await prisma.course.findMany({
      where: {
        CoursePlan: {
          id: parseInt(planCookie),
        },
      },

      include: {
        CoursePlan: true,
      },
    });
*/
    let filtered_data = plans.filter(
      (plan: any) => plan.id == parseInt(planCookie)
    );

    let courses = filtered_data[0].courses;

    for (let i = 0; i < courses.length; i++) {
      let color = generateColorFromName(courses[i].subject);

      let num: string = courses[i].courseReferenceNumber;
      let meetingTimes = await prisma.meetingTime.findFirst({
        where: {
          courseReferenceNumber: num,
        },
      });
      output.push({
        title: courses[i]?.courseTitle,
        color: color,
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

    /*
    {
      groupId: 'blueEvents', // recurrent events in this group move together
      daysOfWeek: [ '4' ],
      startTime: '10:45:00',
      endTime: '12:45:00'
    },



      let num: string = filtered_data[i].courseReferenceNumber;
      let meetingTimes = await prisma.meetingTime.findFirst({
        where: {
          courseReferenceNumber: num,
        },
      });
      output.push({
        title: filtered_data[i]?.courseTitle,
        daysOfWeek: [meetingTimes?.monday && "1", meetingTimes?.tuesday && "2"],
        startTime:
          meetingTimes?.beginTime.slice(0, 2) +
          ":" +
          meetingTimes?.beginTime.slice(2),
        endTime:
          meetingTimes?.endTime.slice(0, 2) +
          ":" +
          meetingTimes?.endTime.slice(2),
      });

    */

    return output;
  }

  let events = await getEvents();
  return (
    <div className="grid grid-cols-3 p-4 -mt-20 w-screen absolute start-0 px-32 gap-0">
      <div className=" col-start-1 h-[70vh] w-[50vw] col-span-2 ">
        <Calendar events={events} />
      </div>
      <div className="">
        <CreatePlan />
      </div>
    </div>
  );
}
