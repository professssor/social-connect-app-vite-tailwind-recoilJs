import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../Services/AuthService";
import ProfileCardAtom from "../atom/ProfileCardAtom";
import { useRecoilState } from "recoil";
import { getPostsByAUser } from "../Services/PostService";
import PostCard from "./Postcard";
import LoggedUserProfileDataAtom from "../atom/LoggedUserProfileDataAtom";
import ToggleProfileAtom from "../atom/ToggleProfileAtom";
import { getuserById } from "../Services/userService";
import shouldFetchAtom from "../atom/ShouldFetchAtom";
import EditProfile from "./EditProfile";
import EditProfileAtom from "../atom/editProfileAtom";
import BioDataAtom from "../atom/BioDataAtom";
import LinkDataAtom from "../atom/LinkDataAtom";

function ProfileExtended() {
  const [profileCardState, setProfileCardState] =
    useRecoilState(ProfileCardAtom);
  const { setAuth, user } = useAuth();
  const [userFilteredPost, setUserFilteredPost] = useState([]);
  const [shouldFetch, setShouldFetch] = useRecoilState(shouldFetchAtom);
  const [editMode, setEditMode] = useRecoilState(EditProfileAtom);
  const [bio, setBio] = useRecoilState(BioDataAtom);
  const [githubLink, setGithubLink] = useRecoilState(LinkDataAtom);

  const [loggedUserData, setLoggedUserData] = useRecoilState(
    LoggedUserProfileDataAtom
  );
  const [toggleProfileState, setToggleProfileState] =
    useRecoilState(ToggleProfileAtom);

  // fetching post by the user
  useEffect(() => {
    getPostsByAUser(user).then((res) =>
      setUserFilteredPost(res?.data?.posts?.reverse())
    );
  }, [profileCardState, shouldFetch]);

  useEffect(() => {
    const getUserss = async () => {
      let userId = localStorage.getItem("userId");

      let response = await getuserById().then((res) =>
        setLoggedUserData(res?.data?.users.find((obj) => obj.username === user))
      );
    };

    getUserss(); // Call the function to fetch the user data
  }, [toggleProfileState, user, shouldFetch, editMode]);

  const handleUpdateProfile = () => {
    // Logic for updating the profile
    // Add your implementation here
  };

  return (
    <div className="flex flex-col items-center rounded-xl bg-[#161616] w-[110%] mb-2 m-3">
      {editMode && <EditProfile imageData={loggedUserData?.avatar} />}
      <div className="relative w-full">
        <div className="">
          <img
            className="w-full rounded-t-2xl h-[16em]"
            src="https://picsum.photos/200/"
            alt="Backdrop"
          />
        </div>

        <div className="absolute h-[10rem] w-[10rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p- m-1">
          <img
            className="border-4 border-yellow-400 h-full w-full rounded-full"
            src={loggedUserData?.avatar}
            alt="User Avatar"
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full my-3 p-3">
        <h3 className="text-lg font-semibold text-yellow-400">
          {loggedUserData.username}
        </h3>
        <p className="text-gray-500 text-sm">
          <strong>{loggedUserData?.followers.length}</strong> followers •{" "}
          <strong>{loggedUserData?.following.length}</strong> following
        </p>
        {loggedUserData?.link && loggedUserData?.link.length > 0 && (
          <p>
            <span className="text-gray-500">Github :</span>
            <a
              className="decoration-none text-green-400"
              href={loggedUserData?.link}
            >
              {loggedUserData?.link}
            </a>
          </p>
        )}
        {loggedUserData?.caption && loggedUserData?.caption.length > 0 && (
          <p className="text-gray-400 text-md mt-2">
            <span className="text-gray-500">Bio :</span>
            <span className="text-yellow-500">{loggedUserData?.caption}</span>
          </p>
        )}
      </div>
      <div className="mt-4 flex w-full justify-center space-x-10">
        <button
          className="p-2 rounded-2xl text-gray-500 hover:text-yellow-400 hover:bg-[#282828] hover:border-yellow-400 transition-colors duration-300 border border-yellow-200"
          onClick={() => setAuth(false)}
        >
          <span className="p-2">Sign Out</span>
        </button>

        <button
          className="p-2 rounded-2xl text-gray-500 hover:text-yellow-400 hover:bg-[#282828] hover:border-yellow-400 transition-colors duration-300 border border-yellow-200"
          onClick={() => setEditMode(!editMode)}
        >
          <span className="p-2">Update Profile</span>
        </button>
      </div>
      <strong className="text-yellow-500 px-6 py-2 mt-10 text-2xl font-semibold w-full text-center tracking-[.7rem]">
        Your Posts
      </strong>
      <div className="w-[100%]">
        {userFilteredPost.length === 0 && (
          <p className="text-yellow-500 text-lg p-20 text-center">
            You don't have any posts
          </p>
        )}
        {userFilteredPost.map((post) => (
          <div className="bg-[#161616] w-[100%]" key={post._id}>
            <PostCard
              id={post._id}
              video={post.video}
              username={post.username}
              date={post.date}
              image={post.image}
              caption={post.caption}
              likes={post.likes}
              avatar={post.avatar}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileExtended;
