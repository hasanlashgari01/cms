import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { getUserDetails } from "@/services/users";
import { User } from "@/types/user.types";

interface AuthValues {
  email: string;
  password: string;
}

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    getUserDetails()
      .then(({ user }) => {
        if (user) {
          setUser(user);
          setIsLoggedIn(!!user);
        }
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const singInWithOAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/",
      },
    });
  };

  const signUp = async (values: AuthValues) => {
    const { email, password } = values;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) throw error;

    return data;
  };

  const signIn = async (values: AuthValues) => {
    const { email, password } = values;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();

    router.push("/signin");
  };

  return {
    isLoggedIn,
    isLoading,
    user,
    singInWithOAuth,
    signUp,
    signIn,
    logout,
  };
};

export { useAuthentication };
