import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../Services/AuthService";
import ProfileCardAtom from "../atom/ProfileCardAtom";
import { useRecoilState } from "recoil";
import { getPostsByAUser } from "../Services/PostService";
import PostCard from "./Postcard";
import OtherUsersProfileAtom from "../atom/OtherUsersProfileAtom";
import OtherUserProfileDataAtom from "../atom/OtherUserProfileDataAtom";
import ToggleProfileAtom from "../atom/ToggleProfileAtom";

function OtherUsersProfile() {
  const [profileCardState, setProfileCardState] =
    useRecoilState(ProfileCardAtom);
  const { setAuth, user } = useAuth();
  const [otherUserProfileDataState, setOtherUserProfileDataState] =
    useRecoilState(OtherUserProfileDataAtom);
  const [toggleProfileState, setToggleProfileState] =
    useRecoilState(ToggleProfileAtom);
  const [userFilteredPost, setUserFilteredPost] = useState([]);
  const [otherUserProfileState, setOtherUserProfileState] = useRecoilState(
    OtherUsersProfileAtom
  );

  // fetching  post by the user
  useEffect(() => {
    getPostsByAUser(otherUserProfileDataState?.username).then((res) =>
      setUserFilteredPost(res?.data?.posts?.reverse())
    );

    setToggleProfileState(false);
  }, [otherUserProfileDataState, toggleProfileState]);

  return (
    <div className="flex flex-col items-center rounded-xl  bg-[#161616] w-[110%] mb-2 m-3">
      <div className="relative w-full ">
        <div className=" ">
          <img
            className="w-full rounded-t-2xl h-[16em]"
            src="https://picsum.photos/200/"
            alt="Backdrop"
          />
        </div>

        <div className="absolute h-[8rem] w-[8rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            className="border-4 border-yellow-400 h-full w-full rounded-full"
            src={otherUserProfileDataState?.avatar}
            alt="User Avatar"
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-4">
        <h3 className="text-lg font-semibold text-yellow-400 ">
          {otherUserProfileDataState?.username}
        </h3>
        <p className="text-gray-500 text-sm">
          <strong> {otherUserProfileDataState?.followers.length}</strong>{" "}
          followers •
          <strong>{otherUserProfileDataState?.following.length}</strong>{" "}
          following
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Lorem ipsum dolor sit amet.
        </p>
      </div>

      <strong className="text-yellow-500 px-6 py-2 mt-10 text-2xl font-semibold w-full text-center  tracking-[.7rem]">
        {otherUserProfileDataState?.username} Posts
      </strong>
      <div className="w-[100%]  ">
        {userFilteredPost.length === 0 && (
          <p className="text-yellow-500 text-lg  p-20 text-center ">
            No Post Visible
          </p>
        )}
        {userFilteredPost.map((post) => (
          <div className="bg-[#161616] w-[100%] ">
            <PostCard
              id={post._id} // Assuming each post has a unique identifier like 'id'
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

export default OtherUsersProfile;
