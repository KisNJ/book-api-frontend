import { useUserStore } from "../stores/userStore";
export const getIndexPage = async () => {
  const res = fetch("http://localhost:3100/api");
  const data = (await res).json();
  return data;
};
interface formDataSignUp {
  username: string;
  password: string;
  confirmPassword: string;
}
export const signUp = async (formData: formDataSignUp) => {
  const response = await fetch("http://localhost:3100/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  return response;
};
interface formDatalogIn {
  username: string;
  password: string;
}
export const logIn = async (formDataLogin: formDatalogIn) => {
  const response = await fetch("http://localhost:3100/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formDataLogin),
  });
  return response;
};
export const logOut = async () => {
  const response = await fetch("http://localhost:3100/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response;
};
interface IformDataCreatePost {
  public: boolean;
  title: string;
  content: string;
}
export const postBook = async (formDataCreatePost: IformDataCreatePost) => {
  const response = await fetch("http://localhost:3100/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formDataCreatePost),
  });
  return response;
};

export const getEveryPublicPost = async () => {
  const response = await fetch("http://localhost:3100/api/blogs", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
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
  blog_id: IBlog;
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
  const response = await fetch(`http://localhost:3100/api/blogs/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });
  return response;
};
