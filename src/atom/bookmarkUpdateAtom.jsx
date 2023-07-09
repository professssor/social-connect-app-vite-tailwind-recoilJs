import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const bookmarkUpdateAtom = atom({
  key: "bookmarkUpdateAtom", // unique ID (with respect to other atoms/selectors)
  default: false,
});
export default bookmarkUpdateAtom;
