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

// PUT function

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "No user found with that id" });
    } else {
      res.json(updatedUser);
      console.log(`${req.method} request made`);
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

// DELETE function

const deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.userId);
    if (!userToDelete) {
      res.status(404).json({ message: "No user found with that id" });
    } else {
      res.status(204).json({ message: "User successfully deleted" });
      console.log(`${req.method} request made`);
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
