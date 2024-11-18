"use client";

import {
  DayHeaderContentArg,
  EventContentArg,
  EventSourceInput,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Card } from "@nextui-org/react";
import moment from "moment";

export default function Calendar({
  events,
  startTime,
  endTime,
}: {
  events: EventSourceInput | undefined;
  startTime: string;
  endTime: string;
}) {
  function dayHeaderContent(args: DayHeaderContentArg) {
    return moment(args.date).format("ddd");
  }

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <Card
        className="fc-event-main-frame w-[100%] rounded-md group min-h-0 hover:min-h-28 ease-in-out px-1 z-0 hover:z-10 hover:transition-all duration-700 "
        style={{ backgroundColor: eventInfo.event.extendedProps.daColor }}
      >
        <b className="font-sans text-[10px] font-normal">
          {eventInfo.timeText} {"|"} {eventInfo.event.extendedProps.room}
        </b>
        <div className="font-sans text-[12px] font-bold inline">
          {eventInfo.event.extendedProps.subject}
          {eventInfo.event.extendedProps.courseNumber} :
          <p className="font-normal inline"> {eventInfo.event.title}</p>
        </div>

        <div className="transition-all opacity-0 group-hover:opacity-100 font-sans text-[10px] mt-5 ">
          {eventInfo.event.extendedProps.instructor.replace("&#39;", "'")}
        </div>
      </Card>
    );
  }

  return (
    <FullCalendar
      expandRows
      allDaySlot={false}
      dayHeaderContent={dayHeaderContent}
      editable={false}
      eventContent={renderEventContent}
      events={events}
      headerToolbar={false}
      height="100%"
      initialView="timeGridWeek"
      plugins={[timeGridPlugin]}
      slotDuration="01:00:00"
      slotMaxTime={endTime}
      slotMinTime={startTime}
      weekends={false}
    />
  );
}
