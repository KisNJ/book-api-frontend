import React from "react";
import { IComment } from "../api/booksApi";
import { Card, Text, Title } from "@mantine/core";
const Comment = ({ author, content, created_at, blog_id, _id }: IComment) => {
  return (
    <Card>
      <Title order={3}>{author?.username}</Title>
      <Text color="dimmed">{created_at}</Text>
      <Text align="justify">{content}</Text>
    </Card>
  );
};

export default Comment;
