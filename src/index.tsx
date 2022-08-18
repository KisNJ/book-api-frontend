import React from "react";
import ReactDOM from "react-dom/client";
import Blog from "./components/Blog";
import Navbar from "./components/Navbar";
import BlogDisplay from "./components/BlogDisplay";
import BlogCreate from "./components/BlogCreate";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogOwn from "./components/BlogOwn";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<BlogDisplay />} />
        <Route path="create" element={<BlogCreate />} />
        <Route path="own" element={<BlogOwn />} />
        <Route path=":id" element={<Blog />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);

reportWebVitals();
