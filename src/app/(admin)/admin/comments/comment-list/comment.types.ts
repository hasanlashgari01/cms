import { Comment } from "@/types/comment.types";

export type CommentListProps = {
  comments: Comment[];
};

export type MenuActions = {
  id: number;
};

export type MenuActionsProps = MenuActions;

export type CommentItemProps = Comment;
