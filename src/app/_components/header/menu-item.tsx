import Link from "next/link";

interface MenuItemProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  href?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, text, href, onClick }) => {

  return (
    <>
      {href ? (
        <Link
          href={href}
          className="text-secondary hover:text-primary dark:text-secondary flex w-full cursor-pointer items-center space-x-4 rounded-2xl p-3 dark:hover:text-white"
          onClick={onClick}
        >
          <Icon className="size-6" />
          <span className="text-sm font-semibold">{text}</span>
        </Link>
      ) : (
        <button
          className="text-secondary hover:text-primary dark:text-secondary flex w-full cursor-pointer items-center space-x-4 rounded-2xl p-3 dark:hover:text-white"
          onClick={onClick}
        >
          <Icon className="size-6" />
          <span className="text-sm font-semibold">{text}</span>
        </button>
      )}
    </>
  );
};

export default MenuItem;
