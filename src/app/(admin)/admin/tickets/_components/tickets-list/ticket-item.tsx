import { jalaliDate } from "@/utils/date";
import { TicketItemProps } from "./ticket.types";

const TicketItem: React.FC<TicketItemProps> = ({ title, created_at }) => {
  return (
    <div className="flex items-center gap-4 not-last:not-first:py-1 first:pb-1 last:pt-1">
      <div className="flex flex-1 items-center gap-x-4 pl-4 max-lg:text-sm max-sm:text-xs">
        <div className="w-36 sm:w-44 md:w-56 lg:w-64">
          <h1 className="line-clamp-1 w-full">{title}</h1>
        </div>
        <h2 className="flex-1 text-center">{}</h2>
        <div className="flex-1 text-center">{jalaliDate(created_at)}</div>
      </div>
    </div>
  );
};

export default TicketItem;
