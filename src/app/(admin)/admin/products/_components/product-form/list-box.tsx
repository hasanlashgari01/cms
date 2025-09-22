import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { UseFormSetValue } from "react-hook-form";
import { ProductFormData } from "../../../_/types/product-query.types";
import { Category } from "@/types/category.types";

type ListBoxProps = {
  selected: Category | null;
  setSelected: React.Dispatch<React.SetStateAction<Category | null>>;
  setValue: UseFormSetValue<ProductFormData>;
  categories: Category[];
};

const ListBox: React.FC<ListBoxProps> = ({ selected, setSelected, setValue, categories }) => {
  return (
    <div className="w-full">
      <Listbox
        value={selected}
        onChange={(category) => {
          setSelected(category);
          setValue("category_id", category?.id as number);
        }}
      >
        <div className="relative mt-1">
          <ListboxButton className="relative w-full cursor-pointer rounded-lg border bg-white py-2 pr-3 pl-10 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:bg-gray-800">
            <span className="block truncate text-right text-gray-900 dark:text-gray-100">
              {selected?.title ? selected.title : "انتخاب دسته‌بندی"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm dark:bg-gray-800">
            {categories.map((category) => (
              <ListboxOption
                key={category.id}
                value={category}
                className={({ selected }) =>
                  `relative cursor-pointer py-2 pr-4 pl-10 select-none ${
                    selected
                      ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-600 dark:text-white"
                      : "text-gray-900 dark:text-gray-100"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
                    >
                      {category.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-300">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default ListBox;
