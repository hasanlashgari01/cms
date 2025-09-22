import { cn } from "@/utils/cn";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

type Option<T> = {
  value: T;
  label: string;
};

type DropdownProps<T> = {
  label?: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function Dropdown<T extends string>({ label, options, value, onChange }: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (val: T) => {
    onChange(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 max-sm:text-sm md:w-full md:min-w-44" ref={ref}>
      {label && <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full min-w-44 items-center justify-between rounded-xl border border-gray-500 bg-white px-4 py-2.5 text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          {options.find((opt) => opt.value === value)?.label}
          <ChevronDownIcon
            className={cn("size-5 rotate-0 text-gray-500 transition-transform duration-200", {
              "rotate-180": open,
            })}
          />
        </button>

        {open && (
          <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-600 bg-white shadow-lg dark:bg-gray-700">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "cursor-pointer px-4 py-2.5 text-sm text-gray-700 transition-colors dark:text-gray-300",
                  {
                    "bg-blue-100 font-medium text-blue-700 dark:bg-blue-700": value === opt.value,
                    "hover:bg-blue-50 dark:hover:bg-blue-500/20": value !== opt.value,
                  },
                )}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
