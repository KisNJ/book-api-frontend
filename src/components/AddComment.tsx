import React, { useState } from "react";
import { Button, Textarea, TextInput } from "@mantine/core";
import { useUserStore } from "../stores/userStore";
import { addComment, IComment } from "../api/booksApi";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { resolveProjectReferencePath } from "typescript";
interface props {
  blog_id: string;
  refetch: () => Promise<void>;
}

const AddComment = ({ blog_id, refetch }: props) => {
  const _id = useUserStore((state) => state._id);
  const username = useUserStore((state) => state.username);
  const [content, setContent] = useState("");

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
      setContent("");
      updateNotification({
        id: "comment",
        icon: <IconCheck size={16} />,
        message: "Comment uploaded",
        title: "Succes",
        color: "teal",
        autoClose: 2000,
      });
      refetch();
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
