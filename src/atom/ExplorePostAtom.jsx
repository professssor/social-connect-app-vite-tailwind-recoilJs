import { atom } from "recoil";

const ExplorePostAtom = atom({
  key: "ExplorePostAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export default ExplorePostAtom;
