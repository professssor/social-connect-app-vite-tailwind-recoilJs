import React, { useState } from "react";
import { useRecoilState } from "recoil";
import PostsAtom from "../atom/PostsAtom";
import SearchResults from "./SearchResults";
import { Label } from "@mui/icons-material";

import { users } from "../backend/db/users";

function SearchComp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useRecoilState(PostsAtom);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredPosts = posts.filter(
      (post) =>
        post.caption.toLowerCase().includes(query.toLowerCase()) ||
        post.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filteredPosts);
  };

  return (
    <div className="w-full h-[3rem]  relative ">
      <label className="">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="outline-none rounded-t-xl w-full h-full bg-[#282828] text-yellow-300 text-md border-gray-700 hover:border-[1px] hover:border-[#ffd93d] transition-all duration-500 p-5 "
          placeholder="Search"
        />
        {searchQuery.length > 0 && (
          <p
            onClick={() => setSearchQuery("")}
            className="absolute top-3 right-4 bg-transparent cursor-pointer text-yellow-400  "
          >
            ❌
          </p>
        )}
      </label>

      <div className="  ">
        {searchQuery &&
          filteredPosts.map((post) => (
            <SearchResults
              key={post.id}
              caption={post.caption}
              name={post.username}
            />
          ))}
      </div>
    </div>
  );
}

export default SearchComp;
