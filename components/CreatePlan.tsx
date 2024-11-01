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
  Input,
  Button,
  Skeleton,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import { tv } from "tailwind-variants";
import axios from "axios";
import { Select, SelectItem } from "@nextui-org/react";

import { InstructorCard } from "./InstructorCard";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { setPlanCookie } from "@/app/actions";
import { useCookies } from "next-client-cookies";

export default function CreatePlan(props: any) {
  const cookies = useCookies();

  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [coursePlanName, setCoursePlanName]: any = useState("");
  const [selectedCoursePlan, setSelectedCoursePlan]: any = useState([]);

  const fetcher = (url: any) => fetch(url).then((r) => r.json());
  const { data, isLoading, error } = useSWR("/api/getplancourses", fetcher, {
    refreshInterval: 1000,
  });

  const {
    data: coursePlans,
    isLoading: coursePlansIsLoading,
    error: coursePlansError,
  } = useSWR("/api/getcourseplans", fetcher, {
    refreshInterval: 1000,
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

  const courseColors = [
    "#FF8360",
    "#E8E288",
    "#7DCE82",
    "#3CDBD3",
    "#A491D3",
    "#1E2D2F",
    "#7CC6FE",
    "#5DFDCB",
    "#C3423F",
    "#05668D",
    "#037171",
    "#9067C6",
    "#E6AF2E",
  ];
  function generateColorFromName(name: string) {
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
      hash += name.charCodeAt(i);
    }

    return courseColors[hash % courseColors.length];
  }

  useEffect(() => {
    // Update the document title using the browser API
    setSelectedCoursePlan([cookies.get("plan")]);
    var objDiv: any = document.getElementById("scrollMe");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [data]);

  const CoursesList = () => {
    let output: any = [];
    if (isLoading) {
      return <Skeleton></Skeleton>;
    }
    if (data && !isLoading) {
      let filtered_data = data.filter(
        (course: any) => course.id == selectedCoursePlan[0]
      );
      for (let i = 0; i < filtered_data.length; i++) {
        filtered_data[i].courses.map((course: any) =>
          output.push(
            <Card
              key={course.id}
              className={
                "bg-light_foreground  h-10 rounded-sm scroll-none drop-shadow-lg transition-colors mb-3"
              }
              shadow="sm"
              isHoverable
            >
              <div
                className={`absolute top-0 left-0 h-full w-2 rounded-full`}
                style={{
                  backgroundColor: generateColorFromName(course.subject),
                }}
              />

              <CardBody className="ml-4 overflow-clip ">
                {course.courseTitle}
              </CardBody>
            </Card>
          )
        );
      }
    }

    return output;
  };

  return (
    <>
      <Divider className="h-4/6 absolute mt-10" orientation="vertical" />

      <div className="grid grid-cols-1 grid-rows-10 ml-10 gap-5 h-[66vh] mt-10 overflow-clip">
        <div className="font-bold text-primary h1">Create a Plan</div>
        <div className="grid grid-rows-subgrid grid-cols-3 gap-2 ">
          <Input
            isRequired
            label="Give your plan a name..."
            size="lg"
            className="col-span-2 "
            value={coursePlanName}
            onChange={(event: any) => {
              setCoursePlanName(event.target.value);
            }}
          />
          <Button
            size="lg"
            className=""
            startContent={<AddIcon></AddIcon>}
            onClick={() => createPlan()}
          >
            Create
          </Button>
        </div>

        <div className="  ">
          <div className="grid grid-rows-subgrid  grid-cols-3 ">
            <Divider className="mt-2" />
            <div className="text-center">or</div>
            <Divider className="mt-2" />
          </div>
        </div>

        {/* --------------------------------- or --------------------------- */}

        <div className="font-bold gap-0">Select a Plan</div>
        <div className="grid grid-cols-5 gap-2">
          <Select
            selectionMode="single"
            label="Select Plan"
            size="sm"
            className="col-span-3"
            onChange={handleSelectionChange}
            selectedKeys={selectedCoursePlan}
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
            className=""
            onClick={deletePlan}
            startContent={<DeleteIcon></DeleteIcon>}
          ></Button>
          <Button
            isIconOnly
            size="md"
            startContent={<IosShareIcon></IosShareIcon>}
          ></Button>
        </div>

        <div
          className="grid overflow-y-scroll gap-1 h-[30vh] mt-5"
          id="scrollMe"
        >
          <CoursesList />
        </div>
      </div>
    </>
  );
}
