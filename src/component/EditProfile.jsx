import React, { useState } from "react";

import { useRecoilState } from "recoil";
import BioDataAtom from "../atom/BioDataAtom";
import LinkDataAtom from "../atom/LinkDataAtom";
import { editUserDetails } from "../Services/userService";
import EditProfileAtom from "../atom/EditProfileAtom";
function EditProfile({ imageData }) {
  const [bio, setBio] = useRecoilState(BioDataAtom);
  const [githubLink, setGithubLink] = useRecoilState(LinkDataAtom);

  const [profileImage, setProfileImage] = useState(imageData);

  const handleBioChange = (e) => {
    setBio(e.target.value.length > 0 && e.target.value);
  };
  const handleGithubLinkChange = (e) => {
    setGithubLink(e.target.value.length > 0 && e.target.value);
  };

  const handleUpdateClick = async () => {
    let res = await editUserDetails(bio, githubLink, profileImage).then(() => {
      setEditMode(false);
    });
  };

  const [editMode, setEditMode] = useRecoilState(EditProfileAtom);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 10000,
        transform: "translate(-50%, -50%)",
      }}
      className="  flex flex-col items-center rounded-xl bg-[#282828]  w-[25rem] mb-2 m-2 "
    >
      <h2 className="text-lg font-semibold text-yellow-400 my-1">
        Edit Profile
      </h2>
      {/*  image render to be edited and changed  */}
      <img
        src={profileImage}
        alt=""
        className="rounded-full h-[7rem] w-[7rem]"
      />
      <p>
        <label>
          <p className="text-yellow-300 p-1  hover:underline  ">
            update avatar
          </p>
          <input
            onChange={(e) => {
              const file = e.target.files[0];
              setProfileImage(URL.createObjectURL(file));
            }}
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
      </p>
      <div className="mb-4 w-[90%]">
        <h3 htmlFor="bio" className="text-gray-400 mb-1 ml-3">
          Bio:
        </h3>
        <input
          id="bio"
          className="w-full px-4 py-2 rounded-xl  focus:outline-yellow-400 bg-[#161616]  border-none text-yellow-400  "
          placeholder="Enter your bio"
          value={bio}
          onChange={handleBioChange}
        />
      </div>
      <div className="mb-4 w-[90%]">
        <h3 htmlFor="githubLink" className="text-gray-400 mb-1 ml-3">
          GitHub Link:
        </h3>
        <input
          type="text"
          id="githubLink"
          className="w-full px-4 py-2 rounded-xl bg-[#161616] 
          focus:outline-yellow-400  text-yellow-400   "
          placeholder="Enter your GitHub link"
          value={githubLink}
          onChange={handleGithubLinkChange}
        />
      </div>
      <div
        id="button-container"
        className="w-full flex justify-center space-x-10 p-4"
      >
        <button
          className="p-2 rounded-2xl text-gray-500 hover:text-yellow-400 hover:bg-[#282828] hover:border-yellow-400 transition-colors duration-300 border border-yellow-200"
          onClick={handleUpdateClick}
        >
          <span className="p-2">Update</span>
        </button>

        <button
          className="p-2 rounded-2xl text-gray-500 hover:text-yellow-400 hover:bg-[#282828] hover:border-yellow-400 transition-colors duration-300 border border-yellow-200"
          onClick={() => setEditMode(false)}
        >
          <span className="p-2">Go Back</span>
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
