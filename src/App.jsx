import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";

import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import { users } from "./backend/db/users";
import Landing from "./pages/Landing";
import MainInterface from "./pages/MainInterface";
import { useAuth } from "./Services/AuthService";
import ProfileExtended from "./component/ProfileExtended";
import BookmarkPage from "./component/BookmarkPage";

function App() {
  const { isAuth } = useAuth();

  return (
    <div className="App ">
      <Routes>
        <Route path="/profile" element={<ProfileExtended />} />
        <Route path="/" element={isAuth ? <MainInterface /> : <Landing />} />
        <Route
          path="/bookmark"
          element={isAuth ? <BookmarkPage /> : <Landing />}
        />
      </Routes>
    </div>
  );
}

export default App;
