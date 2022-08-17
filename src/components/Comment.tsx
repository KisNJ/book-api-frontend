import React, { useState } from "react";
import { IComment } from "../api/booksApi";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Overlay,
  Text,
  Title,
} from "@mantine/core";
import { useUserStore } from "../stores/userStore";
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons";
import { deleteComment } from "../api/booksApi";
import { showNotification, updateNotification } from "@mantine/notifications";
const Comment = ({ author, content, created_at, blog_id, _id }: IComment) => {
  const user_id = useUserStore((state) => state._id);
  const [showSureDelete, setShowSureDelete] = useState(false);
  async function deleteCommentLocal() {
    const resp = await deleteComment(blog_id, _id);
    showNotification({
      id: "deleting",
      loading: true,
      title: "Deleting comment",
      message: "... ... ...",
      disallowClose: true,
    });
    if (resp.status === 200) {
      updateNotification({
        id: "deleting",
        title: "Deleted comment",
        message: "Comment deleted succesfully",
        autoClose: true,
        color: "teal",
        icon: <IconCheck size={16} />,
      });
      window.location.reload();
    } else if (resp.status === 500) {
      updateNotification({
        id: "deleting",
        title: "Server Error",
        message: "Server error occured",
        autoClose: true,
        color: "red",
        icon: <IconX size={16} />,
      });
    } else if (resp.status === 400) {
      updateNotification({
        id: "deleting",
        title: "Bad request",
        message: "Provide a blog and comment id in you request",
        autoClose: true,
        color: "red",
        icon: <IconX size={16} />,
      });
    } else if (resp.status === 401) {
      updateNotification({
        id: "deleting",
        title: "Unautharized delete attempt",
        message: "Login to delete this comment",
        autoClose: true,
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  }
  return (
    <Card>
      {showSureDelete && (
        <Box>
          <Overlay mt="sm" opacity={0.6} color="gray" zIndex={5} blur={2} />
          <Box style={{ zIndex: "6", position: "relative" }}>
            <Text
              weight={700}
              size="xl"
              align="center"
              mt="xs"
              variant="gradient"
            >
              Are you sure?
            </Text>
            <Group position="center" mt="sm">
              <Button onClick={() => setShowSureDelete((old) => false)}>
                No
              </Button>
              <Button
                variant="outline"
                color="red"
                onClick={deleteCommentLocal}
              >
                Yes, delete my comment!
              </Button>
            </Group>
          </Box>
        </Box>
      )}
      <Box
        style={{
          zIndex: "4",
          position: showSureDelete ? "absolute" : "relative",
        }}
      >
        <Title order={3}>{author?.username}</Title>
        <Text color="dimmed">{created_at}</Text>
        <Text align="justify">{content}</Text>
      </Box>
      {user_id === author._id && (
        <Box style={{ zIndex: "6", position: "relative" }}>
          <Group position="right">
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => setShowSureDelete((old) => !old)}
            >
              <IconTrash />
            </ActionIcon>
            <ActionIcon color="blue" variant="light">
              <IconEdit />
            </ActionIcon>
          </Group>
        </Box>
      )}
    </Card>
  );
};

export default Comment;
