import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const usersDataAtom = atom({
  key: "userDataAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
