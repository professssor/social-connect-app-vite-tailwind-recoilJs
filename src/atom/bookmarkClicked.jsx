import { atom } from "recoil";

const bookmarkClicked = atom({
  key: "bookmarkClicked",
  default: false,
});
export default bookmarkClicked;
