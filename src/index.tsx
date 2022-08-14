import React from "react";
import ReactDOM from "react-dom/client";
import Blog from "./components/Blog";
import Navbar from "./components/Navbar";
import BlogDisplay from "./components/BlogDisplay";
import BlogCreate from "./components/BlogCreate";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AppShell, Text, Header } from "@mantine/core";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const qP = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={qP}>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<BlogDisplay />} />
              <Route path="create" element={<BlogCreate />} />
              <Route path=":id" element={<Blog />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
