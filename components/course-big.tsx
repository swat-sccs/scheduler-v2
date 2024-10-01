"use client";
import { Card, CardBody } from "@nextui-org/react";
import { tv } from "tailwind-variants";

export const card = tv({
  slots: {
    base: "bg-light_foreground min-h-40 max-h-96 w-full rounded-sm",
    avatar:
      "w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto drop-shadow-lg",
    wrapper: "flex-1 pt-6 md:p-8 text-center md:text-left space-y-4",
    description: "text-md font-medium ",
    infoWrapper: "font-medium",
    name: "text-sm text-sky-500 dark:text-sky-400",
    role: "font-bold  text-primary ",
    sideColor: "w-2 h-full bg-red-500",
  },
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      logo: "from-[#333C44] to-[#9FADBC]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
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

export const CourseBig = (props: any) => {
  return (
    <Card className={base()} shadow="sm">
      <div
        className={`absolute top-0 left-0 h-full w-3 ${props.color} rounded-full`}
      />
      <CardBody className="ml-4 ">
        <div className="grid grid-cols-4 gap-0 ">
          <div className="content-center">
            <p className={role()}>Course</p>
            <div className="text-xs mt-2 ">Econ 02 A | 1 credit(s)</div>
            <div className="text-xs ">Intermediate Economics</div>
            <div className="text-xs ">20008</div>
          </div>
          <div className="grid-rows-2 grid-cols-1 space-y-10 ">
            <div>
              <p className={role()}>Availability</p>
              <div className="text-xs mt-2">20/31</div>
            </div>
            <div className="mt-2">
              <p className={role()}>Attributes</p>
              <div className="text-xs ">SS</div>
            </div>
          </div>

          <div className="grid-rows-2 grid-cols-1 space-y-10">
            <div>
              <p className={role()}>Days</p>
              <div className="text-xs mt-2">M, W, F</div>
            </div>
            <div className="mt-2">
              <p className={role()}>Time</p>
              <div className="text-xs ">11:20 am - 12:35 pm</div>
            </div>
          </div>
          <div className="grid-rows-2 grid-cols-1 space-y-10">
            <div>
              <p className={role()}>Instructor</p>
              <div className="text-xs mt-2">Olivero, Maria Pia</div>
            </div>
            <div className="mt-2">
              <p className={role()}>Room</p>
              <div className="text-xs ">Science Center 104</div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
