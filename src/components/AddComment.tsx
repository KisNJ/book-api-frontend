import React, { useState } from "react";
import { Button, Textarea, TextInput } from "@mantine/core";
import { useUserStore } from "../stores/userStore";
import { addComment } from "../api/booksApi";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
interface props {
  blog_id: string;
}

const AddComment = ({ blog_id }: props) => {
  async function handleClick() {
    showNotification({
      id: "comment",
      loading: true,
      title: "Signing up",
      message: "Wait for process to finish",
      autoClose: false,
      disallowClose: true,
    });
    const resp = await addComment(blog_id, content);
    console.log(resp);
    if (resp.status === 200) {
      //ok
      //add comment to local
      setContent("");
      updateNotification({
        id: "comment",
        icon: <IconCheck size={16} />,
        message: "Comment uploaded",
        title: "Succes",
        color: "teal",
        autoClose: 2000,
      });
    } else {
      updateNotification({
        id: "comment",
        icon: <IconX size={16} />,
        message: "Comment couldn't be uploaded",
        title: "Error",
        color: "red",
        autoClose: 2000,
      });
    }
  }
  const username = useUserStore((state) => state.username);
  const [content, setContent] = useState("");
  return (
    <div>
      <TextInput disabled value={`${username}`} />
      <Textarea
        mb="md"
        placeholder="your comment"
        autosize
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleClick}>Send Comment</Button>
    </div>
  );
};

export default AddComment;
