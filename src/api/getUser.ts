import { useUserStore } from "../stores/userStore";
import { useEffect } from "react";
import { runInContext } from "vm";
export const useGetUser = async () => {
  const changeUser = useUserStore((state) => state.changeUser);
  useEffect(() => {
    async function run() {
      const resp = await fetch("http://localhost:3100/signup/check", {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (resp.status === 200) {
        const data = await resp.json();
        changeUser(data.username, data._id);
        return { username: data.username, _id: data._id };
      } else {
        return { username: "", _id: "" };
      }
    }
    run();
  }, []);
};
