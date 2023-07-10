import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SailingIcon from "@mui/icons-material/Sailing";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ProfileCardAtom from "../atom/ProfileCardAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import bookmarkClicked from "../atom/bookmarkClicked";
import PostAlert from "../atom/PostAlert";
import OtherUsersProfileAtom from "../atom/OtherUsersProfileAtom";
import LoggedUserProfileDataAtom from "../atom/LoggedUserProfileDataAtom";
function Sidebar() {
  const [profileCardState, setProfileCardState] =
    useRecoilState(ProfileCardAtom);
  const [bookmarkState, setBookMarkState] = useRecoilState(bookmarkClicked);
  const [postAlert, setPostAlert] = useRecoilState(PostAlert);
  const [otherUserProfileState, setOtherUserProfileState] = useRecoilState(
    OtherUsersProfileAtom
  );
  const [loggedUserData, setLoggedUserData] = useRecoilState(
    LoggedUserProfileDataAtom
  );
  const navigate = useNavigate();

  return (
    // main container
    <div
      className="flex flex-col h-[100vh] sticky top-0
      self-start bg-[#161616] 
     text-red-700  justify-start w-fit  items-center  md:w-[8rem] lg:w-[50%] "
    >
      <div className="p-4 ">
        <img
          className="h-16 w-16 p-3 md:p-1 "
          src="https://img.icons8.com/ios-filled/50/FAB005/share-2.png"
          alt="share-2"
        />
      </div>
      {/* navigation/ feature section  */}
      <div className="flex flex-col justify-start mt-6 space-y-6 text-[1.3rem] h-[100%] p-2 md:p-10   md:items-left">
        <Link to="/">
          <p
            onClick={() => {
              setProfileCardState(false);

              setOtherUserProfileState(false);
            }}
            className="optionContainer"
          >
            <HomeIcon className="" />
            <span className="hidden lg:navText">Home</span>
          </p>{" "}
        </Link>
        <Link to="/bookmark">
          <p className="optionContainer">
            <BookmarkIcon />
            <span className="hidden lg:navText">Bookmark</span>
          </p>
        </Link>
        <p
          className="optionContainer"
          onClick={() => {
            setProfileCardState(true);
            navigate("/");
          }}
        >
          <Person2Icon />

          <span className="hidden lg:navText">Explore</span>
        </p>
        {/* <p
          onClick={() => {
            navigate("/");
            setPostAlert(true);
          }}
          className="optionContainer"
        >
          <AddCircleOutlineIcon />
          <span className="hidden lg:navText">Post</span>
        </p>{" "} */}
      </div>
      {/* the account detail section  */}
      <div className=" pb-4 ">
        <p
          onClick={() => {
            setProfileCardState(true);
            navigate("/");
          }}
          className="optionContainer"
        >
          {/* <AccountCircleIcon className="text-blue-500" /> */}

          <img
            className="  h-9 w-9 rounded-full bg-[#F5F5F5]"
            src={`${
              loggedUserData?.avatar ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }`}
          />
          <span className="hidden lg:navText ">Details</span>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
