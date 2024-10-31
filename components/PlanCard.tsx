"use client";
import {
  Card,
  CardBody,
  Divider,
  Link,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { tv } from "tailwind-variants";

import { InstructorCard } from "./InstructorCard";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
export const card = tv({
  slots: {
    base: "bg-light_foreground min-h-32 max-h-32 w-[98%] rounded-sm scroll-none drop-shadow-lg transition-colors",
    role: "font-bold  text-primary ",
  },
});

const { base, role } = card();

export default function PlanCard(props: any) {
  return (
    <Card key={props.course.id} className={base()} shadow="sm" isHoverable>
      <div className={`absolute top-0 left-0 h-full w-2 rounded-full`} />

      <CardBody className="ml-4 overflow-clip ">
        {props.course.courseTitle}
      </CardBody>
    </Card>
  );
}
