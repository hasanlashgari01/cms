import Image from "next/image";
import { useAuthentication } from "@/hooks/useAuthentication";

const Google = () => {
  const { singInWithOAuth } = useAuthentication();

  return (
    <button
      className="flex-center w-full cursor-pointer space-x-2 rounded-3xl bg-white py-3.5 outline-hidden dark:bg-slate-800"
      onClick={singInWithOAuth}
    >
      <Image src="/google.png" alt="" width={20} height={20} />
      <span className="text-secondary text-sm leading-none font-semibold">
        ورود از طریق حساب کاربری گوگل
      </span>
    </button>
  );
};

export default Google;
