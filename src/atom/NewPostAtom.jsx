import { atom } from "recoil";

const newPostState = atom({
  key: "newPostState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
export default newPostState;
