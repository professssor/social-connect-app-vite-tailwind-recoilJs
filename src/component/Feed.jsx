import React, { useEffect, useState } from "react";
import PostCard from "./Postcard";
import Post from "./Post";

import { getAllPosts } from "../Services/PostService";
import { useRecoilState } from "recoil";
import shouldFetchAtom from "../atom/ShouldFetchAtom";
import { useAuth } from "../Services/AuthService";
import EditViewAtom from "../atom/EditVIewAtom";
import PostsAtom from "../atom/PostsAtom";
import bookmarkUpdateAtom from "../atom/bookmarkUpdateAtom";
import ProfileCardAtom from "../atom/ProfileCardAtom";
import BookmarkAtom from "../atom/BookmarkAtom";
import ButtonContainer from "./ButtonContainer";

function Feed() {
  const { user } = useAuth;
  const [posts, setPosts] = useRecoilState(PostsAtom);

  const [shouldFetch, setShouldFetch] = useRecoilState(shouldFetchAtom);
  const [editView, setEditView] = useRecoilState(EditViewAtom);
  const [profileCardState, setProfileCardState] =
    useRecoilState(ProfileCardAtom);
  // to get the user profile photo when we pass to new post

  const [bookmarkEditChange, setBookmarkEditChange] =
    useRecoilState(bookmarkUpdateAtom);
  const [bookmarkArray, setBookmarkArray] = useRecoilState(BookmarkAtom);

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.data.posts.reverse());
        // You can process the response data here
      } catch (error) {
        console.error(error);
      }
    };

    setShouldFetch(false);
    // const getusers = async () => {
    //   try {
    //     const response = await getuserById();
    //     setUsers(response.data.users);
    //     // You can process the response data here
    //   } catch (error) {
    //     console.error("none");
    //   }
    // };
    // getusers();

    postData();
  }, [shouldFetch]);

  // useEffect(() => {
  //   let userId = localStorage.getItem("userId");
  //   const fetchBookmark = async () => {
  //     let token = localStorage.getItem("token");
  //     let getData = await getBookmarkService(token);
  //     setBookmarkArray(getData?.data?.bookmarks);
  //   };
  //   fetchBookmark();
  //   setShouldFetch(false);
  //   setProfileCardState(false);
  // }, [bookmarkEditChange]);

  return (
    <div className="w-[120%] overflow-x-hidden">
      {/* post section  */}

      <Post />

      <ButtonContainer />
      {posts.map((post, index) => (
        <PostCard
          key={index}
          id={post._id}
          video={post.video}
          username={post.username}
          date={post.date}
          image={post.image}
          caption={post.caption}
          likes={post.likes}
          avatar={post.avatar}
        />
      ))}
    </div>
  );
}

export default Feed;
