import React, { useEffect, useState } from "react";
import { getEveryPublicPost } from "../api/booksApi";
import { LoadingOverlay, Title, Text, SimpleGrid } from "@mantine/core";
import { IBlog } from "../api/booksApi";
import BlogCard from "./BlogCard";
const BlogDisplay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayData, setDisplayData] = useState<IBlog[]>([]);
  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      const resp = await getEveryPublicPost();
      if (resp.status === 200) {
        setIsError(false);
        const display = await resp.json();
        setDisplayData(display);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    };
    run();
  }, []);
  if (isError)
    return (
      <Text align="center" size="xl" weight={700} mt="md">
        An error Occured
      </Text>
    );
  return (
    <div>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {/* <Box> */}
      <Title mt="xl" order={2}>
        <Text variant="gradient">Public blog posts</Text>
      </Title>
      {/* </Box> */}
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
        {displayData.map((data) => (
          <BlogCard
            key={data._id}
            author_name={data.author.username}
            content={data.content}
            created_at={data.created_at}
            comment_count={data.comments.length}
            title={data.title}
            id_of_blog={data._id}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default BlogDisplay;
