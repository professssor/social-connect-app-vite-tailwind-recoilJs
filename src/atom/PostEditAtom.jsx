import { atom } from "recoil";

const PostEditAtom = atom({
  key: "PostEditAtom", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});
export default PostEditAtom;
