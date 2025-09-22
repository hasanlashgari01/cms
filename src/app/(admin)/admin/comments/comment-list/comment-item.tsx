"use client";

import { cn } from "@/utils/cn";
import { jalaliDate } from "@/utils/date";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Status from "../../_/components/status/status";
import { CommentItemProps } from "./comment.types";

const CommentItem: React.FC<CommentItemProps> = ({
  text,
  user,
  product,
  is_active,
  created_at,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="not-last:not-first:py-2 first:pb-2 last:pt-2">
      <div className="flex items-center gap-x-4 max-md:flex-col justify-between">
        <div className="flex md:flex-1 w-full h-full md:w-48 justify-between">
          <div className="line-clamp-1 flex-2 max-lg:text-sm">{text}</div>
          <div className="flex gap-8 md:flex-1">
            <div className="max-lg:text-sm">{user.full_name || user.email}</div>
            <span onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              <ChevronDownIcon
                className={cn("size-5 transition-transform", { "rotate-180": isOpen })}
              />
            </span>
          </div>
        </div>
        <div
          className={cn(
            "max-md:mt-2 flex md:gap-5 w-full md:items-center flex-1 max-md:space-y-2 overflow-hidden transition-all duration-500 max-md:max-h-0 max-md:flex-col",
            {
              "max-md:max-h-20": isOpen,
            },
          )}
        >
          <div className="flex max-md:justify-between md:flex-1 max-lg:text-sm md:text-center">
            <span className="text-gray-400 md:hidden">نام محصول</span>
            <span>{product.title}</span>
          </div>
          <div className="flex max-md:justify-between max-lg:text-sm md:text-center">
            <span className="text-gray-400 md:hidden">تاریخ</span>
            <span>{jalaliDate(created_at)}</span>
          </div>
          <Status is_active={is_active} />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
