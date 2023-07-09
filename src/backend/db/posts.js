import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    username: "adarshbalika",
    date: "June 10, 2023",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    // image: "post1.jpg",
    caption: "Having a great time at the beach! #summer #sunshine",
  },
  {
    _id: uuid(),
    // avatar: "https://randomuser.me/api/portraits/lego/5.jpg",

    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    username: "adarshbalika",
    date: "June 11, 2023",
    // image: "https://randomuser.me/api/portraits/lego/2.jpg",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    // image: "post2.jpg",
    caption: "Exploring new places and making memories. #wanderlust",
  },
  {
    _id: uuid(),
    // avatar: "https://randomuser.me/api/portraits/lego/8.jpg",

    avatar: "https://randomuser.me/api/portraits/lego/4.jpg",
    username: "donaldtrump",
    date: "June 12, 2023",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    // image: "post3.jpg",
    caption: "Enjoying the beautiful sunset. #nature #sunsetlovers",
  },
  {
    _id: uuid(),
    avatar: "https://randomuser.me/api/portraits/lego/3.jpg",
    username: "johndoe",
    date: "June 13, 2023",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    // image: "post4.jpg",
    caption: "Delicious food and good company. #foodie #friends",
  },
  {
    _id: uuid(),
    // avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
    avatar: "https://randomuser.me/api/portraits/lego/3.jpg",
    username: "janesmith",
    date: "June 14, 2023",
    // image: "post5.jpg",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    caption: "Feeling blessed and grateful. #blessed #gratitude",
  },
  {
    _id: uuid(),
    avatar: "https://randomuser.me/api/portraits/lego/0.jpg",
    username: "alicejohnson",
    date: "June 15, 2023",
    // image: "post6.jpg",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    caption: "Just finished reading an amazing book. #reading #booklover",
  },
  {
    _id: uuid(),
    avatar: "https://randomuser.me/api/portraits/lego/0.jpg",
    username: "emilybrown",
    date: "June 15, 2023",
    // image: "post7.jpg",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    caption: "Adventures are the best way to learn. #adventure",
  },
  {
    _id: uuid(),

    avatar: "https://randomuser.me/api/portraits/lego/0.jpg",
    // avatar: "https://randomuser.me/api/portraits/lego/4.jpg",
    username: "alicejohnson",
    date: "June 15, 2023",
    // image: "post8.jpg",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    caption: "Chasing dreams and reaching for the stars. #dreambig",
  },
  {
    _id: uuid(),
    avatar: "https://randomuser.me/api/portraits/lego/3.jpg",
    username: "janesmith",
    date: "June 15, 2023",
    // image: "post9.jpg",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    caption: "Exploring the city streets. #citylife #urban",
  },
  {
    _id: uuid(),
    avatar: "https://randomuser.me/api/portraits/lego/4.jpg",
    username: "donaldtrump",
    date: "June 15, 2023",
    // image: "post10.jpg",
    likes: { likeCount: 0, likedBy: Array(0), dislikedBy: Array(0) },
    caption: "Weekend vibes. #weekend #relaxation",
  },
];
