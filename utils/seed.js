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
