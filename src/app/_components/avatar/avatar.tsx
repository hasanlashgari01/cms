import Image from "next/image";
import { AvatarProps } from "./avatar.type";

const Avatar: React.FC<AvatarProps> = ({ avatar_url, full_name, onClick }) => {
  return (
    <div className="size-12 overflow-hidden rounded-full">
      {!avatar_url ? (
        <div className="inset-0 z-10 size-full rounded-full bg-white">
          <Image src="/default.jpg" alt="" width={48} height={48} />
        </div>
      ) : (
        <Image
          src={avatar_url || "/default.jpg"}
          alt={full_name || ""}
          width={48}
          height={48}
          className="size-full cursor-pointer rounded-full bg-white object-cover p-1"
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Avatar;
