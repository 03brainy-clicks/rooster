import { atom } from "recoil";

type StateType = {
  title: string;
  content?: string;
  tag:string;
  published?: boolean;
};

const initialState: StateType = {
  title: "",
  content: "",
  tag:'',
  published: false,
};
export const blogState = atom({
  key: "blogState",
  default: initialState,
});
