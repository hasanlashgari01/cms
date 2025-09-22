"use client";

import useDebounce from "@/hooks/useDebounce";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");
  const debounced = useDebounce(searchTerm, 600);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debounced) params.set("q", debounced);
    else params.delete("q");

    router.replace(`?${params.toString()}`);
  }, [debounced, searchParams, router]);

  return (
    <div className="flex items-center rounded-lg bg-white py-2.5 pr-5 pl-3 max-md:flex-3 md:w-80 dark:bg-slate-800">
      <input
        type="text"
        placeholder="جست و جو"
        className="interactive flex-1 border-none outline-none placeholder:text-gray-400 max-sm:text-xs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm.length > 0 && (
        <XMarkIcon className="size-6 cursor-pointer" onClick={() => setSearchTerm("")} />
      )}
    </div>
  );
};

export default Search;
