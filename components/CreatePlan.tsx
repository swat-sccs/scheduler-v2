"use client";
import {
  Card,
  Divider,
  Input,
  Button,
  Skeleton,
  CardHeader,
} from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import axios from "axios";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useCookies } from "next-client-cookies";

import { setPlanCookie } from "../app/actions/actions";
import { generateColorFromName } from "../components/primitives";

export default function CreatePlan(props: any) {
  const cookies = useCookies();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [coursePlanName, setCoursePlanName]: any = useState("");
  const [selectedCoursePlan, setSelectedCoursePlan]: any = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const fetcher = (url: any) => fetch(url).then((r) => r.json());
  const { data, isLoading, error } = useSWR("/api/getplancourses", fetcher, {
    refreshInterval: 800,
  });

  const {
    data: coursePlans,
    isLoading: coursePlansIsLoading,
    error: coursePlansError,
  } = useSWR("/api/getcourseplans", fetcher, {
    refreshInterval: 2000,
  });

  async function createPlan() {
    if (coursePlanName) {
      await axios
        .post("/api/createplan", {
          planName: coursePlanName,
        })
        .then(function (response: any) {
          setCoursePlanName("");
          setSelectedCoursePlan([response.data.id]);
          setPlanCookie(response.data.id);

          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  async function removeCourseFromPlan(plan: any, course: any) {
    await axios
      .post("/api/getplancourses", {
        plan: plan,
        course: course,
      })
      .then(function (response: any) {
        //console.log(response);
        router.refresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function deletePlan() {
    if (cookies.get("plan")) {
      axios
        .delete("/api/createplan", {
          data: {
            planId: cookies.get("plan"),
          },
        })
        .then(function (response) {
          setSelectedCoursePlan([]);
          //setPlanCookie("-55");
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  const handleSelectionChange = (e: any) => {
    //console.log(e.target.value);
    setSelectedCoursePlan([e.target.value]);
    //cookies.set("plan", e.target.value);
    setPlanCookie(e.target.value);
  };

  useEffect(() => {
    // Update the document title using the browser API
    setSelectedCoursePlan([cookies.get("plan")]);
    const objDiv: any = document.getElementById("scrollMe");

    objDiv.scrollTop = objDiv.scrollHeight;
  }, [data]);

  const CoursesList = () => {
    const output: any = [];

    if (isLoading) {
      return <Skeleton />;
    }
    if (data && !isLoading) {
      const filtered_data = data.filter(
        (course: any) => course.id == selectedCoursePlan[0]
      );

      for (let i = 0; i < filtered_data.length; i++) {
        filtered_data[i].courses.map((course: any) =>
          output.push(
            <Card
              key={course.id}
              className={
                "bg-light_foreground min-h-14 max-h-14 rounded-sm scroll-none drop-shadow-lg transition-colors"
              }
              shadow="sm"

              // onClick={() => removeCourseFromPlan(selectedCoursePlan, course)}
            >
              <div
                className={`absolute top-0 left-0 h-full w-2 rounded-full`}
                style={{
                  backgroundColor: generateColorFromName(course.subject),
                }}
              />

              <CardHeader className="justify-between">
                <div className="ml-2 lg:text-base truncate text-bold">
                  {course.subject} {""} {course.courseNumber}
                  <div className="text-tiny ">
                    {course.courseTitle.replace(/&amp;/g, "&")}
                  </div>
                </div>

                <Button
                  isIconOnly
                  startContent={<HighlightOffIcon />}
                  size={"sm"}
                  onClick={() =>
                    removeCourseFromPlan(selectedCoursePlan[0], course)
                  }
                />
              </CardHeader>
            </Card>
          )
        );
      }
    }

    return output;
  };

  const scrollToPlan = () => {
    console.log("A");
    if (scrollRef.current) {
      console.log("B");
      scrollRef.current.scrollIntoView({ behavior: "smooth", inline: "start" });
      setIsScrolled(true);
    }
  };

  const scrollToTop = () => {
    console.log("C");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsScrolled(false);
  };

  return (
    <>
      <Button
        className="rounded-full fixed md:hidden bottom-5 right-5 z-50 w-12 h-12 shadow-md"
        color="secondary"
        isIconOnly
        onClick={() => {
          isScrolled ? scrollToTop() : scrollToPlan();
        }}
      >
        <ExpandLessIcon
          className={"transition" + (isScrolled ? " rotate-0" : " rotate-180")}
        />
      </Button>
      <div className="flex flex-col mt-5 lg:mt-0 gap-5">
        <div className="flex flex-col gap-3">
          <div ref={scrollRef}>
            <div className="font-bold text-lg">Create a Plan</div>
            <div className="flex mt-2 items-center gap-2">
              <Input
                isRequired
                label="Plan Name"
                placeholder="Name your plan..."
                size="lg"
                value={coursePlanName}
                onChange={(event: any) => {
                  setCoursePlanName(event.target.value);
                }}
              />
              <Button
                startContent={<AddIcon />}
                size="md"
                onClick={() => createPlan()}
              ></Button>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center">
            <Divider />
            {/* --------------------------------- or --------------------------- */}
            <div className="text-center mt-1">or</div>
            <Divider />
          </div>

          <div>
            <div className="font-bold text-lg">Select a Plan</div>
            <div className="flex mt-2 items-center justify gap-2">
              <Select
                className="col-span-3"
                label="Current Plan"
                selectedKeys={selectedCoursePlan}
                selectionMode="single"
                size="lg"
                onChange={handleSelectionChange}
              >
                {coursePlans != null
                  ? coursePlans.map((plan: any) => (
                      <SelectItem key={plan.id}>{plan.name}</SelectItem>
                    ))
                  : null}
              </Select>

              <Button
                isIconOnly
                size="md"
                startContent={<DeleteIcon />}
                onClick={deletePlan}
              />
              <Button isIconOnly size="md" startContent={<IosShareIcon />} />
            </div>
          </div>
        </div>

        <div
          className="flex flex-col h-[45vh] overflow-y-scroll gap-3 scrollbar-thin scrollbar-thumb-accent-500 scrollbar-track-transparent"
          id="scrollMe"
        >
          <CoursesList />
        </div>
      </div>
    </>
  );
}
