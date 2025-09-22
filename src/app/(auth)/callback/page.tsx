"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/");
      } else {
        router.replace("/signin");
      }
    });
  }, [router]);

  return <p className="text-center">در حال ورود...</p>;
}
