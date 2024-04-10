import { atom } from "recoil";

type StateType = {
  search: string;
};

const initialState: StateType = {
  search: "",
};
export const searchState = atom({
  key: "searchState",
  default: initialState,
});
