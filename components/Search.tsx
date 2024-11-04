"use client";

import { Input } from "@nextui-org/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

export default function Search(props: any) {
  let router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTerm, setSelectedTerm]: any = useState(["S2025"]);

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      params.set("term", selectedTerm[0]);
    } else {
      params.delete("query");
      params.delete("term");
    }
    replace(`${pathname}?${params.toString()}`);
  });

  const handleSelectionChange = (e: any) => {
    console.log(e.target.value);
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
  console.log(props.terms);

  return (
    <div className="grid grid-cols-2">
      <Input
        isClearable
        className="max-w-xs"
        defaultValue={searchParams.get("query")?.toString()}
        label="Search"
        labelPlacement="inside"
        variant="bordered"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />

      <Select
        label="Select Term"
        className="w-48"
        selectedKeys={selectedTerm}
        defaultSelectedKeys={searchParams.get("term")?.toString()}
        selectionMode={"single"}
        onChange={handleSelectionChange}
      >
        {RenderSelectOptions()}
      </Select>
    </div>
  );
}
