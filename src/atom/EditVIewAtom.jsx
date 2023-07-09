import { atom } from "recoil";

const EditViewAtom = atom({
  key: "EditViewAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export default EditViewAtom;
