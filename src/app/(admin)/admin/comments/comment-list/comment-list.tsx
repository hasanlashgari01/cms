"use client";

import { useSearchParams } from "next/navigation";
import CommentItem from "./comment-item";
import { useEffect, useState } from "react";
import { getComments } from "../../_/services/comments";
import Pagiantion from "@/app/_components/pagination/pagiantion";
import { Comment } from "@/types/comment.types";
import Loading from "@/app/_components/loading/loading";

const CommentList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const searchParams = useSearchParams();

  const page: number = Number(searchParams.get("page")) || 1;
  const limit: number = Number(searchParams.get("limit")) || 10;

  useEffect(() => {
    setIsLoading(true);
    getComments({ page, limit })
      .then(({ data, totalPages }) => {
        setComments(data || []);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, limit]);

  return (
    <>
      <div className="box h-195 min-h-120">
        <div className="divide-secondary-100/50 dark:divide-secondary-800 divide-y-1">
          {isLoading ? (
            <Loading />
          ) : comments?.length > 0 ? (
            comments?.map((comment) => <CommentItem key={comment.id} {...comment} />)
          ) : (
            <td colSpan={3} className="border p-2 text-center">
              محصولی یافت نشد
            </td>
          )}
        </div>
      </div>
      <Pagiantion currentPage={page} totalPages={totalPages} />
    </>
  );
};

export default CommentList;
