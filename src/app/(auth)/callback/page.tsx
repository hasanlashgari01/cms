"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Supabase خودش session رو توی کوکی ذخیره کرده
    // ما فقط می‌خوایم کاربر رو به صفحه اصلی هدایت کنیم
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/"); // یا هر صفحه‌ای که خواستی
      } else {
        router.replace("/signin"); // اگه session نبود برگرد به لاگین
      }
    });
  }, [router]);

  return <p className="text-center">در حال ورود...</p>;
}
