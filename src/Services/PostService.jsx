import axios from "axios";
import moment from "moment";
// to access all posts
const getAllPosts = () => {
  return axios.get("/api/posts");
};

const addNewPost = (input, user, token, image, video, avatar) => {
  return axios.post(
    "/api/posts",
    {
      postData: {
        caption: input,
        name: user,
        image: image,
        video: video,
        date: moment().format("llll"),
        avatar: avatar,
      },
    },
    {
      headers: { authorization: token },
    }
  );
};
const deletePostService = (postId, token) => {
  return axios.delete(`/api/posts/${postId}`, {
    headers: { authorization: token },
  });
};
const editPostService = (id, name, image, video, caption) => {
  let token = localStorage.getItem("token");
  return axios.post(
    `/api/posts/edit/${id}`,
    {
      postData: {
        postId: id,
        name: name,
        image: image,
        caption: caption,
        video: video,
        date: moment().startOf("second").fromNow(),
      },
    },
    {
      headers: { authorization: token },
    }
  );
};

// like post feature

const likePostService = (id, token) => {
  return axios.post(
    `/api/posts/like/${id}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

// to dislike posts
const dislikePostService = (id, token) => {
  return axios.post(
    `/api/posts/dislike/${id}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};
const addCommentService = (postId, commentData, token) => {
  return axios.post(
    `/api/comments/add/${postId}`,
    { commentData },
    {
      headers: { authorization: token },
    }
  );
};

const getPostsByAUser = (username) => {
  return axios.get(`/api/posts/user/${username}`);
};

export {
  getAllPosts,
  addNewPost,
  deletePostService,
  editPostService,
  likePostService,
  dislikePostService,
  addCommentService,
  getPostsByAUser,
};
