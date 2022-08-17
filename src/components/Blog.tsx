import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById, IComment } from "../api/booksApi";
import {
  ActionIcon,
  Box,
  Container,
  Group,
  Text,
  Title,
  Button,
  Overlay,
  LoadingOverlay,
  TextInput,
  Textarea,
  Switch,
} from "@mantine/core";
import { IBlog, deleteBlog, updateBlog, IUpdateBlog } from "../api/booksApi";
import CommentSection from "./CommentSection";
import AddComment from "./AddComment";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons";
import { showNotification, updateNotification } from "@mantine/notifications";
const Blog = () => {
  const { id } = useParams();
  const username = useUserStore((state) => state.username);
  const _id = useUserStore((state) => state._id);
  const [blogData, setBlogData] = useState<IBlog>({} as IBlog);
  const navigate = useNavigate();
  const [showSureDelete, setShowSureDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdateOverLay, setShowUpdateOverLay] = useState(false);
  const [valueForBlogContentUpdate, setValueForBlogContentUpdate] =
    useState<IUpdateBlog>({
      content: blogData.content,
      public: blogData.public,
      title: blogData.title,
    });
  async function refecth() {
    const run = async () => {
      const resp = await getBlogById(id as string);
      const data = await resp.json();
      setBlogData(data as IBlog);
    };
    run();
  }
  useEffect(() => {
    const run = async () => {
      const resp = await getBlogById(id as string);
      const data = await resp.json();
      setBlogData(data as IBlog);
      setValueForBlogContentUpdate({
        content: data.content,
        public: data.public,
        title: data.title,
      });
    };
    run();
  }, [username]);
  async function updateBlogLocal() {
    setShowUpdateOverLay(true);
    const resp = await updateBlog(blogData._id, valueForBlogContentUpdate);
    showNotification({
      id: "updating",
      loading: true,
      title: "Updating blog",
      message: "... ... ...",
      disallowClose: true,
    });
    if (resp.status === 200) {
      updateNotification({
        id: "updating",
        title: "Updated blog",
        message: "Blog updated succesfully",
        autoClose: true,
        color: "teal",
        icon: <IconCheck size={16} />,
      });
      refecth();
    } else if (resp.status === 500) {
      updateNotification({
        id: "updating",
        title: "Server Error",
        message: "Server error occured",
        autoClose: true,
        color: "red",
        icon: <IconX size={16} />,
      });
    } else if (resp.status === 400) {
      updateNotification({
        id: "updating",
        title: "Bad request",
        message: "Provide a blog and comment id in you request",
        autoClose: true,
        color: "red",
        icon: <IconX size={16} />,
      });
    } else if (resp.status === 401) {
      updateNotification({
        id: "updating",
        title: "Unautharized delete attempt",
        message: "Login to delete this comment",
        autoClose: true,
        color: "red",
        icon: <IconX size={16} />,
      });
    }
    setShowUpdateOverLay(false);
    setShowUpdate(false);
  }
  async function deleteBlogLocal() {
    const resp = await deleteBlog(blogData._id);
    showNotification({
      id: "deleting",
      loading: true,
      title: "Deleting blog",
      message: "... ... ...",
      disallowClose: true,
    });
    if (resp.status === 200) {
      updateNotification({
        id: "deleting",
        title: "Deleted blog",
        message: "Blog deleted succesfully",
        autoClose: true,
        color: "teal",
        icon: <IconCheck size={16} />,
      });
      navigate("/");
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
        message: "Provide a blog id in you request",
        autoClose: true,
        color: "red",
        icon: <IconX size={16} />,
      });
    } else if (resp.status === 401) {
      updateNotification({
        id: "deleting",
        title: "Unautharized delete attempt",
        message: "Login to delete this blog",
        autoClose: true,
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  }
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setValueForBlogContentUpdate((old) => ({
      ...old,
      [e.target.id]:
        e.target.type === "checkbox"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : e.target.value,
    }));
  }
  return (
    <Container id="container">
      <div>
        <Title order={1}>
          {showUpdate ? (
            <TextInput
              id="title"
              value={valueForBlogContentUpdate.title}
              onChange={handleChange}
            />
          ) : (
            <Text variant="gradient">{blogData.title}</Text>
          )}
        </Title>
        <Text pl="sm" color="dimmed">
          Author: {blogData.author?.username}
        </Text>
        <Text pl="sm" color="dimmed">
          {new Date(blogData.created_at).toLocaleDateString()}
        </Text>
        <Box id="update-delete" style={{ position: "relative" }} p="md">
          <LoadingOverlay visible={showUpdateOverLay} overlayBlur={2} />
          {showSureDelete && (
            <>
              <Overlay
                mt="sm"
                opacity={0.6}
                color="#e2e8f0"
                zIndex={5}
                blur={2}
              />
              <Box>
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
                      onClick={deleteBlogLocal}
                    >
                      Yes, delete my blog!
                    </Button>
                  </Group>
                </Box>
              </Box>
            </>
          )}
          {_id === blogData.author?._id && (
            <Box style={{ zIndex: "6", position: "relative" }}>
              <Group position={showUpdate ? "apart" : "right"}>
                {showUpdate && (
                  <Button mt="sm" onClick={updateBlogLocal}>
                    Update
                  </Button>
                )}
                <div style={{ display: "flex", gap: "10px" }}>
                  <ActionIcon
                    color="red"
                    variant="light"
                    onClick={() => setShowSureDelete((old) => !old)}
                  >
                    <IconTrash />
                  </ActionIcon>
                  <ActionIcon
                    color="blue"
                    variant="light"
                    onClick={() => setShowUpdate((old) => !old)}
                  >
                    <IconEdit />
                  </ActionIcon>
                </div>
              </Group>
            </Box>
          )}
        </Box>
        {showUpdate ? (
          <Textarea
            mt="sm"
            size="md"
            autosize
            id="content"
            value={valueForBlogContentUpdate.content}
            onChange={handleChange}
          />
        ) : (
          <Text align="justify" my="xl" size="lg">
            {blogData.content}
          </Text>
        )}
        {showUpdate && (
          <Switch
            mt="lg"
            id="public"
            size="xl"
            styles={{ input: { width: "100px" } }}
            checked={valueForBlogContentUpdate.public}
            onChange={handleChange}
            label="Make blog public"
            onLabel="Public"
            offLabel="Private"
          />
        )}
        <Title order={2}>
          <Text variant="gradient">Comments</Text>
        </Title>
        {username && <AddComment blog_id={id as string} refetch={refecth} />}
        <CommentSection comments={blogData.comments} refetch={refecth} />
      </div>
    </Container>
  );
};

export default Blog;
