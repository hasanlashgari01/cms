"use client";

import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "./profile-menu";
import Theme from "@/app/_components/header/theme";

const Header = () => {
  return (
    <div className="flex justify-between p-3 md:p-5">
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
        </Link>
      </div>

      <div className="flex gap-x-3">
        <Theme />
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
