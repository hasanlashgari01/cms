import Link from "next/link";
import { TopSectionProps } from "./top-section.types";

const TopSection: React.FC<TopSectionProps> = ({ title, href }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-primary py-2.5 font-semibold lg:text-xl dark:text-white">
        {title}
      </div>
      {href && (
        <Link href={href} className="text-secondary-300 rounded-full border px-4 py-1 text-sm">
          همه
        </Link>
      )}
    </div>
  );
};

export default TopSection;
