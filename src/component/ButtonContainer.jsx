import React, { useState } from "react";
import PostsAtom from "../atom/PostsAtom";
import { useRecoilState } from "recoil";
import shouldFetchAtom from "../atom/ShouldFetchAtom";

function ButtonContainer() {
  const [posts, setPosts] = useRecoilState(PostsAtom);
  const [selectedCriteria, setSelectedCriteria] = useState("");

  function sortPostsByLikes() {
    const sortedByLikePostArray = [...posts].sort(
      (a, b) => b.likes.likeCount - a.likes.likeCount
    );
    setPosts(sortedByLikePostArray);
    setSelectedCriteria("likes");
  }

  function sortPostsByDate() {
    const sortedByDatePostArray = [...posts].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    setPosts(sortedByDatePostArray);
    setSelectedCriteria("date");
  }

  return (
    <div className="flex bg-[#282828] rounded-2xl md:w-[20rem] w-[95%] justify-center mt-3 mx-auto p-1">
      <button
        onClick={sortPostsByLikes}
        className={`${
          selectedCriteria === "likes" ? "bg-yellow-400" : ""
        } p-2 rounded-3xl text-gray-500 hover:text-yellow-400 hover:bg-[#282828] hover:border-yellow-400 transition-colors duration-300 border border-none w-[100%]`}
      >
        <span className="p-4">Trending</span>
      </button>
      <button
        onClick={sortPostsByDate}
        className={`${
          selectedCriteria === "date" ? "bg-yellow-400" : ""
        } p-2 rounded-3xl text-gray-500 hover:text-yellow-400 hover:bg-[#282828] hover:border-yellow-400 transition-colors duration-300 border border-none w-[100%]`}
      >
        <span className="p-4">Sort by Date</span>
      </button>
    </div>
  );
}

export default ButtonContainer;
