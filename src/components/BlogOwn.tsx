import React, { useEffect, useState } from "react";
import { getEveryOwnPost } from "../api/booksApi";
import { LoadingOverlay, Title, Text, SimpleGrid } from "@mantine/core";
import { IBlog } from "../api/booksApi";
import BlogCard from "./BlogCard";
import { useUserStore } from "../stores/userStore";
const BlogOwn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const username = useUserStore((state) => state.username);
  const [displayDataPrivate, setDisplayDataPrivate] = useState<IBlog[]>([]);
  const [displayDataPublic, setDisplayDataPublic] = useState<IBlog[]>([]);
  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      const resp = await getEveryOwnPost();
      if (resp.status === 200) {
        setIsError(false);
        const display = await resp.json();
        setDisplayDataPublic(display.public);
        setDisplayDataPrivate(display.private);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    };
    run();
  }, [username]);
  if (isError === true) {
    return (
      <Text align="center" size="xl" weight={700} mt="md">
        Log in to view private posts too.
      </Text>
    );
  } else {
    return (
      <div>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <Title mt="xl" order={2}>
          <Text variant="gradient">Private blog posts</Text>
        </Title>
        <SimpleGrid
          px="xl"
          mt="xl"
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "lg", cols: 3, spacing: "md" },
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {displayDataPrivate.map((data) => (
            <BlogCard
              key={data._id}
              author_name={data.author?.username}
              content={data.content}
              created_at={data.created_at}
              comment_count={data.comments?.length}
              title={data.title}
              id_of_blog={data._id}
            />
          ))}
        </SimpleGrid>
        <Title mt="xl" order={2}>
          <Text variant="gradient">Public blog posts</Text>
        </Title>
        <SimpleGrid
          px="xl"
          mt="xl"
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "lg", cols: 3, spacing: "md" },
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {displayDataPublic.map((data) => (
            <BlogCard
              key={data._id}
              author_name={data.author?.username}
              content={data.content}
              created_at={data.created_at}
              comment_count={data.comments?.length}
              title={data.title}
              id_of_blog={data._id}
            />
          ))}
        </SimpleGrid>
      </div>
    );
  }
};

export default BlogOwn;
