import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import BookmarkAtom from "../atom/BookmarkAtom";
import PostCard from "./Postcard";
import Sidebar from "./Sidebar";
import { getBookmarkService } from "../Services/userService";
import { useAuth } from "../Services/AuthService";
import ProfileCardAtom from "../atom/ProfileCardAtom";
import shouldFetchAtom from "../atom/ShouldFetchAtom";
import bookmarkUpdateAtom from "../atom/bookmarkUpdateAtom";
import LoggedUserProfileDataAtom from "../atom/LoggedUserProfileDataAtom";
import PostsAtom from "../atom/PostsAtom";

function BookmarkPage() {
  const [bookmarkArray, setBookmarkArray] = useRecoilState(BookmarkAtom);
  const { isAuth } = useAuth();
  const [profileCardState, setProfileCardState] =
    useRecoilState(ProfileCardAtom);
  const [, setShouldFetch] = useRecoilState(shouldFetchAtom);
  const [bookmarkEditChange, setBookmarkEditChange] =
    useRecoilState(bookmarkUpdateAtom);
  const [loggedUserData, setLoggedUserData] = useRecoilState(
    LoggedUserProfileDataAtom
  );
  const [posts, setPosts] = useRecoilState(PostsAtom);

  useEffect(() => {
    const fetchBookmark = async () => {
      let token = localStorage.getItem("token");
      let getData = await getBookmarkService(token);
      setBookmarkArray(getData?.data?.bookmarks);
    };
    fetchBookmark();
    setShouldFetch(false);
    setProfileCardState(false);
  }, [bookmarkEditChange]);

  return (
    <>
      {isAuth && (
        <div className="flex h-max overflowY-auto w-screen">
          <Sidebar className="w-[100%]" />

          <div className="w-[100%]">
            {bookmarkArray.length === 0 ? (
              <div className="bg-[#282828] h-[90vh] m-10 rounded-xl">
                <p className="text-yellow-500 p-8 mt-10 text-center text-2xl">
                  You have no posts bookmarked
                </p>
              </div>
            ) : (
              <div className="bg-[#161616] rounded-xl m-3 p-6">
                <h2 className="text-yellow-500 text-3xl p-4 mt-4">
                  Your Bookmarks
                </h2>
                {posts
                  .filter((post) =>
                    bookmarkArray.some((bookmark) => bookmark._id === post._id)
                  )
                  .map((post) => (
                    <div className="" key={post._id}>
                      <PostCard
                        notPost
                        likes={post.likes}
                        image={post.image}
                        video={post.video}
                        date={post.date}
                        id={post._id}
                        username={post.username}
                        caption={post.caption}
                        avatar={post.avatar}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BookmarkPage;
