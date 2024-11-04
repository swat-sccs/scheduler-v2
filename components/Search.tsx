"use client";

import { Input } from "@nextui-org/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

export default function Search(props: any) {
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
    //handleSearch();
    //cookies.set("plan", e.target.value);
    //setPlanCookie(e.target.value);
  };

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
        <SelectItem key={"F2024"}>Fall 2024</SelectItem>
        <SelectItem key={"S2025"}>Spring 2025</SelectItem>
      </Select>
    </div>
  );
}
