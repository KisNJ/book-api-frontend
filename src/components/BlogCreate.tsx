import React, { useState } from "react";
import { useGetUser } from "../api/getUser";
import {
  Text,
  Container,
  Button,
  TextInput,
  Switch,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";
import { postBook } from "../api/booksApi";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useUserStore } from "../stores/userStore";
import { IconX, IconCheck } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
const BlogCreate = () => {
  useGetUser();
  const naigate = useNavigate();
  const _id = useUserStore((state) => state._id);
  const [createPostData, setCreatePostData] = useState({
    title: "",
    content: "",
    public: false,
  });
  const [visible, setVisible] = useState(false);
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setCreatePostData((old) => ({
      ...old,
      [e.target.id]:
        e.target.type === "checkbox"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : e.target.value,
    }));
  }
  async function handleSendData(e: React.SyntheticEvent) {
    if (_id) {
      setVisible(true);
      const resp = await postBook(createPostData);
      showNotification({
        id: "creating-post",
        loading: true,
        title: "Signing up",
        message: "Wait for process to finish",
        autoClose: false,
        disallowClose: true,
      });
      if (resp.status === 200) {
        updateNotification({
          id: "creating-post",
          color: "teal",
          title: "Post created",
          message: "Post created succesfully",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      } else {
        updateNotification({
          id: "creating-post",
          color: "red",
          title: "Failed to create post",
          message: "Login to create posts",
          icon: <IconX size={16} />,
          autoClose: 2000,
        });
      }
      setVisible(false);
      naigate("/");
    } else {
      showNotification({
        id: "failed-to-sent",
        color: "red",
        title: "Failed to create post",
        message: "Login to create posts",
        icon: <IconX size={16} />,
        autoClose: 2000,
      });
    }
  }
  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={visible} overlayBlur={2} />
      <Container mt="lg">
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <TextInput
          size="md"
          label="Title"
          placeholder="Title of the blog"
          id="title"
          required
          onChange={handleChange}
          value={createPostData.title}
        />
        <Textarea
          mt="sm"
          size="md"
          autosize
          id="content"
          value={createPostData.content}
          placeholder="Your blog"
          label="Content"
          required
          onChange={handleChange}
        />
        <Switch
          mt="lg"
          id="public"
          size="xl"
          styles={{ input: { width: "100px" } }}
          checked={createPostData.public}
          onChange={handleChange}
          label="Make blog public"
          onLabel="Public"
          offLabel="Private"
        />

        <Button mt="sm" onClick={handleSendData}>
          Create blog post
        </Button>
      </Container>
    </div>
  );
};

export default BlogCreate;
