"use client";

import { useAuthentication } from "@/hooks/useAuthentication";

const UserDetails = () => {
  const { user } = useAuthentication();

  return <div>{user?.full_name || user?.email}</div>;
};

export default UserDetails;
