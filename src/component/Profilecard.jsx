import React from "react";
import { useState } from "react";
import { useAuth } from "../Services/AuthService";
import ProfileCardAtom from "../atom/ProfileCardAtom";
import { useRecoilState } from "recoil";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserbyIdd, getuserById } from "../Services/userService";
import LoggedUserProfileDataAtom from "../atom/LoggedUserProfileDataAtom";
import ToggleProfileAtom from "../atom/ToggleProfileAtom";
import BioDataAtom from "../atom/BioDataAtom";
import LinkDataAtom from "../atom/LinkDataAtom";

function ProfileCard() {
  const { setAuth, user } = useAuth();

  const navigate = useNavigate();
  const [profileCardState, setProfileCardState] =
    useRecoilState(ProfileCardAtom);

  const [loggedUserData, setLoggedUserData] = useRecoilState(
    LoggedUserProfileDataAtom
  );

  const [toggleProfileState, setToggleProfileState] =
    useRecoilState(ToggleProfileAtom);

  // const [bookmarkEditChange, setBookmarkEditChange] =
  //   useRecoilState(bookmarkUpdateAtom);

  useEffect(() => {
    const getUserss = async () => {
      let userId = localStorage.getItem("userId");

      let response = await getuserById().then((res) =>
        setLoggedUserData(res?.data?.users.find((obj) => obj.username === user))
      );
    };
    setToggleProfileState(false);

    getUserss(); // Call the function to fetch the user data
  }, [toggleProfileState, user]);

  //  / Add an empty dependency array to run the effect only once
  const followersCount = loggedUserData?.followers?.length || 0;
  const followingCount = loggedUserData?.following?.length || 0;
  return (
    <div className="flex flex-col items-center rounded-2xl bg-[#282828] w-[90] p-4 ">
      <div className="relative w-full">
        <div className=" ">
          <img
            className="w-full rounded-t-2xl h-[8em]"
            src="https://picsum.photos/200/"
            alt="Backdrop"
          />
        </div>

        <div
          className="absolute h-[5rem] w-[5rem]  
         top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <img
            className="border-4 border-yellow-400 h-full w-full rounded-full bg-[#F5F5F5]"
            src={`${
              loggedUserData?.avatar ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }`}
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-4">
        <h3 className="text-lg font-semibold text-yellow-400">{user}</h3>
        <p className="text-gray-500 text-sm">
          <strong>{followersCount}</strong> followers •{" "}
          <strong>{followingCount}</strong> following
        </p>
        {/* github url */}
        <a href={loggedUserData?.link} className="text-gray-400 text-sm mt-2">
          <span>Github :</span>
          <span className="text-green-400 text-md">
            {" "}
            {loggedUserData?.link}
          </span>
        </a>

        {/* bio */}
        <p className="text-gray-400 mt-2 text-md">
          {" "}
          <span>Bio :</span>
          <span className="text-yellow-500"> {loggedUserData?.caption}</span>
        </p>
      </div>
      <div
        className="mt-4 flex w-full justify-center space-x-10
       "
      >
        <button
          className="p-2 rounded-2xl text-gray-500 hover:text-yellow-400 hover:bg-[#282828] hover:border-yellow-400 transition-colors duration-300 border border-yellow-200"
          onClick={() => setProfileCardState(true)}
        >
          <span className="p-4">view</span>
        </button>
        <button
          className="p-2 rounded-2xl text-gray-500 hover:text-yellow-400 hover:bg-[#282828] hover:border-yellow-400 transition-colors duration-300 border border-yellow-200"
          onClick={() => {
            setAuth(false);
            navigate("/");
          }}
        >
          <span className="p-2">sign-out</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
