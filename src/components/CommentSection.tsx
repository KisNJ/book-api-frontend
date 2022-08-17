import React, { useEffect } from "react";
import { Stack, Text } from "@mantine/core";
import { IComment } from "../api/booksApi";
import Comment from "./Comment";
import { useUserStore } from "../stores/userStore";
interface props {
  comments: IComment[];
}

const CommentSection = ({ comments }: props) => {
  const username = useUserStore((state) => state.username);
  if (comments === undefined) return <div>Loading</div>;
  console.log(comments);
  return (
    <Stack>
      {!username && <Text weight={700}>LogIn to comment</Text>}
      {comments.map((comment) => (
        <Comment
          key={comment._id}
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
