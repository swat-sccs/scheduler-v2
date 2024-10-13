"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import SearchIcon from "@mui/icons-material/Search";
export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[10rem] h-12 mt-0",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon />}
      type="search"
    />
  );
};
