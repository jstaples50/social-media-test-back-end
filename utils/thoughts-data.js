const { Thought, User } = require("../models");

const thoughts = [
  { thoughtText: "The king of hearts is the only king without a moustache." },
  { thoughtText: "Elephants are the only mammals that can't jump." },
  {
    thoughtText:
      "The international telephone dialing code for Antarctica is 672.",
  },
  {
    thoughtText: "Every year about 98% of the atoms in your body are replaced.",
  },
  { thoughtText: "American car horns beep in the tone of F." },
];

const randomUser = (userArray) => {
  const user = userArray[Math.floor(Math.random() * userArray.length)];
  return user.username;
};

const assignUsersToThought = async (thoughtsArray) => {
  const arrayOfUsernames = await User.find({}, "username");
  for (const thought of thoughtsArray) {
    thought.username = randomUser(arrayOfUsernames);
  }
};

const addThoughtsToUsers = async () => {
  const allThoughts = await Thought.find({});
  const allUsers = await User.find({});

  for (const thought of allThoughts) {
    for (const user of allUsers) {
      if (thought.username === user.username) {
        await User.updateOne(
          { username: user.username },
          { $addToSet: { thoughts: thought._id } }
        );
      }
    }
  }
};

module.exports = { thoughts, assignUsersToThought, addThoughtsToUsers };
