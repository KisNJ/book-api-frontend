import create from "zustand";
import { devtools } from "zustand/middleware";

interface UserType {
  username: string;
  _id: string;
  changeUser: (username: string, id: string) => void;
}
export const useUserStore = create<UserType>()(
  devtools((set) => ({
    username: "",
    _id: "",
    changeUser: (username, id) => set({ username, _id: id }),
  })),
);
