"use client";

import { Input } from "@nextui-org/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
export default function Search(props: any) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <>
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
    </>
  );
}
