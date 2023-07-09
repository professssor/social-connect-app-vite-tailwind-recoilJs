import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkIcon from "@mui/icons-material/Bookmark";
function BookmarkCard({ name, date, image, caption, video }) {
  console.log(name, date, image, caption, video);
  return (
    <div className="flex flex-col items-start mx-auto rounded-2xl bg-[#282828] w-[95%] m-2 p-6 md:mx-4 lg:w-[95%] mt-[1rem]">
      <div className="flex items-center w-full">
        <img
          className="h-12 w-12 rounded-full m-2"
          src="https://picsum.photos/600/400"
          alt="userAvatar"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-yellow-400">{name}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>
      <div className="w-full text-center">
        {image && (
          <img
            className="h-[23rem] p-2 w-full rounded-2xl"
            src={image}
            alt="postImage"
          />
        )}
        {video && (
          <video
            loop
            autoPlay
            className="w-[100%] aspect-video"
            src={video}
            alt="postVideo"
          />
        )}
        {!image && !video && (
          <h1 className="text-xl text-left p-2 text-gray-400">{caption}</h1>
        )}
        {(image || video) && (
          <p className="text-left p-2 text-md text-gray-400 ml-2">
            <strong className="text-yellow-400">{name} :</strong> {caption}
          </p>
        )}
        <div className="flex items-center space-x-3 p-2 w-full">
          <div className="flex items-center space-x-2">
            <FavoriteIcon
              onClick={handleLikeFeature}
              className={`text-sm ${
                likes && likes?.likeCount !== 0
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            />
            <span className="text-white mr-10">
              {likes && likes?.likeCount}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ChatBubbleIcon className="text-gray-500" />
            <span className="text-white">{commentNumber}</span>
          </div>
          <div className="flex items-center flex-grow" />{" "}
          {/* Empty flex-grow div */}
          <div
            onClick={() => setBookmark(!bookmark)}
            className="flex items-center"
          >
            <BookmarkIcon
              onClick={handleBookMark}
              className={`text-sm ${
                bookmark ? "text-yellow-500" : "text-gray-500"
              } mr-4`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;
