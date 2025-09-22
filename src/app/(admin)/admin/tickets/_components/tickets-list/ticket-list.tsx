"use client";

import Pagiantion from "@/app/_components/pagination/pagiantion";
import { Ticket } from "@/types/ticket.types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "../../../_/components/search/search";
import { getTickets } from "../../../_/services/tickets";
import TicketItem from "./ticket-item";
import Loading from "@/app/_components/loading/loading";

const TicketList: React.FC = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const page: number = Number(searchParams.get("page")) || 1;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const search: string = searchParams.get("q") ?? "";

  useEffect(() => {
    setIsLoading(true);
    getTickets({ page, limit, search })
      .then(({ data, totalPages }) => {
        setTickets(data || []);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, limit, search]);

  return (
    <>
      <div className="flex justify-between">
        <Search />
      </div>
      <div className="box h-195 min-h-120">
        <div className="divide-secondary-100/50 dark:divide-secondary-800 divide-y-1">
          {isLoading ? (
            <Loading />
          ) : tickets?.length > 0 ? (
            tickets?.map((ticket) => <TicketItem key={ticket.id} {...ticket} />)
          ) : (
            <td colSpan={3} className="border p-2 text-center">
              تیکت یافت نشد
            </td>
          )}
        </div>
      </div>
      <Pagiantion currentPage={page} totalPages={totalPages} />
    </>
  );
};

export default TicketList;
