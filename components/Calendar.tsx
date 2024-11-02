"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Card } from "@nextui-org/react";
import moment from "moment";

export default function Calendar(props: any) {
  function dayHeaderContent(args: any) {
    return moment(args.date).format("ddd");
  }

  function renderEventContent(eventInfo: any) {
    console.log(eventInfo);
    return (
      <Card
        className="absolute top-0 left-0 h-full w-[100%] rounded-none "
        style={{ backgroundColor: eventInfo.event.extendedProps.daColor }}
      >
        <b className="font-sans"> {eventInfo.timeText}</b>
        <div className="font-sans">{eventInfo.event.title}</div>
      </Card>
    );
  }

  return (
    <FullCalendar
      height="100%"
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      eventMinHeight={70}
      allDaySlot={false}
      expandRows
      slotDuration="01:00:00"
      slotMinTime="08:30:00"
      slotMaxTime="22:00:00"
      dayHeaderFormat={dayHeaderContent}
      events={props.events}
      headerToolbar={false}
      eventContent={renderEventContent}
    />
  );
}
