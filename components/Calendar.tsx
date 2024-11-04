"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Card } from "@nextui-org/react";
import moment from "moment";
import { generateColorFromName } from "./primitives";

export default function Calendar(props: any) {
  function dayHeaderContent(args: any) {
    return moment(args.date).format("ddd");
  }

  function renderEventContent(eventInfo: any) {
    console.log(eventInfo);
    return (
      <Card
        className="fc-event-main-frame w-[100%] rounded-md hover:h-[20vh] ease-in-out z-0 hover:z-10 hover:transition-all duration-700 "
        style={{ backgroundColor: eventInfo.event.extendedProps.daColor }}
      >
        {/*
        
        
        <div
          className={`absolute top-0 left-0 h-full w-2 rounded-full`}
          style={{
            backgroundColor: generateColorFromName(
              eventInfo.event.extendedProps.subject
            ),
          }}
        />
        */}

        <b className="font-sans p-2"> {eventInfo.timeText}</b>
        <div className="font-sans p-2">{eventInfo.event.title}</div>
      </Card>
    );
  }

  return (
    <FullCalendar
      height="100%"
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      allDaySlot={false}
      expandRows
      slotDuration="01:00:00"
      slotMinTime="08:00:00"
      slotMaxTime="22:00:00"
      dayHeaderFormat={dayHeaderContent}
      events={props.events}
      headerToolbar={false}
      eventContent={renderEventContent}
    />
  );
}
