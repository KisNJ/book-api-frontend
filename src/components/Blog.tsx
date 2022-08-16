import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { runInContext } from "vm";
import { getBlogById } from "../api/booksApi";
import { useGetUser } from "../api/getUser";
const Blog = () => {
  const { id } = useParams();
  useGetUser();
  useEffect(() => {
    const run = async () => {
      const resp = await getBlogById(id as string);
      const data = await resp.json();
      console.log(data);
    };
    run();
  }, []);
  console.log(id);
  return <div>Blog</div>;
};

export default Blog;
