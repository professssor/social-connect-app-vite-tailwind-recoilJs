import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import shouldFetchAtom from "../atom/ShouldFetchAtom";
import { useRecoilState } from "recoil";
import {
  addCommentService,
  deletePostService,
  dislikePostService,
  likePostService,
} from "../Services/PostService";
import { useAuth } from "../Services/AuthService";
import EditViewAtom from "../atom/EditVIewAtom";
import EditComponent from "./EditComponent";
import PostEditAtom from "../atom/PostEditAtom";
import {
  addBookmarkService,
  getBookmarkService,
  removeBookmarkService,
} from "../Services/userService";
import BookmarkAtom from "../atom/BookmarkAtom";
import BookmarkLikeAtom from "../atom/BookmarkLikeAtom";
import bookmarkUpdateAtom from "../atom/bookmarkUpdateAtom";
import BookmarkColorAtom from "../atom/BookmarkColorAtom";
import PostsAtom from "../atom/PostsAtom";
import LoggedUserProfileDataAtom from "../atom/LoggedUserProfileDataAtom";

function PostCard({
  id,
  username,
  date,
  image,
  caption,
  video,
  likes,
  notPost,
  avatar,
}) {
  const { user } = useAuth();

  // const [likeButton, setLikeButton] = useState(false);

  const [showEditDelete, setShowEditDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useRecoilState(shouldFetchAtom);
  const [editView, setEditView] = useRecoilState(EditViewAtom);
  const [postObj, setpostObj] = useRecoilState(PostEditAtom);
  const [commentData, setCommentData] = useState("");
  const [commentNumber, setCommentNumber] = useState(0);
  const [posts, setPosts] = useRecoilState(PostsAtom);
  const [bookmarkArray, setBookmarkArray] = useRecoilState(BookmarkAtom);

  const [bookmarkEditChange, setBookmarkEditChange] =
    useRecoilState(bookmarkUpdateAtom);

  const [loggedUserData, setLoggedUserData] = useRecoilState(
    LoggedUserProfileDataAtom
  );

  // to delete posts upon being asked to
  const manageDeletePost = async () => {
    let token = localStorage.getItem("token");

    let res = await deletePostService(id, token);
    setShouldFetch(true);
    setShowEditDelete(!showEditDelete);
  };
  // rendering the edit/delete buttons
  const toggleEditDelete = () => {
    setShowEditDelete(!showEditDelete);
    setShouldFetch(true);
  };

  // ******************
  const IsBookmarked = bookmarkArray.some((post) => post._id == id);

  const handleLikeFeature = async () => {
    if (likes && likes?.likeCount > 0) {
      try {
        let token = localStorage.getItem("token");
        let response = await dislikePostService(id, token);
        // setLikeButton(false);
        setShouldFetch(true);
      } catch (error) {
        console.log("error");
      }
    }
    if (likes && likes?.likeCount === 0) {
      try {
        let token = localStorage.getItem("token");
        let response = await likePostService(id, token);

        // setLikeButton(true);
        setShouldFetch(true);
      } catch (error) {
        console.log("error");
      }
    }
  };

  // ******************handle like for bookmark

  // ****** handleBookmark function

  const handleBookMark = async () => {
    let token = localStorage.getItem("token");
    const isBookmarked = bookmarkArray.some((post) => post._id === id);

    if (!isBookmarked) {
      let response = await addBookmarkService(id, token).then((res) => {
        setBookmarkArray(res?.data?.bookmarks);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id ? { ...post, bookmarked: true } : post
          )
        );
      });
    }

    if (isBookmarked) {
      let response = await removeBookmarkService(id, token).then((res) => {
        setBookmarkArray(res?.data?.bookmarks);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id ? { ...post, bookmarked: false } : post
          )
        );
      });
    }
  };

  useEffect(() => {
    if (editView) {
      document.body.style.overflowY = "hidden"; // Apply 'overflow: hidden' to the body element
      // document.body.style.filter = "blur(4px)"; // Apply blur effect to the body element
    } else {
      document.body.style.overflowY = "auto"; // Revert back to default 'overflow: auto' for the body element
      // document.body.style.filter = "none"; // Remove blur effect from the body element
    }

    return () => {
      // document.body.style.overflowY = "auto"; // Clean up by resetting 'overflow' to default on unmount
      // document.body.style.filter = "none"; // Clean up by removing blur effect on unmount
    };
  }, [editView]);

  return (
    <div>
      {editView && <EditComponent {...postObj} />}
      <div
        className={`  ${editView ? "blur-sm" : ""}  flex flex-col items-start 
    mx-auto rounded-2xl bg-[#282828] w-[95%]  m-2 p-6 md:mx-4 lg:w-[95%] mt-[1rem] `}
      >
        <div className="flex items-center w-full">
          <img
            className="h-12 w-12 rounded-full m-2"
            src={
              avatar ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            alt="userAvatar"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-yellow-400">
              {username}
            </h3>
            <p className="text-gray-500 text-sm">{date}</p>
          </div>
          {
            <div className="flex-1 text-right">
              {user === username && (
                <div className="relative">
                  <MoreVertIcon
                    className="mr-4 text-gray-500 cursor-pointer"
                    onClick={toggleEditDelete}
                  />

                  {/* the edit post window  */}

                  {/* the edit/delete button for the buttons  */}
                  {showEditDelete && (
                    <div className="  absolute right-6 top-full mt-1 flex flex-col items-center text-left justify-evenly h-[7rem] bg-[#161616]  rounded-xl w-[5rem]  ">
                      <button
                        onClick={() => {
                          setpostObj({
                            id,
                            username,
                            video,
                            image,
                            date,
                            caption,
                          });
                          setShouldFetch(true);
                          setEditView(!editView);
                          setShowEditDelete(!showEditDelete);
                        }}
                        className="  hover:bg-[#282828] w-full h-full rounded-xl   "
                      >
                        <span className="text-yellow-400 ml-2">Edit</span>
                      </button>
                      <button
                        onClick={() => manageDeletePost()}
                        className=" hover:bg-[#282828] w-full h-full rounded-xl relative z-100 "
                      >
                        <span className=" text-yellow-400 ml-2">Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          }
        </div>
        <div className="w-full text-center">
          {image && (
            <img
              className="h-[23rem] p-2 w-full rounded-2xl"
              src={image}
              alt="postImage"
            />
          )}

          <div
            className="w-full my-4 bg-[#161616]
        pointer-events-none "
          >
            {video && (
              <video
                loop
                autoPlay
                className="w-[100%] aspect-video"
                src={video}
                alt="postVideo"
              />
            )}
          </div>

          {!image && !video && (
            <h1 className="text-xl text-left p-2 text-gray-400">{caption}</h1>
          )}

          {(image || video) && (
            <p className="text-left p-2 text-md text-gray-400 ml-2">
              <strong className="text-yellow-400">{username} :</strong>{" "}
              {caption}
            </p>
          )}

          <div className="flex items-center space-x-3 p-2 w-full">
            {
              <div className="flex items-center space-x-2">
                <FavoriteIcon
                  onClick={handleLikeFeature}
                  className={`text-sm ${
                    likes && likes?.likeCount !== 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />

                {!notPost && (
                  <span className="text-white mr-10">
                    {likes && likes?.likeCount}
                  </span>
                )}
              </div>
            }
            {!notPost && (
              <div className="flex items-center space-x-2">
                <ChatBubbleIcon className="text-gray-500" />
                <span className="text-white">{commentNumber}</span>
              </div>
            )}
            <div className="flex items-center flex-grow" />{" "}
            {/* Empty flex-grow div */}
            {
              <div className="flex items-center">
                <BookmarkIcon
                  onClick={handleBookMark}
                  className={`text-sm ${
                    IsBookmarked ? "text-yellow-500" : "text-gray-500"
                  } mr-4`}
                />
              </div>
            }
          </div>
        </div>
        {!notPost && (
          <div className="w-[100%] text-center  h-12 my-2 flex items-center ">
            <input
              value={commentData}
              onChange={(e) => setCommentData(e.target.value)}
              placeholder="add comment..."
              type="text"
              className="flex-1 placeholder:text-gray-500 h-full rounded-l-xl bg-[#1e1e1e] text-yellow-400 text-sm focus:border-[#ffd93d] transition-all duration-500 px-4 py-3 focus:outline-none"
              name=""
              id=""
            />
            <p
              onClick={() => {
                commentData && setCommentNumber(commentNumber + 1);
                setCommentData("");
              }}
              className="text-md  text-[#1e1e1e] bg-yellow-400 hover:bg-yellow-500 w-[10%] rounded-r-xl h-full font-semibold py-3 min-w-[4rem] "
            >
              Post
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
