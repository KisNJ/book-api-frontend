import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api/booksApi";
import { Container, Text, Title } from "@mantine/core";
import { IBlog } from "../api/booksApi";
import CommentSection from "./CommentSection";
import AddComment from "./AddComment";
import { useUserStore } from "../stores/userStore";
const Blog = () => {
  const { id } = useParams();
  const username = useUserStore((state) => state.username);
  const [blogData, setBlogData] = useState<IBlog>({} as IBlog);
  useEffect(() => {
    const run = async () => {
      const resp = await getBlogById(id as string);
      const data = await resp.json();
      setBlogData(data as IBlog);
    };
    run();
  }, []);
  return (
    <Container>
      <Title order={1}>
        <Text variant="gradient">{blogData.title}</Text>
      </Title>
      <Text pl="sm" color="dimmed">
        Author: {blogData.author?.username}
      </Text>
      <Text pl="sm" color="dimmed">
        {new Date(blogData.created_at).toLocaleDateString()}
      </Text>
      <Text align="justify" my="xl" size="lg">
        {blogData.content}
      </Text>
      <Title order={2}>
        <Text variant="gradient">Comments</Text>
      </Title>
      {username && <AddComment blog_id={id as string} />}
      <CommentSection comments={blogData.comments} />
    </Container>
  );
};

export default Blog;
