"use client";

import { Input } from "@nextui-org/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import moment from "moment";
import { Autocomplete, TextField, Chip } from "@mui/material";

export default function Search(props: any) {
  let router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTerm, setSelectedTerm]: any = useState(["S2025"]);
  const [selectedDOTW, setSelectedDOTW]: any = useState([]);
  const [selectedCodes, setSelectedCodes]: any = useState([]);

  const [selectedStartTime, setSelectedStartTime]: any = useState([]);
  const [search, setSearch]: any = useState();
  const pathname = usePathname();
  const { replace } = useRouter();

  const replaceText = (text: any) => {
    setSearch(text?.replace(/\w+:/, <Chip>{text}</Chip>));
    console.log(search);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    //replaceText(term);
    //setSearch(term);
    //const term_regex = new RegExp(\w, "g");
    let filtered_term = term.replace(/[^a-zA-Z0-9 ]+/gi, "");
    let include_colons = term.replace(/[^a-zA-Z0-9: ]+/gi, "");
    let term_list = include_colons.split(" ");

    for (var i = 0; i < term_list.length; i++) {
      if (/\w+:/.test(term_list[i])) {
        console.log(term_list[i]);
      }
    }
    const params = new URLSearchParams(searchParams);
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
    const params = new URLSearchParams(searchParams);

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
    const params = new URLSearchParams(searchParams);

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
    searchParams.get("stime")?.toString(),
  ]);

  const handleDOTWChange = (e: any) => {
    setSelectedDOTW(...[e]);
    const params = new URLSearchParams(searchParams);
    if (e.size > 0) {
      params.set("dotw", Array.from(e).join(","));
    } else {
      params.delete("dotw");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSTimeChange = (e: any) => {
    setSelectedStartTime(...[e]);
    const params = new URLSearchParams(searchParams);
    if (e.size > 0) {
      params.set("stime", Array.from(e).join(","));
    } else {
      params.delete("stime");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const RenderSelectOptions = () => {
    let output = [];

    for (let i = 0; i < props.terms?.length; i++) {
      let sem = props.terms[i].substring(0, 1);
      let year = props.terms[i].substring(1);
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
    <div className="grid grid-cols-5 gap-5">
      <Input
        isClearable
        className="max-w-xs col-span-2"
        defaultValue={searchParams.get("query")?.toString()}
        label="Search"
        labelPlacement="inside"
        variant="bordered"
        value={search}
        onClear={() => {
          handleSearch("");
        }}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />

      <Select
        label="Select Term"
        disallowEmptySelection={true}
        className="max-w-xs col-span-1"
        selectedKeys={selectedTerm}
        defaultSelectedKeys={searchParams.get("term")?.toString()}
        selectionMode={"single"}
        onChange={handleSelectionChange}
      >
        {RenderSelectOptions()}
      </Select>
      <Select
        label="Day of the Week"
        className="max-w-xs"
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
        label="Start Time"
        className="max-w-xs"
        selectedKeys={selectedStartTime}
        selectionMode={"multiple"}
        onSelectionChange={handleSTimeChange}
      >
        {props.times.startTimes.map((startTime: any) => {
          var time = startTime.slice(0, 2) + ":" + startTime.slice(2);
          var daTime = moment(time, "HH:mm").format("hh:mm A");

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
