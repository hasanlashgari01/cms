"use client";

import { Dropdown } from "@/app/_components/dropdown/dropdown";
import Pagiantion from "@/app/_components/pagination/pagiantion";
import Search from "../../_/components/search/search";
import UserItem from "./user-item";
import { useEffect, useState } from "react";
import { User } from "@/types/user.types";
import { useSearchParams } from "next/navigation";
import { getUsers } from "@/services/users";
import Loading from "@/app/_components/loading/loading";

type Role = "all" | "user" | "admin";

const roleOptions: { value: Role; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "user", label: "کاربران" },
  { value: "admin", label: "ادمین‌ها" },
];

const UserList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [filter, setFilter] = useState<Role>("all");
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  useEffect(() => {
    setIsLoading(true);
    getUsers({ page, limit, search: q, role: filter })
      .then(({ data, totalPages }) => {
        setUsers(data || []);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, limit, q, filter]);

  return (
    <>
      <div className="flex justify-between gap-3 max-md:flex-col">
        <Search />
        <div className="flex gap-4">
          <Dropdown options={roleOptions} value={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="box h-140 sm:h-195 min-h-120">
        <div className="divide-secondary-100/50 dark:divide-secondary-800 divide-y-2">
          {isLoading ? (
            <Loading />
          ) : users.length > 0 ? (
            users?.map((user) => <UserItem key={user.id} {...user} />)
          ) : (
            <td colSpan={3} className="border p-2 text-center">
              کاربری یافت نشد
            </td>
          )}
        </div>
      </div>
      <Pagiantion currentPage={page} totalPages={totalPages} />
    </>
  );
};

export default UserList;
