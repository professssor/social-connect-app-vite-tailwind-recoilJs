import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const BookmarkLikeAtom = atom({
  key: "BookmarkLikeAtom",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
export default BookmarkLikeAtom;
