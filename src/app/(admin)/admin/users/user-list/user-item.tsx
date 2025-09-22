"use client";

import Image from "next/image";
import { UserItemProps } from "./user.types";
import { jalaliDate } from "@/utils/date";

const UserItem: React.FC<UserItemProps> = ({ email, full_name, role, avatar_url, created_at }) => {
  return (
    <div className="flex items-center gap-4 not-last:not-first:py-1 first:pb-2 last:pt-2">
      <div className="flex-center xs:size-12 size-8 shrink-0 overflow-hidden rounded-full">
        <Image
          src={avatar_url || "/default.jpg"}
          alt={(full_name || email) ?? "Untitled"}
          width={100}
          height={100}
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-1 items-center gap-x-4 pl-4 text-xs md:text-sm lg:text-base">
        <h1 className="line-clamp-1 min-w-96 max-sm:min-w-40">{full_name || email}</h1>
        <div className="w-16 rounded-2xl py-1.5 text-center lg:w-20">
          {role === "user" ? "کاربر" : "ادمین"}
        </div>
        <div className="max-xs:hidden flex-1 text-center">{jalaliDate(created_at)}</div>
      </div>
    </div>
  );
};

export default UserItem;
