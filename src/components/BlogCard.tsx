import React from "react";
import { IconExternalLink } from "@tabler/icons";
import { Card, Image, Text, Box, Spoiler, Button, Group } from "@mantine/core";

import { Link } from "react-router-dom";
interface ICard {
  author_name: string;
  id_of_blog: string;
  content: string;
  comment_count: number;
  title: string;
  created_at: string;
}
const BlogCard = ({
  author_name,
  content,
  created_at,
  comment_count,
  title,
  id_of_blog,
}: ICard) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.blue[6]
                : theme.colors.gray[1],
            textAlign: "center",
            paddingInline: theme.spacing.xl,
            paddingBlock: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
            cursor: "pointer",

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.blue[5]
                  : theme.colors.gray[2],
            },
          })}
        >
          <Group>
            <Text size="xl" weight={700}>
              Author:
            </Text>
            <Text size="xl" weight={500}>
              {author_name}
            </Text>
          </Group>
        </Box>
      </Card.Section>
      <Text weight={500}>{title}</Text>
      <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
        <Text size="sm" color="dimmed">
          {content}
        </Text>
      </Spoiler>
      <Text size="sm" color="dimmed" mt="xs">
        {new Date(created_at).toLocaleDateString()}
      </Text>
      <Text size="sm" color="dimmed">
        Comments: {comment_count}
      </Text>
      <Button
        component={Link}
        to={`/${id_of_blog}`}
        leftIcon={<IconExternalLink size={20} />}
        variant="light"
        fullWidth
        mt="md"
        radius="md"
      >
        Open Blog post
      </Button>
    </Card>
  );
};

export default BlogCard;
