// EXAMPLE USER CONTROLLER

// const User = require('../models/User');

// module.exports = {
//   getUsers(req, res) {
//     User.find()
//       .then((users) => res.json(users))
//       .catch((err) => res.status(500).json(err));
//   },
//   getSingleUser(req, res) {
//     User.findOne({ _id: req.params.userId })
//       .select('-__v')
//       .populate('posts')
//       .then((user) =>
//         !user
//           ? res.status(404).json({ message: 'No user with that ID' })
//           : res.json(user)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // create a new user
//   createUser(req, res) {
//     User.create(req.body)
//       .then((dbUserData) => res.json(dbUserData))
//       .catch((err) => res.status(500).json(err));
//   },
// };

const { User, Thought } = require("../models");

// GET functions

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
    console.log(`${req.method} request made`);
  } catch (error) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate([
      "thoughts",
      "friends",
    ]);
    if (!user) {
      res.status(404).json({ message: "No user found with that id" });
    } else {
      res.json(user);
      console.log(`${req.method} request made`);
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

// POST function

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
    console.log(`${req.method} request made`);
  } catch (error) {
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getUserById, createUser };
