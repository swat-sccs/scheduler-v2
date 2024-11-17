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

        <b className="font-sans text-[9px] ml-1 mt-1">{eventInfo.timeText}</b>
        <div className="font-sans text-[10px] ml-1 font-bold">
          {eventInfo.event.extendedProps.subject} {""}
          {eventInfo.event.extendedProps.courseNumber}
        </div>
        <div className="font-sans text-[10px] ml-1 mt-5 ">
          {eventInfo.event.title}
        </div>
        <div className="font-sans text-[10px] ml-1 mt-5 ">
          {eventInfo.event.extendedProps.instructor.replace("&#39;", "'")}
        </div>

      </Card>
    );
  }

  return (
    <FullCalendar
      expandRows
      allDaySlot={false}
      dayHeaderFormat={dayHeaderContent}
      editable={false}
      eventContent={renderEventContent}
      events={props.events}
      headerToolbar={false}
      height="100%"
      initialView="timeGridWeek"
      plugins={[timeGridPlugin]}
      slotDuration="01:00:00"
      slotMaxTime="23:00:00"
      slotMinTime="08:00:00"
      weekends={false}
    />
  );
}
