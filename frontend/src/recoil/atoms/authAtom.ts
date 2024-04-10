import { atom } from "recoil";

type StateType = {
  auth: boolean;
  token: string;
  username?: string;
  email?: string;
};

const initialState: StateType = {
  auth: false,
  token: "",
};
export const authState = atom({
  key: "authState",
  default: initialState,
});
