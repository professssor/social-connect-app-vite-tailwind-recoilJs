import React from "react";
import landingBg from "../assets/landingBg.png";
import Login from "../component/Login";
import SignUp from "../component/Signup";
import loginState from "../atom/LoginStateAtom";
import { useRecoilState, useRecoilValue } from "recoil";

const Landing = () => {
  const loginSignupToggle = useRecoilValue(loginState);

  return (
    <div
      className=" flex flex-col md:flex-row items-center justify-center h-screen    overflow-hidden 
     bg-[#FEF5ED]"
    >
      <img
        className="h-[14rem] w-[23.5rem] md:w-[26rem] md:h-[29.5rem]"
        src={landingBg}
        alt=""
      />

      {loginSignupToggle ? <Login /> : <SignUp />}
    </div>
  );
};

export default Landing;
