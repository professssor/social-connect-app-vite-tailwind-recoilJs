import React, { useEffect, useState } from "react";
import ProfileCard from "./Profilecard";
import ProfileCardAtom from "../atom/ProfileCardAtom";
import { useRecoilState } from "recoil";
import { Search, SettingsSuggest } from "@mui/icons-material";
import SearchComp from "./SearchComp";
import { Link, useFetcher } from "react-router-dom";
import { followUser, getuserById, unfollowUser } from "../Services/userService";
import OtherUsersProfileAtom from "../atom/OtherUsersProfileAtom";
import OtherUserProfileDataAtom from "../atom/OtherUserProfileDataAtom";
import ToggleProfileAtom from "../atom/ToggleProfileAtom";
import { getPostsByAUser } from "../Services/PostService";
import SuggestionDataAtom from "../atom/SuggestionDataAtom";
import LoggedUserProfileDataAtom from "../atom/LoggedUserProfileDataAtom";

function Suggestion() {
  const [loggedUserData, setLoggedUserData] = useRecoilState(
    LoggedUserProfileDataAtom
  );
  const [profileCardState, setProfileCardState] =
    useRecoilState(ProfileCardAtom);
  const [userList, setUserList] = useState();
  const [otherUserProfileState, setOtherUserProfileState] = useRecoilState(
    OtherUsersProfileAtom
  );
  const [otherUserProfileDataState, setOtherUserProfileDataState] =
    useRecoilState(OtherUserProfileDataAtom);
  const [toggleProfileState, setToggleProfileState] =
    useRecoilState(ToggleProfileAtom);
  const [followState, setFollowState] = useState({});
  const [suggestionDataState, setSuggestionDataState] =
    useRecoilState(SuggestionDataAtom);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let response = await getuserById(); //change name to get users and not get usersbyId
        setUserList(response.data.users);
      } catch {
        console.log("Error fetching users");
      }
    };
    getUsers();
  }, [toggleProfileState, followState]);

  const handleFollowing = async (userId, suggestion) => {
    try {
      if (
        loggedUserData?.following?.some((follower) => follower._id === userId)
      ) {
        // User is already followed, so unfollow
        await unfollowUser(userId);
        setFollowState((prevState) => ({
          ...prevState,
          [userId]: false,
        }));
      } else {
        // User is not followed, so follow

        await followUser(userId);
        setFollowState((prevState) => ({
          ...prevState,
          [userId]: true,
        }));
      }

      // setOtherUserProfileDataState(suggestion);
      // Trigger profile toggle to update the suggestion list
      setToggleProfileState((prevState) => !prevState);
    } catch (error) {
      console.log("Error toggling follow state: ", error);
    }
  };

  return (
    <div className="hidden lg:inline-flex flex-col w-[70%] justify-start space-y-6 mr-8 mt-6 h-[100vh] sticky top-6 self-start">
      <SearchComp />
      {!profileCardState && !otherUserProfileState && <ProfileCard />}
      <div className="text-center bg-[#161616] h-[50vh] w-full rounded-3xl">
        <h2 className="text-lg font-semibold text-gray-500 text-center my-2 p-1">
          suggestion
        </h2>
        <div className="flex flex-col space-y-4 w-full items-center overflow-y-scroll h-[40vh]">
          {userList?.slice(1).map((suggestion) => {
            const { _id } = suggestion;

            const isFollowing = followState[_id] || false;

            return (
              <div
                key={suggestion._id}
                className="flex items-center space-x-5 justify-between bg-[#282828] p-2 rounded-2xl w-[75%] "
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={suggestion.avatar}
                  alt={`User Avatar - ${suggestion.name}`}
                />
                <p
                  onClick={() => {
                    setOtherUserProfileDataState(suggestion);
                    setSuggestionDataState(suggestion);
                    setOtherUserProfileState(true);
                    setProfileCardState(false);

                    setToggleProfileState(false);
                  }}
                  className="text-yellow-400 cursor-pointer hover:underline"
                >
                  {suggestion.username}
                </p>

                <button
                  onClick={() => {
                    handleFollowing(_id, suggestion);
                  }}
                  className="text-gray-500 border-yellow-500 rounded-xl px-3 py-[5px] hover:bg-[#
                  
                  ] hover:text-yellow-400 transition duration-200"
                >
                  {isFollowing ? "following" : "follow"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Suggestion;
