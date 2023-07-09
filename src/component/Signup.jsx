import React, { useState } from "react";
import { useRecoilState } from "recoil";
import loginState from "../atom/LoginStateAtom";
import { useAuth } from "../Services/AuthService";

function SignUp() {
  const { handleSignup } = useAuth();
  const [loginToggle, setLoginToggle] = useRecoilState(loginState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="p-20 w-[23.5rem] md:w-[34rem] md:h-[29.5rem] shadow-md max-w-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Username
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          onClick={(event) => handleSignup(event, email, password)}
          type="submit"
          className="block bg-black text-white px-[2rem] py-[.8rem] rounded hover:bg-white hover:text-black border-gray-600 border-[1px] m-auto mt-10"
        >
          Sign Up
        </button>
      </form>
      <p
        onClick={() => setLoginToggle(true)}
        className="text-center text-gray-400 hover:text-black p-6  cursor-pointer"
      >
        Already have an account? Login
      </p>
    </div>
  );
}

export default SignUp;
