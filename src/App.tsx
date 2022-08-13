import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import MainPage from "./components/MainPage";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
function App() {
  const getIndex = async () => {
    const res = fetch("http://localhost:3100/api");
    const data = (await res).json();
    return data;
  };
  const { isLoading, data } = useQuery(["index"], getIndex);
  if (isLoading) return <div>Loading</div>;
  return (
    <div className="App">
      {JSON.stringify(data)}
      {/* <MainPage /> */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    // </QueryClientProvider>
  );
}

export default App;
