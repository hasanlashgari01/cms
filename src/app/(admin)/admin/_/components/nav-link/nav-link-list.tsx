"use client";

import { useAuthentication } from "@/hooks/useAuthentication";
import {
  ArrowDownTrayIcon,
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  CubeIcon,
  HomeIcon,
  PercentBadgeIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useTransition } from "react";
import NavLink from "./nav-link";

const NavLinkList = () => {
  const { logout } = useAuthentication();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <div className="hidden flex-col md:flex xl:w-60 2xl:w-85">
      <ul className="sticky top-8 w-full space-y-1">
        <NavLink href="/admin" icon={HomeIcon} text="داشبورد" />
        <NavLink href="/admin/products" icon={CubeIcon} text="محصولات" />
        <NavLink href="/admin/users" icon={UserIcon} text="کاربران" />
        <NavLink href="/admin/comments" icon={ChatBubbleLeftRightIcon} text="نظرات" />
        <NavLink href="/admin/discounts" icon={PercentBadgeIcon} text="کد تخفیف" />
        <NavLink href="/admin/tickets" icon={TicketIcon} text="تیکت ها" />
        <NavLink href="/admin/export" icon={ArrowDownTrayIcon} text="دانلود" />
        <NavLink href="/admin/settings" icon={Cog6ToothIcon} text="تنظیمات" />
        <button
          disabled={isPending}
          className="text-forground flex w-full cursor-pointer items-center gap-2 rounded-lg p-3 hover:not-disabled:text-red-600 disabled:opacity-50"
          onClick={handleSignOut}
        >
          <ArrowRightStartOnRectangleIcon className="size-6 fill-transparent group-hover:fill-white" />
          <span className="hidden xl:inline-block">خروج</span>
        </button>
      </ul>
    </div>
  );
};

export default NavLinkList;
