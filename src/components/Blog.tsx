import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById, IComment } from "../api/booksApi";
import { Container, Text, Title } from "@mantine/core";
import { IBlog } from "../api/booksApi";
import CommentSection from "./CommentSection";
import AddComment from "./AddComment";
import { useUserStore } from "../stores/userStore";
import { IconChevronsDownLeft } from "@tabler/icons";
const Blog = () => {
  console.log(
    parseInt(JSON.parse(sessionStorage.getItem("scrollPosition") as string)),
  );
  useEffect(() => {
    window.scrollTo(
      500,
      parseInt(JSON.parse(sessionStorage.getItem("scrollPosition") as string)),
    );
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const { id } = useParams();
  const username = useUserStore((state) => state.username);
  const [blogData, setBlogData] = useState<IBlog>({} as IBlog);

  function handleScroll() {
    if (sessionStorage.getItem("scrollPosition") !== null) {
      if (
        window.scrollY + 100 <
        parseInt(JSON.parse(sessionStorage.getItem("scrollPosition") as string))
      ) {
      } else {
        sessionStorage.setItem(
          "scrollPosition",
          JSON.stringify(window.scrollY),
        );
      }
    } else {
      sessionStorage.setItem("scrollPosition", JSON.stringify(window.scrollY));
    }
  }

  useEffect(() => {
    const run = async () => {
      const resp = await getBlogById(id as string);
      const data = await resp.json();
      setBlogData(data as IBlog);
    };
    run();
  }, []);
  // console.log(blogData.comments);
  return (
    <Container id="container">
      <div>
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
      </div>
    </Container>
  );
};

export default Blog;
