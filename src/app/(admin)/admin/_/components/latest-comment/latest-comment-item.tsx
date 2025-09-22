import { Comment } from "@/types/comment.types";

const LatestCommentItem: React.FC<Comment> = ({ text, user, product }) => {
  return (
    <div className="flex items-center justify-between text-xs md:text-sm lg:text-base">
      <div className="line-clamp-1 flex-2 max-lg:text-sm">{text}</div>
      <div>
        <h3 className="text-center">{user.full_name}</h3>
        <h4 className="text-secondary-300 text-center">{product.title}</h4>
      </div>
    </div>
  );
};

export default LatestCommentItem;
