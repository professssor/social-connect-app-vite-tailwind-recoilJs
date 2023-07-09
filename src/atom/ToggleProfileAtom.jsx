import { atom } from "recoil";

const ToggleProfileAtom = atom({
  key: "ToggleProfileAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export default ToggleProfileAtom;
