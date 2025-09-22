import { cn } from "@/utils/cn";
import { StatusProps } from "./status.types";

const Status: React.FC<StatusProps> = ({
  is_active,
  onClick,
  activeText = "فعال",
  inactiveText = "غیرفعال",
  className,
}) => {
  return (
    <div
      className={cn(
        "xs:block hidden w-16 cursor-pointer rounded-2xl py-1.5 text-center text-white max-lg:text-sm lg:w-20",
        className,
        {
          "bg-green-500 dark:bg-green-600": is_active,
          "bg-red-500 dark:bg-red-600": !is_active,
        },
      )}
      onClick={onClick}
    >
      {is_active ? activeText : inactiveText}
    </div>
  );
};

export default Status;
