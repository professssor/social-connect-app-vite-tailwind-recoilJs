import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import OtherUsersProfileAtom from "../atom/OtherUsersProfileAtom";
import OtherUserProfileDataAtom from "../atom/OtherUserProfileDataAtom";
import ToggleProfileAtom from "../atom/ToggleProfileAtom";
import SuggestionDataAtom from "../atom/SuggestionDataAtom";
import { getuserById } from "../Services/userService";
import ProfileCardAtom from "../atom/ProfileCardAtom";

function SearchResults({ caption, name }) {
  const [otherUserProfileState, setOtherUserProfileState] = useRecoilState(
    OtherUsersProfileAtom
  );

  const [profileCardState, setProfileCardState] =
    useRecoilState(ProfileCardAtom);
  const [otherUserProfileDataState, setOtherUserProfileDataState] =
    useRecoilState(OtherUserProfileDataAtom);
  const [localUserList, setLocalUserList] = useState([]);

  const [suggestionDataState, setSuggestionDataState] =
    useRecoilState(SuggestionDataAtom);
  const [toggleProfileState, setToggleProfileState] =
    useRecoilState(ToggleProfileAtom);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let response = await getuserById();
        setLocalUserList(response.data.users);
      } catch {
        console.log("Error fetching users");
      }
    };
    getUsers();
  }, [toggleProfileState]);

  const handleClick = () => {
    let clickedUser = localUserList.find((user) => user.username === name);
    setSuggestionDataState(clickedUser);
    setOtherUserProfileDataState(clickedUser);
    setOtherUserProfileState(true);
    setProfileCardState(false);
    setToggleProfileState(false);
  };

  return (
    <div className="bg-black  relative z-10 py-6 px-5  hover:bg-[#161616]">
      <div className="text-gray-400">
        <p className="text-white">
          <span className="text-yellow-600">Caption:</span> {caption}
        </p>
        <p className="text-white p-1">
          <span className="text-yellow-600">Name:</span>
          <span
            onClick={handleClick}
            className="text-yellow-500 text-lg hover:underline ml-3 animate-pulse"
          >
            {name}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SearchResults;
