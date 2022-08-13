// import React from "react";

// import { Console } from "console";
const MainPage = () => {
  const getIndex = async () => {
    const res = fetch("http://localhost:3100/api");
    const data = (await res).json();
    return data;
  };
  // const { isLoading, error, data } = useQuery(["index"], getIndex);
  // console.log(data);
  return <div>aaa</div>;
};

export default MainPage;
