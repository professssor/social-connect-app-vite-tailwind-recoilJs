import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import { useRecoilState } from "recoil";
import { addNewPost } from "../Services/PostService";
import { useEffect } from "react";
import shouldFetchAtom from "../atom/ShouldFetchAtom";
import { useAuth } from "../Services/AuthService";

import PostAlert from "../atom/PostAlert";
import LoggedUserProfileDataAtom from "../atom/LoggedUserProfileDataAtom";
function Post() {
  const { user } = useAuth();

  const [loggedUserData, setLoggedUserData] = useRecoilState(
    LoggedUserProfileDataAtom
  );

  // tells when to fetch and when to not
  const [shouldFetch, setShouldFetch] = useRecoilState(shouldFetchAtom);
  const [postContent, setPostContent] = useState("");
  // to render the image  whiich is selected
  const [selectedImage, setSelectedImage] = useState(null);
  // to render the image  whiich is selected
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

  // when post in sidebar is clicked
  const [postAlert, setPostAlert] = useRecoilState(PostAlert);

  setTimeout(() => {
    setPostAlert(false);
  }, 4000);

  const handleSubmitClick = async () => {
    if (postContent) {
      try {
        let token = localStorage.getItem("token");
        let response = await addNewPost(
          postContent,
          user,
          token,
          selectedImageUrl,
          selectedVideoUrl
        );
      } catch (error) {
        console.log("Error posting the new post:", error);
      }
    }
    setShouldFetch(true);
    setPostContent("");
    setSelectedImage(null);
    setSelectedVideo(null);
    setSelectedImageUrl("");
    setSelectedVideoUrl("");
  };

  return (
    <div
      className="  flex items-start w-[95%] rounded-2xl bg-[#282828]  mt-5 ml-2 md:ml-4
    lg:w-[95%]"
    >
      <img
        className=" h-12 w-12 lg:h-24 lg:w-24 rounded-full lg:rounded-3xl mt-3 ml-2 "
        src={loggedUserData?.avatar}
        alt="userAvatar"
      />
      <aside className="flex flex-col w-full flex-shrink justify-center items-center ">
        <div
          className=" flex w-[90%] p-1 text-center overflow-hidden items-center
         "
        >
          <input
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            type="text"
            onFocus={(e) =>
              (e.target.placeholder = "use  WIN + ; to add emoji ")
            }
            onBlur={(e) =>
              (e.target.placeholder = "Tell the world about it !!")
            }
            placeholder="Tell the world about it !!  "
            className="    outline-none rounded-lg w-[100%] bg-[#282828] text-yellow-300 text-md border-[1px] border-gray-700 hover:border-[#ffd93d] transition-all duration-500 px-4 py-4 mb-4 mt-2 md:w-[100%] "
          />

          <div
            onClick={handleSubmitClick}
            className={`${postAlert ? "animate-bounce " : ""}`}
          >
            {" "}
            <SendIcon className=" ml-2 text-yellow-400 hover:text-green-500" />
          </div>
        </div>
        {/* it will render the image upon being asked to add */}
        {selectedImage && (
          <div className="w-[90%]   mr-8 mt-10  ">
            <img
              src={selectedImageUrl}
              alt="Selected"
              className=" w-full rounded-xl   h-full "
            />
          </div>
        )}
        {/* it will render the video upon being asked to add */}
        {selectedVideo && (
          <div className=" w-[90%]   mr-8 mt-10  ">
            <video
              autoPlay
              loop
              src={URL.createObjectURL(selectedVideo)}
              alt="Selected"
              className="w-full h-full rounded-xl  "
            />
          </div>
        )}
        <div className="  flex justify-center items-center  space-x-4  md:space-x-0 md:justify-around w-[100%] mt-6  ">
          <div className=" postIcons  text-green-700  ">
            {!selectedImage ? (
              <label>
                <AddCircleOutlineIcon />
                <p className="hidden md:navText ml-2">Image</p>
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedImage(file);
                    setSelectedImageUrl(URL.createObjectURL(file));
                  }}
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            ) : (
              <p
                className="hover:underline text-yellow-400 text-md "
                onClick={() => setSelectedImage(null)}
              >
                Remove image
              </p>
            )}
          </div>
          <div className=" postIcons text-blue-600">
            {!selectedVideo ? (
              <label>
                <VideoCallIcon />
                <p className="hidden md:navText ml-2 ">Video</p>
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedVideo(file);
                    setSelectedVideoUrl(URL.createObjectURL(file));
                  }}
                  id="file-upload-video"
                  type="file"
                  className="hidden"
                  accept="video/*"
                />
              </label>
            ) : (
              <p
                className="hover:underline text-yellow-400 text-md "
                onClick={() => setSelectedVideo(null)}
              >
                Remove video
              </p>
            )}
          </div>
          {/* <div className=" postIcons text-purple-400  ">
            <BookmarkIcon className="" />
            <p className="hidden md:navText">bookmark</p>
          </div> */}

          <div
            onClick={() => setTimeout(handleSubmitClick, 5000)}
            className=" postIcons text-yellow-600 "
          >
            <ScheduleSendIcon />
            <p className="hidden md:navText ">SchedulePost-1hr</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Post;
