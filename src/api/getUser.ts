import { useUserStore } from "../stores/userStore";
import { useEffect } from "react";
import { runInContext } from "vm";
export const useGetUser = async () => {
  const changeUser = useUserStore((state) => state.changeUser);
  console.log("meee");
  useEffect(() => {
    async function run() {
      const resp = await fetch("http://localhost:3100/signup/check", {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(resp.status);
      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data);
        changeUser(data.username, data._id);
        return { username: data.username, _id: data._id };
      } else {
        return { username: "", _id: "" };
      }
    }
    run();
  }, []);
};
