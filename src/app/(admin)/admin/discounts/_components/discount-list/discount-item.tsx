import { jalaliDate } from "@/utils/date";
import { DiscountItemProps } from "./discount.types";
import MenuActions from "../../../products/_components/product-list/menu-actions";

const DiscountItem: React.FC<DiscountItemProps> = ({
  id,
  code,
  percentage,
  max_usage,
  used_count,
  expires_at,
}) => {
  return (
    <div className="flex items-center gap-4 not-last:not-first:py-1 first:pb-1 last:pt-1">
      <div className="flex flex-1 items-center gap-x-4 pl-4 max-lg:text-sm max-sm:text-xs">
        <div className="w-36 sm:w-44 md:w-56 lg:w-64">
          <h1 className="line-clamp-1 w-full">{code}</h1>
        </div>
        <h2 className="flex-1 text-center">{percentage}</h2>
        <div className="flex-1 text-center max-sm:hidden">{max_usage}</div>
        <div className="flex-1 text-center">{used_count}</div>
        <div className="flex-1 text-center">{jalaliDate(expires_at)}</div>
        <MenuActions id={id} />
      </div>
    </div>
  );
};

export default DiscountItem;
