import { cn } from "@/utils/cn";
import Link from "next/link";
import { PaginationProps } from "./pagination.types";

const Pagiantion: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  if (!totalPages) return null;

  const generatePages = () => {
    if (totalPages) {
      const pages = [];
      for (let index = 1; index <= totalPages; index++) {
        pages.push(index);
      }
      return pages;
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {generatePages()?.map((index) => (
        <Link
          href={{
            query: {
              page: index,
            },
          }}
          key={index}
          className={cn(
            "flex-center size-9 cursor-pointer rounded-lg border border-blue-600 pt-1",
            {
              "bg-blue-600 text-white": currentPage == index,
            },
          )}
        >
          {index}
        </Link>
      ))}
    </div>
  );
};

export default Pagiantion;
