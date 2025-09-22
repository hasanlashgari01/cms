"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, text }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-forground flex items-center gap-2 rounded-lg p-3 transition-colors duration-300 ease-in-out",
        {
          "bg-primary-500 text-white": isActive,
          "hover:text-blue-600 dark:hover:text-primary-500": !isActive,
        },
      )}
    >
      <Icon className="size-6" />
      <span className="hidden xl:inline-block">{text}</span>
    </Link>
  );
};

export default NavLink;
