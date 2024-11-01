"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import moment from "moment";

export default function Calendar(props: any) {
  function dayHeaderContent(args: any) {
    return moment(args.date).format("ddd");
  }
  return (
    <FullCalendar
      height="100%"
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      slotDuration="01:00:00"
      dayHeaderFormat={dayHeaderContent}
      events={props.events}
    />
  );
}
