"use client";
import { createContext, useContext, useState } from "react";
import { CoursePlan } from "@prisma/client";
import { getInitialCoursePlans } from "../app/actions/getCourses";

const PlanContext = createContext<any>([]);

export const PlanContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [coursePlans, setCoursePlans] = useState<any>([]);

  return (
    <PlanContext.Provider value={{ coursePlans, setCoursePlans }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  return useContext(PlanContext);
};
