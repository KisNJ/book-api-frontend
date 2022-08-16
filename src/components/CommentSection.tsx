import React from "react";
import { Stack } from "@mantine/core";
import { IComment } from "../api/booksApi";
import Comment from "./Comment";
interface props {
  comments: IComment[];
}

const CommentSection = ({ comments }: props) => {
  if (comments === undefined) return <div>Loading</div>;
  return (
    <Stack>
      {comments.map((comment) => (
        <Comment
          _id={comment._id}
          blog_id={comment.blog_id}
          author={comment.author}
          content={comment.content}
          created_at={comment.created_at}
        />
      ))}
    </Stack>
  );
};

export default CommentSection;
