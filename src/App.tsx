import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useQuery } from "@tanstack/react-query";
import { getIndexPage } from "./api/booksApi";
function App() {
  const { isLoading, data } = useQuery(["index"], getIndexPage);
  if (isLoading) return <div>Loading</div>;
  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
