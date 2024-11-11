"use client";
import { Card } from "@nextui-org/react";
import { title } from "../../components/primitives";
export default function LoginPage() {
  return (
    <div className="w-5/6 justify-center text-center ml-auto mr-auto grid gap-10">
      <div className="text-7xl">Welcome to the</div>
      <div className={title({ size: "lg", color: "logo" })}>SCCS</div>
      <div className={title({ size: "lg" })}>Course Planner&nbsp;</div>
      <div className={title({ size: "sm" })}>Version 2.0&nbsp;</div>

      <div className="text-xl">
        Please excuse us as we polish some remaining bugs, but feel free to
        explore and plan your classes! If you have suggestions or feedback,
        please email staff@sccs.swarthmore.edu.
      </div>
    </div>
  );
}
