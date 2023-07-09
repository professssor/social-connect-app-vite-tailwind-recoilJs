import { atom } from "recoil";

const OtherUsersProfileAtom = atom({
  key: "OtherUsersProfileAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export default OtherUsersProfileAtom;
