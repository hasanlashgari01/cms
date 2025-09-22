import Loading from "@/app/_components/loading/loading";
import TicketList from "./_components/tickets-list/ticket-list";
import { Suspense } from "react";

const TicketsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TicketList />
    </Suspense>
  );
};

export default TicketsPage;
