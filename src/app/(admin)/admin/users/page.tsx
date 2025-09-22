import { Suspense } from "react";
import UserList from "./user-list/user-list";
import Loading from "@/app/_components/loading/loading";

export default function UsersPage() {
  return (
    <Suspense fallback={<Loading />}>
      <UserList />
    </Suspense>
  );
}
