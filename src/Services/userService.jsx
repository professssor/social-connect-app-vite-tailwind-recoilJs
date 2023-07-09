import axios from "axios";

// get users data
const getuserById = () => {
  return axios.get("/api/users", {});
};

const getUserbyIdd = (userId) => {
  return axios.get(`/api/users/${userId}`, {});
};
//  this is to bookmark
const addBookmarkService = (id, token) => {
  return axios.post(
    `/api/users/bookmark/${id}`,
    {},

    { headers: { authorization: token } }
  );
};
// this is to remove the bookmark
const removeBookmarkService = (id, token) => {
  return axios.post(
    `/api/users/remove-bookmark/${id}`,
    {},
    { headers: { authorization: token } }
  );
};
const getBookmarkService = (token) => {
  return axios.get("/api/users/bookmark", {
    headers: { authorization: token },
  });
};

const followUser = (userId) => {
  let token = localStorage.getItem("token");

  return axios.post(
    `/api/users/follow/${userId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

const unfollowUser = (userId) => {
  let token = localStorage.getItem("token");
  return axios.post(
    `/api/users/unfollow/${userId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};
const editUserDetails = (caption, link, avatar) => {
  let token = localStorage.getItem("token");

  return axios.post(
    "/api/users/edit",
    {
      userData: { caption, link, avatar },
    },
    { headers: { authorization: token } }
  );
};

export {
  getuserById,
  addBookmarkService,
  removeBookmarkService,
  getBookmarkService,
  followUser,
  unfollowUser,
  getUserbyIdd,
  editUserDetails,
};
