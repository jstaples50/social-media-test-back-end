// EXAMPLE SEED EXECUTION

// const connection = require('../config/connection');
// const { Post, User } = require('../models');
// const getRandomName = require('./data');

// console.log(getRandomName());
// connection.on('error', (err) => err);

// connection.once('open', async () => {
//   console.log('connected');
//   await Post.deleteMany({});
//   await User.deleteMany({});

//   const users = [];

//   for (let i = 0; i < 20; i++) {
//     const fullName = getRandomName();
//     const first = fullName.split(' ')[0];
//     const last = fullName.split(' ')[1];

//     users.push({
//       first,
//       last,
//       age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
//     });
//   }

//   await User.collection.insertMany(users);
//   console.log(users);
//   process.exit(0);
// });

const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, assignRandomFriends } = require("./user-data");
const {
  thoughts,
  assignUsersToThought,
  addThoughtsToUsers,
} = require("./thoughts-data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("\nconnected");
  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.collection.insertMany(users);
  await assignRandomFriends();

  await assignUsersToThought(thoughts);
  await Thought.collection.insertMany(thoughts);

  await addThoughtsToUsers();

  console.log("\n---DATABASE SEEDED---\n");
  process.exit(0);
});
