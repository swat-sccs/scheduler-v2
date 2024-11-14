"use client";

import { Input } from "@nextui-org/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import moment from "moment";
import { Chip } from "@mui/material";

export default function Search(props: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTerm, setSelectedTerm]: any = useState([]);
  const [selectedDOTW, setSelectedDOTW]: any = useState([]);
  const [selectedCodes, setSelectedCodes]: any = useState([]);

  const [selectedStartTime, setSelectedStartTime]: any = useState([]);
  const [search, setSearch]: any = useState();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const replaceText = (text: any) => {
    setSearch(text?.replace(/\w+:/, <Chip>{text}</Chip>));
    console.log(search);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    //replaceText(term);
    //setSearch(term);
    //const term_regex = new RegExp(\w, "g");
    const filtered_term = term.replace(/[^a-zA-Z0-9 ]+/gi, "");
    const include_colons = term.replace(/[^a-zA-Z0-9: ]+/gi, "");
    const term_list = include_colons.split(" ");

    for (let i = 0; i < term_list.length; i++) {
      if (/\w+:/.test(term_list[i])) {
        console.log(term_list[i]);
      }
    }

    if (term) {
      decodeURIComponent;
      params.set("query", filtered_term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  });

  const handleSelectionChange = (e: any) => {
    setSelectedTerm([e.target.value]);

    if (e.target.value) {
      params.set("term", e.target.value);
    } else {
      params.delete("term");
    }
    replace(`${pathname}?${params.toString()}`);

    //handleSearch();
    //cookies.set("plan", e.target.value);
    //setPlanCookie(e.target.value);
  };

  const handleCodeChange = (e: any) => {
    setSelectedCodes([e.target.value]);

    if (e.target.value) {
      params.set("codes", e.target.value);
    } else {
      params.delete("codes");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    // Update the document title using the browser API
    setSelectedTerm(searchParams.get("term")?.toString().split(","));
    setSelectedDOTW(searchParams.get("dotw")?.toString().split(","));
    setSelectedStartTime(searchParams.get("stime")?.toString().split(","));
    //handleSelectionChange({ target: { value: selectedTerm } });
  }, [
    searchParams.get("term")?.toString(),
    searchParams.get("dotw")?.toString(),
    searchParams.get("stime")?.toString(),
  ]);
  useEffect(() => {
    // Update the document title using the browser API
    params.set("term", "S2025");
    replace(`${pathname}?${params.toString()}`);
    setSelectedTerm(searchParams.get("term")?.toString().split(","));
  }, []);

  const handleDOTWChange = (e: any) => {
    setSelectedDOTW(...[e]);

    if (e.size > 0) {
      params.set("dotw", Array.from(e).join(","));
    } else {
      params.delete("dotw");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSTimeChange = (e: any) => {
    setSelectedStartTime(...[e]);

    if (e.size > 0) {
      params.set("stime", Array.from(e).join(","));
    } else {
      params.delete("stime");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const RenderSelectOptions = () => {
    const output = [];

    for (let i = 0; i < props.terms?.length; i++) {
      const sem = props.terms[i].substring(0, 1);
      const year = props.terms[i].substring(1);

      if (sem.toLowerCase() == "s") {
        output.push({ key: props.terms[i], title: "Spring " + year });
      } else if (sem.toLowerCase() == "f") {
        output.push({ key: props.terms[i], title: "Fall " + year });
      }
    }

    return output
      .sort(function (a: any, b: any) {
        return b.key - a.key;
      })
      .map((term: any) => <SelectItem key={term.key}>{term.title}</SelectItem>);
  };

  return (
    <div className="grid grid-cols-9 gap-3 w-[97%]">
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <Input
        isClearable
        className="col-span-9 lg:col-span-3"
        defaultValue={searchParams.get("query")?.toString()}
        label="Search"
        labelPlacement="inside"
        value={search}
        variant="bordered"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        onClear={() => {
          handleSearch("");
        }}
      />

      <Select
        className="col-span-3 lg:col-span-2"
        defaultSelectedKeys={searchParams.get("term")?.toString()}
        disallowEmptySelection={true}
        label="Select Term"
        selectedKeys={selectedTerm}
        selectionMode={"single"}
        onChange={handleSelectionChange}
      >
        {RenderSelectOptions()}
      </Select>
      <Select
        className="col-span-3 lg:col-span-2"
        label="Day of the Week"
        selectedKeys={selectedDOTW}
        selectionMode={"multiple"}
        //defaultSelectedKeys={searchParams.get("dotw")?.toString()}
        onSelectionChange={handleDOTWChange}
      >
        <SelectItem key={"sunday"} value="sunday">
          Sunday
        </SelectItem>
        <SelectItem key={"monday"} value={"monday"}>
          Monday
        </SelectItem>
        <SelectItem key={"tuesday"} value={"tuesday"}>
          Tuesday
        </SelectItem>
        <SelectItem key={"wednesday"} value={"wednesday"}>
          Wednesday
        </SelectItem>
        <SelectItem key={"thursday"} value={"thursday"}>
          Thursday
        </SelectItem>
        <SelectItem key={"friday"} value={"monfridayday"}>
          Friday
        </SelectItem>
        <SelectItem key={"saturday"} value={"saturday"}>
          Saturday
        </SelectItem>
      </Select>

      <Select
        className="col-span-3 lg:col-span-2"
        label="Start Time"
        selectedKeys={selectedStartTime}
        selectionMode={"multiple"}
        onSelectionChange={handleSTimeChange}
      >
        {props.times.startTimes.map((startTime: any) => {
          const time = startTime.slice(0, 2) + ":" + startTime.slice(2);
          const daTime = moment(time, "HH:mm").format("hh:mm A");

          return (
            <SelectItem key={startTime} value={startTime}>
              {daTime}
            </SelectItem>
          );
        })}
      </Select>
      {/*
      <Select
        label="Division"
        className="max-w-xs"
        selectedKeys={selectedCodes}
        selectionMode={"multiple"}
        //defaultSelectedKeys={searchParams.get("dotw")?.toString()}
        onSelectionChange={handleCodeChange}
      >
        {props.codes.map((code: any) => {
          return (
            <SelectItem key={code} value={code}>
              {code.toUpperCase()}
            </SelectItem>
          );
        })}
      </Select>
       */}
    </div>
  );
}
