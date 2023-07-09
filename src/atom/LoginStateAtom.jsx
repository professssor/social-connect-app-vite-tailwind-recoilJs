import { atom } from "recoil";

const loginState = atom({
  key: "LoginState", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});
export default loginState;
