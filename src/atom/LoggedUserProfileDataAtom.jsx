import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
const LoggedUserProfileDataAtom = atom({
  key: "LoggedUserProfileDataAtom", // unique ID (with respect to other atoms/selectors)
  default: [],
  effects_UNSTABLE: [persistAtom], // default value (aka initial value)
});
export default LoggedUserProfileDataAtom;
