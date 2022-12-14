import { useUserStore } from "../stores/userStore";
export const getIndexPage = async () => {
  const res = fetch("https://protected-plains-00046.herokuapp.com/api");
  const data = (await res).json();
  return data;
};
interface formDataSignUp {
  username: string;
  password: string;
  confirmPassword: string;
}
export const signUp = async (formData: formDataSignUp) => {
  const response = await fetch(
    "https://protected-plains-00046.herokuapp.com/signup",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    },
  );
  return response;
};
interface formDatalogIn {
  username: string;
  password: string;
}
export const logIn = async (formDataLogin: formDatalogIn) => {
  const response = await fetch(
    "https://protected-plains-00046.herokuapp.com/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formDataLogin),
    },
  );
  return response;
};
export const logOut = async () => {
  const response = await fetch(
    "https://protected-plains-00046.herokuapp.com/logout",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  return response;
};
interface IformDataCreatePost {
  public: boolean;
  title: string;
  content: string;
}
export const postBook = async (formDataCreatePost: IformDataCreatePost) => {
  const response = await fetch(
    "https://protected-plains-00046.herokuapp.com/api/blogs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formDataCreatePost),
    },
  );
  return response;
};

export const getEveryPublicPost = async () => {
  const response = await fetch(
    "https://protected-plains-00046.herokuapp.com/api/blogs",
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    },
  );
  return response;
};
export interface IAuthor {
  username: string;
  _id: string;
  _v?: number;
}
export interface IComment {
  author: IAuthor;
  content: string;
  created_at: string;
  blog_id: string;
  _id: string;
}
export interface IBlog {
  _v?: number;
  author: IAuthor;
  comments: IComment[];
  content: string;
  created_at: string;
  title: string;
  _id: string;
  public: boolean;
}

export const getBlogById = async (id: string) => {
  const response = await fetch(
    `https://protected-plains-00046.herokuapp.com/api/blogs/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    },
  );
  return response;
};

export const addComment = async (blog_id: string, content: string) => {
  console.log(JSON.stringify(content));
  const response = await fetch(
    `https://protected-plains-00046.herokuapp.com/api/blogs/${blog_id}/comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    },
  );
  return response;
};
export const deleteComment = async (blog_id: string, comment_id: string) => {
  const response = await fetch(
    `https://protected-plains-00046.herokuapp.com/api/blogs/${blog_id}/comment/${comment_id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    },
  );
  return response;
};
export const updateComment = async (
  blog_id: string,
  comment_id: string,
  content: string,
) => {
  const response = await fetch(
    `https://protected-plains-00046.herokuapp.com/api/blogs/${blog_id}/comment/${comment_id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    },
  );
  return response;
};
export const deleteBlog = async (blog_id: string) => {
  const response = await fetch(
    `https://protected-plains-00046.herokuapp.com/api/blogs/${blog_id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  return response;
};
export interface IUpdateBlog {
  title: string;
  content: string;
  public: boolean;
}
export const updateBlog = async (blog_id: string, content: IUpdateBlog) => {
  const response = await fetch(
    `https://protected-plains-00046.herokuapp.com/api/blogs/${blog_id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    },
  );
  return response;
};
export const getEveryOwnPost = async () => {
  const response = await fetch(
    "https://protected-plains-00046.herokuapp.com/api/blogs/own",
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    },
  );
  return response;
};
