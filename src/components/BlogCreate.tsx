import React, { useState } from "react";
import {
  Text,
  Container,
  Button,
  TextInput,
  Switch,
  Textarea,
} from "@mantine/core";
const BlogCreate = () => {
  const [createPostData, setCreatePostData] = useState({
    title: "",
    content: "",
    public: false,
  });
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

  return (
    <Container mt="lg">
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
        checked={createPostData.public}
        onChange={handleChange}
        label="Make blog public"
        onLabel="Public"
        offLabel="Private"
      />

      <Button mt="sm">Create blog post</Button>
    </Container>
  );
};

export default BlogCreate;
