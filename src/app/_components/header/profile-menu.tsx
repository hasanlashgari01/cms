import { useAuthentication } from "@/hooks/useAuthentication";
import { cn } from "@/utils/cn";
import { ArrowLeftStartOnRectangleIcon, UserIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Avatar from "../avatar/avatar";
import MenuItem from "./menu-item";
import Link from "next/link";

const ProfileMenu = () => {
  const { isLoading, isLoggedIn, user, logout } = useAuthentication();
  const [isShowPopup, setIsShowPopup] = useState(false);

  const togglePopupHandler = () => setIsShowPopup((prev) => !prev);

  const logoutHandler = async () => {
    await logout();

    setIsShowPopup(false);
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "bg-secondary-400/80 dark:bg-secondary-700/80 invisible fixed inset-0 -z-0 opacity-0 backdrop-blur-sm",
          {
            "visible opacity-100": isShowPopup,
          },
        )}
        onClick={() => setIsShowPopup(false)}
      ></div>
      <div className="relative">
        {isLoggedIn ? (
          <Avatar
            avatar_url={user?.avatar_url || "/default.jpg"}
            full_name={user?.full_name || "داشبورد"}
            onClick={togglePopupHandler}
          />
        ) : (
          <Link href="/signin">
            <Avatar />
          </Link>
        )}
        {isLoggedIn && (
          <div
            className={cn(
              "text-primary dark:bg-secondary-600 invisible absolute top-full left-0 w-80 rounded-4xl bg-white opacity-0 shadow-2xl transition-all dark:shadow-none",
              {
                "visible translate-y-5 opacity-100": isShowPopup,
              },
            )}
          >
            <ul className="p-3">
              <MenuItem
                icon={UserIcon}
                text={user?.full_name || "داشبورد"}
                href={user?.role === "user" ? "/dashboard" : "/admin"}
                onClick={() => {
                  if (isShowPopup) togglePopupHandler();
                }}
              />
              <MenuItem icon={ArrowLeftStartOnRectangleIcon} text="خروج" onClick={logoutHandler} />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
