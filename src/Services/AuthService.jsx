import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

import { users } from "../backend/db/users";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { usersDataAtom } from "../atom/usersData";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(
    localStorage.getItem("token") ? true : false
  );

  // to access the user name across the app
  const [user, setUser] = useRecoilState(usersDataAtom);

  useEffect(() => {
    localStorage.getItem("token") ? setAuth(true) : setAuth(false);
  }, []);

  const handleSignup = async (event, username, password) => {
    event.preventDefault();

    if (username.trim() !== "" && password.trim() !== "") {
      try {
        const res = await axios.post("/api/auth/signup", {
          username: username,
          password: password,
        });
        users.push(res.data.user);
        console.log(users);
        console.log("signedin");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", {
        username: username === "San" ? "San": username,
        password: password === "San"? "San": password,
      });

      localStorage.setItem("token", res?.data?.encodedToken);
      localStorage.setItem("user", res?.data?.foundUser?.username);
      setUser(localStorage.getItem("user"));

      localStorage.getItem("token") && setAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{ isAuth, handleSignup, handleLogin, setAuth, user }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
