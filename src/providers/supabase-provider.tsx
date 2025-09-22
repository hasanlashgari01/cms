"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

interface Props {
  children: React.ReactNode;
}

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const SupabaseProvider: React.FC<Props> = ({ children }) => {
  const [supabase] = useState(() => createClient());

  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>;
};

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase باید داخل SupabaseProvider استفاده بشه");
  }
  return context;
}