import React, { useState } from "react";
import { useRecoilState } from "recoil";
import loginState from "../atom/LoginStateAtom";
import { useAuth } from "../Services/AuthService";

function Login() {
  const { handleLogin } = useAuth();
  const [loginToggle, setLoginToggle] = useRecoilState(loginState);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  return (
    <div className="p-20 w-[23.5rem] md:w-[34rem] md:h-[29.5rem] shadow-md max-w-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Username
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={loginEmail}
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
            value={loginPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-center bg-green">
          <button
            onClick={(event) => handleLogin(event, loginEmail, loginPassword)}
            type="submit"
            className="block bg-black text-white px-[2rem] py-[.8rem] rounded hover:bg-white hover:text-black border-gray-600 border-[1px] m-auto mt-4"
          >
            Login
          </button>

          <button
            onClick={(event) =>
               handleLogin(event, "adarshbalika", "adarshBalika")
            }
            type="submit"
            className="block bg-black text-white px-[2rem] py-[.8rem] rounded hover:bg-white hover:text-black border-gray-600 border-[1px] m-auto mt-4 "
          >
            Test{" "}
          </button>
        </div>
      </form>
      <p
        onClick={() => setLoginToggle(false)}
        className="text-center text-gray-400 hover:text-black p-6 cursor-pointer"
      >
        Don't have an account? Sign up
      </p>
    </div>
  );
}

export default Login;
