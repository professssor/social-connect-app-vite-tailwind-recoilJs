import React from "react";
import Sidebar from "../component/Sidebar";
import Feed from "../component/Feed";
import Suggestion from "../component/Suggestion";
import ProfileCardAtom from "../atom/ProfileCardAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import ProfileExtended from "../component/ProfileExtended";
import { useAuth } from "../Services/AuthService";
import BookmarkPage from "../component/BookmarkPage";
import bookmarkClicked from "../atom/bookmarkClicked";

import OtherUsersProfileAtom from "../atom/OtherUsersProfileAtom";
import OtherUsersProfile from "../component/OtherUsersProfile";
import ToggleProfileAtom from "../atom/ToggleProfileAtom";

function MainInterface() {
  const { isAuth, user } = useAuth();
  const [profileCardState, setProfileCardState] =
    useRecoilState(ProfileCardAtom);
  const bookMarkState = useRecoilValue(bookmarkClicked);
  const otherUserProfileState = useRecoilValue(OtherUsersProfileAtom);
  const [toggleProfileState, setToggleProfileState] =
    useRecoilState(ToggleProfileAtom);

  return (
    <div className="flex h-max overflowY-auto w-screen  ">
      {/*left-component  */}
      <Sidebar />
      {/*center-feed  */}
      {isAuth ? (
        profileCardState || bookMarkState ? (
          <ProfileExtended />
        ) : !otherUserProfileState ? (
          <Feed />
        ) : (
          <OtherUsersProfile />
        )
      ) : null}

      {/*right-component  */}
      <Suggestion />
    </div>
  );
}

export default MainInterface;
