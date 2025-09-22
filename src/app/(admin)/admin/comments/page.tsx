import { Suspense } from "react";
import CommentList from "./comment-list/comment-list";
import Loading from "@/app/_components/loading/loading";

const CommentsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CommentList />
    </Suspense>
  );
};

export default CommentsPage;
