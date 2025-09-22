import { useEffect, useState } from "react";
import TopSection from "../top-section/top-section";
import LatestCommentItem from "./latest-comment-item";
import { getLatestComments } from "../../services/comments";
import { Comment } from "@/types/comment.types";

const LatestCommentList = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getLatestComments().then(({ data }) => {
      if (data) {
        setComments(data);
      }
    });
  }, []);

  return (
    <div className="box h-full min-h-119 flex-1 p-4">
      <TopSection title="نظرات" href="/admin/comments" />
      {comments.map((comment) => (
        <LatestCommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default LatestCommentList;
