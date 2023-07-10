import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    lastName: "Balika",
    username: "adarshbalika",
    email: "adarshbalika@neog.camp",
    password: "adarshBalika",
    caption: "Madridista",
    link: "https://github.com/professssor",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "donald",
    avatar: "https://randomuser.me/api/portraits/lego/4.jpg",
    lastName: "trump",
    email: "football@neog.camp",
    username: "donaldtrump",
    password: "football",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "John",

    avatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    lastName: "Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    password: "password123",
    createdAt: "2023-06-29T10:15:00Z",
    updatedAt: "2023-06-30T14:20:00Z",
  },
  {
    _id: uuid(),
    firstName: "Jane",
    avatar: "https://randomuser.me/api/portraits/lego/8.jpg",
    lastName: "Smith",
    username: "janesmith",
    email: "janesmith@example.com",
    password: "password456",
    createdAt: "2023-06-29T12:30:00Z",
    updatedAt: "2023-06-30T16:40:00Z",
  },
  {
    _id: uuid(),
    firstName: "Alice",
    lastName: "Johnson",
    avatar: "https://randomuser.me/api/portraits/lego/3.jpg",
    username: "alicejohnson",
    email: "alicejohnson@example.com",
    password: "password789",
    createdAt: "2023-06-29T15:45:00Z",
    updatedAt: "2023-06-30T19:00:00Z",
  },
  {
    _id: uuid(),
    firstName: "Bob",
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
    lastName: "Williams",
    username: "bobwilliams",
    email: "bobwilliams@example.com",
    password: "passwordabc",
    createdAt: "2023-06-29T17:00:00Z",
    updatedAt: "2023-06-30T20:15:00Z",
  },
  {
    _id: uuid(),
    firstName: "Emily",
    lastName: "Brown",
    avatar: "https://randomuser.me/api/portraits/lego/0.jpg",
    username: "emilybrown",
    email: "emilybrown@example.com",
    password: "passworddef",
    createdAt: "2023-06-29T19:20:00Z",
    updatedAt: "2023-06-30T22:30:00Z",
  },
];
// basically the  users that the db offers are the only one which works in sync with the signup /login auth , not how it is in industry , which has a hosted db on which data is stored and accessed realtime
