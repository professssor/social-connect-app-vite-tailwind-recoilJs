import React, { useEffect, useState } from "react";
import { editPostService } from "../Services/PostService";
import { useRecoilState } from "recoil";
import shouldFetchAtom from "../atom/ShouldFetchAtom";
import EditViewAtom from "../atom/EditVIewAtom";
import bookmarkUpdateAtom from "../atom/bookmarkUpdateAtom";

function EditComponent({ id, name, image, caption, video }) {
  const [editCaption, setEditCaption] = useState(caption);
  const [editView, setEditView] = useRecoilState(EditViewAtom);
  const [shouldFetch, setShouldFetch] = useRecoilState(shouldFetchAtom);

  const [bookmarkEditChange, setBookmarkEditChange] =
    useRecoilState(bookmarkUpdateAtom);

  // to handle the edit of post

  const handleEditPost = async () => {
    try {
      let token = localStorage.getItem("token");
      let response = await editPostService(
        id,
        name,
        image,
        video,
        caption,
        token
      );

      setEditView(false);
      setShouldFetch(true);
      setBookmarkEditChange(true);
    } catch {
      console.error("Something went wrong");
    }
  };

  return (
    <div
      className="
      rounded-2xl w-[20rem] h-max bg-[#161616] flex flex-col p-2"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 10000,
        transform: "translate(-50%, -50%)",
      }}
    >
      {image && (
        <>
          <img
            className="rounded-2xl object-cover
h-[10rem] w-[100%] mx-auto p-1 "
            src={image}
            alt="postImage"
          />

          {/* <p
            onClick={() => {
              image = undefined;
              setShouldFetch(true);
            }}
            className="mx-auto text-yellow-600
hover:text-yellow-500  text-xs mb-1 hover:underline"
          >
            remove image
          </p> */}
        </>
      )}
      {video && (
        <video caption className="w-full h-full" src={video} alt="postVideo" />
      )}

      {/* the second part div */}
      <div className="bg-[#282828] rounded-md ">
        <textarea
          className=" h-[10rem] w-full  p-4
          outline-none
          border-none text-white bg-transparent resize-none"
          value={(caption = editCaption)}
          onChange={(e) => {
            setEditCaption(e.target.value);
          }}
        >
          {editCaption}
        </textarea>
      </div>

      <button
        onClick={handleEditPost}
        className="p-2 mt-2 text-black  bg-yellow-400 rounded-lg w-[40%] mx-auto"
      >
        Update Post
      </button>
    </div>
  );
}

export default EditComponent;
